// Reddit Wrapped Types
export interface RedditUser {
  name: string;
  created_utc: number;
  link_karma: number;
  comment_karma: number;
  total_karma: number;
  is_gold: boolean;
  is_mod: boolean;
  verified: boolean;
}

export interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  score: number;
  num_comments: number;
  created_utc: number;
  selftext: string;
  url: string;
  permalink: string;
}

export interface RedditComment {
  id: string;
  body: string;
  subreddit: string;
  score: number;
  created_utc: number;
  permalink: string;
}

export interface SubredditActivity {
  name: string;
  postCount: number;
  commentCount: number;
  totalScore: number;
}

export interface ActivityPattern {
  hourOfDay: number[];
  dayOfWeek: number[];
  monthlyActivity: { month: string; count: number }[];
  seasonalActivity: number[];
}

export interface Milestone {
  title: string;
  description: string;
  icon: string;
  date?: string;
}

export interface ImpactStats {
  totalEngagement: number;
  totalReplies: number;
  avgRepliesPerPost: number;
  avgRepliesPerComment: number;
  uniqueInteractions: number;
  discussionsStarted: number;
}

export interface WordStats {
  word: string;
  count: number;
}

export interface UserInsights {
  personality: string;
  badges: string[];
  commentStyle: string;
  topicsOfInterest: string[];
  controversialScore: number;
  sentimentScore: number;
  topWords: WordStats[];
  milestones: Milestone[];
  impact: ImpactStats;
}

export interface WrappedStats {
  totalPosts: number;
  totalComments: number;
  totalKarma: number;
  postKarma: number;
  commentKarma: number;
  topSubreddits: SubredditActivity[];
  topPost: RedditPost | null;
  topComment: RedditComment | null;
  accountAge: number;
  activityPattern: ActivityPattern;
  insights: UserInsights;
  avgPostScore: number;
  avgCommentScore: number;
  mostActiveHour: number;
  mostActiveDay: number;
  mostActiveSeason: number;
}

export interface AnalyzeRequest {
  username: string;
  limit?: number;
}

export interface AnalyzeResponse {
  type: 'analyze';
  username: string;
  stats: WrappedStats;
  generatedAt: number;
}

export interface ErrorResponse {
  type: 'error';
  message: string;
  code?: string;
}

// Legacy counter types (keeping for backwards compatibility)
export type InitResponse = {
  type: 'init';
  postId: string;
  count: number;
  username: string;
};

export type IncrementResponse = {
  type: 'increment';
  postId: string;
  count: number;
};

export type DecrementResponse = {
  type: 'decrement';
  postId: string;
  count: number;
};
