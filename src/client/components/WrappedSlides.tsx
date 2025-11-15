import type { WrappedStats } from '../../shared/types/api';

interface SlideProps {
  stats: WrappedStats;
  username: string;
}

// Slide 1: Welcome
export const WelcomeSlide = ({ username }: { username: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-orange-600 to-red-600 text-white">
    <h1 className="text-5xl font-black text-center">Reddit Wrapped</h1>
    <div className="text-center">
      <p className="text-2xl font-semibold mb-2">u/{username}</p>
      <p className="text-lg opacity-90">Your year on Reddit</p>
    </div>
    <div className="text-sm opacity-75 mt-8">Swipe or tap to continue →</div>
  </div>
);

// Slide 2: Account Overview
export const AccountOverviewSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-8 p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
    <h2 className="text-3xl font-bold">Your Reddit Journey</h2>
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
        <div className="text-4xl font-black">{stats.accountAge}</div>
        <div className="text-lg opacity-90">years on Reddit</div>
      </div>
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
        <div className="text-4xl font-black">{stats.totalKarma.toLocaleString()}</div>
        <div className="text-lg opacity-90">total karma</div>
      </div>
    </div>
  </div>
);

// Slide 3: Activity Stats
export const ActivityStatsSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-green-600 to-teal-600 text-white">
    <h2 className="text-3xl font-bold">You've Been Busy!</h2>
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
        <div className="text-3xl font-black">{stats.totalPosts}</div>
        <div className="text-sm opacity-90">posts</div>
      </div>
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
        <div className="text-3xl font-black">{stats.totalComments}</div>
        <div className="text-sm opacity-90">comments</div>
      </div>
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
        <div className="text-3xl font-black">{stats.postKarma.toLocaleString()}</div>
        <div className="text-sm opacity-90">post karma</div>
      </div>
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
        <div className="text-3xl font-black">{stats.commentKarma.toLocaleString()}</div>
        <div className="text-sm opacity-90">comment karma</div>
      </div>
    </div>
  </div>
);

// Slide 4: Top Subreddits
export const TopSubredditsSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-pink-600 to-rose-600 text-white">
    <h2 className="text-3xl font-bold">Your Favorite Communities</h2>
    <div className="w-full max-w-md space-y-3">
      {stats.topSubreddits.slice(0, 5).map((sub, idx) => (
        <div key={sub.name} className="bg-white/20 backdrop-blur rounded-xl p-4 flex items-center gap-4">
          <div className="text-2xl font-black w-8">{idx + 1}</div>
          <div className="flex-1">
            <div className="font-bold text-lg">r/{sub.name}</div>
            <div className="text-sm opacity-90">
              {sub.postCount} posts, {sub.commentCount} comments
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold">{sub.totalScore}</div>
            <div className="text-xs opacity-75">karma</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Slide 5: Personality
export const PersonalitySlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
    <h2 className="text-3xl font-bold">You Are...</h2>
    <div className="text-6xl font-black text-center">{stats.insights.personality}</div>
    <div className="bg-white/20 backdrop-blur rounded-2xl p-6 w-full max-w-md">
      <div className="font-semibold mb-2">Comment Style:</div>
      <div className="text-xl">{stats.insights.commentStyle}</div>
    </div>
    {stats.insights.topicsOfInterest.length > 0 && (
      <div className="flex flex-wrap gap-2 justify-center">
        {stats.insights.topicsOfInterest.map((topic) => (
          <span key={topic} className="bg-white/30 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
            {topic}
          </span>
        ))}
      </div>
    )}
  </div>
);

// Slide 6: Badges
export const BadgesSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-yellow-600 to-orange-600 text-white">
    <h2 className="text-3xl font-bold">Your Achievements</h2>
    {stats.insights.badges.length > 0 ? (
      <div className="grid grid-cols-1 gap-3 w-full max-w-md">
        {stats.insights.badges.map((badge) => (
          <div key={badge} className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-xl font-bold">{badge}</div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center opacity-75">
        <p className="text-lg">Keep participating to earn badges!</p>
      </div>
    )}
  </div>
);

// Slide 7: Top Post
export const TopPostSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-red-600 to-pink-600 text-white">
    <h2 className="text-3xl font-bold">Your Top Post</h2>
    {stats.topPost ? (
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6 w-full max-w-md">
        <div className="mb-4">
          <div className="text-sm opacity-75 mb-1">r/{stats.topPost.subreddit}</div>
          <div className="font-bold text-lg line-clamp-3">{stats.topPost.title}</div>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-black text-2xl">{stats.topPost.score.toLocaleString()}</span>
            <span className="ml-1 opacity-75">upvotes</span>
          </div>
          <div>
            <span className="font-black text-2xl">{stats.topPost.num_comments}</span>
            <span className="ml-1 opacity-75">comments</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center opacity-75">
        <p className="text-lg">No posts yet. Start sharing!</p>
      </div>
    )}
  </div>
);

// Slide 8: Top Comment
export const TopCommentSlide = ({ stats }: SlideProps) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
    <h2 className="text-3xl font-bold">Your Top Comment</h2>
    {stats.topComment ? (
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6 w-full max-w-md">
        <div className="text-sm opacity-75 mb-2">r/{stats.topComment.subreddit}</div>
        <div className="text-base mb-4 line-clamp-6 italic">"{stats.topComment.body}"</div>
        <div className="text-center">
          <span className="font-black text-3xl">{stats.topComment.score.toLocaleString()}</span>
          <span className="ml-2 opacity-75">upvotes</span>
        </div>
      </div>
    ) : (
      <div className="text-center opacity-75">
        <p className="text-lg">No comments yet. Join the conversation!</p>
      </div>
    )}
  </div>
);

// Slide 9: Activity Time
export const ActivityTimeSlide = ({ stats }: SlideProps) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [
    '12am', '1am', '2am', '3am', '4am', '5am',
    '6am', '7am', '8am', '9am', '10am', '11am',
    '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
    '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
      <h2 className="text-3xl font-bold">When You're Most Active</h2>
      <div className="bg-white/20 backdrop-blur rounded-2xl p-6 w-full max-w-md text-center">
        <div className="mb-4">
          <div className="text-sm opacity-75">Most Active Day</div>
          <div className="text-3xl font-black">{days[stats.mostActiveDay]}</div>
        </div>
        <div>
          <div className="text-sm opacity-75">Most Active Hour</div>
          <div className="text-3xl font-black">{hours[stats.mostActiveHour]}</div>
        </div>
      </div>
    </div>
  );
};

// Slide 10: Final Summary
export const SummarySlide = ({ username }: { username: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-gradient-to-br from-orange-600 to-red-600 text-white">
    <h2 className="text-4xl font-black text-center">That's Your Reddit Wrapped!</h2>
    <div className="text-center space-y-2">
      <p className="text-xl">Thanks for being part of Reddit, u/{username}!</p>
      <p className="opacity-90">Here's to another great year ahead 🎉</p>
    </div>
    <div className="mt-8 text-sm opacity-75">
      <p>Tap "Start Over" to analyze another profile</p>
    </div>
  </div>
);
