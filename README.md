# Reddit Wrapped 2024 🎉

An immersive, Spotify Wrapped-style experience for Reddit users to visualize their yearly activity, engagement, and contributions on the platform.

## 🌟 Features

### Core Statistics
- **Total Contributions**: ALL posts and comments (no limits!)
- **Karma Breakdown**: Post karma vs comment karma from complete history
- **Top Subreddits**: Most active communities with detailed stats
- **Top Post**: Your most upvoted post with direct link
- **Top Comment**: Your highest-scoring comment with context link
- **Activity Patterns**: Hourly, daily, and monthly trends across all activity
- **Seasonal Activity**: Breakdown by Winter, Spring, Summer, Fall
- **Personality Insights**: AI-analyzed personality type and comment style
- **Achievement Badges**: Earned based on comprehensive activity patterns

### User Experience
- **🎨 Beautiful UI**: Gradient backgrounds, smooth animations, glassmorphism effects
- **📱 Mobile-First**: Touch gestures, swipe navigation, responsive design
- **♿ Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **💾 Progress Saving**: Resume from where you left off
- **🔗 Social Sharing**: Share to Twitter, Reddit, or copy link
- **🔄 Error Recovery**: Graceful error handling with retry options
- **⚡ Performance**: Redis caching with 1-hour TTL

### Accessibility Features
- Full keyboard navigation (Arrow keys, Home, End, Escape)
- ARIA labels on all interactive elements
- Focus indicators for keyboard users
- Screen reader announcements
- High contrast mode support
- Reduced motion support

## 🚀 Technology Stack

- **[Devvit](https://developers.reddit.com/)**: Reddit's developer platform for building apps
- **[React](https://react.dev/)**: v19 for UI components
- **[Vite](https://vite.dev/)**: v6.2.4 for fast builds
- **[Express](https://expressjs.com/)**: v5.1.0 for backend API
- **[Tailwind CSS](https://tailwindcss.com/)**: v4.1.6 for styling
- **[TypeScript](https://www.typescriptlang.org/)**: v5.8.2 for type safety
- **[Redis](https://redis.io/)**: For caching user data

## 📋 Prerequisites

- Node.js 22 or higher
- npm or yarn
- Reddit account connected to Reddit Developers
- Devvit CLI installed

## 🛠️ Installation

### 1. **Create the Project**

```bash
npm create devvit@latest --template=react
# Or use this repository
git clone <your-repo-url>
cd redit-wrapped
npm install
```

### 2. **Authenticate with Devvit**

```bash
npm run login
# Or
npx devvit login
```

This will open a browser window for Reddit authentication.

### 3. **Verify Authentication**

```bash
npx devvit whoami
```

You should see your Reddit username.

## 🎮 Development

### Start Development Server

```bash
npm run dev
```

This starts three concurrent processes:
- **CLIENT**: Frontend build (Vite)
- **SERVER**: Backend build (Vite + Express)
- **DEVVIT**: Playtest environment

### Access the App

Once running, Devvit will provide a URL to test your app on Reddit.

### Test with Public Profiles

For initial testing, use well-known public Reddit accounts:
- `spez` (Reddit CEO)
- `reddit` (Official Reddit account)
- `AutoModerator` (Bot account)

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

Compiles both client and server for production.

### Deploy to Reddit

```bash
npm run deploy
```

Uploads a new version of your app to Reddit's platform.

### Publish for Review

```bash
npm run launch
```

Submits your app for Reddit's approval process.

## 🧪 Testing & Quality

### Type Checking & Linting

```bash
npm run check
```

Runs TypeScript type checking, ESLint, and Prettier.

### Run Tests

```bash
npm test
```

## 📚 Documentation

- **[DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)**: Comprehensive debugging steps and troubleshooting
- **[IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md)**: Complete list of improvements and future enhancements
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**: Common issues and solutions

## 🔧 Configuration

### Environment Variables

No environment variables required - app uses Reddit's authentication system.

### Cache Settings

Default cache TTL: 1 hour (3600 seconds)  
Modify in `src/server/index.ts` if needed.

### Data Limits

- **Posts fetched**: ALL available posts (no limit)
- **Comments fetched**: ALL available comments (no limit)
- **API Limit**: Reddit API may have a maximum of ~1000 items per listing
- **Cache TTL**: 1 hour (3600 seconds)

**Note**: The app fetches ALL available data from Reddit's API. Reddit itself may limit historical data to approximately the last 1000 posts/comments, but we fetch everything that's accessible.

## 🎯 How It Works

### 1. **User Input**
User enters their Reddit username in the input form.

### 2. **Data Fetching**
- Server fetches user profile via Devvit's Reddit API
- Retrieves **ALL available posts** (no limit)
- Retrieves **ALL available comments** (no limit)
- Caches results in Redis for 1 hour
- Reddit API itself may limit to ~1000 most recent items per type

### 3. **Analysis**
- Calculates total karma, contributions, averages from complete data
- Identifies top posts/comments by score across all activity
- Analyzes activity patterns (hourly, daily, seasonal) comprehensively
- Determines personality type and badges from full history
- Finds top subreddits by complete activity analysis

### 4. **Visualization**
- Displays 10 interactive slides with animations
- Each slide shows different aspects of complete activity
- Smooth transitions and engaging visuals
- Links to actual top content

## 🐛 Known Issues & Limitations

### 1. **Private Profiles**
Cannot access data from private Reddit accounts. App will show a helpful error message.

### 2. **Deleted Content**
Deleted or removed posts/comments are not included in the analysis.

### 3. **Data Limit**
The app now fetches **ALL available posts and comments** (no artificial limit). However, Reddit's API itself may limit historical data to approximately the last 1000 posts and 1000 comments. This is a Reddit platform limitation, not an app limitation.

### 4. **Rate Limiting**
Reddit API has rate limits. Caching helps, but rapid repeated requests may be throttled.

### 5. **Authentication**
Must be logged in to Devvit to test the app. Run `npm run login` first.

## 🔍 Troubleshooting

### Issue: Shows "0 contributions"

**Possible causes:**
1. User has a private profile
2. User has no public posts/comments
3. Not authenticated with Devvit

**Solution:**
1. Run `npx devvit login` to authenticate
2. Test with known public profile like "spez"
3. Check console logs for detailed error messages

### Issue: "401 Unauthorized" error

**Solution:**
```bash
npx devvit login
```
Re-authenticate with Reddit.

### Issue: Data not refreshing

**Solution:**
Wait 1 hour for cache to expire, or restart the dev server to clear cache.

### Issue: Build fails

**Solution:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

## 📊 API Endpoints

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1234567890
}
```

### `GET /api/analyze/:username`
Analyze user's Reddit activity.

**Parameters:**
- `username`: Reddit username (without u/ prefix)

**Response:**
```json
{
  "type": "analyze",
  "username": "spez",
  "stats": { ... },
  "generatedAt": 1234567890
}
```

## 🎨 Customization

### Modify Slides

Edit `src/client/components/WrappedSlides.tsx` to customize slide content and styling.

### Add New Stats

1. Update types in `src/shared/types/api.ts`
2. Add calculation logic in `src/server/services/analyzer.ts`
3. Create new slide component in `WrappedSlides.tsx`
4. Add to slide order in `WrappedViewer.tsx`

### Change Colors/Themes

Modify Tailwind classes in components or update `src/client/index.css`.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Update documentation
5. Submit a pull request

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🔗 Resources

- [Devvit Documentation](https://developers.reddit.com/docs/)
- [Devvit API Reference](https://developers.reddit.com/docs/api/redditapi/)
- [r/Devvit](https://www.reddit.com/r/devvit) - Community subreddit
- [Devvit Discord](https://discord.gg/Cd43ExtEFS) - Developer community

## 🎉 Credits

Built with ❤️ using Reddit's Devvit platform.

Inspired by Spotify Wrapped and other year-in-review experiences.

## 📞 Support

For issues or questions:

1. Check [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)
2. Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
3. Visit [r/Devvit](https://www.reddit.com/r/devvit)
4. Join [Devvit Discord](https://discord.gg/Cd43ExtEFS)

---

**Version**: 2.0.0  
**Last Updated**: 2025-01-XX  
**Status**: Production Ready ✨

