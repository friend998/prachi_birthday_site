import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page6 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  const handleNext = () => {
    // Navigate to next page when created
    navigate("/page7");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background diagonal gradient */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(135deg, #001233, #ffe873)'
        }}
      />

      {/* Main content */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 py-12">
        <div className={`max-w-3xl w-full transition-all duration-1500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Scrollable story text */}
          <div 
            className="max-h-[70vh] overflow-y-auto px-4 mb-12 text-center"
            style={{
              color: '#f4f4f9',
              scrollbarWidth: 'thin',
              scrollbarColor: '#cba6f7 #001233'
            }}
          >
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Everything came to an end. School ended. That kid, who had matured quite a lot—18 years old now, not a kid anymore—stepped into college after dropping the weights. First year went by; he felt something was missing. He knew what was missing but didn't want to accept the fact that it was what it was. His ego wouldn't allow him to agree. That guy—the college he joined is freaking filled with couples, every corner. He was fuvking depolarized. He couldn't find anyone, anyone attractive in his entire college—sigh. Then he realized one day, while hanging out in the Pooja vacations with his Allen friends—yeah friends—he didn't know much about that girl. So he texted her with a fake account using AI, and everything that could go wrong went wrong. He was cooked.
            </p>
          </div>

          {/* Next button with breathing glow */}
          <div className={`flex justify-center transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleNext}
              className="w-16 h-16 rounded-full transition-all duration-700 hover:scale-110"
              style={{
                backgroundColor: '#cba6f7',
                boxShadow: '0 0 30px rgba(203, 166, 247, 0.6)',
                animation: 'breathe 2s ease-in-out infinite'
              }}
            >
              <span className="text-2xl" style={{ color: '#001233' }}>→</span>
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
      `}</style>
    </div>
  );
};

export default Page6;
