import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingParticles } from "@/components/FloatingParticles";
import grandEscapeAudio from "@/assets/grand-escape-movie-theme.mp3";

const NextPage = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showHeart, setShowHeart] = useState(false);
  const [heartPulse, setHeartPulse] = useState(false);
  const [showCandleButton, setShowCandleButton] = useState(false);
  const [candlesLit, setCandlesLit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeToNext, setFadeToNext] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fullText = "May this day be as beautiful as your smile…";

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowBirthday(true), 800);
  }, []);

  useEffect(() => {
    if (showBirthday) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setTimeout(() => setShowHeart(true), 500);
          setTimeout(() => setShowCandleButton(true), 1000);
        }
      }, 60);
      return () => clearInterval(timer);
    }
  }, [showBirthday]);

  const handleHeartClick = () => {
    setHeartPulse(true);
    setTimeout(() => setHeartPulse(false), 600);
  };

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(grandEscapeAudio);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }

    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      sessionStorage.setItem('backgroundMusicPlaying', 'true');
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleLightCandles = () => {
    setCandlesLit(true);
    
    setTimeout(() => setShowConfetti(true), 800);
    setTimeout(() => setShowConfetti(false), 3000);
    setTimeout(() => {
      setFadeToNext(true);
      setTimeout(() => navigate("/page3"), 1500);
    }, 5000);
  };


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fade to next page overlay */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-1500 pointer-events-none ${
          fadeToNext ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Background gradient */}
      <div 
        className={`fixed inset-0 transition-opacity duration-2000 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, #050509, #1b1b2f)'
        }}
      />

      <FloatingParticles />

      {/* Main content */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6">
        
        {/* Birthday message */}
        <div className={`text-center transition-all duration-1500 ${showBirthday ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 
            className="text-5xl md:text-7xl font-romantic italic mb-6"
            style={{
              color: '#f4f4f9',
              textShadow: '0 0 40px rgba(255, 213, 128, 0.6), 0 0 60px rgba(203, 166, 247, 0.4)'
            }}
          >
            Happy Birthday, Prachi 🎂
          </h1>

          {/* Typing text */}
          <p 
            className="text-xl md:text-2xl font-light mb-8 min-h-[2em]"
            style={{
              color: '#f4f4f9',
              opacity: 0.9
            }}
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Play Music Button */}
          <div className="mb-8">
            <button
              onClick={handlePlayMusic}
              className="px-8 py-4 text-lg font-light tracking-wider border-2 rounded-full transition-all duration-700 hover:scale-105"
              style={{
                color: '#f4f4f9',
                borderColor: '#cba6f7',
                backgroundColor: 'rgba(203, 166, 247, 0.15)',
                boxShadow: '0 0 25px rgba(203, 166, 247, 0.4)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            >
              {musicPlaying ? '⏸ Pause Music' : '▶ Play Music'}
            </button>
          </div>

          {/* Interactive heart */}
          <div className={`transition-all duration-700 ${showHeart ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <button
              onClick={handleHeartClick}
              className={`text-6xl mb-8 transition-all duration-300 ${heartPulse ? 'scale-150' : 'scale-100'} hover:scale-110`}
              style={{
                filter: heartPulse ? 'drop-shadow(0 0 30px rgba(255, 202, 212, 0.8))' : 'drop-shadow(0 0 15px rgba(255, 202, 212, 0.5))'
              }}
            >
              ❤️
            </button>
          </div>

          {/* Candle button */}
          <div className={`transition-all duration-1000 ${showCandleButton && !candlesLit ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={handleLightCandles}
              className="px-8 py-4 text-lg font-light tracking-wider border-2 rounded-full transition-all duration-700 hover:scale-105"
              style={{
                color: '#f4f4f9',
                borderColor: '#ffd580',
                backgroundColor: 'rgba(255, 213, 128, 0.15)',
                boxShadow: '0 0 25px rgba(255, 213, 128, 0.3)'
              }}
            >
              Touch to Light the Candles ✨
            </button>
          </div>

          {/* Candles */}
          <div className={`flex gap-6 justify-center mt-12 transition-all duration-1500 ${candlesLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center" style={{ animationDelay: `${i * 200}ms` }}>
                {/* Flame */}
                <div 
                  className="w-4 h-6 mb-1 rounded-full animate-pulse"
                  style={{
                    background: 'linear-gradient(to top, #ffd580, #ffcad4)',
                    boxShadow: '0 0 20px rgba(255, 213, 128, 0.8)',
                    animation: `pulse 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
                {/* Candle */}
                <div 
                  className="w-3 h-16 rounded-sm"
                  style={{
                    background: 'linear-gradient(to bottom, #f4f4f9, #cba6f7)',
                    boxShadow: '0 0 10px rgba(203, 166, 247, 0.3)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Confetti particles */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '100%',
                    backgroundColor: ['#ffd580', '#ffcad4', '#cba6f7'][Math.floor(Math.random() * 3)],
                    animation: `float-up ${2 + Math.random() * 2}s ease-out`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    opacity: 0.8
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextPage;
