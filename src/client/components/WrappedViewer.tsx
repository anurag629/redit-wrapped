import React, { useState } from 'react';
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

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onClick={nextSlide}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Current Slide */}
      <div className="w-full h-full transition-opacity duration-500">{slides[currentSlide]}</div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-0 right-0 flex gap-1 px-4">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'bg-white'
                : idx < currentSlide
                  ? 'bg-white/50'
                  : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4">
        {currentSlide > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="bg-white/20 backdrop-blur hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-colors"
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
            className="bg-white hover:bg-white/90 text-orange-600 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Start Over
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="bg-white/20 backdrop-blur hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Next →
          </button>
        )}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/50 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};
