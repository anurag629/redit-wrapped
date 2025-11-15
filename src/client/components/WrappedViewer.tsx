import React, { useState, useEffect } from 'react';
import type { WrappedStats } from '../../shared/types/api';
import {
  WelcomeSlide,
  AccountOverviewSlide,
  ActivityStatsSlide,
  TopSubredditsSlide,
  PersonalitySlide,
  BadgesSlide,
  TopPostSlide,
  TopCommentSlide,
  ActivityTimeSlide,
  SummarySlide,
} from './WrappedSlides';

interface WrappedViewerProps {
  username: string;
  stats: WrappedStats;
  onReset: () => void;
}

export const WrappedViewer = ({ username, stats, onReset }: WrappedViewerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const slides = [
    <WelcomeSlide key="welcome" username={username} />,
    <AccountOverviewSlide key="overview" username={username} stats={stats} />,
    <ActivityStatsSlide key="activity" username={username} stats={stats} />,
    <TopSubredditsSlide key="subreddits" username={username} stats={stats} />,
    <PersonalitySlide key="personality" username={username} stats={stats} />,
    <BadgesSlide key="badges" username={username} stats={stats} />,
    <TopPostSlide key="post" username={username} stats={stats} />,
    <TopCommentSlide key="comment" username={username} stats={stats} />,
    <ActivityTimeSlide key="time" username={username} stats={stats} />,
    <SummarySlide key="summary" username={username} />,
  ];

  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => setTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !transitioning) {
      setTransitioning(true);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !transitioning) {
      setTransitioning(true);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      onClick={nextSlide}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Current Slide with fade transition */}
      <div
        className={`w-full h-full transition-all duration-500 ${
          transitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {slides[currentSlide]}
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-0 right-0 flex gap-1.5 px-4 z-20 pointer-events-none">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              idx === currentSlide
                ? 'bg-white shadow-lg'
                : idx < currentSlide
                  ? 'bg-white/60'
                  : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4 z-20">
        {currentSlide > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl border border-white/30"
          >
            ← Previous
          </button>
        )}
        {currentSlide === slides.length - 1 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="bg-white hover:bg-white/90 text-orange-600 px-10 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            ✨ Start Over
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl border border-white/30"
          >
            Next →
          </button>
        )}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-bold z-20 pointer-events-none bg-black/20 backdrop-blur px-4 py-2 rounded-full">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Click hint (only on first slide) */}
      {currentSlide === 0 && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/50 text-sm animate-pulse pointer-events-none z-10">
          👆 Tap anywhere to continue
        </div>
      )}
    </div>
  );
};
