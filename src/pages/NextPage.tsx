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
  const [musicButtonClicked, setMusicButtonClicked] = useState(false);
  const [blownCandles, setBlownCandles] = useState<number[]>([]);
  const [showBlowInstruction, setShowBlowInstruction] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fullText = "i think trying to take a cool exit last time i missed out on a lot of things a lot of misunderstandings i think";

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
    // Store the audio instance globally
    (window as any).backgroundMusic = audioRef.current;
  }

  if (musicPlaying) {
    audioRef.current.pause();
    sessionStorage.removeItem('backgroundMusicPlaying');
  } else {
    audioRef.current.play();
    sessionStorage.setItem('backgroundMusicPlaying', 'true');
    
    // Mark music button as clicked
    if (!musicButtonClicked) {
      setMusicButtonClicked(true);
      // Check if both buttons are clicked
      if (candlesLit) {
        setTimeout(() => setShowBlowInstruction(true), 1000);
      }
    }
  }
  setMusicPlaying(!musicPlaying);
};

  const handleLightCandles = () => {
  setCandlesLit(true);
  
  // Check if both buttons are clicked
  if (musicButtonClicked) {
    setTimeout(() => setShowBlowInstruction(true), 1000);
  }
};
const handleCandleBlow = (candleIndex: number) => {
  if (!blownCandles.includes(candleIndex)) {
    setBlownCandles([...blownCandles, candleIndex]);
    
    // Check if all candles are blown out
    if (blownCandles.length + 1 === 5) {
      setTimeout(() => setShowConfetti(true), 300);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => {
        setFadeToNext(true);
        setTimeout(() => navigate("/page3"), 1500);
      }, 4000);
    }
  }
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
<div className={`mb-8 transition-all duration-1000 ${showBlowInstruction ? 'opacity-0 pointer-events-none h-0' : 'opacity-100'}`}>
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

          {/* Interactive namaste - decoration only */}
      <div className={`transition-all duration-700 ${showHeart ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div
          className={`text-6xl mb-8 transition-all duration-300 ${heartPulse ? 'scale-150' : 'scale-100'}`}
          style={{
            filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))',
            cursor: 'default'
          }}
        >
          🙏
        </div>
      </div>
          {/* Candle button */}
          <div className={`transition-all duration-1000 ${showCandleButton && !candlesLit && !showBlowInstruction ? 'opacity-100' : 'opacity-0 pointer-events-none h-0'}`}>
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
        {/* Blow out candles instruction */}
        <div className={`transition-all duration-1000 mb-8 ${showBlowInstruction && blownCandles.length < 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
          <p 
            className="text-xl md:text-2xl font-light italic"
            style={{ 
              color: '#ffd580',
              textShadow: '0 0 20px rgba(255, 213, 128, 0.5)'
            }}
          >
            Now tap on each candle to blow them out! 🎂✨
          </p>
        </div>
          {/* Candles + Cake Section */}
<div className="relative flex flex-col items-center justify-center mt-12">
  {/* Beautiful CSS Cake */}
  <div className={`relative flex flex-col items-center transition-all duration-1500 ${candlesLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
    {/* Candles positioned on top of cake */}
    <div className="flex gap-6 justify-center mb-2 z-10">
      {[1, 2, 3, 4, 5].map((i) => {
        const isBlown = blownCandles.includes(i);
        return (
          <div 
            key={i} 
            className={`flex flex-col items-center transition-transform ${showBlowInstruction && !isBlown ? 'cursor-pointer hover:scale-110' : ''}`}
            style={{ animationDelay: `${i * 200}ms` }}
            onClick={() => showBlowInstruction && handleCandleBlow(i)}
          >
            {/* Flame */}
            <div 
              className={`w-4 h-6 mb-1 rounded-full transition-all duration-500 ${isBlown ? 'opacity-0 scale-0' : 'animate-pulse'}`}
              style={{
                background: 'linear-gradient(to top, #ffd580, #ffcad4)',
                boxShadow: '0 0 20px rgba(255, 213, 128, 0.8)',
                animation: isBlown ? 'none' : `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
            {/* Smoke after blowing */}
            {isBlown && (
              <div 
                className="w-2 h-8 mb-1 opacity-60 animate-pulse"
                style={{
                  background: 'linear-gradient(to top, transparent, rgba(200, 200, 200, 0.5))',
                }}
              />
            )}
            {/* Candle */}
            <div 
              className="w-3 h-20 rounded-sm"
              style={{
                background: 'linear-gradient(to bottom, #f4f4f9, #cba6f7)',
                boxShadow: '0 0 10px rgba(203, 166, 247, 0.3)'
              }}
            />
          </div>
        );
      })}
    </div>

    {/* Top Layer - Pink Frosting */}
    <div 
      className="relative w-72 h-16 rounded-t-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffcad4 0%, #ffb3c1 50%, #ff9ebb 100%)',
        boxShadow: '0 -5px 20px rgba(255, 202, 212, 0.5), inset 0 -3px 10px rgba(255, 150, 180, 0.3)'
      }}
    >
      {/* Frosting drips */}
      {[20, 45, 70, 95].map((left, i) => (
        <div
          key={`drip-${i}`}
          className="absolute top-full w-8 h-4 rounded-b-full"
          style={{
            left: `${left}%`,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, #ffcad4, #ffb3c1)',
          }}
        />
      ))}
      {/* Decorative dots */}
      {[15, 30, 50, 70, 85].map((left, i) => (
        <div
          key={`dot-${i}`}
          className="absolute top-1/2 w-3 h-3 rounded-full"
          style={{
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
          }}
        />
      ))}
    </div>

    {/* Middle Layer - Cake */}
    <div 
      className="relative w-80 h-24"
      style={{
        background: 'linear-gradient(135deg, #ffd580 0%, #ffcc70 50%, #ffc060 100%)',
        boxShadow: '0 5px 30px rgba(255, 213, 128, 0.6), inset 0 2px 10px rgba(255, 220, 150, 0.4)'
      }}
    >
      {/* Cake texture lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255, 200, 100, 0.3) 8px, rgba(255, 200, 100, 0.3) 10px)',
        }}
      />
      {/* Side decorations */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={`deco-${i}`}
          className="absolute w-8 h-8 rounded-full"
          style={{
            left: `${i * 14}%`,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(circle, #cba6f7, #b490e8)',
            boxShadow: '0 0 10px rgba(203, 166, 247, 0.5)'
          }}
        />
      ))}
    </div>

    {/* Bottom Layer - Base */}
    <div 
      className="relative w-96 h-8 rounded-b-2xl"
      style={{
        background: 'linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%)',
        boxShadow: '0 10px 40px rgba(139, 69, 19, 0.5), inset 0 -2px 8px rgba(100, 50, 10, 0.4)'
      }}
    >
      {/* Bottom trim */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2 rounded-b-2xl"
        style={{
          background: 'linear-gradient(90deg, #654321, #7d5a3d, #654321)',
        }}
      />
    </div>

    {/* Plate/Stand - wider to center the cake */}
    <div 
      className="relative w-[28rem] h-3 mt-1 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #e5e5e5 0%, #f8f8f8 50%, #e5e5e5 100%)',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.5)'
      }}
    />
  </div>
</div>

  {/* 🌒 Darkness Overlay - covers entire screen */}
  <div
    className="fixed inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-40"
    style={{
      opacity: (blownCandles.length / 5) * 0.95 // dims screen as candles blow out, max 95% darkness
    }}
  />


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
