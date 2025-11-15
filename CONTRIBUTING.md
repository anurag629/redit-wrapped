# Contributing to Reddit Wrapped 🤝

Thank you for your interest in contributing to Reddit Wrapped! This guide will help you get started with development.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Building and Deploying](#building-and-deploying)
- [Code Style](#code-style)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Resources](#resources)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v22 or higher
- **npm**: v10 or higher (comes with Node.js)
- **Git**: For version control
- **Reddit Account**: Connected to Reddit Developers
- **Devvit CLI**: Reddit's developer platform CLI

## 🚀 Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anurag629/redit-wrapped.git
cd redit-wrapped
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Authenticate with Devvit

```bash
npm run login
# Or
npx devvit login
```

This will open a browser window for Reddit authentication.

### 4. Verify Authentication

```bash
npx devvit whoami
```

You should see your Reddit username.

## 📁 Project Structure

```
redit-wrapped/
├── src/
│   ├── client/              # Frontend React application
│   │   ├── components/      # React components
│   │   │   ├── AnimatedNumber.tsx
│   │   │   ├── WrappedSlides.tsx    # All slide components
│   │   │   └── WrappedViewer.tsx    # Main slideshow container
│   │   ├── hooks/           # Custom React hooks
│   │   ├── game/            # Game mode (main app)
│   │   ├── splash/          # Landing page
│   │   └── public/          # Static assets
│   │
│   ├── server/              # Backend Express application
│   │   ├── index.ts         # Main server entry point
│   │   ├── core/            # Core functionality
│   │   │   └── post.ts      # Post creation handlers
│   │   └── services/        # Business logic
│   │       ├── analyzer.ts  # Data analysis logic
│   │       └── redditApi.ts # Reddit API wrapper
│   │
│   └── shared/              # Shared types and utilities
│       └── types/
│           └── api.ts       # TypeScript type definitions
│
├── assets/                  # Images and assets
├── dist/                    # Build output (generated)
├── tools/                   # Build tools and configs
├── devvit.json             # Devvit configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── eslint.config.js        # Linting rules
```

## 🔨 Development Workflow

### Start Development Server

```bash
npm run dev
```

This command runs three concurrent processes:
- **CLIENT**: Frontend build with hot reload (Vite)
- **SERVER**: Backend build with hot reload (Vite)
- **DEVVIT**: Live playtest environment on Reddit

### Access Your Development App

Once running, Devvit provides a URL:
```
https://www.reddit.com/r/redit_wrapped_dev/?playtest=redit-wrapped
```

Visit this URL to test your changes in real-time!

### Making Changes

1. **Client Changes**: Edit files in `src/client/`
   - Components auto-rebuild
   - Refresh the Reddit page to see changes

2. **Server Changes**: Edit files in `src/server/`
   - Server auto-rebuilds
   - Devvit automatically redeploys

3. **Type Changes**: Edit `src/shared/types/api.ts`
   - Changes affect both client and server
   - Ensure types are updated everywhere

### Hot Reload Behavior

- **Client**: Vite rebuilds automatically (1-2 seconds)
- **Server**: Vite rebuilds + Devvit redeploys (5-10 seconds)
- **Both**: Refresh browser after seeing "Success!" message

## 📦 Building and Deploying

### Build for Production

```bash
npm run build
```

This compiles both client and server for production:
- Client bundle: `dist/client/`
- Server bundle: `dist/server/`
- CSS: `dist/client/client.css`

### Deploy New Version

```bash
npm run deploy
```

Uploads a new version to Reddit's platform. Version number is in `devvit.json`.

### Publish for Users

```bash
npm run launch
```

Submits your app for Reddit's approval process.

## 🎨 Code Style

### TypeScript

- Use **TypeScript** for all new files
- Enable strict mode
- Add types for all function parameters and return values
- Avoid `any` type unless absolutely necessary

### React

- Use **functional components** with hooks
- Use **TypeScript** for props interfaces
- Follow naming conventions:
  - Components: `PascalCase`
  - Hooks: `useCamelCase`
  - Files: Match component name

### Formatting

We use **Prettier** and **ESLint**:

```bash
# Check code quality
npm run check

# Auto-fix issues
npm run lint:fix
```

### Tailwind CSS

- Use Tailwind utility classes for styling
- Follow responsive design pattern: `class="text-base md:text-lg lg:text-xl"`
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)

## 🧪 Testing

### Manual Testing

1. **Test with Public Profiles**:
   ```
   - spez
   - reddit
   - AutoModerator
   ```

2. **Test Responsive Design**:
   - Mobile (320px - 640px)
   - Tablet (640px - 1024px)
   - Desktop (1024px+)

3. **Test Navigation**:
   - Touch gestures (swipe)
   - Mouse clicks
   - Keyboard navigation
   - Screen readers

### Type Checking

```bash
npm run check
```

Runs TypeScript compiler and ESLint.

## 📝 Submitting Changes

### Before Submitting

1. **Test Thoroughly**:
   - Test on mobile and desktop
   - Verify all features work
   - Check console for errors

2. **Run Quality Checks**:
   ```bash
   npm run check
   npm run build
   ```

3. **Update Documentation**:
   - Update README if adding features
   - Add comments for complex logic
   - Update type definitions

### Pull Request Process

1. **Fork the Repository**

2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**:
   - Write clean, documented code
   - Follow existing patterns
   - Keep commits focused

4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

   Commit message format:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code restructuring
   - `test:` Tests
   - `chore:` Maintenance

5. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**:
   - Describe what you changed and why
   - Link related issues
   - Add screenshots for UI changes
   - Wait for review

## 🎯 Common Tasks

### Adding a New Slide

1. **Define Types** (`src/shared/types/api.ts`):
   ```typescript
   export interface MyNewStats {
     value: number;
     label: string;
   }
   
   export interface UserInsights {
     // ... existing fields
     myNewStats: MyNewStats;
   }
   ```

2. **Add Analysis Logic** (`src/server/services/analyzer.ts`):
   ```typescript
   function analyzeMyNewStats(posts: Post[], comments: Comment[]): MyNewStats {
     // Your calculation logic
     return { value: 42, label: "Amazing" };
   }
   
   export async function analyzeUserData(...) {
     // ... existing code
     const myNewStats = analyzeMyNewStats(posts, comments);
     
     return {
       // ... existing fields
       myNewStats,
     };
   }
   ```

3. **Create Slide Component** (`src/client/components/WrappedSlides.tsx`):
   ```typescript
   export const MyNewSlide = ({ data }: { data: MyNewStats }) => {
     return (
       <div className="flex flex-col items-center justify-center h-full gap-4 p-8 bg-gradient-to-br from-purple-600 to-blue-600">
         <h2 className="text-4xl md:text-6xl font-bold">My New Feature</h2>
         <p className="text-2xl md:text-4xl">{data.value}</p>
         <p className="text-lg md:text-xl opacity-90">{data.label}</p>
       </div>
     );
   };
   ```

4. **Add to Slide Order** (`src/client/components/WrappedViewer.tsx`):
   ```typescript
   const slides = [
     // ... existing slides
     <MyNewSlide key="mynew" data={data.myNewStats} />,
   ];
   ```

### Modifying Existing Analysis

Edit `src/server/services/analyzer.ts`:

```typescript
export async function analyzeUserData(username: string, reddit: any) {
  // Fetch data
  const posts = await fetchAllPosts(username, reddit);
  const comments = await fetchAllComments(username, reddit);
  
  // Your modifications here
  const newCalculation = posts.length * 2; // Example
  
  return {
    // Include in return object
    newCalculation,
  };
}
```

### Styling Changes

Edit component files in `src/client/components/`:

```typescript
// Use Tailwind utilities with responsive breakpoints
<div className="
  text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
  p-4 md:p-6 lg:p-8
  max-w-md md:max-w-lg lg:max-w-2xl
">
  Responsive content
</div>
```

## 📚 Resources

### Documentation
- [Devvit Documentation](https://developers.reddit.com/docs/)
- [Devvit API Reference](https://developers.reddit.com/docs/api/redditapi/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community
- [r/Devvit](https://www.reddit.com/r/devvit) - Subreddit
- [Devvit Discord](https://discord.gg/Cd43ExtEFS) - Chat
- [GitHub Issues](https://github.com/anurag629/redit-wrapped/issues) - Bug reports

### Tools
- [Vite](https://vite.dev/) - Build tool
- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Formatting

## ❓ Questions?

- 💬 Ask in [r/Devvit](https://www.reddit.com/r/devvit)
- 🎮 Join [Devvit Discord](https://discord.gg/Cd43ExtEFS)
- 📧 Open a [GitHub Discussion](https://github.com/anurag629/redit-wrapped/discussions)

## 🎉 Thank You!

Your contributions make Reddit Wrapped better for everyone! Every bug fix, feature, and improvement is appreciated.

Happy coding! 🚀
