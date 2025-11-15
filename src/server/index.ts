import express from 'express';
import {
  InitResponse,
  IncrementResponse,
  DecrementResponse,
  AnalyzeRequest,
  AnalyzeResponse,
  ErrorResponse,
} from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';
import { fetchCompleteUserData, RedditApiError } from './services/redditApi';
import { analyzeUserData } from './services/analyzer';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      const [count, username] = await Promise.all([
        redis.get('count'),
        reddit.getCurrentUsername(),
      ]);

      res.json({
        type: 'init',
        postId: postId,
        count: count ? parseInt(count) : 0,
        username: username ?? 'anonymous',
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

router.post<{ postId: string }, IncrementResponse | { status: string; message: string }, unknown>(
  '/api/increment',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', 1),
      postId,
      type: 'increment',
    });
  }
);

router.post<{ postId: string }, DecrementResponse | { status: string; message: string }, unknown>(
  '/api/decrement',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', -1),
      postId,
      type: 'decrement',
    });
  }
);

router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Reddit Wrapped Endpoints
router.post<unknown, AnalyzeResponse | ErrorResponse, AnalyzeRequest>(
  '/api/analyze',
  async (req, res): Promise<void> => {
    try {
      const { username, limit = 500 } = req.body;

      if (!username || typeof username !== 'string') {
        res.status(400).json({
          type: 'error',
          message: 'Username is required',
          code: 'INVALID_REQUEST',
        });
        return;
      }

      // Clean username (remove u/ prefix if present)
      const cleanUsername = username.replace(/^u\//, '').trim();

      if (!cleanUsername) {
        res.status(400).json({
          type: 'error',
          message: 'Invalid username',
          code: 'INVALID_USERNAME',
        });
        return;
      }

      // Check cache first
      const cacheKey = `wrapped:${cleanUsername}`;
      const cached = await redis.get(cacheKey);

      if (cached) {
        console.log(`Cache hit for user: ${cleanUsername}`);
        res.json(JSON.parse(cached));
        return;
      }

      console.log(`Fetching data for user: ${cleanUsername}`);

      // Fetch Reddit data
      const { profile, posts, comments } = await fetchCompleteUserData(reddit as any, cleanUsername, limit);

      // Check if we have any data
      if (posts.length === 0 && comments.length === 0) {
        console.warn(`No data available for user: ${cleanUsername}`);
        res.status(404).json({
          type: 'error',
          message: 'No public posts or comments found for this user. The profile may be private, suspended, or have no activity.',
          code: 'NO_DATA_AVAILABLE',
        });
        return;
      }

      // Analyze data
      const stats = analyzeUserData(profile, posts, comments);

      const response: AnalyzeResponse = {
        type: 'analyze',
        username: cleanUsername,
        stats,
        generatedAt: Date.now(),
      };

      // Cache for 1 hour (3600 seconds)
      await redis.set(cacheKey, JSON.stringify(response), { expiration: new Date(Date.now() + 3600000) });

      res.json(response);
    } catch (error) {
      if (error instanceof RedditApiError) {
        res.status(error.code === 'USER_NOT_FOUND' ? 404 : 400).json({
          type: 'error',
          message: error.message,
          code: error.code,
        });
        return;
      }

      console.error('Error analyzing user:', error);
      res.status(500).json({
        type: 'error',
        message: 'Failed to analyze user profile',
        code: 'INTERNAL_ERROR',
      });
    }
  }
);

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
