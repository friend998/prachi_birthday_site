import { useEffect, useState } from "react";
import { FloatingParticles } from "@/components/FloatingParticles";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showLightsButton, setShowLightsButton] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30 && !scrolled) {
        setScrolled(true);
        setTimeout(() => setShowLightsButton(true), 800);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleLightsOn = () => {
    setLightsOn(true);
    setTimeout(() => setShowGreeting(true), 2000);
    setTimeout(() => setShowContinue(true), 4000);
  };

  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/next");
    }, 1500);
  };

  return (
    <div className="relative min-h-[100vh] overflow-x-hidden">
      {/* Background with gradient and glow effect */}
      <div 
        className={`fixed inset-0 transition-all duration-[3000ms] ${
          lightsOn 
            ? 'bg-gradient-to-b from-[#0e0e14] via-[#1a1520] to-[#0e0e14]' 
            : 'bg-gradient-to-b from-[#050509] to-[#0e0e14]'
        }`}
      />
      
      {/* Glow overlay when lights are on */}
      {lightsOn && (
        <div 
          className="fixed inset-0 bg-gradient-to-b from-transparent via-[#cba6f7]/10 to-transparent animate-fade-in"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--romantic-lavender) / 0.15), hsl(var(--romantic-gold) / 0.1), transparent)`
          }}
        />
      )}

      <FloatingParticles />

      {/* Main content - always centered */}
      <div className={`fixed inset-0 z-10 flex flex-col items-center justify-center px-6 transition-opacity duration-1500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Initial scroll prompt */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <p className="text-[#f4f4f9]/80 text-lg md:text-xl font-light tracking-wide animate-fade-in">
            Scroll down to turn on the lights…
          </p>
        </div>

        {/* Turn on lights button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${showLightsButton && !lightsOn ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={handleLightsOn}
            className="px-8 py-4 text-lg font-light tracking-wider border-2 rounded-full transition-all duration-700 hover:scale-105 romantic-glow-gold"
            style={{
              color: '#f4f4f9',
              borderColor: '#ffd6a5',
              backgroundColor: 'rgba(255, 214, 165, 0.1)'
            }}
          >
            Turn On Lights
          </button>
        </div>


        {/* Greeting text and Continue button */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1500 ${showGreeting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h1 
            className="text-5xl md:text-7xl font-romantic italic mb-12"
            style={{
              color: '#f4f4f9',
              textShadow: '0 0 30px rgba(244, 244, 249, 0.5)'
            }}
          >
            Hi Prachi…
          </h1>

          {/* Continue button */}
          <div className={`transition-opacity duration-1000 ${showContinue ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={handleContinue}
              className="px-10 py-4 text-lg font-light tracking-wider border-2 rounded-full transition-all duration-700 animate-glow-pulse relative overflow-hidden group"
              style={{
                  color: '#f4f4f9',
                  borderColor: '#cba6f7',
                  background: 'linear-gradient(135deg, rgba(203, 166, 247, 0.2), rgba(255, 214, 165, 0.2))',
                  position: 'relative',
                  overflow: 'hidden'
                }}
            >
              {/* Shimmer effect */}
              <span 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
                }}
              />
              <span className="relative z-10">Continue</span>
            </button>
          </div>
        </div>
      </div>

      
      {/* Minimal scroll space - just enough to hide browser bars */}
      <div className="h-[120vh]" />
    </div>
  );
};

export default Index;
