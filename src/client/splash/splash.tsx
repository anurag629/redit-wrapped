import '../index.css';

import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-6 sm:gap-8 bg-gradient-to-br from-orange-500 to-red-600 p-4 sm:p-6 md:p-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <img className="object-contain w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto" src="/snoo.png" alt="Snoo" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white px-4">Reddit Wrapped</h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 px-4">Discover your Reddit story</p>
      </div>

      {/* Compact feature tags */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-md px-4">
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30">
          📊 Activity Stats
        </span>
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30">
          🏆 Top Content
        </span>
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30">
          🎯 Insights
        </span>
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30">
          🎨 Visualizations
        </span>
      </div>

      <button
        className="bg-white hover:bg-white/90 text-orange-600 font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full cursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-lg mx-4"
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
      >
        Get Started →
      </button>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
