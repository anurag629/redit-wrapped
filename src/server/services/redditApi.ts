import type { RedditAPIClient } from '@devvit/public-api';
import type { RedditUser, RedditPost, RedditComment } from '../../shared/types/api';

export class RedditApiError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'RedditApiError';
  }
}

/**
 * Fetch user profile information using Devvit's Reddit API
 */
export async function fetchUserProfile(
  reddit: RedditAPIClient,
  username: string
): Promise<RedditUser> {
  try {
    const user = await reddit.getUserByUsername(username);

    if (!user) {
      throw new RedditApiError(`User "${username}" not found`, 'USER_NOT_FOUND');
    }

    return {
      name: user.username,
      created_utc: user.createdAt.getTime() / 1000,
      link_karma: user.linkKarma || 0,
      comment_karma: user.commentKarma || 0,
      total_karma: (user.linkKarma || 0) + (user.commentKarma || 0),
      is_gold: false, // Not available in Devvit API
      is_mod: false, // Would need additional check
      verified: false, // Not available in Devvit API
    };
  } catch (error) {
    if (error instanceof RedditApiError) {
      throw error;
    }
    console.error('Error fetching user profile:', error);
    throw new RedditApiError('Failed to fetch user profile', 'UNKNOWN_ERROR');
  }
}

/**
 * Fetch user posts using Devvit's Reddit API
 */
export async function fetchUserPosts(
  reddit: RedditAPIClient,
  username: string,
  limit = 100
): Promise<RedditPost[]> {
  try {
    console.log(`Fetching up to ${limit} posts for user: ${username}`);

    const listing = reddit.getPostsByUser({
      username,
      limit,
      sort: 'new',
      pageSize: Math.min(limit, 100),
    });

    // Fetch all posts from the listing
    let redditPosts;
    try {
      redditPosts = await listing.all();
    } catch (err) {
      console.warn(`Could not fetch posts for ${username}:`, err);
      // Return empty array if user has private profile or no posts
      return [];
    }

    console.log(`Fetched ${redditPosts.length} posts`);

    const posts: RedditPost[] = redditPosts.map((post) => ({
      id: post.id,
      title: post.title,
      subreddit: post.subredditName,
      score: post.score,
      num_comments: post.numberOfComments,
      created_utc: post.createdAt.getTime() / 1000,
      selftext: post.body || '',
      url: post.url,
      permalink: post.permalink,
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    // Don't throw error, return empty array for graceful handling
    return [];
  }
}

/**
 * Fetch user comments using Devvit's Reddit API
 */
export async function fetchUserComments(
  reddit: RedditAPIClient,
  username: string,
  limit = 100
): Promise<RedditComment[]> {
  try {
    console.log(`Fetching up to ${limit} comments for user: ${username}`);

    const listing = reddit.getCommentsByUser({
      username,
      limit,
      sort: 'new',
      pageSize: Math.min(limit, 100),
    });

    // Fetch all comments from the listing
    let redditComments;
    try {
      redditComments = await listing.all();
    } catch (err) {
      console.warn(`Could not fetch comments for ${username}:`, err);
      // Return empty array if user has private profile or no comments
      return [];
    }

    console.log(`Fetched ${redditComments.length} comments`);

    const comments: RedditComment[] = redditComments.map((comment) => ({
      id: comment.id,
      body: comment.body || '',
      subreddit: comment.subredditName,
      score: comment.score,
      created_utc: comment.createdAt.getTime() / 1000,
      permalink: comment.permalink,
    }));

    return comments;
  } catch (error) {
    console.error('Error fetching user comments:', error);
    // Don't throw error, return empty array for graceful handling
    return [];
  }
}

/**
 * Fetch complete user data (profile, posts, comments)
 */
export async function fetchCompleteUserData(
  reddit: RedditAPIClient,
  username: string,
  limit = 100
) {
  console.log(`Starting data fetch for user: ${username}`);

  const [profile, posts, comments] = await Promise.all([
    fetchUserProfile(reddit, username),
    fetchUserPosts(reddit, username, limit),
    fetchUserComments(reddit, username, limit),
  ]);

  console.log(
    `Completed data fetch for ${username}: ${posts.length} posts, ${comments.length} comments`
  );

  return { profile, posts, comments };
}
