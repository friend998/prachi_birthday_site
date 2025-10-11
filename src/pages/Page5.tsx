import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page5 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  const handleNext = () => {
    // Fade to black, then navigate to page 6 (when created)
    // For now, this will just prepare for the next page
    navigate("/page6");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, #fff6bf, #ffe873)'
        }}
      />

      {/* Main content */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 py-12">
        <div className={`max-w-3xl w-full transition-all duration-1500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Scrollable story text */}
          <div 
            className="max-h-[70vh] overflow-y-auto px-4 mb-12 text-center"
            style={{
              color: '#2b2b2b',
              scrollbarWidth: 'thin',
              scrollbarColor: '#d4a017 #fff6bf'
            }}
          >
            <p className="text-lg md:text-xl font-light leading-relaxed">
              That 16-year-old kid started to go to coaching on a regular basis… made lots of friends, came out of his rabbit hole. The guy who barely went to school, took dummy school to avoid people, started making friends, started to hang out. Friends all happened because he started to his dummy school (Allen). Realized how fun it was to have friends—real friends. He always used to go to movies, restaurants alone, but he had someone to share the joy with now. All happened because he came out of his comfort zone and went to class, and after classes waited just to catch a glimpse of that girl. He was never significant for her to notice, tbh. He didn't ever understand what he was experiencing. Everything has a first time, guess so. He always slept through those, never spoke to this girl—maybe only once he did speak. The only thing he is to her is grateful.
            </p>
          </div>

          {/* Next button with gradient shimmer */}
          <div className={`flex justify-center transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleNext}
              className="w-16 h-16 rounded-full transition-all duration-700 hover:scale-110 relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #007bff, #ffd700, #007bff)',
                backgroundSize: '200% 100%',
                boxShadow: '0 0 30px rgba(0, 123, 255, 0.5)',
                animation: 'shimmer 3s linear infinite'
              }}
            >
              <span className="text-2xl text-white">→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Page5;
