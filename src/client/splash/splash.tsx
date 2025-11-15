import '../index.css';

import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-8 bg-gradient-to-br from-orange-500 to-red-600">
      <div className="text-center space-y-4">
        <img className="object-contain w-32 h-32 mx-auto" src="/snoo.png" alt="Snoo" />
        <h1 className="text-5xl font-black text-white">Reddit Wrapped</h1>
        <p className="text-xl text-white/90">Discover your Reddit story</p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-md text-center space-y-4">
        <p className="text-white text-lg">
          Get a comprehensive analysis of any Reddit profile
        </p>
        <ul className="text-white/80 text-sm space-y-2">
          <li>📊 Detailed activity statistics</li>
          <li>🏆 Top posts and comments</li>
          <li>🎯 Personality insights</li>
          <li>🎨 Beautiful visualizations</li>
        </ul>
      </div>

      <button
        className="bg-white hover:bg-white/90 text-orange-600 font-bold text-lg px-8 py-4 rounded-full cursor-pointer transition-all transform hover:scale-105"
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
