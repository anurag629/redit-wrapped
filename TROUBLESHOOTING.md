# Reddit Wrapped - Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Shows 0 contributions / No data displayed

**Cause:** Reddit's API has privacy restrictions. The app can only fetch data from:
- Public profiles
- Users with public post/comment history
- Non-suspended accounts

**What was fixed:**
1. Improved error handling to gracefully handle empty data
2. Added helpful error messages when no data is available
3. Changed error responses to return empty arrays instead of throwing errors
4. Added validation to check if user has any public activity

**Error message you'll see:**
```
No public posts or comments found for this user. The profile may be private, suspended, or have no activity.
```

**Solutions:**
- Try with a different username that has public activity
- Make sure the username is spelled correctly
- Test with known public accounts like "spez" or other Reddit admins

### Issue 2: Button Overlap on Slides

**Cause:** Navigation buttons at the bottom were overlapping with slide content on smaller screens or long content.

**What was fixed:**
1. Moved navigation buttons from `bottom-8` to `bottom-20` (more clearance)
2. Moved slide counter from `bottom-8` to `bottom-4`
3. Added `pb-32` (bottom padding) to all slide containers
4. Added `overflow-y-auto` to slides with lots of content
5. Created utility CSS class for consistent spacing

**Result:** Content now has proper spacing and doesn't overlap with controls.

### Issue 3: Data Fetching for Private/Limited Profiles

**Devvit API Limitations:**
According to Devvit documentation, you **cannot** bypass Reddit's privacy settings:
- Private profiles remain private
- Deleted content is not accessible
- Suspended accounts cannot be queried

**What the app does now:**
- Attempts to fetch user data
- If no posts/comments are returned, shows a helpful message
- Doesn't fail completely - shows what data is available
- User karma is still shown from profile even if posts/comments are private

## Testing Recommendations

### Test with these known public accounts:
```
spez (Reddit CEO - lots of activity)
reddit (Official Reddit account)
AutoModerator (Bot account)
```

### Debugging Steps:

1. **Check browser console for errors:**
   ```javascript
   // Open DevTools (F12) and check Console tab
   ```

2. **Check server logs:**
   ```bash
   npm run dev
   # Watch the terminal for error messages
   ```

3. **Test the API directly:**
   ```bash
   # In your browser's DevTools Console:
   fetch('/api/analyze', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ username: 'spez', limit: 100 })
   }).then(r => r.json()).then(console.log)
   ```

## Recent Improvements

### Data Fetching
- ✅ Increased limit from 100 to 500 posts/comments
- ✅ Better error handling for private profiles
- ✅ Graceful degradation when data is unavailable
- ✅ Improved error messages

### UI/UX
- ✅ Fixed button overlap issues
- ✅ Added proper padding to all slides
- ✅ Made slides scrollable for long content
- ✅ Improved accessibility with ARIA labels
- ✅ Added touch gestures for mobile
- ✅ Progress saving across sessions

### Features Added
- ✅ Seasonal activity tracking
- ✅ Social sharing buttons
- ✅ Error retry functionality
- ✅ Session resume capability
- ✅ Enhanced keyboard navigation

## Known Limitations

1. **Reddit API Restrictions:**
   - Cannot access private profiles
   - Cannot fetch deleted content
   - Limited to public post/comment history
   - Rate limits may apply for excessive requests

2. **Devvit Platform Constraints:**
   - No way to bypass Reddit's privacy settings
   - Must comply with Devvit safety rules
   - Cannot profile users based on sensitive data

3. **Data Accuracy:**
   - Limited to last 500 posts/comments (configurable)
   - Historical data may be incomplete
   - Karma counts from profile (may not match post/comment totals)

## Support

For more help:
- Check [Devvit Documentation](https://developers.reddit.com/docs/)
- Visit [r/devvit](https://www.reddit.com/r/devvit/)
- Join [Devvit Discord](https://discord.gg/Cd43ExtEFS)

## Development Tips

### Running the app:
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run deploy     # Deploy to Reddit
```

### Checking logs:
```bash
# Watch server logs
devvit logs <subreddit-name>

# View in real-time
devvit logs <subreddit-name> --since 1h
```

### Common fixes:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build

# Reset Devvit
devvit playtest --reset
```
