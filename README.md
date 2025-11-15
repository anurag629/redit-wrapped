# Reddit Wrapped 🎉# Reddit Wrapped 2024 🎉



> Your personalized year-in-review experience for Reddit! Just like Spotify Wrapped, but for your Reddit activity.An immersive, Spotify Wrapped-style experience for Reddit users to visualize their yearly activity, engagement, and contributions on the platform.



![Reddit Wrapped](https://img.shields.io/badge/Reddit-Wrapped-FF4500?style=for-the-badge&logo=reddit)## 🌟 Features

![Version](https://img.shields.io/badge/version-0.0.2.20-blue?style=for-the-badge)

![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)### Core Statistics

- **Total Contributions**: ALL posts and comments (no limits!)

## 🌟 What is Reddit Wrapped?- **Karma Breakdown**: Post karma vs comment karma from complete history

- **Top Subreddits**: Most active communities with detailed stats

Reddit Wrapped is an interactive web experience that analyzes your Reddit activity and presents it in a beautiful, engaging slideshow. Discover your most active communities, your top posts, your unique personality traits, and much more!- **Top Post**: Your most upvoted post with direct link

- **Top Comment**: Your highest-scoring comment with context link

## ✨ Features- **Activity Patterns**: Hourly, daily, and monthly trends across all activity

- **Seasonal Activity**: Breakdown by Winter, Spring, Summer, Fall

### 📊 Comprehensive Analytics- **Personality Insights**: AI-analyzed personality type and comment style

- **Complete Activity Overview**: Total posts, comments, and karma earned- **Achievement Badges**: Earned based on comprehensive activity patterns

- **Top Communities**: Your most active subreddits with detailed statistics

- **Top Content**: Your highest-scoring post and comment with direct links### User Experience

- **Activity Patterns**: When you're most active (hourly, daily, seasonal)- **🎨 Beautiful UI**: Gradient backgrounds, smooth animations, glassmorphism effects

- **Personality Insights**: AI-analyzed traits based on your commenting style- **📱 Mobile-First**: Touch gestures, swipe navigation, responsive design

- **Achievement Badges**: Unlock badges based on your Reddit journey- **♿ Accessibility**: ARIA labels, keyboard navigation, screen reader support

- **Your Impact**: See how your contributions sparked discussions- **💾 Progress Saving**: Resume from where you left off

- **Top Words**: Word cloud of your most-used words- **🔗 Social Sharing**: Share to Twitter, Reddit, or copy link

- **Milestones**: Celebrate your major Reddit achievements- **🔄 Error Recovery**: Graceful error handling with retry options

- **⚡ Performance**: Redis caching with 1-hour TTL

### 🎨 Beautiful Experience

- **13 Interactive Slides**: Each revealing different aspects of your Reddit year### Accessibility Features

- **Smooth Animations**: Fade-ins, slide transitions, and dynamic effects- Full keyboard navigation (Arrow keys, Home, End, Escape)

- **Responsive Design**: Perfect on mobile, tablet, and desktop- ARIA labels on all interactive elements

- **Modern UI**: Gradient backgrounds, glassmorphism, and elegant typography- Focus indicators for keyboard users

- **Touch Gestures**: Swipe through slides on mobile devices- Screen reader announcements

- **Keyboard Navigation**: Arrow keys, Home, End, and Escape support- High contrast mode support

- Reduced motion support

### 🔗 Share Your Story

- **Share on Twitter**: Tweet your Reddit Wrapped results## 🚀 Technology Stack

- **Share on Reddit**: Post to your favorite subreddit

- **Copy Link**: Grab a link to share anywhere- **[Devvit](https://developers.reddit.com/)**: Reddit's developer platform for building apps

- **[React](https://react.dev/)**: v19 for UI components

### ♿ Accessibility First- **[Vite](https://vite.dev/)**: v6.2.4 for fast builds

- Full keyboard navigation- **[Express](https://expressjs.com/)**: v5.1.0 for backend API

- Screen reader support with ARIA labels- **[Tailwind CSS](https://tailwindcss.com/)**: v4.1.6 for styling

- High contrast mode compatible- **[TypeScript](https://www.typescriptlang.org/)**: v5.8.2 for type safety

- Reduced motion support for accessibility preferences- **[Redis](https://redis.io/)**: For caching user data



## 🚀 How to Use## 📋 Prerequisites



1. **Visit the App**: Go to [Reddit Wrapped](https://www.reddit.com/r/redit_wrapped_dev) (or wherever the app is installed)- Node.js 22 or higher

2. **Enter Username**: Type any Reddit username (without the u/ prefix)- npm or yarn

3. **Explore**: Swipe or click through 13 beautifully designed slides- Reddit account connected to Reddit Developers

4. **Share**: Show off your Reddit year with friends!- Devvit CLI installed



### Tips for Best Results## 🛠️ Installation

- Works with any **public** Reddit profile

- Fetches all available posts and comments (Reddit API may limit to ~1000 most recent)### 1. **Create the Project**

- Results are cached for 1 hour for faster loading

- Try well-known accounts like `spez`, `reddit`, or your own!```bash

npm create devvit@latest --template=react

## 📱 Supported Devices# Or use this repository

git clone <your-repo-url>

Reddit Wrapped works great on:cd redit-wrapped

- 📱 Mobile phones (iOS & Android)npm install

- 📱 Tablets```

- 💻 Laptops

- 🖥️ Desktop computers### 2. **Authenticate with Devvit**

- 📺 Large displays

```bash

The app automatically adapts to your screen size for the best experience!npm run login

# Or

## 🎮 Navigationnpx devvit login

```

### Touch Devices

- **Swipe left/right**: Navigate between slidesThis will open a browser window for Reddit authentication.

- **Tap anywhere**: Go to next slide

### 3. **Verify Authentication**

### Desktop

- **Click anywhere**: Go to next slide```bash

- **Arrow keys**: Navigate back and forthnpx devvit whoami

- **Home/End**: Jump to first/last slide```

- **Escape**: Exit to splash screen

You should see your Reddit username.

## 🔒 Privacy & Data

## 🎮 Development

- **No Data Storage**: We don't store any of your Reddit data permanently

- **Cache Only**: Data is temporarily cached for 1 hour for performance### Start Development Server

- **Public Data Only**: Only publicly available information is analyzed

- **No Authentication Required**: You don't need to log in with your Reddit account```bash

- **Reddit API**: All data comes directly from Reddit's official APInpm run dev

```

## ⚠️ Limitations

This starts three concurrent processes:

- **Private Profiles**: Cannot access data from private Reddit accounts- **CLIENT**: Frontend build (Vite)

- **Deleted Content**: Removed or deleted posts/comments are not included- **SERVER**: Backend build (Vite + Express)

- **API Limits**: Reddit's API may limit historical data to ~1000 recent items per type- **DEVVIT**: Playtest environment

- **Rate Limiting**: Rapid repeated requests may be throttled by Reddit

### Access the App

## 🐛 Troubleshooting

Once running, Devvit will provide a URL to test your app on Reddit.

### "0 contributions" or no data showing?

- The profile might be private or have no public activity### Test with Public Profiles

- Try a well-known public account like `spez` to verify the app is working

For initial testing, use well-known public Reddit accounts:

### Buttons not working?- `spez` (Reddit CEO)

- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)- `reddit` (Official Reddit account)

- Try refreshing the page- `AutoModerator` (Bot account)



### Data seems outdated?## 📦 Build & Deploy

- Wait 1 hour for the cache to expire, or try a different username

- Reddit's API may take time to reflect very recent activity### Build for Production



## 🤝 Contributing```bash

npm run build

Want to improve Reddit Wrapped? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) guide for developers!```



## 📄 LicenseCompiles both client and server for production.



This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.### Deploy to Reddit



## 🙏 Credits```bash

npm run deploy

- Built with ❤️ using [Reddit's Devvit Platform](https://developers.reddit.com/)```

- Inspired by Spotify Wrapped and other year-in-review experiences

- Special thanks to the Devvit communityUploads a new version of your app to Reddit's platform.



## 📞 Support & Feedback### Publish for Review



- 💬 Questions? Visit [r/Devvit](https://www.reddit.com/r/devvit)```bash

- 🐛 Found a bug? [Open an issue](https://github.com/anurag629/redit-wrapped/issues)npm run launch

- 💡 Have an idea? Share it in the discussions!```

- 🎮 Join the [Devvit Discord](https://discord.gg/Cd43ExtEFS)

Submits your app for Reddit's approval process.

---

## 🧪 Testing & Quality

<div align="center">

### Type Checking & Linting

**Discover your Reddit story** ✨

```bash

Made with 🔥 by [u/anurag629](https://reddit.com/u/anurag629)npm run check

```

[Try Reddit Wrapped](https://www.reddit.com/r/redit_wrapped_dev) • [Report Bug](https://github.com/anurag629/redit-wrapped/issues) • [Request Feature](https://github.com/anurag629/redit-wrapped/issues)

Runs TypeScript type checking, ESLint, and Prettier.

</div>

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

