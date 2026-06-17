"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 用户点击后才显示播放器（规避浏览器自动播放限制）
  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  // 首次交互后尝试静音自动播放背景音乐
  useEffect(() => {
    const tryAutoPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => {
          setPlaying(true);
        }).catch(() => {
          setVisible(true);
        });
      }
    };
    // 页面加载后等待一下再尝试
    const timer = setTimeout(tryAutoPlay, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {visible && (
        <button
          onClick={toggle}
          title={playing ? "暂停背景音乐" : "播放背景音乐"}
          className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full border border-gold/30 bg-xuan-card/90 px-3 py-2 text-xs text-gold backdrop-blur-md hover:border-gold/60 transition-all duration-300 shadow-lg shadow-black/30"
        >
          <span className={`text-base leading-none ${playing ? "animate-pulse" : ""}`}>
            {playing ? "🎵" : "🔇"}
          </span>
          <span className="hidden sm:inline text-paper-dark/80">
            {playing ? "背景音乐" : "音乐已暂停"}
          </span>
        </button>
      )}
    </>
  );
}
