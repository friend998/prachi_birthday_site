import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page7 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  const handleNext = () => {
    navigate("/page8");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, #020c1b, #001233)'
        }}
      />

      {/* Main content */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6">
        <div className={`max-w-2xl w-full text-center transition-all duration-1500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <p 
            className="text-2xl md:text-3xl font-light leading-relaxed"
            style={{
              color: '#f4f4f9',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            I wanted to address some things I couldn't make clear to you last time.
          </p>

          {/* Next button with gradient glow */}
          <div className={`pt-16 transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleNext}
              className="w-16 h-16 rounded-full transition-all duration-700 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #007bff, #ffd700)',
                boxShadow: '0 0 30px rgba(0, 123, 255, 0.5)',
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}
            >
              <span className="text-2xl text-white">→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(0, 123, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default Page7;
