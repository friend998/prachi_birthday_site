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
              Everything came to an end. School ended. That kid, who had matured quite a lot—18 years old now, not a kid anymore—stepped into college after dropping the weights. First year went by in a collage like he was in, there are only 2 kind of persons who are who are single, gay and lesbian. but still no one was attractive. His ego wouldn't allow him to agree. but he...already he ..dumb him..he was cooked... how dumb was he to still not get it...he couldn't move on , from the first one. he saw his collage and allen friends never had any problem moving on switching,  CONCERNING? ye even i am concerned about him . what could he have done? he could't approch her directly, he was...maybe unsure . so he did what came to his mind the vry first thing text with ai and an alternate id , first try month 1(ai chatgpt) :(100% confidence) she didnt believe him, she thought she was being pranked by her friends she got angry at him 😧<br></br> second try month 2(ai gemini)(confidence 50%) he got to know you can insult someone even without cussing, she still thought about being pranked<br></br> third try month 3(ai used claud)(confidence 10%)it was so bad she told her brother, and he got threats from him<br></br>fourth try month 4 or 5 (confidence 1 percent)(no ai used this time) "about to deleat the account but there was one last thing he wanted to ask her"(why didnt she just block him from the beginning?😞)"she did rpely this time" no ai or anything used he was about to give up anyways he just talked to her as the real him he told him somethings about him (yet still she being she asked him trick questions and all) 
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
