import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import chatImage from "@/assets/AcchaWhyUBelieve.jpg";
import confessionVideo from "@/assets/confession-video.mp4";

const Page9 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Sequential animations
    setFadeIn(true);
    setTimeout(() => setShowImage(true), 800);
    setTimeout(() => setShowMessage(true), 2000);
    setTimeout(() => setShowVideo(true), 3500);

    // Intersection Observer for video autoplay when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !videoPlayed) {
            videoRef.current.play();
            setVideoPlayed(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, [videoPlayed]);

  const handleVideoEnded = () => {
    setTimeout(() => setShowNextButton(true), 1000);
  };

  const handleNext = () => {
    navigate("/page10");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Chat screenshot */}
          <div className={`flex justify-center transition-all duration-1500 ${showImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                maxWidth: '320px',
                boxShadow: '0 20px 60px rgba(203, 166, 247, 0.3), 0 0 40px rgba(255, 214, 165, 0.2)'
              }}
            >
              <img 
                src={chatImage} 
                alt="Chat conversation" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Message text */}
          <div className={`transition-all duration-1500 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="backdrop-blur-sm rounded-3xl p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(203, 166, 247, 0.08), rgba(255, 214, 165, 0.05))',
                border: '1px solid rgba(203, 166, 247, 0.2)',
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
                Still don't understand what does "wait" mean like fr. When I thought about it, I assumed you meant like... death or something. Then I thought you meant you have a lot of options right? Like I get it—see my Allen, college friends confessing here and there, one gets rejected or accepted then moving on. If you ask me, in my eyes you are so perfect you might as well have around 8 or 9 or even more already confess or be hitting on you.
                <br /><br />
                That's the reason I said I don't believe. It won't be wise for you to be waiting for a guy with a fake account with no experience with women. Ummmm... you might as well be correct here.... so thats the reason i never asked you to wait, i just said ill see you in 2030(i have provided my reason in the next page). Also, who would wait, for a random guy who... and till 2030? That's just dumb tbh.its almost 2026 and how far is 30? it seems long but its short at the same time like just remember when covid started it has been like almost 6 years ...damn 30 is closer than that. still i never asked you to wait think...and i dont believe you should or will.   
              </p>
            </div>
          </div>

          {/* Video section */}
          <div 
            ref={videoContainerRef}
            className={`transition-all duration-1500 ${showVideo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl mx-auto"
              style={{
                maxWidth: '800px',
                boxShadow: '0 20px 60px rgba(203, 166, 247, 0.3), 0 0 40px rgba(255, 214, 165, 0.2)'
              }}
            >
              <video
                ref={videoRef}
                className="w-full h-auto"
                onEnded={handleVideoEnded}
                controls
                playsInline
              >
                <source src={confessionVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Next button - appears after video ends */}
          <div className={`flex justify-center pb-12 transition-all duration-1000 ${showNextButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
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
      `}</style>
    </div>
  );
};

export default Page9;