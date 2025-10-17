import { useState, useEffect, useRef } from "react";
import atySong from "@/assets/atysong.mp3";

const Page13 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Stop Page 10 music when reaching Page 13
    const page10Music = (window as any).page10Music;
    
    if (page10Music && sessionStorage.getItem('page10MusicPlaying') === 'true') {
      let currentVolume = page10Music.volume;
      
      const fadeOutInterval = setInterval(() => {
        if (currentVolume > 0.05) {
          currentVolume -= 0.05;
          page10Music.volume = currentVolume;
        } else {
          page10Music.pause();
          page10Music.volume = 0.5;
          clearInterval(fadeOutInterval);
          sessionStorage.removeItem('page10MusicPlaying');
        }
      }, 100);
    }

    // Sequence animations
    setFadeIn(true);
    setTimeout(() => setShowIntro(true), 1000);
    setTimeout(() => setShowRisk(true), 3000);
    setTimeout(() => setShowCards(true), 5500);
  }, []);

  const handleCardClick = (cardIndex: number) => {
    if (selectedCard !== null) return; // Prevent multiple selections
    
    setSelectedCard(cardIndex);
    
    // Flip animation
    setTimeout(() => setCardFlipped(true), 300);
    
    // Show reveal message
    setTimeout(() => setShowReveal(true), 1500);
    
    // Show final birthday message and play song
    setTimeout(() => {
      setShowFinalMessage(true);
      
      // Play final birthday song
      if (!audioRef.current) {
        audioRef.current = new Audio(atySong);
        audioRef.current.volume = 0.65;
        audioRef.current.loop = true;
      }
      audioRef.current.play();
    }, 4500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient - dramatic and celebratory */}
      <div 
        className={`fixed inset-0 transition-opacity duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #2d1b4e 25%, #1a0b2e 50%, #2d1b4e 75%, #0a0a0f 100%)'
        }}
      />

      {/* Multiple ambient glows for depth */}
      <div 
        className="fixed inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255, 107, 157, 0.25), transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(203, 166, 247, 0.2), transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 214, 165, 0.15), transparent 60%)
          `
        }}
      />

      {/* Animated particles - more celebratory */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              backgroundColor: i % 3 === 0 ? '#ff6b9d' : i % 3 === 1 ? '#ffd6a5' : '#cba6f7',
              opacity: showFinalMessage ? 0.7 : 0.4,
              animation: `float-particle ${Math.random() * 8 + 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)',
              transition: 'opacity 2s'
            }}
          />
        ))}
      </div>

      {/* Confetti burst when final message shows */}
      {showFinalMessage && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute"
              style={{
                left: `${50}%`,
                top: `${30}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: ['#ff6b9d', '#ffd6a5', '#cba6f7', '#ffcad4'][Math.floor(Math.random() * 4)],
                opacity: 0.9,
                animation: `confetti-burst ${Math.random() * 2 + 1}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%'
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full space-y-10">
          
          {/* Intro message */}
          <div className={`text-center transition-all duration-1500 ${showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="text-4xl md:text-6xl font-romantic italic mb-6"
              style={{
                color: '#ffd6a5',
                textShadow: '0 0 50px rgba(255, 214, 165, 0.8), 0 0 100px rgba(255, 214, 165, 0.4)'
              }}
            >
              This is the last page
            </h1>
            <p 
              className="text-xl md:text-2xl font-light"
              style={{
                color: '#f4f4f9',
                textShadow: '0 2px 15px rgba(0, 0, 0, 0.7)'
              }}
            >
              If you did make it this far, here is your birthday gift
            </p>
          </div>

          {/* Risk message */}
          <div className={`transition-all duration-1500 ${showRisk ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="backdrop-blur-md rounded-3xl p-8 md:p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.12), rgba(203, 166, 247, 0.1))',
                border: '2px solid rgba(255, 107, 157, 0.4)',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 107, 157, 0.2)'
              }}
            >
              <p 
                className="text-lg md:text-xl font-light leading-relaxed text-center"
                style={{
                  color: '#f4f4f9',
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.7)'
                }}
              >
                You have <span style={{ color: '#ff6b9d', fontWeight: '600', fontSize: '1.2em' }}>1 in 10 chance</span> to know who I am. Yes, I am risking my identity. This page will work only once.
                <br /><br />
                <span style={{ color: '#ffcad4', fontStyle: 'italic', fontSize: '1.1em' }}>
                  Tah pare mo real naa paliba card pacharu refresh kale bhi se encrypt hei jai thiba. after this first attempt no matter how many time you try se default hi dekhiba no use of refreshing this page nut the first time it will work satare 
                </span>
              </p>
            </div>
          </div>

          {/* Cards grid */}
          {!showReveal && (
            <div className={`transition-all duration-1500 ${showCards ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <p 
                className="text-center text-lg mb-6"
                style={{
                  color: '#cba6f7',
                  textShadow: '0 0 20px rgba(203, 166, 247, 0.5)'
                }}
              >
                Choose one card...
              </p>
              <div className="grid grid-cols-5 gap-3 md:gap-5 max-w-3xl mx-auto">
                {[...Array(10)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    disabled={selectedCard !== null}
                    className={`aspect-[2/3] rounded-2xl transition-all duration-700 ${
                      selectedCard === index 
                        ? 'scale-125 z-10' 
                        : selectedCard !== null 
                        ? 'opacity-20 scale-75' 
                        : 'hover:scale-110 hover:shadow-2xl'
                    }`}
                    style={{
                      background: selectedCard === index && cardFlipped
                        ? 'linear-gradient(135deg, #1a0b2e, #0a0a0f)'
                        : 'linear-gradient(135deg, #ff6b9d 0%, #ffd6a5 50%, #cba6f7 100%)',
                      boxShadow: selectedCard === index 
                        ? '0 0 80px rgba(255, 107, 157, 1), 0 0 120px rgba(255, 107, 157, 0.6)' 
                        : '0 6px 30px rgba(255, 107, 157, 0.5)',
                      border: selectedCard === index 
                        ? '3px solid rgba(255, 107, 157, 1)' 
                        : '2px solid rgba(255, 107, 157, 0.6)',
                      cursor: selectedCard !== null ? 'default' : 'pointer',
                      transformStyle: 'preserve-3d',
                      transform: selectedCard === index && cardFlipped 
                        ? 'rotateY(180deg)' 
                        : 'rotateY(0deg)',
                      position: 'relative'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {selectedCard === index && cardFlipped ? (
                        <span className="text-5xl md:text-6xl filter drop-shadow-lg">❓</span>
                      ) : (
                        <span 
                          className="text-3xl md:text-5xl font-bold"
                          style={{ 
                            color: '#0a0a0f',
                            textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                    {/* Card shine effect */}
                    {selectedCard !== index && (
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-30"
                        style={{
                          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                          backgroundSize: '200% 200%',
                          animation: 'shine 3s ease-in-out infinite'
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reveal message */}
          <div className={`transition-all duration-1500 ${showReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 absolute pointer-events-none'}`}>
            <div 
              className="backdrop-blur-md rounded-3xl p-8 md:p-12 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 214, 165, 0.15), rgba(203, 166, 247, 0.12))',
                border: '2px solid rgba(255, 214, 165, 0.4)',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 214, 165, 0.3)'
              }}
            >
              <p 
                className="text-2xl md:text-4xl font-light mb-4"
                style={{
                  color: '#ffd6a5',
                  textShadow: '0 2px 20px rgba(255, 214, 165, 0.8)'
                }}
              >
                No luck... ufff am alive 
              </p>
            </div>
          </div>

          {/* Final birthday message - GRAND FINALE */}
          <div className={`transition-all duration-2000 ${showFinalMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90 absolute pointer-events-none'}`}>
            <div className="text-center mt-16">
              {/* Decorative elements */}
              <div className="flex justify-center gap-8 mb-6 text-4xl md:text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                <span>🎂</span>
                <span>🎉</span>
                <span>✨</span>
              </div>
              
              <h2 
                className="text-5xl md:text-7xl font-romantic italic leading-tight"
                style={{
                  color: '#ff6b9d',
                  textShadow: '0 0 60px rgba(255, 107, 157, 1), 0 0 100px rgba(255, 107, 157, 0.6)',
                  animation: 'glow-pulse 2s ease-in-out infinite'
                }}
              >
                Lastly,<br />
                Happy Birthday Again<br />
                Prachi! 🎂✨
              </h2>

              {/* Decorative bottom elements */}
              <div className="flex justify-center gap-8 mt-6 text-4xl md:text-5xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
                <span>💕</span>
                <span>🎈</span>
                <span>🌟</span>
              </div>

              {/* Subtle final note */}
              <p 
                className="mt-12 text-lg md:text-xl font-light italic"
                style={{
                  color: '#cba6f7',
                  opacity: 0.8,
                  textShadow: '0 0 20px rgba(203, 166, 247, 0.5)',
                  animation: 'fade-in-slow 3s ease-in'
                }}
              >
                for me this was the plot twist this year i never thought i would do this. wishing you luck for your everything, am sorry if it was too much    (^^)つ Bye
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 60px rgba(255, 107, 157, 0.8), 0 0 100px rgba(255, 107, 157, 0.4);
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 80px rgba(255, 107, 157, 1), 0 0 140px rgba(255, 107, 157, 0.6);
            transform: scale(1.02);
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(20px) rotate(90deg);
          }
          50% {
            transform: translateY(-60px) translateX(-20px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(-40px) rotate(270deg);
          }
        }

        @keyframes confetti-burst {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(var(--x, 1) * ${Math.random() * 400 - 200}px),
              calc(var(--y, 1) * ${Math.random() * 400 + 200}px)
            ) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes fade-in-slow {
          0% {
            opacity: 0;
          }
          70% {
            opacity: 0;
          }
          100% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Page13;