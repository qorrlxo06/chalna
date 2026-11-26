"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface RitualTimerProps {
  title: string;
  defaultSeconds?: number;
  presets?: number[];
}

const CYCLE_TOTAL = 14; // 4s inhale + 4s hold + 6s exhale

function getBreathPhase(elapsedSec: number) {
  const mod = elapsedSec % CYCLE_TOTAL;
  if (mod < 4) {
    return { label: "천천히 들이마시기", hint: `${4 - mod}초`, ratio: (mod + 1) / 4 };
  }
  if (mod < 8) {
    return { label: "잠시 머무르기", hint: `${8 - mod}초`, ratio: 1 };
  }
  return {
    label: "길게 내쉬기",
    hint: `${14 - mod}초`,
    ratio: Math.max(0.15, (14 - mod) / 6),
  };
}

function formatClock(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function RitualTimer({
  title,
  defaultSeconds = 180,
  presets = [180, 300, 600],
}: RitualTimerProps) {
  const [selectedTotal, setSelectedTotal] = useState(defaultSeconds);
  const [remaining, setRemaining] = useState(defaultSeconds);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSoftTone = useCallback(
    (freq = 432, duration = 0.65) => {
      if (!soundEnabled || typeof window === "undefined") return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // ignore audio restriction
      }
    },
    [soundEnabled]
  );

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setCompleted(true);
          playSoftTone(528, 1.1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running, playSoftTone]);

  const elapsed = selectedTotal - remaining;
  const progressPct =
    selectedTotal > 0 ? Math.min(100, (elapsed / selectedTotal) * 100) : 0;
  const breath = getBreathPhase(elapsed);

  const handleSelectPreset = (sec: number) => {
    setRunning(false);
    setCompleted(false);
    setSelectedTotal(sec);
    setRemaining(sec);
  };

  const handleToggle = () => {
    if (remaining === 0) {
      setRemaining(selectedTotal);
      setCompleted(false);
      setRunning(true);
      playSoftTone(432, 0.5);
      return;
    }
    setCompleted(false);
    setRunning((prev) => {
      const next = !prev;
      if (next) playSoftTone(432, 0.45);
      return next;
    });
  };

  const handleReset = () => {
    setRunning(false);
    setCompleted(false);
    setRemaining(selectedTotal);
  };

  return (
    <div className="border border-[#E5E4DE] bg-[#F7F6F2] p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E4DE] pb-5">
        <div>
          <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#5B8477]">
            RITUAL BREATHING TIMER
          </p>
          <h3 className="mt-1 font-editorial-kr text-[20px] sm:text-[22px] text-[#1A1A1A]">
            {title}
          </h3>
        </div>

        {/* 시간 프리셋 선택 */}
        <div className="flex items-center gap-2" role="group" aria-label="타이머 시간 선택">
          {presets.map((sec) => {
            const active = selectedTotal === sec;
            return (
              <button
                key={sec}
                type="button"
                onClick={() => handleSelectPreset(sec)}
                aria-pressed={active}
                className={`min-h-[48px] px-4 text-[13px] border transition-colors cursor-pointer ${
                  active
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#FFFFFF]"
                    : "border-[#E5E4DE] bg-[#FFFFFF] text-[#4F4F4B] hover:border-[#1A1A1A]"
                }`}
              >
                {sec / 60}분
              </button>
            );
          })}
        </div>
      </div>

      {/* 중앙 카운트다운 + 호흡 리듬 */}
      <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5">
          <p
            className="font-editorial-en text-[56px] sm:text-[68px] leading-none tracking-[0.06em] text-[#1A1A1A] tabular-nums"
            aria-live="off"
          >
            {formatClock(remaining)}
          </p>
          <p className="mt-3 text-[13px] text-[#787872]">
            {completed
              ? "짧은 쉼을 마쳤습니다. 이제 나의 속도로 돌아가 보세요."
              : running
              ? "4초 들이마시고, 4초 머무른 뒤, 6초 동안 천천히 내쉽니다."
              : "시작 버튼을 눌러 지금 이 자리에서 짧은 호흡을 체험해 보세요."}
          </p>
        </div>

        <div className="md:col-span-7 space-y-5">
          {/* 호흡 페이즈 표시 */}
          <div className="border border-[#E5E4DE] bg-[#FFFFFF] p-4 sm:p-5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#787872]">호흡 리듬 가이드</span>
              <span className="font-medium text-[#5B8477] tabular-nums">
                {running ? `${breath.label} · ${breath.hint}` : "대기 중 (4 · 4 · 6 호흡)"}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full bg-[#F7F6F2] border border-[#E5E4DE]">
              <div
                className="h-full bg-[#5B8477] transition-all duration-700"
                style={{ width: running ? `${Math.round(breath.ratio * 100)}%` : "0%" }}
              />
            </div>
          </div>

          {/* 전체 진행률 바 */}
          <div>
            <div className="flex items-center justify-between text-[12px] text-[#787872] mb-2">
              <span>전체 진행률</span>
              <span className="tabular-nums">{Math.round(progressPct)}%</span>
            </div>
            <div className="h-[2px] w-full bg-[#E5E4DE]">
              <div
                className="h-full bg-[#1A1A1A] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E4DE] pt-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#5B8477] px-6 text-[14px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors cursor-pointer"
          >
            {running ? (
              <>
                <Pause className="h-4 w-4" strokeWidth={1.5} />
                <span>잠시 멈추기</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" strokeWidth={1.5} />
                <span>{remaining === 0 ? "다시 시작하기" : elapsed > 0 ? "이어서 호흡하기" : "호흡 시작하기"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#E5E4DE] bg-[#FFFFFF] px-4 text-[14px] text-[#4F4F4B] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            <span>초기화</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSoundEnabled((v) => !v)}
          aria-pressed={soundEnabled}
          className="inline-flex min-h-[48px] items-center gap-2 px-3 text-[13px] text-[#787872] hover:text-[#1A1A1A] transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="h-4 w-4 text-[#5B8477]" strokeWidth={1.5} />
              <span>시작·종료 알림음 켜짐</span>
            </>
          ) : (
            <>
              <VolumeX className="h-4 w-4" strokeWidth={1.5} />
              <span>알림음 꺼짐</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
