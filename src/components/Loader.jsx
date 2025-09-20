import React from 'react';

export default function Loader({ loadingText = "FORGING STRENGTH...", showProgress = false, progress = 0 }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-t from-red-950/100 to-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Container */}
        <div className="relative mb-8">
          {/* Rotating Ring */}
          <div className="relative w-40 h-40 mx-auto">
            {/* Main Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-red-600 animate-spin duration-2000"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-red-400 animate-spin duration-3000 animation-delay-500"></div>
            
            {/* Logo Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="oversin.png" 
                alt="Oversin Logo" 
                className="w-32 h-32 object-contain filter drop-shadow-lg"
              />
            </div>
          </div>
          
          {/* Pulsing Glow */}
          <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full bg-red-600/20 animate-pulse"></div>
        </div>

        {/* Brand Name */}
        <div className="mb-6">
          <h1 className="text-6xl font-cinzel font-bold text-white tracking-wider mb-2">
            OVERSIN
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <p className="text-red-400 font-cinzel text-lg tracking-widest animate-pulse">
            {loadingText}
          </p>
          
          {/* Dots Animation */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>

        {/* Optional Progress Bar */}
        {showProgress && (
          <div className="w-80 mx-auto">
            <div className="bg-gray-800 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm font-cinzel">
              {progress}% COMPLETE
            </p>
          </div>
        )}

        {/* Bottom Accent */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-800"></div>
            <span className="font-cinzel text-sm tracking-wider">NO LIMITS</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-red-800"></div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .duration-2000 {
          animation-duration: 2s;
        }
        
        .duration-3000 {
          animation-duration: 3s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-8px);
          }
          70% {
            transform: translateY(-4px);
          }
          90% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
}