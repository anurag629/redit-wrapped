import type {
  RedditUser,
  RedditPost,
  RedditComment,
  WrappedStats,
  SubredditActivity,
  ActivityPattern,
  UserInsights,
} from '../../shared/types/api';

/**
 * Analyze subreddit activity
 */
function analyzeSubreddits(
  posts: RedditPost[],
  comments: RedditComment[]
): SubredditActivity[] {
  const subredditMap = new Map<string, SubredditActivity>();

  // Process posts
  for (const post of posts) {
    const existing = subredditMap.get(post.subreddit) || {
      name: post.subreddit,
      postCount: 0,
      commentCount: 0,
      totalScore: 0,
    };
    existing.postCount++;
    existing.totalScore += post.score;
    subredditMap.set(post.subreddit, existing);
  }

  // Process comments
  for (const comment of comments) {
    const existing = subredditMap.get(comment.subreddit) || {
      name: comment.subreddit,
      postCount: 0,
      commentCount: 0,
      totalScore: 0,
    };
    existing.commentCount++;
    existing.totalScore += comment.score;
    subredditMap.set(comment.subreddit, existing);
  }

  // Sort by total activity (posts + comments)
  return Array.from(subredditMap.values())
    .sort((a, b) => b.postCount + b.commentCount - (a.postCount + a.commentCount))
    .slice(0, 10);
}

/**
 * Analyze activity patterns (time-based)
 */
function analyzeActivityPattern(
  posts: RedditPost[],
  comments: RedditComment[]
): ActivityPattern {
  const hourOfDay = new Array(24).fill(0);
  const dayOfWeek = new Array(7).fill(0);
  const seasonalActivity = new Array(4).fill(0);
  const monthlyMap = new Map<string, number>();

  // Process posts
  for (const post of posts) {
    const date = new Date(post.created_utc * 1000);
    hourOfDay[date.getUTCHours()]++;
    dayOfWeek[date.getUTCDay()]++;

    const month = date.getUTCMonth();
    const season = Math.floor(month / 3); // 0: Dec-Feb, 1: Mar-May, 2: Jun-Aug, 3: Sep-Nov
    seasonalActivity[season]++;

    const monthKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + 1);
  }

  // Process comments
  for (const comment of comments) {
    const date = new Date(comment.created_utc * 1000);
    hourOfDay[date.getUTCHours()]++;
    dayOfWeek[date.getUTCDay()]++;

    const month = date.getUTCMonth();
    const season = Math.floor(month / 3);
    seasonalActivity[season]++;

    const monthKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + 1);
  }

  // Convert monthly map to sorted array
  const monthlyActivity = Array.from(monthlyMap.entries())
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // Last 12 months

  return { hourOfDay, dayOfWeek, monthlyActivity, seasonalActivity };
}

/**
 * Calculate sentiment score based on keywords
 */
function calculateSentiment(texts: string[]): number {
  const positiveWords = [
    'love',
    'great',
    'awesome',
    'amazing',
    'excellent',
    'wonderful',
    'fantastic',
    'good',
    'best',
    'happy',
    'thanks',
    'appreciate',
    'helped',
    'perfect',
  ];
  const negativeWords = [
    'hate',
    'bad',
    'terrible',
    'awful',
    'worst',
    'horrible',
    'stupid',
    'dumb',
    'wrong',
    'sad',
    'angry',
    'annoying',
    'sucks',
    'disappointed',
  ];

  let positiveCount = 0;
  let negativeCount = 0;

  for (const text of texts) {
    const lowerText = text.toLowerCase();
    for (const word of positiveWords) {
      if (lowerText.includes(word)) positiveCount++;
    }
    for (const word of negativeWords) {
      if (lowerText.includes(word)) negativeCount++;
    }
  }

  const total = positiveCount + negativeCount;
  if (total === 0) return 0;

  return ((positiveCount - negativeCount) / total) * 100;
}

/**
 * Determine personality based on activity patterns
 */
function determinePersonality(
  topSubreddits: SubredditActivity[],
  posts: RedditPost[],
  comments: RedditComment[]
): string {
  const subredditNames = topSubreddits.map((s) => s.name.toLowerCase());
  const commentToPostRatio = comments.length / (posts.length || 1);

  // Tech enthusiast
  if (
    subredditNames.some((s) =>
      ['programming', 'technology', 'coding', 'webdev', 'reactjs', 'javascript'].includes(s)
    )
  ) {
    return 'Tech Enthusiast 💻';
  }

  // Gamer
  if (
    subredditNames.some((s) => ['gaming', 'games', 'pcgaming', 'ps5', 'xbox'].includes(s))
  ) {
    return 'Gamer 🎮';
  }

  // News junkie
  if (subredditNames.some((s) => ['news', 'worldnews', 'politics', 'technology'].includes(s))) {
    return 'News Junkie 📰';
  }

  // Meme lord
  if (
    subredditNames.some((s) => ['memes', 'dankmemes', 'funny', 'me_irl', 'wholesomememes'].includes(s))
  ) {
    return 'Meme Connoisseur 😂';
  }

  // Helper (lots of comments)
  if (commentToPostRatio > 5) {
    return 'Community Helper 🤝';
  }

  // Content creator (lots of posts)
  if (commentToPostRatio < 0.5) {
    return 'Content Creator 📝';
  }

  return 'Reddit Explorer 🌍';
}

/**
 * Generate user badges based on behavior
 */
function generateBadges(
  profile: RedditUser,
  posts: RedditPost[],
  comments: RedditComment[],
  activityPattern: ActivityPattern
): string[] {
  const badges: string[] = [];

  // Account age badges
  const accountAgeYears = (Date.now() / 1000 - profile.created_utc) / (365 * 24 * 60 * 60);
  if (accountAgeYears >= 10) badges.push('Decade Club 🏆');
  else if (accountAgeYears >= 5) badges.push('5 Year Club ⭐');
  else if (accountAgeYears >= 1) badges.push('1 Year Club 🎂');

  // Karma badges
  if (profile.total_karma >= 100000) badges.push('Karma Millionaire 💰');
  else if (profile.total_karma >= 50000) badges.push('High Karma 📈');
  else if (profile.total_karma >= 10000) badges.push('Rising Star ✨');

  // Activity time badges
  const mostActiveHour = activityPattern.hourOfDay.indexOf(Math.max(...activityPattern.hourOfDay));
  if (mostActiveHour >= 0 && mostActiveHour < 6) badges.push('Night Owl 🦉');
  else if (mostActiveHour >= 6 && mostActiveHour < 12) badges.push('Early Bird 🌅');

  const weekendActivity =
    (activityPattern.dayOfWeek[0] || 0) + (activityPattern.dayOfWeek[6] || 0);
  const weekdayActivity = activityPattern.dayOfWeek
    .slice(1, 6)
    .reduce((sum, count) => sum + count, 0);
  if (weekendActivity > weekdayActivity) badges.push('Weekend Warrior 🎉');

  // Engagement badges
  if (comments.length > posts.length * 5) badges.push('Conversation Starter 💬');
  if (posts.length > comments.length * 2) badges.push('Content Machine 📹');

  // Quality badges
  const avgPostScore = posts.reduce((sum, p) => sum + p.score, 0) / (posts.length || 1);
  if (avgPostScore > 100) badges.push('Quality Poster 🎯');

  // Gold badge
  if (profile.is_gold) badges.push('Reddit Premium 👑');

  return badges;
}

/**
 * Determine comment style
 */
function determineCommentStyle(comments: RedditComment[]): string {
  if (comments.length === 0) return 'Silent Observer';

  const avgLength = comments.reduce((sum, c) => sum + c.body.length, 0) / comments.length;
  const questionCount = comments.filter((c) => c.body.includes('?')).length;
  const questionRatio = questionCount / comments.length;

  if (avgLength > 500) return 'Essay Writer 📚';
  if (avgLength < 50) return 'Quick Responder ⚡';
  if (questionRatio > 0.3) return 'Curious Questioner ❓';

  return 'Balanced Commenter 💭';
}

/**
 * Extract topics of interest from subreddit names
 */
function extractTopics(topSubreddits: SubredditActivity[]): string[] {
  const topics = new Set<string>();

  const categoryMap: Record<string, string[]> = {
    Technology: ['programming', 'coding', 'technology', 'webdev', 'javascript', 'python'],
    Gaming: ['gaming', 'games', 'pcgaming', 'ps5', 'xbox', 'nintendo'],
    News: ['news', 'worldnews', 'politics'],
    Entertainment: ['movies', 'television', 'music', 'netflix'],
    Sports: ['sports', 'nba', 'nfl', 'soccer', 'formula1'],
    Memes: ['memes', 'dankmemes', 'funny', 'me_irl'],
    Science: ['science', 'space', 'physics', 'askscience'],
    Lifestyle: ['fitness', 'food', 'cooking', 'travel'],
  };

  for (const subreddit of topSubreddits.slice(0, 5)) {
    const subName = subreddit.name.toLowerCase();
    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (keywords.some((kw) => subName.includes(kw))) {
        topics.add(category);
      }
    }
  }

  return Array.from(topics);
}

/**
 * Main analysis function
 */
export function analyzeUserData(
  profile: RedditUser,
  posts: RedditPost[],
  comments: RedditComment[]
): WrappedStats {
  const topSubreddits = analyzeSubreddits(posts, comments);
  const activityPattern = analyzeActivityPattern(posts, comments);

  const topPost = posts.length > 0 ? posts.reduce((max, p) => (p.score > max.score ? p : max)) : null;
  const topComment =
    comments.length > 0 ? comments.reduce((max, c) => (c.score > max.score ? c : max)) : null;

  const mostActiveHour = activityPattern.hourOfDay.indexOf(
    Math.max(...activityPattern.hourOfDay)
  );
  const mostActiveDay = activityPattern.dayOfWeek.indexOf(Math.max(...activityPattern.dayOfWeek));

  const avgPostScore = posts.length > 0 ? posts.reduce((sum, p) => sum + p.score, 0) / posts.length : 0;
  const avgCommentScore =
    comments.length > 0 ? comments.reduce((sum, c) => sum + c.score, 0) / comments.length : 0;

  const personality = determinePersonality(topSubreddits, posts, comments);
  const badges = generateBadges(profile, posts, comments, activityPattern);
  const commentStyle = determineCommentStyle(comments);
  const topicsOfInterest = extractTopics(topSubreddits);

  const allTexts = [
    ...posts.map((p) => p.title + ' ' + p.selftext),
    ...comments.map((c) => c.body),
  ];
  const sentimentScore = calculateSentiment(allTexts);

  // Calculate controversial score (posts/comments with negative scores)
  const negativeItems = [...posts, ...comments].filter((item) => item.score < 0).length;
  const controversialScore = (negativeItems / (posts.length + comments.length)) * 100;

  const insights: UserInsights = {
    personality,
    badges,
    commentStyle,
    topicsOfInterest,
    controversialScore: Math.round(controversialScore),
    sentimentScore: Math.round(sentimentScore),
  };

  const accountAge = Math.floor((Date.now() / 1000 - profile.created_utc) / (365 * 24 * 60 * 60));

  const mostActiveSeason = activityPattern.seasonalActivity.indexOf(
    Math.max(...activityPattern.seasonalActivity)
  );

  return {
    totalPosts: posts.length,
    totalComments: comments.length,
    totalKarma: profile.total_karma,
    postKarma: profile.link_karma,
    commentKarma: profile.comment_karma,
    topSubreddits,
    topPost,
    topComment,
    accountAge,
    activityPattern,
    insights,
    avgPostScore: Math.round(avgPostScore),
    avgCommentScore: Math.round(avgCommentScore),
    mostActiveHour,
    mostActiveDay,
    mostActiveSeason,
  };
}
