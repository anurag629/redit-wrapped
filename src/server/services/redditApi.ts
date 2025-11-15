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
  const posts: RedditPost[] = [];

  try {
    const listing = await reddit.getPostsByUser({
      username,
      limit,
      sort: 'new',
    });

    for (const post of listing.children) {
      posts.push({
        id: post.id,
        title: post.title,
        subreddit: post.subredditName,
        score: post.score,
        num_comments: post.numberOfComments,
        created_utc: post.createdAt.getTime() / 1000,
        selftext: post.body || '',
        url: post.url,
        permalink: post.permalink,
      });

      if (posts.length >= limit) break;
    }

    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new RedditApiError('Failed to fetch user posts', 'FETCH_ERROR');
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
  const comments: RedditComment[] = [];

  try {
    const listing = await reddit.getCommentsByUser({
      username,
      limit,
      sort: 'new',
    });

    for (const comment of listing.children) {
      comments.push({
        id: comment.id,
        body: comment.body || '',
        subreddit: comment.subredditName,
        score: comment.score,
        created_utc: comment.createdAt.getTime() / 1000,
        permalink: comment.permalink,
      });

      if (comments.length >= limit) break;
    }

    return comments;
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw new RedditApiError('Failed to fetch user comments', 'FETCH_ERROR');
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
  const [profile, posts, comments] = await Promise.all([
    fetchUserProfile(reddit, username),
    fetchUserPosts(reddit, username, limit),
    fetchUserComments(reddit, username, limit),
  ]);

  return { profile, posts, comments };
}
