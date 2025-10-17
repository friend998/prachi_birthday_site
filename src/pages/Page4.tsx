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
  
  {/* Heading */}
  <h2 
    className="text-4xl md:text-5xl font-romantic italic text-center mb-8"
    style={{
      color: '#00bfff',
      textShadow: '0 0 30px rgba(0, 191, 255, 0.6)'
    }}
  >
    the kid
  </h2>

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
             (am typing this as a story narration am too embarrassed to type it as me,I ) There was this kid ever since his school life he was a loner ,shy who never spoke much, not much interested in anything. he saw people go out, play, party, hangout he never thought those things were worth it, studying enough just to get through, not try hard for anything. Knowing, being a single child,he always had everything on him before asking. Also knowing he just had to take over his family business after graduation. The type that you only see directly on exam days. This had been the case since he was a child. his parents never asked or forced him to do anything. Being the eldest son in a joint family, he couldnt afford to set a bad example for his siblings, no room for mistakes what so ever. always tried to live upto his father as everyone expected from him, developed a sense of responsibility at a very young age.<br></br> Got through 10th, took dummy school at Allen just so he wouldn't need to go to school to avoid people. 
              <br /><br />
              Then comes this one day; He went to give this exam at Allen itself, he saw <span style={{color : 'pink', textShadow: '0 0 10px rgba(255, 105, 180, 1), 0 0 20px rgba(255, 105, 180, 0.8), 0 0 30px rgba(255, 105, 180, 0.6)'}}>this girl with a long ponytail.</span> I don't think he could see her face; she was sitting infront of him like 2 benches ahead. he never cared about exams anyway, but when the invigilator left, everyone was looking here and there for answers except for her—and him, ofc. I might as well sound like the ultimate side character. That left him questioning about her .the same sitting arrangement for all the exams, and each exam had the same, and he noticed the same in each exam. This happened around the starting of 11th.
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
