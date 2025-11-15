
import type { WrappedStats } from '../../shared/types/api';
import { AnimatedNumber } from './AnimatedNumber';

interface SlideProps {
  stats: WrappedStats;
  username: string;
}

// Slide 1: Welcome
export const WelcomeSlide = ({ username }: { username: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-4 p-4 sm:p-8 md:p-12 lg:p-16 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white overflow-hidden relative">
    {/* Animated background circles */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 md:w-[28rem] lg:w-[32rem] h-64 sm:h-96 md:h-[28rem] lg:h-[32rem] bg-white rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 md:w-[28rem] lg:w-[32rem] h-64 sm:h-96 md:h-[28rem] lg:h-[32rem] bg-white rounded-full blur-3xl animate-pulse delay-700" />
    </div>

    <div className="relative z-10 text-center space-y-3 sm:space-y-6 md:space-y-8 lg:space-y-10 animate-fade-in">
      <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl animate-bounce">🎉</div>
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-center animate-slide-up px-4">
        Reddit Wrapped
        <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 font-semibold opacity-90">2024</span>
      </h1>
      <div className="text-center space-y-2 md:space-y-3 animate-slide-up delay-200 px-4">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold break-all">u/{username}</p>
        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl opacity-90">Your complete Reddit story</p>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mt-2">✨ Analyzing all your posts & comments ✨</p>
      </div>
    </div>
    <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mt-4 sm:mt-8 md:mt-10 lg:mt-12 animate-pulse">Tap or swipe to continue →</div>
  </div>
);

// Slide 2: Account Overview
export const AccountOverviewSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white overflow-y-auto">
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black animate-slide-down">Your Reddit Journey</h2>
    <div className="flex flex-col gap-4 md:gap-6 sm:p-6 md:p-8 w-full max-w-md md:max-w-lg lg:max-w-2xl">
      <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 transform hover:scale-105 transition-all duration-300 border border-white/30 shadow-2xl animate-slide-up">
        <div className="flex items-baseline gap-2">
          <AnimatedNumber value={stats.accountAge} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black" />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold opacity-80">
            {stats.accountAge === 1 ? 'year' : 'years'}
          </span>
        </div>
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 mt-2">on Reddit</div>
        <div className="mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-base lg:text-lg opacity-75">
          You've been part of the community since{' '}
          {new Date(Date.now() - stats.accountAge * 365 * 24 * 60 * 60 * 1000).getFullYear()}!
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 transform hover:scale-105 transition-all duration-300 border border-white/30 shadow-2xl animate-slide-up delay-200">
        <div className="flex items-baseline gap-2">
          <AnimatedNumber value={stats.totalKarma} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black" />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">✨</span>
        </div>
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 mt-2">total karma</div>
        <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-base lg:text-lg">
          <div className="flex-1 bg-white/10 rounded-xl p-2 sm:p-3 md:p-4 lg:p-5">
            <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">{stats.postKarma.toLocaleString()}</div>
            <div className="opacity-75">post</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-2 sm:p-3 md:p-4 lg:p-5">
            <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">{stats.commentKarma.toLocaleString()}</div>
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
  const postPercentage = totalActivity > 0 ? (stats.totalPosts / totalActivity) * 100 : 50;

  return (
    <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white overflow-y-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black animate-slide-down">You've Been Busy!</h2>

      {/* Total activity */}
      <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 w-full max-w-md md:max-w-lg lg:max-w-2xl border border-white/30 shadow-2xl">
        <div className="text-center">
          <AnimatedNumber value={totalActivity} className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black" />
          <div className="text-base sm:text-xl md:text-2xl lg:text-3xl opacity-90 mt-2">total contributions</div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center transform hover:scale-105 transition-all border border-white/30 shadow-xl">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">📝</div>
          <AnimatedNumber value={stats.totalPosts} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black block" />
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mt-1">posts</div>
          {stats.totalPosts > 0 && (
            <div className="text-[10px] sm:text-xs md:text-sm lg:text-base opacity-75 mt-1">avg {stats.avgPostScore} karma</div>
          )}
        </div>
        <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center transform hover:scale-105 transition-all border border-white/30 shadow-xl">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">💬</div>
          <AnimatedNumber value={stats.totalComments} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black block" />
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mt-1">comments</div>
          {stats.totalComments > 0 && (
            <div className="text-[10px] sm:text-xs md:text-sm lg:text-base opacity-75 mt-1">avg {stats.avgCommentScore} karma</div>
          )}
        </div>
      </div>

      {/* Activity bar */}
      {totalActivity > 0 && (
        <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mb-2 text-center">Your Activity Split</div>
          <div className="bg-white/20 backdrop-blur-xl rounded-full overflow-hidden h-4 sm:h-6 md:h-7 lg:h-8 border border-white/30 shadow-xl">
            <div
              className="bg-white/60 h-full transition-all duration-1000 ease-out flex items-center justify-center text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-900"
              style={{ width: `${postPercentage}%` }}
            >
              {postPercentage > 15 && `${Math.round(postPercentage)}%`}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs sm:text-sm md:text-base lg:text-lg opacity-75">
            <span>📝 Posts</span>
            <span>💬 Comments</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Slide 4: Top Subreddits
export const TopSubredditsSlide = ({ stats }: SlideProps) => {
  const maxScore = Math.max(...stats.topSubreddits.map((s) => s.totalScore));

  return (
    <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 text-white overflow-y-auto">
      <div className="text-center">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3">🏆</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Your Favorite Communities</h2>
      </div>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl space-y-3 md:space-y-4 lg:space-y-5">
        {stats.topSubreddits.slice(0, 5).map((sub, idx) => {
          const barWidth = (sub.totalScore / maxScore) * 100;
          return (
            <div
              key={sub.name}
              className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 md:p-5 lg:p-6 border border-white/30 shadow-xl transform hover:scale-102 transition-all animate-slide-left"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-4 md:gap-5 lg:gap-6 mb-2">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black w-10 sm:w-10 md:w-12 lg:w-14 h-10 sm:h-10 md:h-12 lg:h-14 flex items-center justify-center bg-white/20 rounded-full">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">r/{sub.name}</div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-80">
                    {sub.postCount} posts • {sub.commentCount} comments
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl">{sub.totalScore.toLocaleString()}</div>
                  <div className="text-xs md:text-sm lg:text-base opacity-75">karma</div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="bg-white/10 rounded-full h-2 md:h-2.5 lg:h-3 overflow-hidden">
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
  <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-y-auto">
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">You Are...</h2>
    <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 border border-white/30 shadow-2xl transform hover:scale-105 transition-all">
      <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-center animate-pulse-slow">{stats.insights.personality}</div>
    </div>
    <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-md md:max-w-lg lg:max-w-2xl border border-white/30 shadow-xl">
      <div className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl mb-3 flex items-center gap-2">
        <span>💭</span>
        <span>Comment Style:</span>
      </div>
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{stats.insights.commentStyle}</div>
    </div>
    {stats.insights.topicsOfInterest.length > 0 && (
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mb-3 font-semibold">Your Interests:</div>
        <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-5 justify-center">
          {stats.insights.topicsOfInterest.map((topic, idx) => (
            <span
              key={topic}
              className="bg-white/30 backdrop-blur-xl px-4 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-3 md:py-3.5 lg:py-4 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl font-bold border border-white/40 shadow-lg transform hover:scale-110 transition-all animate-fade-in"
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
  <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white overflow-y-auto">
    <div className="text-center">
      <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 animate-bounce">🎖️</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Your Achievements</h2>
    </div>
    {stats.insights.badges.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 w-full max-w-md md:max-w-lg lg:max-w-2xl">
        {stats.insights.badges.map((badge, idx) => (
          <div
            key={badge}
            className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center border-2 border-yellow-300/50 shadow-2xl transform hover:scale-105 transition-all animate-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">{badge}</div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-10 lg:p-12 max-w-md md:max-w-lg lg:max-w-2xl">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">Keep participating to earn badges!</p>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-2">Post more, comment more, and be active! 🚀</p>
      </div>
    )}
  </div>
);

// Slide 7: Top Post
export const TopPostSlide = ({ stats }: SlideProps) => {
  const postUrl = stats.topPost ? `https://reddit.com${stats.topPost.permalink}` : '';
  
  return (
    <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 text-white overflow-y-auto">
      <div className="text-center">
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3">🔥</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Your Top Post</h2>
      </div>
      {stats.topPost ? (
        <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 w-full max-w-md md:max-w-lg lg:max-w-2xl border border-white/30 shadow-2xl">
          <div className="mb-6">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mb-2 flex items-center gap-2">
              <span>📍</span>
              <span>r/{stats.topPost.subreddit}</span>
            </div>
            <div className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl line-clamp-4 leading-tight mb-4">{stats.topPost.title}</div>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg bg-white/30 hover:bg-white/40 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full font-semibold transition-all transform hover:scale-105 border border-white/40"
              aria-label="View post on Reddit"
            >
              <span>View Post</span>
              <span>🔗</span>
            </a>
          </div>
          <div className="flex gap-4 md:gap-6 lg:gap-8 sm:p-6 md:p-8 justify-center">
            <div className="text-center bg-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 flex-1">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">⬆️</div>
              <AnimatedNumber
                value={stats.topPost.score}
                className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mt-2"
              />
              <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mt-1">upvotes</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 flex-1">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">💬</div>
              <AnimatedNumber
                value={stats.topPost.num_comments}
                className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mt-2"
              />
              <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mt-1">comments</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-10 lg:p-12 max-w-md md:max-w-lg lg:max-w-2xl">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">No posts yet</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-2">Time to share something amazing! ✨</p>
        </div>
      )}
    </div>
  );
};

// Slide 8: Top Comment
export const TopCommentSlide = ({ stats }: SlideProps) => {
  const commentUrl = stats.topComment ? `https://reddit.com${stats.topComment.permalink}?context=3` : '';
  
  return (
    <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white overflow-y-auto">
      <div className="text-center">
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3">💎</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Your Top Comment</h2>
      </div>
      {stats.topComment ? (
        <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 w-full max-w-md md:max-w-lg lg:max-w-2xl border border-white/30 shadow-2xl">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mb-4 flex items-center gap-2">
            <span>📍</span>
            <span>r/{stats.topComment.subreddit}</span>
          </div>
          <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 mb-6 max-h-48 md:max-h-56 lg:max-h-64 overflow-y-auto">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl italic leading-relaxed line-clamp-4 sm:p-6">
              "{stats.topComment.body}"
            </div>
          </div>
          <div className="text-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-6 md:py-7 lg:py-8 mb-4">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-1">
              <AnimatedNumber value={stats.topComment.score} />
            </div>
            <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">upvotes! 🎉</div>
          </div>
          <a
            href={commentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg bg-white/30 hover:bg-white/40 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full font-semibold transition-all transform hover:scale-105 border border-white/40 w-full justify-center"
            aria-label="View comment on Reddit with context"
          >
            <span>View Comment</span>
            <span>🔗</span>
          </a>
        </div>
      ) : (
        <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-10 lg:p-12 max-w-md md:max-w-lg lg:max-w-2xl">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">No comments yet</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-2">Join the conversation! 💬</p>
        </div>
      )}
    </div>
  );
};

// Slide 9: Activity Time
export const ActivityTimeSlide = ({ stats }: SlideProps) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
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

  const getSeasonEmoji = (season: number) => {
    const emojis = ['❄️', '🌸', '☀️', '🍂'];
    return emojis[season] || '🌍';
  };

  return (
    <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white overflow-y-auto">
      <div className="text-center">
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3">⏰</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">When You're Most Active</h2>
      </div>
      <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 w-full max-w-md md:max-w-lg lg:max-w-2xl border border-white/30 shadow-2xl space-y-6 md:space-y-7 lg:space-y-8">
        <div className="text-center bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mb-2">Most Active Day</div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">{days[stats.mostActiveDay]}</div>
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2 opacity-90">
            {stats.mostActiveDay === 0 || stats.mostActiveDay === 6
              ? 'Weekend warrior! 🎉'
              : 'Weekday grinder! 💼'}
          </div>
        </div>
        <div className="text-center bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mb-2">Most Active Hour</div>
          <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-5">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{getTimeEmoji(stats.mostActiveHour)}</div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">{hours[stats.mostActiveHour]}</div>
          </div>
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2 opacity-90">
            {stats.mostActiveHour >= 0 && stats.mostActiveHour < 6
              ? 'Night owl confirmed! 🦉'
              : stats.mostActiveHour >= 6 && stats.mostActiveHour < 12
                ? 'Early bird! 🌅'
                : stats.mostActiveHour >= 12 && stats.mostActiveHour < 18
                  ? 'Afternoon surfer! ☀️'
                  : 'Evening explorer! 🌆'}
          </div>
        </div>
        <div className="text-center bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mb-2">Most Active Season</div>
          <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-5">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{getSeasonEmoji(stats.mostActiveSeason)}</div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">{seasons[stats.mostActiveSeason]}</div>
          </div>
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2 opacity-90">
            {stats.mostActiveSeason === 0
              ? 'Winter wonderland! ❄️'
              : stats.mostActiveSeason === 1
                ? 'Spring into action! 🌸'
                : stats.mostActiveSeason === 2
                  ? 'Summer vibes! ☀️'
                  : 'Fall feels! 🍂'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Slide 10: Final Summary
export const SummarySlide = ({ username }: { username: string }) => {
  const shareText = `Check out my Reddit Wrapped! I discovered some interesting insights about my Reddit activity. #RedditWrapped`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnTwitter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open Twitter share:', error);
      // Fallback: try using location.href
      window.location.href = url;
    }
  };

  const shareOnReddit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`My Reddit Wrapped Results!`)}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open Reddit share:', error);
      // Fallback: try using location.href
      window.location.href = url;
    }
  };

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Link copied to clipboard! ✅');
      } else {
        // Fallback for older browsers or restricted contexts
        const textArea = document.createElement('textarea');
        textArea.value = `${shareText} ${shareUrl}`;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          alert('Link copied to clipboard! ✅');
        } catch (err) {
          console.error('Fallback copy failed:', err);
          alert('Copy failed. Please copy manually: ' + `${shareText} ${shareUrl}`);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Copy failed. Please copy manually: ' + `${shareText} ${shareUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white overflow-y-auto relative">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 md:w-[28rem] lg:w-[32rem] h-64 sm:h-96 md:h-[28rem] lg:h-[32rem] bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 md:w-[28rem] lg:w-[32rem] h-64 sm:h-96 md:h-[28rem] lg:h-[32rem] bg-white rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
        <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] animate-bounce">🎊</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black px-4">That's Your Reddit Wrapped!</h2>
        <div className="space-y-3 sm:space-y-4 md:space-y-5 px-4">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">Thanks for being part of Reddit,</p>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black break-all">u/{username}!</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl opacity-90">Here's to another great year ahead 🎉</p>
        </div>
      </div>

      {/* Share Section */}
      <div className="relative z-10 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/30 shadow-xl w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <div className="text-center mb-4 md:mb-6">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Share Your Results</p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90">Let your friends see your Reddit story!</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-5 justify-center">
          <button
            onClick={shareOnTwitter}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-2.5 md:py-3 lg:py-3.5 rounded-lg font-bold text-sm md:text-base lg:text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            aria-label="Share on Twitter"
          >
            <span>🐦</span>
            <span>Twitter</span>
          </button>
          <button
            onClick={shareOnReddit}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 md:px-8 py-2.5 md:py-3 lg:py-3.5 rounded-lg font-bold text-sm md:text-base lg:text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            aria-label="Share on Reddit"
          >
            <span>🟠</span>
            <span>Reddit</span>
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 md:px-8 py-2.5 md:py-3 lg:py-3.5 rounded-lg font-bold text-sm md:text-base lg:text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            aria-label="Copy link to clipboard"
          >
            <span>📋</span>
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center border border-white/30 w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90">Want to see another profile?</p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mt-2">Tap "Start Over" below! 👇</p>
      </div>
    </div>
  );
};

// NEW Slide: Your Impact
export const ImpactSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white overflow-y-auto">
    <div className="text-center">
      <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3">💥</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Your Impact</h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mt-2">The conversations you sparked</p>
    </div>

    <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl space-y-4 md:space-y-5 lg:space-y-6">
      <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-white/30 shadow-2xl">
        <AnimatedNumber value={stats.insights.impact.totalEngagement} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black" />
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 mt-2">Total Engagement</div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-75 mt-2">Comments on your content</div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/30 shadow-xl">
          <div className="text-3xl sm:text-4xl md:text-5xl mb-2">🎯</div>
          <AnimatedNumber value={stats.insights.impact.discussionsStarted} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black" />
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mt-1">Discussions Started</div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/30 shadow-xl">
          <div className="text-3xl sm:text-4xl md:text-5xl mb-2">👥</div>
          <AnimatedNumber value={stats.insights.impact.uniqueInteractions} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black" />
          <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 mt-1">Unique Interactions</div>
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 shadow-xl">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mb-3 text-center">Engagement Rates</div>
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">{stats.insights.impact.avgRepliesPerPost}</div>
            <div className="text-xs sm:text-sm md:text-base opacity-75 mt-1">replies per post</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">{stats.insights.impact.avgRepliesPerComment}</div>
            <div className="text-xs sm:text-sm md:text-base opacity-75 mt-1">replies per comment</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// NEW Slide: Top Words
export const TopWordsSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white overflow-y-auto">
    <div className="text-center">
      <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3">💬</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Your Top Words</h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mt-2">Words you use most often</p>
    </div>

    {stats.insights.topWords && stats.insights.topWords.length > 0 ? (
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-5 justify-center">
          {stats.insights.topWords.slice(0, 12).map((wordStat, idx) => {
            const size = Math.max(1, Math.min(3, Math.floor(wordStat.count / 10)));
            const sizeClasses = [
              'text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3',
              'text-lg sm:text-xl md:text-2xl lg:text-3xl px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5',
              'text-xl sm:text-2xl md:text-3xl lg:text-4xl px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4'
            ];
            
            return (
              <div
                key={wordStat.word}
                className={`bg-white/30 backdrop-blur-xl ${sizeClasses[size]} rounded-full font-bold border-2 border-white/40 shadow-lg transform hover:scale-110 transition-all animate-fade-in`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="text-center">
                  <div>{wordStat.word}</div>
                  <div className="text-xs sm:text-sm opacity-75">{wordStat.count}×</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-8 max-w-md">
        <p className="text-xl">Not enough text to analyze</p>
      </div>
    )}
  </div>
);

// NEW Slide: Milestones
export const MilestonesSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-start h-full gap-4 md:gap-6 lg:gap-8 p-4 sm:p-8 md:p-12 lg:p-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-40 sm:pb-44 md:pb-48 lg:pb-52 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white overflow-y-auto">
    <div className="text-center">
      <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3">🏆</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Your Milestones</h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mt-2">Key achievements this year</p>
    </div>

    {stats.insights.milestones && stats.insights.milestones.length > 0 ? (
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl space-y-3 md:space-y-4 lg:space-y-5">
        {stats.insights.milestones.map((milestone, idx) => (
          <div
            key={idx}
            className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-yellow-300/50 shadow-2xl transform hover:scale-105 transition-all animate-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">{milestone.icon}</div>
              <div className="flex-1 text-left">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">{milestone.title}</div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mt-1">{milestone.description}</div>
                {milestone.date && (
                  <div className="text-xs sm:text-sm md:text-base opacity-75 mt-1">{milestone.date}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center opacity-75 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-8 max-w-md">
        <p className="text-xl">Keep being awesome! More milestones coming soon! 🚀</p>
      </div>
    )}
  </div>
);

