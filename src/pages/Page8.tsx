import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import chatImage from "@/assets/HeWasInLowerBatch.jpg";
import lyricsAudio from "@/assets/lyrics-theme.mp3";

const Page8 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fade out and stop background music from previous pages
    const fadeOutMusic = () => {
      const fadeAudio = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.1) {
          audioRef.current.volume -= 0.1;
        } else {
          clearInterval(fadeAudio);
        }
      }, 150);
    };

    // Check if background music is playing
    if (sessionStorage.getItem('backgroundMusicPlaying') === 'true') {
      fadeOutMusic();
      sessionStorage.removeItem('backgroundMusicPlaying');
    }

    setFadeIn(true);
    setTimeout(() => setShowButton(true), 1000);
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
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleNext = () => {
    // Pause music before navigating
    if (audioRef.current) {
      audioRef.current.pause();
    }
    navigate("/page9");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Main content */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 py-12">
        <div className={`max-w-2xl w-full flex flex-col items-center transition-all duration-1500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Chat screenshot */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={chatImage} 
              alt="Chat conversation" 
              className="w-full h-auto"
            />
          </div>

          {/* Play Music Button */}
          <button
            onClick={handlePlayMusic}
            className="mb-4 px-8 py-4 rounded-full transition-all duration-700 hover:scale-105"
            style={{
              backgroundColor: musicPlaying ? '#9370db' : '#cba6f7',
              boxShadow: '0 0 30px rgba(203, 166, 247, 0.6)',
              animation: 'breathe 2s ease-in-out infinite'
            }}
          >
            <span className="text-lg font-light text-white">
              {musicPlaying ? '⏸ Pause Music' : '▶ Play Music'}
            </span>
          </button>

          {/* Caption */}
          <p 
            className="text-lg font-light italic mb-12"
            style={{ color: '#cba6f7' }}
          >
            I hope you get the lyrics.
          </p>

          {/* Next button */}
          <div className={`transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleNext}
              className="w-16 h-16 rounded-full transition-all duration-700 hover:scale-110"
              style={{
                backgroundColor: '#ffd700',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <span className="text-2xl" style={{ color: '#000' }}>→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% {
            box-shadow: 0 0 30px rgba(203, 166, 247, 0.6);
          }
          50% {
            box-shadow: 0 0 50px rgba(203, 166, 247, 0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
};

export default Page8;
