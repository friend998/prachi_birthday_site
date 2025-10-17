import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import chatImage from "@/assets/HeWasInLowerBatch.jpg";
import lyricsAudio from "@/assets/lyrics-theme.mp3";

const Page8 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the background music from Page 2
    const backgroundMusic = (window as any).backgroundMusic;
    
    // Fade out and stop background music from previous pages
    if (backgroundMusic && sessionStorage.getItem('backgroundMusicPlaying') === 'true') {
      let currentVolume = backgroundMusic.volume;
      
      const fadeOutInterval = setInterval(() => {
        if (currentVolume > 0.05) {
          currentVolume -= 0.05;
          backgroundMusic.volume = currentVolume;
        } else {
          backgroundMusic.pause();
          backgroundMusic.volume = 0.45;
          clearInterval(fadeOutInterval);
          sessionStorage.removeItem('backgroundMusicPlaying');
        }
      }, 100);
    }

    setFadeIn(true);
    setTimeout(() => setShowImage(true), 800);
    setTimeout(() => setShowMessage(true), 2000);
    setTimeout(() => setShowMusicButton(true), 3500);
  }, []);

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(lyricsAudio);
      audioRef.current.loop = true;
    }

    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      setTimeout(() => setShowNextButton(true), 10000);
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    navigate("/page9");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className={`fixed inset-0 transition-opacity duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1520 50%, #0a0a0f 100%)'
        }}
      />

      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(203, 166, 247, 0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 214, 165, 0.1), transparent 50%)'
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full space-y-8">
          
          <div className={`flex justify-center transition-all duration-1500 ${showImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                maxWidth: '320px',
                boxShadow: '0 20px 60px rgba(203, 166, 247, 0.3), 0 0 40px rgba(255, 214, 165, 0.2)'
              }}
            >
              <img 
                src={chatImage} 
                alt="Chat conversation" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className={`transition-all duration-1500 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="backdrop-blur-sm rounded-3xl p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(203, 166, 247, 0.08), rgba(255, 214, 165, 0.05))',
                border: '1px solid rgba(203, 166, 247, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <p 
                className="text-lg md:text-xl font-light leading-relaxed text-center"
                style={{
                  color: '#f4f4f9',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                Now imagine a guy who throughout his entire 16-year-old spawn time never had any friends, had bare minimum interaction with people—only family members. In fact, barely went to school, never had any interests... gets interested in some girl the first girl and starts doing things. Things start working out for him just because......
                <br /><br />
                <span style={{ color: '#ffd6a5', fontWeight: '500' }}>
                  I hope you did read the last 3 pages so that you can understand.
                </span>
              </p>
            </div>
          </div>

          <div className={`flex justify-center transition-all duration-1000 ${showMusicButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={handlePlayMusic}
              className="px-10 py-5 rounded-full transition-all duration-700 hover:scale-105 relative overflow-hidden group"
              style={{
                background: musicPlaying 
                  ? 'linear-gradient(135deg, rgba(147, 112, 219, 0.3), rgba(203, 166, 247, 0.3))'
                  : 'linear-gradient(135deg, rgba(203, 166, 247, 0.2), rgba(255, 214, 165, 0.2))',
                border: '2px solid',
                borderColor: musicPlaying ? '#9370db' : '#cba6f7',
                boxShadow: musicPlaying 
                  ? '0 0 40px rgba(147, 112, 219, 0.6), 0 0 80px rgba(147, 112, 219, 0.3)'
                  : '0 0 30px rgba(203, 166, 247, 0.5)',
                animation: 'breathe 2s ease-in-out infinite'
              }}
            >
              <span 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                }}
              />
              <span className="relative z-10 text-lg font-light" style={{ color: '#f4f4f9' }}>
                {musicPlaying ? '⏸ Pause Music' : '▶ Play Music'}
              </span>
            </button>
          </div>

          <div className={`flex justify-center transition-all duration-1000 ${showMusicButton ? 'opacity-100' : 'opacity-0'}`}>
            <p 
              className="text-base md:text-lg font-light italic"
              style={{ 
                color: '#cba6f7',
                textShadow: '0 0 20px rgba(203, 166, 247, 0.4)'
              }}
            >
              i dont know what to answer on that? to find someone at my college ,how? i cant randomly start liking someone    I hope you get the lyrics(maybe you might find it a bit cringe).(refer to each line of the insta chat on top and each line of this song right here, thats it)
            </p>
          </div>

          <div className={`flex justify-center transition-all duration-1000 ${showNextButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <button
              onClick={handleNext}
              className="w-20 h-20 rounded-full transition-all duration-700 hover:scale-110 relative group flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.3)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <span className="text-3xl relative z-10" style={{ color: '#0a0a0f', fontWeight: 'bold' }}>→</span>
              <span 
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: '#ffd700' }}
              />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% {
            box-shadow: 0 0 30px rgba(203, 166, 247, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 50px rgba(203, 166, 247, 0.8), 0 0 80px rgba(255, 214, 165, 0.4);
            transform: scale(1.02);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
};

export default Page8;