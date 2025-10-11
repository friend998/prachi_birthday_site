import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const [showFirstLine, setShowFirstLine] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowFirstLine(true), 500);
    setTimeout(() => setShowSecondLine(true), 2000);
    setTimeout(() => setShowButton(true), 3500);
  }, []);

  const handleNext = () => {
    navigate("/page4");
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
        <div className="max-w-2xl w-full text-center space-y-6">
          
          {/* First line */}
          <p 
            className={`text-2xl md:text-3xl font-light italic tracking-wide transition-all duration-1500 ${
              showFirstLine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              color: '#f4f4f9',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            hey, before you go ahead I would like you to know it took hours for me to build this webpage.
          </p>

          {/* Second line */}
          <p 
            className={`text-2xl md:text-3xl font-light italic tracking-wide transition-all duration-1500 ${
              showSecondLine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              color: '#f4f4f9',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            it'll only take a few minutes of your time,<br />
            but it would mean a lot to me.
          </p>

          {/* Button */}
          <div className={`pt-12 transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleNext}
              className="w-16 h-16 rounded-full transition-all duration-700 hover:scale-110"
              style={{
                backgroundColor: '#ffd700',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                animation: 'float-up 3s ease-in-out infinite'
              }}
            >
              <span className="text-2xl" style={{ color: '#020c1b' }}>→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-up {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Page3;
