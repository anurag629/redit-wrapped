import '../index.css';

import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-4 sm:gap-6 md:gap-8 bg-gradient-to-br from-orange-500 to-red-600 p-4 sm:p-6 md:p-8 py-8 sm:py-12 md:py-16">
      <div className="text-center space-y-3 sm:space-y-4">
        <img className="object-contain w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto" src="/snoo.png" alt="Snoo" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white px-4">Reddit Wrapped</h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 px-4">Discover your Reddit story</p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md text-center space-y-3 sm:space-y-4 mx-4">
        <p className="text-white text-sm sm:text-base md:text-lg">
          Get a comprehensive analysis of any Reddit profile
        </p>
        <ul className="text-white/80 text-xs sm:text-sm md:text-base space-y-1.5 sm:space-y-2">
          <li>📊 Detailed activity statistics</li>
          <li>🏆 Top posts and comments</li>
          <li>🎯 Personality insights</li>
          <li>🎨 Beautiful visualizations</li>
        </ul>
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
