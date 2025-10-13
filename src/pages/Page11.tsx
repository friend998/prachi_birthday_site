import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page11 = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      if (scrolled > 80) {
        setShowButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNext = () => {
    navigate("/page12");
  };

  const words = [
    { text: "creepy", delay: 0 },
    { text: "awkward", delay: 0.5 },
    { text: "under-confident", delay: 1 },
    { text: "weird", delay: 1.5 },
    { text: "joke", delay: 2 },
    { text: "desperate", delay: 2.5 },
    { text: "pathetic", delay: 3 },
    { text: "loser", delay: 4 },
    { text: "weird", delay: 4.5 },
    { text: "hopeless", delay: 5 },
    { text: "fake", delay: 5.5 },
  ];

  const getWordOpacity = (index: number) => {
    const wordProgress = (scrollProgress - (index * 5)) / 10;
    if (wordProgress < 0) return 0;
    if (wordProgress > 1) return 0;
    return Math.sin(wordProgress * Math.PI);
  };

  const getWordScale = (index: number) => {
    const wordProgress = (scrollProgress - (index * 5)) / 10;
    if (wordProgress < 0) return 0.3;
    if (wordProgress > 1) return 3;
    return 0.3 + (wordProgress * 2.7);
  };

  return (
    <div className="relative">
      {/* Background */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1520 50%, #0a0a0f 100%)'
        }}
      />

      {/* Spacer for scroll */}
      <div style={{ height: '500vh' }} />

      {/* Sticky container */}
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        {/* Downward arrow at start */}
        <div 
          className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
          style={{
            opacity: scrollProgress < 5 ? 1 : 0,
            transition: 'opacity 0.5s'
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p 
              className="text-xl font-light mb-2"
              style={{
                color: '#cba6f7',
                textShadow: '0 0 20px rgba(203, 166, 247, 0.5)'
              }}
            >
              Scroll Down
            </p>
            <div 
              className="text-5xl animate-bounce"
              style={{
                color: '#ffd580',
                filter: 'drop-shadow(0 0 20px rgba(255, 213, 128, 0.6))'
              }}
            >
              ↓
            </div>
          </div>
        </div>

        {/* Center word - STALKER */}
        <div 
          className="absolute text-center z-10"
          style={{
            fontSize: 'clamp(4rem, 12vmin, 8rem)',
            fontWeight: 'bold',
            color: '#ff6b9d',
            textShadow: '0 0 40px rgba(255, 107, 157, 0.8)',
            opacity: scrollProgress > 20 && scrollProgress < 80 ? 1 : 0,
            transform: `scale(${scrollProgress > 20 && scrollProgress < 80 ? 1 : 0.5})`,
            transition: 'opacity 0.5s, transform 0.5s'
          }}
        >
          STALKER
        </div>

        {/* Message after STALKER disappears */}
        <div 
          className="absolute text-center z-10 px-6 max-w-4xl"
          style={{
            opacity: scrollProgress > 85 ? 1 : 0,
            transform: `translateY(${scrollProgress > 85 ? '0' : '20px'})`,
            transition: 'opacity 1s, transform 1s'
          }}
        >
          <p 
            className="text-2xl md:text-3xl font-light leading-relaxed mb-6"
            style={{
              color: '#f4f4f9',
              textShadow: '0 0 30px rgba(244, 244, 249, 0.3)'
            }}
          >
            These are some of the things you said I am...
          </p>
          <p 
            className="text-lg md:text-xl font-light leading-relaxed mb-4"
            style={{
              color: '#cba6f7',
              textShadow: '0 0 20px rgba(203, 166, 247, 0.4)'
            }}
          >
            Honestly, I never stalked. I just remember your birthday from last year. 
            I heard your full name <span style={{ color: '#ffd580' }}>Prachi Padma Mishra</span> during attendance.
          </p>
          <p 
            className="text-xl md:text-2xl font-light italic leading-relaxed"
            style={{
              color: '#ffcad4',
              textShadow: '0 0 25px rgba(255, 202, 212, 0.5)'
            }}
          >
            But still, if you think I am a stalker and have no life... maybe I am. 
            If noticing little things about someone who matters makes me a stalker...
            <span style={{ color: '#ff6b9d', fontWeight: 'bold' }}> maybe I am one</span>.
          </p>
        </div>

        {/* Surrounding words */}
        <div className="grid grid-cols-4 grid-rows-4 gap-4 w-full h-full p-8">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
              style={{
                fontSize: 'clamp(1.5rem, 4vmin, 3rem)',
                fontWeight: '300',
                color: '#cba6f7',
                textShadow: '0 0 20px rgba(203, 166, 247, 0.5)',
                opacity: getWordOpacity(index),
                transform: `scale(${getWordScale(index)})`,
                filter: `blur(${getWordOpacity(index) < 0.5 ? 5 : 0}px)`,
                transition: 'all 0.1s linear',
                gridColumn: index === 4 || index === 5 ? 'auto' : (index % 4) + 1,
                gridRow: Math.floor(index / 4) + 1,
              }}
            >
              {word.text}
            </div>
          ))}
        </div>
      </div>

      {/* Next button */}
      <div 
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
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

      <style>{`
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

export default Page11;