# Debugging Guide for Reddit Wrapped

## Current Issue
The app shows "0 contributions" despite users having posts and comments. This guide will help you diagnose and fix the issue.

## Step 1: Login to Devvit

Before you can test the app, you need to authenticate with Devvit:

```bash
npx devvit login
```

This will open a browser window for you to authenticate with your Reddit account.

## Step 2: Verify Authentication

```bash
npx devvit whoami
```

This should display your Reddit username if authentication was successful.

## Step 3: Run Development Server

Start the development server with all components:

```bash
npm run dev
```

This will start:
- CLIENT: Frontend build (Vite)
- SERVER: Backend build (Vite + Express)
- DEVVIT: Playtest environment

## Step 4: Test with a Known Public Profile

Once the playtest is running, test with well-known public Reddit accounts:

1. **spez** (Reddit CEO) - Known to have activity
2. **reddit** (Official Reddit account)
3. **AutoModerator** (Bot account with extensive activity)

## Step 5: Check Console Logs

With the enhanced logging we added, you should see detailed output like:

```
[Profile] Fetching profile for user: spez
[Profile] User details: { username: 'spez', linkKarma: XXXXX, commentKarma: XXXXX, createdAt: ... }
[Posts] Fetching up to 500 posts for user: spez
[Posts] Successfully fetched XX posts
[Posts] Sample post: { id: ..., title: ..., score: ..., subreddit: ... }
[Posts] Mapped XX posts with total score: XXXXX
[Comments] Fetching up to 500 comments for user: spez
[Comments] Successfully fetched XX comments
[Comments] Sample comment: { id: ..., body: ..., score: ..., subreddit: ... }
[Comments] Mapped XX comments with total score: XXXXX
```

## Step 6: Analyze the Logs

### If you see "0 contributions":

**Check for these patterns:**

1. **Private Profile Error:**
   ```
   [Profile] Could not fetch profile for username:
   ```
   → User has a private profile or doesn't exist

2. **Empty Arrays:**
   ```
   [Posts] Successfully fetched 0 posts
   [Comments] Successfully fetched 0 comments
   ```
   → User exists but has no public activity OR API is not returning data

3. **API Errors:**
   ```
   Error fetching user posts: 403 Forbidden
   ```
   → App doesn't have permission to access the data

### If data is fetched but shows as 0:

4. **Check the analyzer logic** in `src/server/services/analyzer.ts`:
   - Verify that `totalContributions` is calculated correctly
   - Check if posts/comments arrays are being passed correctly

5. **Check the frontend display** in `src/client/components/WrappedSlides.tsx`:
   - Verify that the stats are being displayed from the correct properties

## Step 7: Manual API Test

If logs show data is fetched but not displayed, test the API endpoint directly:

```bash
# While dev server is running
curl http://localhost:3000/api/analyze/spez
```

This should return JSON with the wrapped stats. Verify:
- `totalContributions` is not 0
- `postKarma` and `commentKarma` have values
- `posts` and `comments` arrays have items

## Common Issues and Solutions

### Issue 1: Authentication Error (401 Unauthorized)
**Solution:** Run `npx devvit login` and authenticate

### Issue 2: Private Profile / No Access
**Solution:** Test with known public profiles like "spez" or "reddit"

### Issue 3: Rate Limiting
**Solution:** 
- Wait a few minutes between requests
- Consider adding caching (already implemented with 1-hour TTL)

### Issue 4: Data Fetched but Shows as 0

**Possible causes:**
1. **Analyzer not summing correctly** - Check `src/server/services/analyzer.ts`
2. **Frontend not reading stats** - Check `useWrapped.ts` and `WrappedSlides.tsx`
3. **Type mismatch** - Verify types in `src/shared/types/api.ts`

**Debug steps:**
```bash
# Check if analyzer is working
cd src/server/services
# Add console.log in analyzer.ts before returning stats
```

### Issue 5: Devvit Playtest Fails to Start

**Solution:**
```bash
# Clean build and reinstall
rm -rf node_modules dist
npm install
npm run dev
```

## Enhanced Logging Added

We've added comprehensive logging throughout the codebase:

### In `redditApi.ts`:
- `[Profile]` - User profile fetching
- `[Posts]` - Post fetching with sample data
- `[Comments]` - Comment fetching with sample data
- Total scores calculated and logged

### In `analyzer.ts`:
- Activity pattern analysis
- Top subreddit calculations
- Score aggregations

### In `index.ts`:
- API endpoint hits
- Request parameters
- Response status
- Cache hits/misses

## API Properties Confirmed

According to Devvit API v0.12.2 documentation:

### User Object:
- ✅ `linkKarma: number` - The amount of link karma
- ✅ `commentKarma: number` - The amount of comment karma
- ✅ `username: string` - Username without u/ prefix
- ✅ `createdAt: Date` - Account creation date
- ✅ `id: string` - User ID starting with t2_

### Post Object:
- ✅ `score: number` - Post score/karma
- ✅ `title: string` - Post title
- ✅ `body: string | undefined` - Post body (for text posts)
- ✅ `subredditName: string` - Subreddit name
- ✅ `numberOfComments: number` - Comment count
- ✅ `createdAt: Date` - Post creation date
- ✅ `url: string` - Post URL
- ✅ `permalink: string` - Relative permalink

### Comment Object:
- ✅ `score: number` - Comment score/karma
- ✅ `body: string` - Comment text
- ✅ `subredditName: string` - Subreddit name
- ✅ `createdAt: Date` - Comment creation date
- ✅ `permalink: string` - Relative permalink

All the properties we're using in the code are **confirmed to exist** in the Devvit API.

## Next Steps

1. **Login to Devvit** (if not already done)
2. **Run the dev server** and monitor console output
3. **Test with "spez"** or another known active public profile
4. **Share the console logs** if the issue persists

## Potential Improvements

Based on Devvit API capabilities, here are additional features we could add:

### 1. **User Avatar/Snoovatar**
```typescript
const snoovatarUrl = await user.getSnoovatarUrl();
// Display user's avatar in the wrapped
```

### 2. **User Social Links**
```typescript
const socialLinks = await user.getSocialLinks();
// Show connected social media
```

### 3. **User Flair in Favorite Subreddit**
```typescript
const userFlair = await user.getUserFlairBySubreddit(topSubreddit);
// Display flair information
```

### 4. **Post Media/Gallery**
```typescript
const gallery = post.gallery;
// Show top post with images
```

### 5. **Post Thumbnail**
```typescript
const thumbnail = await post.getEnrichedThumbnail();
// Show post preview with thumbnail
```

### 6. **Comment Context**
```typescript
const parentPost = await comment.post;
// Show what post the top comment was on
```

### 7. **Moderation Stats** (if user is a mod)
```typescript
const modPermissions = user.modPermissions;
// Show which subreddits they moderate
```

### 8. **Awards/Distinctions**
```typescript
const distinguished = post.distinguishedBy;
// Show if posts were distinguished (mod/admin)
```

### 9. **Edit History**
```typescript
const edited = post.edited;
// Show activity patterns around edited posts
```

### 10. **Engagement Metrics**
- Average score per post/comment
- Best time to post (highest engagement)
- Engagement rate (score vs comments)
- Upvote ratio patterns

## Sample Test Script

Here's a test script you can run to verify the API:

```bash
# Save this as test-api.sh
#!/bin/bash

# Test with multiple known users
for user in spez reddit AutoModerator; do
    echo "Testing user: $user"
    curl -s http://localhost:3000/api/analyze/$user | jq '.totalContributions, .postKarma, .commentKarma'
    echo "---"
    sleep 2
done
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh
```

## Contact for Help

If the issue persists after following this guide:

1. **Share console logs** from the dev server
2. **Share the output** of testing with "spez" profile
3. **Share the API response** from curl test
4. **Check the Devvit Discord** for community support: https://discord.gg/Cd43ExtEFS
5. **Review r/Devvit** subreddit for similar issues
