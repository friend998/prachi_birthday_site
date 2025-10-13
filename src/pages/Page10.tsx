import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import page10Audio from "@/assets/Page10Audio.mp3";

const Page10 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowMessage(true), 1000);
    setTimeout(() => setShowMusicButton(true), 2000);
    setTimeout(() => setShowButton(true), 3500);
  }, []);

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      // Replace with your actual audio file path
      audioRef.current = new Audio(page10Audio);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      // Store globally for other pages to access
      (window as any).page10Music = audioRef.current;
    }

    if (musicPlaying) {
      audioRef.current.pause();
      sessionStorage.removeItem('page10MusicPlaying');
    } else {
      audioRef.current.play();
      sessionStorage.setItem('page10MusicPlaying', 'true');
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleNext = () => {
    navigate("/page11");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div 
        className={`fixed inset-0 transition-opacity duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1520 50%, #0a0a0f 100%)'
        }}
      />

      {/* Ambient glow effects */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(203, 166, 247, 0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 214, 165, 0.1), transparent 50%)'
        }}
      />
    
    {/* Play Music Button */}
        <div className={`flex justify-center transition-all duration-1000 ${showMusicButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button
            onClick={handlePlayMusic}
            className="px-10 py-5 rounded-full transition-all duration-700 hover:scale-105 relative overflow-hidden group"
            style={{
            marginTop: '4em',
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full space-y-8">
          
          {/* Message text */}
          <div className={`transition-all duration-1500 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="backdrop-blur-sm rounded-3xl p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 214, 165, 0.08), rgba(203, 166, 247, 0.05))',
                border: '1px solid rgba(255, 214, 165, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <p 
                className="text-lg md:text-xl font-light leading-relaxed"
                style={{
                  color: '#f4f4f9',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                play music button 👆...but still I will do what I say. I will create a formula that takes me to your level—the level of a princess. I know I will have to work my ass off... you have my word there. Maybe not today, maybe not tomorrow, and maybe not the next month, but one day...
                <br /><br />
                You're just so perfect. I feel I will have to be a multi-millionaire(why i needed time). I'm sorry I'm not 6 feet tall—I'm around 180 cm, 5'10"-11". I am pretty mid now that I think about it, even looks-wise. I will create a formula and level up in each aspect(thats the reason i said 2030). It would be fun having a purpose —....... it's fun, better than lazying around... 
                <br /><br />
                <span 
                  className="italic"
                  style={{ 
                    color: '#ffcad4',
                    opacity: 0.9
                  }}
                >
                  (Still, I wouldn't recommend waiting for your own good infact you shouldnt wait for anyone work hard and do whatever comes to your heart because life is very uncertain. I might as well die within the time period and you will never know who I was, and the texts from this account might stop at once.)
                </span>
              </p>
            </div>
          </div>

          
          {/* Next button */}
          <div className={`flex justify-center transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
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
      `}</style>
    </div>
  );
};

export default Page10;