import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page12 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowMessage(true), 1000);
    setTimeout(() => setShowButton(true), 3000);
  }, []);

  const handleNext = () => {
    navigate("/page13");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Warm gradient background */}
      <div 
        className={`fixed inset-0 transition-opacity duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0b2e 25%, #0f051d 50%, #1a0b2e 75%, #2d1b4e 100%)'
        }}
      />

      {/* Warm ambient glow - hope and determination */}
      <div 
        className="fixed inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255, 214, 165, 0.2), transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(203, 166, 247, 0.15), transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.1), transparent 60%)
          `
        }}
      />

      {/* Floating particles for warmth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: i % 3 === 0 ? '#ffd6a5' : i % 3 === 1 ? '#cba6f7' : '#ffb6c1',
              opacity: 0.4,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full space-y-8">
          
          {/* Message container */}
          <div className={`transition-all duration-1500 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="backdrop-blur-md rounded-3xl p-10 md:p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 214, 165, 0.1), rgba(203, 166, 247, 0.08))',
                border: '1px solid rgba(255, 214, 165, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(255, 214, 165, 0.15)'
              }}
            >
              <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed">
                
                {/* Opening statement */}
                <p style={{ color: '#ffd6a5', fontWeight: '400' }}>
                  I choose this path, the hard way, to get to the level of the first girl I ever fell for.
                </p>

                {/* Main commitment */}
                <p style={{ color: '#f4f4f9', textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                  Hahahahaha ik it's gonna gonna take a lot of discipline, hardwork, and persistence to get to your level, but I will do it—you have my word there (so that the next time I meet you, most likely after our graduation, I will have no regrets like I have now from the days in Allen).
                </p>

                {/* Thank you section */}
                <div style={{ color: '#f4f4f9', textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                  <p className="mb-4">And lastly, I would like to thank you:</p>
                  <ul className="space-y-3 pl-6">
                    <li style={{ color: '#ffcad4' }}>
                      ✦ for making me experience what teenage love feels like even if it's one sided
                    </li>
                    <li style={{ color: '#cba6f7' }}>
                      ✦ thanks for taking me out of my rabbit hole
                    </li>
                    <li style={{ color: '#ffd6a5' }}>
                      ✦ thanks for existing
                    </li>
                  </ul>
                </div>

                {/* Acknowledgment */}
                <p style={{ color: '#f4f4f9', opacity: 0.9, textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                  Ik my back story sounds creepy or straight out of anime, but it is what it is.
                </p>

                {/* Closing commitment */}
                <p style={{ color: '#ffd6a5', fontWeight: '400', fontSize: '1.1em' }}>
                  I'll do my best to get to the level of the first girl I ever fell for, so that even if I get rejected at the end, I will be able to move on with no regrets.
                </p>

              </div>
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
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
};

export default Page12;