import type { RedditUser, RedditPost, RedditComment } from '../../shared/types/api';

const REDDIT_BASE_URL = 'https://www.reddit.com';
const USER_AGENT = 'RedditWrapped/1.0';

// Rate limiting helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
 * Fetch user profile information
 */
export async function fetchUserProfile(username: string): Promise<RedditUser> {
  try {
    const response = await fetch(`${REDDIT_BASE_URL}/user/${username}/about.json`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    if (response.status === 404) {
      throw new RedditApiError(`User "${username}" not found`, 'USER_NOT_FOUND');
    }

    if (!response.ok) {
      throw new RedditApiError(
        `Failed to fetch user profile: ${response.statusText}`,
        'FETCH_ERROR'
      );
    }

    const data = (await response.json()) as { data: Record<string, unknown> };
    const user = data.data;

    return {
      name: user.name as string,
      created_utc: user.created_utc as number,
      link_karma: (user.link_karma as number) || 0,
      comment_karma: (user.comment_karma as number) || 0,
      total_karma: (user.total_karma as number) || 0,
      is_gold: (user.is_gold as boolean) || false,
      is_mod: (user.is_mod as boolean) || false,
      verified: (user.verified as boolean) || false,
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
 * Fetch user posts with pagination
 */
export async function fetchUserPosts(
  username: string,
  limit = 100
): Promise<RedditPost[]> {
  const posts: RedditPost[] = [];
  let after: string | null = null;
  const maxRequests = Math.ceil(limit / 100);

  try {
    for (let i = 0; i < maxRequests; i++) {
      const url = new URL(`${REDDIT_BASE_URL}/user/${username}/submitted.json`);
      url.searchParams.set('limit', '100');
      url.searchParams.set('raw_json', '1');
      if (after) {
        url.searchParams.set('after', after);
      }

      const response = await fetch(url.toString(), {
        headers: {
          'User-Agent': USER_AGENT,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch posts: ${response.statusText}`);
        break;
      }

      const data = (await response.json()) as {
        data: { children: { data: Record<string, unknown> }[]; after: string | null };
      };
      const children = data.data.children || [];

      for (const child of children) {
        const post = child.data;
        posts.push({
          id: post.id as string,
          title: post.title as string,
          subreddit: post.subreddit as string,
          score: post.score as number,
          num_comments: post.num_comments as number,
          created_utc: post.created_utc as number,
          selftext: (post.selftext as string) || '',
          url: post.url as string,
          permalink: post.permalink as string,
        });

        if (posts.length >= limit) break;
      }

      after = data.data.after;
      if (!after || posts.length >= limit) break;

      // Rate limiting: wait 1 second between requests
      await delay(1000);
    }

    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw new RedditApiError('Failed to fetch user posts', 'FETCH_ERROR');
  }
}

/**
 * Fetch user comments with pagination
 */
export async function fetchUserComments(
  username: string,
  limit = 100
): Promise<RedditComment[]> {
  const comments: RedditComment[] = [];
  let after: string | null = null;
  const maxRequests = Math.ceil(limit / 100);

  try {
    for (let i = 0; i < maxRequests; i++) {
      const url = new URL(`${REDDIT_BASE_URL}/user/${username}/comments.json`);
      url.searchParams.set('limit', '100');
      url.searchParams.set('raw_json', '1');
      if (after) {
        url.searchParams.set('after', after);
      }

      const response = await fetch(url.toString(), {
        headers: {
          'User-Agent': USER_AGENT,
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch comments: ${response.statusText}`);
        break;
      }

      const data = (await response.json()) as {
        data: { children: { data: Record<string, unknown> }[]; after: string | null };
      };
      const children = data.data.children || [];

      for (const child of children) {
        const comment = child.data;
        comments.push({
          id: comment.id as string,
          body: (comment.body as string) || '',
          subreddit: comment.subreddit as string,
          score: comment.score as number,
          created_utc: comment.created_utc as number,
          permalink: comment.permalink as string,
        });

        if (comments.length >= limit) break;
      }

      after = data.data.after;
      if (!after || comments.length >= limit) break;

      // Rate limiting: wait 1 second between requests
      await delay(1000);
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
export async function fetchCompleteUserData(username: string, limit = 100) {
  const [profile, posts, comments] = await Promise.all([
    fetchUserProfile(username),
    fetchUserPosts(username, limit),
    fetchUserComments(username, limit),
  ]);

  return { profile, posts, comments };
}
