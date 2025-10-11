import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import chatImage from "@/assets/AcchaWhyUBelieve.jpg";
import confessionVideo from "@/assets/confession-video.mp4";

const Page9 = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playCountRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => setShowVideo(true), 1500);
  }, []);

  const handleVideoEnded = () => {
    playCountRef.current += 1;
    
    if (playCountRef.current < 3 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      // After 3 plays, fade to black and show reflection
      setVideoEnded(true);
      setTimeout(() => setShowReflection(true), 1500);
      setTimeout(() => setShowButton(true), 2500);
    }
  };

  const handleNext = () => {
    navigate("/page10");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0"
        style={{
          background: '#001233'
        }}
      />

      {/* Fade to black overlay after video */}
      <div 
        className={`fixed inset-0 bg-black z-20 transition-opacity duration-1500 ${
          videoEnded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Main content */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 py-12">
        
        {/* Chat screenshot and video */}
        <div className={`max-w-2xl w-full flex flex-col items-center transition-all duration-1500 ${fadeIn && !videoEnded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Chat screenshot */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={chatImage} 
              alt="Chat conversation" 
              className="w-full h-auto"
            />
          </div>

          {/* Video */}
          {showVideo && (
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-auto"
                onEnded={handleVideoEnded}
                autoPlay
                playsInline
              >
                <source src={confessionVideo} type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        {/* Reflection text after video */}
        <div className={`max-w-3xl w-full z-30 transition-all duration-1500 ${showReflection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div 
            className="max-h-[70vh] overflow-y-auto px-4 mb-12 text-center"
            style={{
              color: '#f4f4f9',
              scrollbarWidth: 'thin',
              scrollbarColor: '#cba6f7 #001233'
            }}
          >
            <p className="text-lg md:text-xl font-light leading-relaxed">
              I know I couldn't make clear the fact I was never interested in anything—never interested to go out, hang out, or even just sit around. Maybe I should have made it more clear. I was never interested in anyone. I was never the type to date, believe me. The guy who was an overthinker, never went on one. I had never thought of someone that way—never until you. I never thought I would get to the level I am at today, in terms of feelings, with you. You might think it's crazy, probably unbelievable, but maybe that's why I made this.
              <br /><br />
              Another thing that might seem unbelievable is I never developed a crush on any other girl, if I'm being specific. Yeah, I got a lot of proposals, straight rejections from me, those were. I never was interested in a relationship or friendship or anything. I felt it was just a waste of time. I just wanted to get over with everything. I wasn't exactly this antisocial guy, but I was never attached to anyone. That might be the reason why I was never affected by the absence of people. Even when I was in 11th, many things were going around with people at that time, but I gave zero fucks.
              <br /><br />
              So, yeah, that's where I'm coming from.
            </p>
          </div>

          {/* Next button */}
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

export default Page9;
