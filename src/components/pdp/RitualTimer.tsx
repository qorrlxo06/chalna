"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface RitualTimerProps {
  title: string;
  defaultSeconds?: number;
  presets?: number[];
}

const CYCLE_TOTAL = 14; // 4초 들숨 + 4초 멈춤 + 6초 날숨

type BreathPhaseId = "inhale" | "hold" | "exhale";

function getBreathPhase(elapsedSec: number): {
  id: BreathPhaseId;
  label: string;
  guide: string;
  hint: string;
  ratio: number;
} {
  const mod = elapsedSec % CYCLE_TOTAL;
  if (mod < 4) {
    return {
      id: "inhale",
      label: "들이마시기",
      guide: "코로 부드럽게 숨을 들이마십니다.",
      hint: `${4 - mod}초`,
      ratio: (mod + 1) / 4,
    };
  }
  if (mod < 8) {
    return {
      id: "hold",
      label: "머무르기",
      guide: "가슴과 어깨의 힘을 풀고 잠시 머무릅니다.",
      hint: `${8 - mod}초`,
      ratio: 1,
    };
  }
  return {
    id: "exhale",
    label: "길게 내쉬기",
    guide: "입술 사이로 천천히, 끝까지 숨을 비워냅니다.",
    hint: `${14 - mod}초`,
    ratio: Math.max(0.12, (14 - mod) / 6),
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

  const phases: { id: BreathPhaseId; label: string; sec: string }[] = [
    { id: "inhale", label: "들이마시기", sec: "4초" },
    { id: "hold", label: "머무르기", sec: "4초" },
    { id: "exhale", label: "길게 내쉬기", sec: "6초" },
  ];

  return (
    <div className="border border-line bg-surface p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <h2 className="font-editorial-kr text-[21.5px] sm:text-[24px] font-bold text-ink">
          {title}
        </h2>

        {/* 시간 선택 탭 (3분 · 5분 · 10분) */}
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="호흡 시간 선택"
        >
          {presets.map((sec) => {
            const active = selectedTotal === sec;
            return (
              <button
                key={sec}
                type="button"
                onClick={() => handleSelectPreset(sec)}
                aria-pressed={active}
                className={`min-h-[48px] min-w-[68px] px-4 text-[15.5px] ui-label font-medium border transition-colors cursor-pointer tabular-nums ${
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

      {/* 중앙 카운트다운 + 14초 호흡 리듬 게이지 */}
      <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-3">
          <p
            className="font-editorial-en text-[58px] sm:text-[68px] font-medium leading-none tracking-[-0.02em] text-ink tabular-nums"
            aria-live="off"
          >
            {formatClock(remaining)}
          </p>
          <p className="text-[15.5px] leading-[1.7] text-muted">
            {completed
              ? "짧은 쉼을 마쳤습니다. 이제 나의 속도로 돌아가 보세요."
              : running
              ? breath.guide
              : "시작 버튼을 눌러 4·4·6 리듬에 맞춰 지금 이 자리에서 호흡해 보세요."}
          </p>
        </div>

        <div className="lg:col-span-7 space-y-5">
          {/* 3단계 호흡 리듬 카드 */}
          <div className="border border-line bg-bg p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[15px]">
              <span className="text-muted">14초 호흡 리듬</span>
              <span className="font-semibold text-accent tabular-nums">
                {running
                  ? `${breath.label} · ${breath.hint}`
                  : "대기 중 (4초 들숨 · 4초 머무름 · 6초 날숨)"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {phases.map((p) => {
                const isCurrent = running && breath.id === p.id;
                return (
                  <div
                    key={p.id}
                    className={`border px-3 py-2.5 text-center transition-colors ${
                      isCurrent
                        ? "border-accent bg-surface text-ink"
                        : "border-line bg-bg text-muted"
                    }`}
                  >
                    <p
                      className={`text-[14.5px] ${
                        isCurrent ? "font-semibold text-accent" : "font-medium"
                      }`}
                    >
                      {p.label}
                    </p>
                    <p className="mt-0.5 text-[13.5px] tabular-nums">{p.sec}</p>
                  </div>
                );
              })}
            </div>

            <div className="h-2 w-full bg-surface border border-line overflow-hidden">
              <div
                className="h-full w-full bg-accent origin-left transition-transform duration-700"
                style={{
                  transform: `scaleX(${running ? breath.ratio : 0})`,
                }}
              />
            </div>
          </div>

          {/* 전체 진행률 */}
          <div>
            <div className="flex items-center justify-between text-[14px] text-muted mb-2">
              <span>전체 진행률</span>
              <span className="tabular-nums font-medium text-ink">
                {Math.round(progressRatio * 100)}%
              </span>
            </div>
            <div className="h-[3px] w-full bg-line overflow-hidden">
              <div
                className="h-full w-full bg-ink origin-left transition-transform duration-500"
                style={{ transform: `scaleX(${progressRatio})` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 (시작 / 일시정지 / 초기화, 최소 높이 48px) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex min-h-[48px] min-w-[132px] items-center justify-center gap-2 bg-accent px-6 text-[16px] ui-label font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
          >
            {running ? (
              <>
                <Pause className="h-4 w-4" strokeWidth={1.5} />
                <span>일시정지</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" strokeWidth={1.5} />
                <span>{remaining === 0 ? "다시 시작" : "시작"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] min-w-[104px] items-center justify-center gap-2 border border-line bg-bg px-5 text-[16px] ui-label font-medium text-ink hover:border-ink transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            <span>초기화</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSoundEnabled((v) => !v)}
          aria-pressed={soundEnabled}
          className="inline-flex min-h-[48px] items-center gap-2 px-3 text-[14.5px] ui-label text-muted hover:text-ink transition-colors cursor-pointer"
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
