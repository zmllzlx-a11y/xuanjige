"use client";

import { useState, useEffect, useRef } from "react";

const meditationStages = [
  { time: 0, label: "准备", instruction: "找一个安静的地方，盘腿坐好，双手结禅定印。" },
  { time: 1, label: "调息", instruction: "深呼吸三次。吸气——感受气息充满全身。呼气——放下所有杂念。" },
  { time: 2, label: "入定", instruction: "将注意力集中在呼吸上。鼻尖的触感，气息的进出……" },
  { time: 3, label: "守静", instruction: "如果有念头飘过，不要追逐它。像看云一样，任它来去。" },
  { time: 4, label: "觉照", instruction: "觉知你的身体，觉知你的呼吸，觉知当下的每一刻。" },
  { time: 5, label: "圆满", instruction: "慢慢睁开眼睛。活动一下手脚。将这份宁静带入生活中。" },
];

const timerOptions = [
  { label: "5分钟", value: 300 },
  { label: "10分钟", value: 600 },
  { label: "15分钟", value: 900 },
  { label: "30分钟", value: 1800 },
];

export default function MeditationPage() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedTime, setSelectedTime] = useState(600);
  const [stage, setStage] = useState(0);
  const [bellCount, setBellCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processedStages = useRef<Set<number>>(new Set());

  // 进度百分比
  const progress = isActive ? ((selectedTime - timeLeft) / selectedTime) * 100 : 0;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsActive(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);

  // 阶段提示（每20%进度切一个阶段）
  useEffect(() => {
    const elapsed = selectedTime - timeLeft;
    const ratio = elapsed / selectedTime;
    const newStage = Math.min(Math.floor(ratio * meditationStages.length), meditationStages.length - 1);
    setStage(newStage);

    if (!processedStages.current.has(newStage)) {
      processedStages.current.add(newStage);
    }
  }, [timeLeft, selectedTime]);

  const start = (duration: number) => {
    setSelectedTime(duration);
    setTimeLeft(duration);
    setStage(0);
    setBellCount(0);
    processedStages.current.clear();
    setIsActive(true);

    // 初始磬声
    playBell(2);
  };

  const stop = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setTimeLeft(selectedTime);
    setStage(0);
    setBellCount(0);
    processedStages.current.clear();
  };

  const playBell = (count = 1) => {
    setBellCount((c) => c + count);
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentStage = meditationStages[stage];
  const isComplete = isActive && timeLeft === 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🧘</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          静心禅坐
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>静坐常思己过，闲谈莫论人非</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 禅坐区 */}
      <div className="card-featured p-8 text-center animate-float-up" style={{ animationDelay: "0.1s" }}>
        {/* 禅坐图标 */}
        <div
          className="w-40 h-40 mx-auto rounded-full flex items-center justify-center transition-all duration-1000"
          style={{
            border: `2px solid rgba(201,160,94,${isActive ? 0.3 : 0.1})`,
            background: isActive
              ? `conic-gradient(from 0deg, rgba(201,160,94,0.15) ${progress}%, transparent ${progress}%)`
              : "rgba(201,160,94,0.03)",
          }}
        >
          <div className="text-center">
            <span
              className={`text-5xl block transition-all duration-500 ${isActive ? "animate-breathe" : ""}`}
              style={{ filter: isActive ? "drop-shadow(0 0 15px rgba(201,160,94,0.4))" : "none" }}
            >
              🧘
            </span>
            {(isActive || isComplete) && (
              <p className="text-3xl font-display gold-text mt-2 tracking-widest">{formatTime(timeLeft)}</p>
            )}
          </div>
        </div>

        {/* 阶段提示 */}
        {currentStage && (
          <div className="mt-6 transition-all duration-500">
            <p
              className="text-xs mb-1"
              style={{ color: isActive ? "rgba(201,160,94,0.6)" : "rgba(212,196,160,0.3)" }}
            >
              {currentStage.label}
            </p>
            <p
              className="text-sm leading-relaxed max-w-sm mx-auto"
              style={{ color: isActive ? "rgba(212,196,160,0.7)" : "rgba(212,196,160,0.3)" }}
            >
              {currentStage.instruction}
            </p>
          </div>
        )}

        {/* 完成动画 */}
        {isComplete && (
          <div className="mt-6 animate-float-up">
            <div className="divider-gold mx-auto w-16 mb-4" />
            <p className="text-lg font-display gold-text mb-2">🙏 禅坐圆满</p>
            <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
              愿这份宁静与您常伴
            </p>
            <button
              onClick={reset}
              className="mt-4 px-6 py-2 rounded-xl text-sm"
              style={{
                border: "1px solid rgba(201,160,94,0.3)",
                color: "#c9a05e",
              }}
            >
              🔄 重新开始
            </button>
          </div>
        )}
      </div>

      {/* 控制区 */}
      {!isActive && !isComplete && (
        <>
          {/* 时长选择 */}
          <div className="card-glass mt-5 p-5 animate-float-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-xs text-gold font-display mb-3 text-center">⏱️ 选择时长</p>
            <div className="flex gap-3 justify-center">
              {timerOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTimeLeft(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    selectedTime === opt.value ? "ring-2 ring-gold/40" : ""
                  }`}
                  style={{
                    border: `1px solid ${selectedTime === opt.value ? "rgba(201,160,94,0.4)" : "rgba(201,160,94,0.1)"}`,
                    background: selectedTime === opt.value ? "rgba(201,160,94,0.1)" : "transparent",
                    color: selectedTime === opt.value ? "#c9a05e" : "rgba(212,196,160,0.5)",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 开始按钮 */}
          <div className="text-center mt-6 animate-float-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => start(selectedTime)}
              className="px-12 py-4 rounded-xl text-base transition-all"
              style={{
                background: "rgba(201,160,94,0.12)",
                border: "1px solid rgba(201,160,94,0.3)",
                color: "#c9a05e",
              }}
            >
              🧘 开始禅坐
            </button>
          </div>

          {/* 磬声说明 */}
          <div className="card-glass mt-6 p-5 animate-float-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-xs text-gold font-display mb-2">🔔 禅坐指引</p>
            <ul className="space-y-1 text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
              <li>• 开始时磬声三响，助你收心</li>
              <li>• 过程中每阶段自动切换引导语音</li>
              <li>• 结束时磬声一响，慢慢出定</li>
              <li>• 双盘、单盘或正坐皆可，放松最重要</li>
            </ul>
          </div>
        </>
      )}

      {/* 暂停/结束 */}
      {isActive && !isComplete && (
        <div className="text-center mt-6 animate-float-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={stop}
            className="px-8 py-3 rounded-xl text-sm transition-all"
            style={{
              border: "1px solid rgba(201,160,94,0.2)",
              color: "rgba(212,196,160,0.5)",
            }}
          >
            ⏸️ 暂停
          </button>
          <button
            onClick={reset}
            className="ml-3 px-8 py-3 rounded-xl text-sm transition-all"
            style={{
              border: "1px solid rgba(201,160,94,0.1)",
              color: "rgba(212,196,160,0.3)",
            }}
          >
            ✖ 结束
          </button>
        </div>
      )}

      <p className="text-center text-xs mt-10" style={{ color: "rgba(212,196,160,0.2)" }}>
        行亦禅，坐亦禅，语默动静体安然
      </p>
    </div>
  );
}
