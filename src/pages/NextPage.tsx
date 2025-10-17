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

  const fullText =
    "i think trying to take a cool exit last time i missed out on a lot of things a lot of misunderstandings i think";

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
      (window as any).backgroundMusic = audioRef.current;
    }

    if (musicPlaying) {
      audioRef.current.pause();
      sessionStorage.removeItem("backgroundMusicPlaying");
    } else {
      audioRef.current.play();
      sessionStorage.setItem("backgroundMusicPlaying", "true");
      if (!musicButtonClicked) {
        setMusicButtonClicked(true);
        if (candlesLit) {
          setTimeout(() => setShowBlowInstruction(true), 1000);
        }
      }
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleLightCandles = () => {
    setCandlesLit(true);
    if (musicButtonClicked) {
      setTimeout(() => setShowBlowInstruction(true), 1000);
    }
  };

  const handleCandleBlow = (candleIndex: number) => {
    if (!blownCandles.includes(candleIndex)) {
      setBlownCandles([...blownCandles, candleIndex]);
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
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-[1500ms] pointer-events-none ${
          fadeToNext ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`fixed inset-0 transition-opacity duration-[2000ms] ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(to bottom, #050509, #1b1b2f)",
        }}
      />

      <FloatingParticles />

      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-[1500ms] ${
            showBirthday ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-romantic italic mb-4 sm:mb-6 break-words leading-snug"
            style={{
              color: "#f4f4f9",
              textShadow:
                "0 0 40px rgba(255, 213, 128, 0.6), 0 0 60px rgba(203, 166, 247, 0.4)",
            }}
          >
            Happy Birthday, Prachi 🎂
          </h1>

          <p
            className="text-base sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 min-h-[2em] px-2 sm:px-0 leading-relaxed break-words"
            style={{
              color: "#f4f4f9",
              opacity: 0.9,
            }}
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          <div
            className={`mb-6 sm:mb-8 transition-all duration-1000 ${
              showBlowInstruction ? "opacity-0 pointer-events-none h-0" : "opacity-100"
            }`}
          >
            <button
              onClick={handlePlayMusic}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-light tracking-wider border-2 rounded-full transition-all duration-700 hover:scale-105"
              style={{
                color: "#f4f4f9",
                borderColor: "#cba6f7",
                backgroundColor: "rgba(203, 166, 247, 0.15)",
                boxShadow: "0 0 25px rgba(203, 166, 247, 0.4)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              {musicPlaying ? "⏸ Pause Music" : "▶ Play Music"}
            </button>
          </div>

          <div
            className={`transition-all duration-700 ${
              showHeart ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <div
              onClick={handleHeartClick}
              className={`text-5xl sm:text-6xl mb-6 sm:mb-8 transition-all duration-300 ${
                heartPulse ? "scale-150" : "scale-100"
              }`}
              style={{
                filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))",
                cursor: "default",
              }}
            >
              🙏
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${
              showCandleButton && !candlesLit && !showBlowInstruction
                ? "opacity-100"
                : "opacity-0 pointer-events-none h-0"
            }`}
          >
            <button
              onClick={handleLightCandles}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-light tracking-wider border-2 rounded-full transition-all duration-700 hover:scale-105"
              style={{
                color: "#f4f4f9",
                borderColor: "#ffd580",
                backgroundColor: "rgba(255, 213, 128, 0.15)",
                boxShadow: "0 0 25px rgba(255, 213, 128, 0.3)",
              }}
            >
              Touch to Light the Candles ✨
            </button>
          </div>

          <div
            className={`transition-all duration-1000 mb-6 sm:mb-8 ${
              showBlowInstruction && blownCandles.length < 5
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none absolute"
            }`}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl font-light italic"
              style={{
                color: "#ffd580",
                textShadow: "0 0 20px rgba(255, 213, 128, 0.5)",
              }}
            >
              Now tap on each candle to blow them out! 🎂✨
            </p>
          </div>

          {/* Cake Section */}
          <div className="relative flex flex-col items-center justify-center mt-6 sm:mt-12 w-full">
            <div
              className={`relative flex flex-col items-center transition-all duration-[1500ms] ${
                candlesLit ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ width: "100%", maxWidth: "22rem" }}
            >
              {/* Candles */}
              <div className="flex gap-4 sm:gap-6 justify-center mb-2 z-10">
                {[1, 2, 3, 4, 5].map((i) => {
                  const isBlown = blownCandles.includes(i);
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center transition-transform ${
                        showBlowInstruction && !isBlown
                          ? "cursor-pointer hover:scale-110"
                          : ""
                      }`}
                      onClick={() => showBlowInstruction && handleCandleBlow(i)}
                    >
                      <div
                        className={`w-3 sm:w-4 h-5 sm:h-6 mb-1 rounded-full transition-all duration-500 ${
                          isBlown ? "opacity-0 scale-0" : "animate-pulse"
                        }`}
                        style={{
                          background:
                            "linear-gradient(to top, #ffd580, #ffcad4)",
                          boxShadow: "0 0 20px rgba(255, 213, 128, 0.8)",
                        }}
                      />
                      {isBlown && (
                        <div
                          className="w-1 sm:w-2 h-6 sm:h-8 mb-1 opacity-60 animate-pulse"
                          style={{
                            background:
                              "linear-gradient(to top, transparent, rgba(200, 200, 200, 0.5))",
                          }}
                        />
                      )}
                      <div
                        className="w-2 sm:w-3 h-16 sm:h-20 rounded-sm"
                        style={{
                          background:
                            "linear-gradient(to bottom, #f4f4f9, #cba6f7)",
                          boxShadow: "0 0 10px rgba(203, 166, 247, 0.3)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Cake layers remain same but wrapped in responsive width */}
              <div
                className="relative w-[90%] sm:w-72 h-16 rounded-t-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #ffcad4 0%, #ffb3c1 50%, #ff9ebb 100%)",
                }}
              />
              <div
                className="relative w-[95%] sm:w-80 h-24"
                style={{
                  background:
                    "linear-gradient(135deg, #ffd580 0%, #ffcc70 50%, #ffc060 100%)",
                }}
              />
              <div
                className="relative w-[100%] sm:w-96 h-8 rounded-b-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%)",
                }}
              />
              <div
                className="relative w-[90%] sm:w-[28rem] h-3 mt-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #e5e5e5 0%, #f8f8f8 50%, #e5e5e5 100%)",
                }}
              />
            </div>
          </div>

          <div
            className="fixed inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-40"
            style={{
              opacity: (blownCandles.length / 5) * 0.95,
            }}
          />

          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "100%",
                    backgroundColor: [
                      "#ffd580",
                      "#ffcad4",
                      "#cba6f7",
                    ][Math.floor(Math.random() * 3)],
                    animation: `float-up ${
                      2 + Math.random() * 2
                    }s ease-out`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    opacity: 0.8,
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
