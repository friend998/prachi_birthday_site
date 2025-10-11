import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page4 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  const handleNext = () => {
    navigate("/page5");
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
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 py-12">
        <div className={`max-w-3xl w-full transition-all duration-1500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Scrollable story text */}
          <div 
            className="max-h-[70vh] overflow-y-auto px-4 mb-12 text-center"
            style={{
              color: '#00bfff',
              scrollbarWidth: 'thin',
              scrollbarColor: '#00bfff #020c1b'
            }}
          >
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Ever since I was a kid in my school life, I was a loner, not much interested in anything. I saw my people go out, play, date, party, study just to get through, not try hard for anything. Knowing, being a single child, I always had everything on me before asking. Also knowing I just had to take over my dad's business after I graduate. The type that you only see directly on exam days. Got through 10th, took dummy school at Allen just so I wouldn't need to go to no one. This had been the case since I was a kid. My parents never asked me or forced me to do anything. Being the eldest son in our joint family, I knew my younger siblings were always watching and learning from each and every step I took, so I never could misuse or never wanted to misuse the freedom, tbh.
              <br /><br />
              Then comes one day; I went to give this exam at Allen itself, saw this girl with a long ponytail. I don't think I could see your face; she was sitting right in front of me. I never cared about exams anyway, but when the invigilator left, everyone was looking here and there for answers except her—and me, ofc. I might as well sound like the ultimate side character. That left me questioning about her. I also had the same sitting arrangement for all the exams, and each exam had the same, and I noticed the same in each exam. This happened around the starting of 11th.
            </p>
          </div>

          {/* Next button */}
          <div className={`flex justify-center transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleNext}
              className="w-16 h-16 rounded-full transition-all duration-700 hover:scale-110"
              style={{
                backgroundColor: '#ffd700',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <span className="text-2xl" style={{ color: '#020c1b' }}>→</span>
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
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
};

export default Page4;
