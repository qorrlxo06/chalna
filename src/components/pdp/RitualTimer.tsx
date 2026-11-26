"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface RitualTimerProps {
  title: string;
  defaultSeconds?: number;
  presets?: number[];
}

const CYCLE_TOTAL = 14; // 4초 들숨 + 4초 멈춤 + 6초 날숨

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
  const progressRatio = selectedTotal > 0 ? Math.min(1, elapsed / selectedTotal) : 0;
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
    <div className="border border-line bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-ink">
          {title}
        </h3>

        {/* 시간 프리셋 */}
        <div className="flex items-center gap-2" role="group" aria-label="타이머 시간 선택">
          {presets.map((sec) => {
            const active = selectedTotal === sec;
            return (
              <button
                key={sec}
                type="button"
                onClick={() => handleSelectPreset(sec)}
                aria-pressed={active}
                className={`min-h-[44px] px-4 text-[14px] font-medium border transition-colors cursor-pointer ${
                  active
                    ? "border-accent bg-accent text-bg"
                    : "border-line bg-bg text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {sec / 60}분
              </button>
            );
          })}
        </div>
      </div>

      {/* 중앙 카운트다운 + 호흡 리듬 */}
      <div className="py-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5">
          <p
            className="text-[48px] sm:text-[56px] font-semibold leading-none tracking-[-0.02em] text-ink tabular-nums"
            aria-live="off"
          >
            {formatClock(remaining)}
          </p>
          <p className="mt-2.5 text-[13px] text-muted">
            {completed
              ? "짧은 쉼을 마쳤습니다. 이제 나의 속도로 돌아가 보세요."
              : running
              ? "4초 들이마시고, 4초 머무른 뒤, 6초 동안 천천히 내쉽니다."
              : "시작 버튼을 눌러 지금 이 자리에서 잠깐 호흡을 맞춰 보세요."}
          </p>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="border border-line bg-bg p-4">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted">호흡 리듬 가이드</span>
              <span className="font-medium text-accent tabular-nums">
                {running ? `${breath.label} (${breath.hint})` : "대기 중 (4·4·6 호흡)"}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full bg-surface border border-line overflow-hidden">
              <div
                className="h-full w-full bg-accent origin-left transition-transform duration-700"
                style={{
                  transform: `scaleX(${running ? breath.ratio : 0})`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[12px] text-muted mb-1.5">
              <span>전체 진행률</span>
              <span className="tabular-nums">{Math.round(progressRatio * 100)}%</span>
            </div>
            <div className="h-[2px] w-full bg-line overflow-hidden">
              <div
                className="h-full w-full bg-ink origin-left transition-transform duration-500"
                style={{ transform: `scaleX(${progressRatio})` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-accent px-6 text-[14px] font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
          >
            {running ? (
              <>
                <Pause className="h-4 w-4" strokeWidth={1.5} />
                <span>잠시 멈추기</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" strokeWidth={1.5} />
                <span>
                  {remaining === 0
                    ? "다시 시작하기"
                    : elapsed > 0
                    ? "이어서 호흡하기"
                    : "호흡 시작하기"}
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-line bg-bg px-4 text-[14px] font-medium text-ink hover:border-ink transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            <span>초기화</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSoundEnabled((v) => !v)}
          aria-pressed={soundEnabled}
          className="inline-flex min-h-[48px] items-center gap-2 px-3 text-[13px] text-muted hover:text-ink transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <span>알림음 켜짐</span>
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
