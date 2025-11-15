import React from 'react';
import type { WrappedStats } from '../../shared/types/api';
import { AnimatedNumber } from './AnimatedNumber';

interface SlideProps {
  stats: WrappedStats;
  username: string;
}

// Slide 1: Welcome
export const WelcomeSlide = ({ username }: { username: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-8 p-8 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white overflow-hidden relative">
    {/* Animated background circles */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
    </div>

    <div className="relative z-10 text-center space-y-6 animate-fade-in">
      <div className="text-6xl animate-bounce">🎉</div>
      <h1 className="text-6xl font-black text-center animate-slide-up">
        Reddit Wrapped
        <span className="block text-3xl mt-2 font-semibold opacity-90">2024</span>
      </h1>
      <div className="text-center space-y-2 animate-slide-up delay-200">
        <p className="text-3xl font-bold">u/{username}</p>
        <p className="text-xl opacity-90">Your Reddit story awaits...</p>
      </div>
    </div>
    <div className="text-sm opacity-75 mt-8 animate-pulse">Tap or swipe to continue →</div>
  </div>
);

// Slide 2: Account Overview
export const AccountOverviewSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-8 p-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
    <h2 className="text-4xl font-black animate-slide-down">Your Reddit Journey</h2>
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/30 shadow-2xl animate-slide-up">
        <div className="flex items-baseline gap-2">
          <AnimatedNumber value={stats.accountAge} className="text-6xl font-black" />
          <span className="text-2xl font-semibold opacity-80">
            {stats.accountAge === 1 ? 'year' : 'years'}
          </span>
        </div>
        <div className="text-lg opacity-90 mt-2">on Reddit</div>
        <div className="mt-4 text-sm opacity-75">
          You've been part of the community since{' '}
          {new Date(Date.now() - stats.accountAge * 365 * 24 * 60 * 60 * 1000).getFullYear()}!
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/30 shadow-2xl animate-slide-up delay-200">
        <div className="flex items-baseline gap-2">
          <AnimatedNumber value={stats.totalKarma} className="text-6xl font-black" />
          <span className="text-2xl">✨</span>
        </div>
        <div className="text-lg opacity-90 mt-2">total karma</div>
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex-1 bg-white/10 rounded-xl p-3">
            <div className="font-bold text-xl">{stats.postKarma.toLocaleString()}</div>
            <div className="opacity-75">post</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3">
            <div className="font-bold text-xl">{stats.commentKarma.toLocaleString()}</div>
            <div className="opacity-75">comment</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Slide 3: Activity Stats
export const ActivityStatsSlide = ({ stats }: SlideProps) => {
  const totalActivity = stats.totalPosts + stats.totalComments;
  const postPercentage = (stats.totalPosts / totalActivity) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
      <h2 className="text-4xl font-black animate-slide-down">You've Been Busy!</h2>

      {/* Total activity */}
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/30 shadow-2xl">
        <div className="text-center">
          <AnimatedNumber value={totalActivity} className="text-7xl font-black" />
          <div className="text-xl opacity-90 mt-2">total contributions</div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-all border border-white/30 shadow-xl">
          <div className="text-4xl mb-2">📝</div>
          <AnimatedNumber value={stats.totalPosts} className="text-4xl font-black block" />
          <div className="text-sm opacity-90 mt-1">posts</div>
          <div className="text-xs opacity-75 mt-1">avg {stats.avgPostScore} karma</div>
        </div>
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center transform hover:scale-105 transition-all border border-white/30 shadow-xl">
          <div className="text-4xl mb-2">💬</div>
          <AnimatedNumber value={stats.totalComments} className="text-4xl font-black block" />
          <div className="text-sm opacity-90 mt-1">comments</div>
          <div className="text-xs opacity-75 mt-1">avg {stats.avgCommentScore} karma</div>
        </div>
      </div>

      {/* Activity breakdown bar */}
      <div className="w-full max-w-md">
        <div className="bg-white/10 rounded-full h-8 overflow-hidden border border-white/30">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full flex items-center justify-center font-bold text-sm transition-all duration-1000"
            style={{ width: `${postPercentage}%` }}
          >
            {postPercentage > 20 && `${Math.round(postPercentage)}%`}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs opacity-75">
          <span>Posts</span>
          <span>Comments</span>
        </div>
      </div>
    </div>
  );
};

// Slide 4: Top Subreddits
export const TopSubredditsSlide = ({ stats }: SlideProps) => {
  const maxScore = Math.max(...stats.topSubreddits.map((s) => s.totalScore));

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 text-white">
      <div className="text-center">
        <div className="text-5xl mb-3">🏆</div>
        <h2 className="text-4xl font-black">Your Favorite Communities</h2>
      </div>
      <div className="w-full max-w-md space-y-3">
        {stats.topSubreddits.slice(0, 5).map((sub, idx) => {
          const barWidth = (sub.totalScore / maxScore) * 100;
          return (
            <div
              key={sub.name}
              className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-xl transform hover:scale-102 transition-all animate-slide-left"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="text-3xl font-black w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xl">r/{sub.name}</div>
                  <div className="text-sm opacity-80">
                    {sub.postCount} posts • {sub.commentCount} comments
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-2xl">{sub.totalScore.toLocaleString()}</div>
                  <div className="text-xs opacity-75">karma</div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-1000"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Slide 5: Personality
export const PersonalitySlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-8 p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
    <h2 className="text-4xl font-black">You Are...</h2>
    <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl transform hover:scale-105 transition-all">
      <div className="text-7xl font-black text-center animate-pulse-slow">{stats.insights.personality}</div>
    </div>
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/30 shadow-xl">
      <div className="font-semibold text-lg mb-3 flex items-center gap-2">
        <span>💭</span>
        <span>Comment Style:</span>
      </div>
      <div className="text-2xl font-bold">{stats.insights.commentStyle}</div>
    </div>
    {stats.insights.topicsOfInterest.length > 0 && (
      <div className="w-full max-w-md">
        <div className="text-sm opacity-90 mb-3 font-semibold">Your Interests:</div>
        <div className="flex flex-wrap gap-3 justify-center">
          {stats.insights.topicsOfInterest.map((topic, idx) => (
            <span
              key={topic}
              className="bg-white/30 backdrop-blur-xl px-6 py-3 rounded-full text-lg font-bold border border-white/40 shadow-lg transform hover:scale-110 transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Slide 6: Badges
export const BadgesSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white">
    <div className="text-center">
      <div className="text-6xl mb-3 animate-bounce">🎖️</div>
      <h2 className="text-4xl font-black">Your Achievements</h2>
    </div>
    {stats.insights.badges.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {stats.insights.badges.map((badge, idx) => (
          <div
            key={badge}
            className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center border-2 border-yellow-300/50 shadow-2xl transform hover:scale-105 transition-all animate-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="text-3xl font-black">{badge}</div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md">
        <p className="text-xl">Keep participating to earn badges!</p>
        <p className="text-sm mt-2">Post more, comment more, and be active! 🚀</p>
      </div>
    )}
  </div>
);

// Slide 7: Top Post
export const TopPostSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 text-white">
    <div className="text-center">
      <div className="text-6xl mb-3">🔥</div>
      <h2 className="text-4xl font-black">Your Top Post</h2>
    </div>
    {stats.topPost ? (
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/30 shadow-2xl transform hover:scale-102 transition-all">
        <div className="mb-6">
          <div className="text-sm opacity-75 mb-2 flex items-center gap-2">
            <span>📍</span>
            <span>r/{stats.topPost.subreddit}</span>
          </div>
          <div className="font-bold text-2xl line-clamp-4 leading-tight">{stats.topPost.title}</div>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="text-center bg-white/10 rounded-2xl px-6 py-4 flex-1">
            <div className="text-4xl font-black">⬆️</div>
            <AnimatedNumber
              value={stats.topPost.score}
              className="font-black text-3xl block mt-2"
            />
            <div className="text-sm opacity-75 mt-1">upvotes</div>
          </div>
          <div className="text-center bg-white/10 rounded-2xl px-6 py-4 flex-1">
            <div className="text-4xl font-black">💬</div>
            <AnimatedNumber
              value={stats.topPost.num_comments}
              className="font-black text-3xl block mt-2"
            />
            <div className="text-sm opacity-75 mt-1">comments</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md">
        <p className="text-xl">No posts yet</p>
        <p className="text-sm mt-2">Time to share something amazing! ✨</p>
      </div>
    )}
  </div>
);

// Slide 8: Top Comment
export const TopCommentSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
    <div className="text-center">
      <div className="text-6xl mb-3">💎</div>
      <h2 className="text-4xl font-black">Your Top Comment</h2>
    </div>
    {stats.topComment ? (
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/30 shadow-2xl">
        <div className="text-sm opacity-75 mb-4 flex items-center gap-2">
          <span>📍</span>
          <span>r/{stats.topComment.subreddit}</span>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 mb-6 max-h-48 overflow-y-auto">
          <div className="text-lg italic leading-relaxed line-clamp-6">
            "{stats.topComment.body}"
          </div>
        </div>
        <div className="text-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-2xl px-8 py-6">
          <div className="text-5xl font-black mb-1">
            <AnimatedNumber value={stats.topComment.score} />
          </div>
          <div className="font-bold text-lg">upvotes! 🎉</div>
        </div>
      </div>
    ) : (
      <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md">
        <p className="text-xl">No comments yet</p>
        <p className="text-sm mt-2">Join the conversation! 💬</p>
      </div>
    )}
  </div>
);

// Slide 9: Activity Time
export const ActivityTimeSlide = ({ stats }: SlideProps) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [
    '12am',
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm',
  ];

  const getTimeEmoji = (hour: number) => {
    if (hour >= 5 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 17) return '☀️';
    if (hour >= 17 && hour < 21) return '🌆';
    return '🌙';
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white">
      <div className="text-center">
        <div className="text-6xl mb-3">⏰</div>
        <h2 className="text-4xl font-black">When You're Most Active</h2>
      </div>
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/30 shadow-2xl space-y-6">
        <div className="text-center bg-white/10 rounded-2xl p-6">
          <div className="text-sm opacity-75 mb-2">Most Active Day</div>
          <div className="text-5xl font-black">{days[stats.mostActiveDay]}</div>
          <div className="text-lg mt-2 opacity-90">
            {stats.mostActiveDay === 0 || stats.mostActiveDay === 6
              ? 'Weekend warrior! 🎉'
              : 'Weekday grinder! 💼'}
          </div>
        </div>
        <div className="text-center bg-white/10 rounded-2xl p-6">
          <div className="text-sm opacity-75 mb-2">Most Active Hour</div>
          <div className="flex items-center justify-center gap-3">
            <div className="text-5xl">{getTimeEmoji(stats.mostActiveHour)}</div>
            <div className="text-5xl font-black">{hours[stats.mostActiveHour]}</div>
          </div>
          <div className="text-lg mt-2 opacity-90">
            {stats.mostActiveHour >= 0 && stats.mostActiveHour < 6
              ? 'Night owl confirmed! 🦉'
              : stats.mostActiveHour >= 6 && stats.mostActiveHour < 12
                ? 'Early bird! 🌅'
                : stats.mostActiveHour >= 12 && stats.mostActiveHour < 18
                  ? 'Afternoon surfer! ☀️'
                  : 'Evening explorer! 🌆'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Slide 10: Final Summary
export const SummarySlide = ({ username }: { username: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-8 p-8 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white overflow-hidden relative">
    {/* Animated background */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-500" />
    </div>

    <div className="relative z-10 text-center space-y-6">
      <div className="text-8xl animate-bounce">🎊</div>
      <h2 className="text-5xl font-black">That's Your Reddit Wrapped!</h2>
      <div className="space-y-4">
        <p className="text-2xl font-semibold">Thanks for being part of Reddit,</p>
        <p className="text-4xl font-black">u/{username}!</p>
        <p className="text-xl opacity-90">Here's to another great year ahead 🎉</p>
      </div>
    </div>

    <div className="relative z-10 bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/30">
      <p className="text-sm opacity-90">Want to see another profile?</p>
      <p className="text-lg font-bold mt-2">Tap "Start Over" below! 👇</p>
    </div>
  </div>
);
