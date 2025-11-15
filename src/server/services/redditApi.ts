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
    console.log(`[Profile] Fetching profile for: ${username}`);
    const user = await reddit.getUserByUsername(username);

    if (!user) {
      throw new RedditApiError(`User "${username}" not found`, 'USER_NOT_FOUND');
    }

    console.log(`[Profile] Found user: ${user.username}`);
    console.log(`[Profile] Link Karma: ${user.linkKarma}`);
    console.log(`[Profile] Comment Karma: ${user.commentKarma}`);
    console.log(`[Profile] Created At: ${user.createdAt}`);

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
    console.error('[Profile] Error fetching user profile:', error);
    throw new RedditApiError('Failed to fetch user profile', 'UNKNOWN_ERROR');
  }
}

/**
 * Fetch user posts using Devvit's Reddit API
 * @param reddit - RedditAPIClient instance
 * @param username - Reddit username
 * @param limit - Maximum number of posts to fetch (default: no limit, fetches all)
 */
export async function fetchUserPosts(
  reddit: RedditAPIClient,
  username: string,
  limit?: number
): Promise<RedditPost[]> {
  try {
    console.log(`[Posts] Fetching ${limit ? `up to ${limit}` : 'ALL'} posts for user: ${username}`);

    // Create listing - if limit is not specified, use a very high number to get all posts
    const listing = reddit.getPostsByUser({
      username,
      limit: limit || 10000, // Use high limit to fetch all available posts
      sort: 'new',
      pageSize: 100, // Max page size for efficiency
    });

    // Fetch all posts from the listing
    let redditPosts;
    try {
      redditPosts = await listing.all();
      console.log(`[Posts] Successfully fetched ${redditPosts.length} posts`);
      
      // Log first post details if available
      if (redditPosts.length > 0 && redditPosts[0]) {
        const firstPost = redditPosts[0];
        console.log(`[Posts] Sample post:`, {
          id: firstPost.id,
          title: firstPost.title,
          score: firstPost.score,
          subreddit: firstPost.subredditName,
        });
      }
    } catch (err) {
      console.warn(`[Posts] Could not fetch posts for ${username}:`, err);
      // Return empty array if user has private profile or no posts
      return [];
    }

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

    console.log(`[Posts] Mapped ${posts.length} posts with total score: ${posts.reduce((sum, p) => sum + p.score, 0)}`);
    return posts;
  } catch (error) {
    console.error('[Posts] Error fetching user posts:', error);
    // Don't throw error, return empty array for graceful handling
    return [];
  }
}

/**
 * Fetch user comments using Devvit's Reddit API
 * @param reddit - RedditAPIClient instance
 * @param username - Reddit username
 * @param limit - Maximum number of comments to fetch (default: no limit, fetches all)
 */
export async function fetchUserComments(
  reddit: RedditAPIClient,
  username: string,
  limit?: number
): Promise<RedditComment[]> {
  try {
    console.log(`[Comments] Fetching ${limit ? `up to ${limit}` : 'ALL'} comments for user: ${username}`);

    // Create listing - if limit is not specified, use a very high number to get all comments
    const listing = reddit.getCommentsByUser({
      username,
      limit: limit || 10000, // Use high limit to fetch all available comments
      sort: 'new',
      pageSize: 100, // Max page size for efficiency
    });

    // Fetch all comments from the listing
    let redditComments;
    try {
      redditComments = await listing.all();
      console.log(`[Comments] Successfully fetched ${redditComments.length} comments`);
      
      // Log first comment details if available
      if (redditComments.length > 0 && redditComments[0]) {
        const firstComment = redditComments[0];
        console.log(`[Comments] Sample comment:`, {
          id: firstComment.id,
          body: firstComment.body ? firstComment.body.substring(0, 50) + '...' : '',
          score: firstComment.score,
          subreddit: firstComment.subredditName,
        });
      }
    } catch (err) {
      console.warn(`[Comments] Could not fetch comments for ${username}:`, err);
      // Return empty array if user has private profile or no comments
      return [];
    }

    const comments: RedditComment[] = redditComments.map((comment) => ({
      id: comment.id,
      body: comment.body || '',
      subreddit: comment.subredditName,
      score: comment.score,
      created_utc: comment.createdAt.getTime() / 1000,
      permalink: comment.permalink,
    }));

    console.log(`[Comments] Mapped ${comments.length} comments with total score: ${comments.reduce((sum, c) => sum + c.score, 0)}`);
    return comments;
  } catch (error) {
    console.error('[Comments] Error fetching user comments:', error);
    // Don't throw error, return empty array for graceful handling
    return [];
  }
}

/**
 * Fetch complete user data (profile, posts, comments)
 * @param reddit - RedditAPIClient instance
 * @param username - Reddit username
 * @param limit - Optional limit for posts/comments. If not specified, fetches all available data
 */
export async function fetchCompleteUserData(
  reddit: RedditAPIClient,
  username: string,
  limit?: number
) {
  console.log(`Starting data fetch for user: ${username} ${limit ? `(limit: ${limit})` : '(fetching ALL)'}`);

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
