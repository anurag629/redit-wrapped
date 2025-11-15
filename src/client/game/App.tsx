import React, { useState } from 'react';
import { useWrapped } from '../hooks/useWrapped';
import { WrappedViewer } from '../components/WrappedViewer';

export const App = () => {
  const [username, setUsername] = useState('');
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const { data, loading, error, analyze, reset, retry } = useWrapped();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      void analyze(username.trim());
    }
  };

  const handleReset = () => {
    setUsername('');
    reset();
  };

  // Show wrapped viewer if we have data
  if (data) {
    return <WrappedViewer username={data.username} stats={data.stats} onReset={handleReset} />;
  }

  // Show loading screen
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-8 p-8 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="text-8xl animate-bounce">🎉</div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-white">Analyzing u/{username}</h2>
            <p className="text-xl text-white/90">Fetching posts, comments, and insights...</p>
          </div>

          {/* Loading animation */}
          <div className="flex justify-center gap-2 mt-8">
            <div
              className="w-4 h-4 bg-white rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-4 h-4 bg-white rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="w-4 h-4 bg-white rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-white text-sm">
              This may take a moment while we analyze your Reddit activity...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show input form
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-8 p-8 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 text-center space-y-6 animate-fade-in">
        <div className="text-7xl animate-bounce mb-4">📊</div>
        <div>
          <h1 className="text-6xl font-black text-white mb-3">Reddit Wrapped</h1>
          <p className="text-2xl text-white/90 font-semibold">Discover Your Reddit Story</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 relative z-10 animate-slide-up"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border-4 border-white/20">
          <div>
            <label htmlFor="username" className="block text-lg font-bold text-gray-800 mb-3">
              Enter Reddit Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., spez or u/spez"
              className="w-full px-6 py-4 border-3 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 focus:outline-none text-gray-900 placeholder:text-gray-400 text-lg font-semibold transition-all"
              disabled={loading}
              autoFocus
              aria-label="Reddit username input"
              aria-describedby="username-help"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-5 text-red-700 text-sm animate-slide-down">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <div className="font-bold mb-1">Error</div>
                  <div>{error}</div>
                  <button
                    onClick={() => retry()}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all"
                    aria-label="Retry analysis"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl transition-all text-xl transform hover:scale-105 active:scale-95 shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing...
              </span>
            ) : (
              <span>🎨 Generate My Wrapped</span>
            )}
          </button>
        </div>

        <div className="text-center space-y-3">
          <p className="text-white/90 text-base font-semibold">
            ✨ Works with any public Reddit profile
          </p>
          <div className="flex justify-center gap-4 text-sm text-white/75">
            <span>📊 Stats</span>
            <span>•</span>
            <span>🏆 Top Posts</span>
            <span>•</span>
            <span>💬 Comments</span>
          </div>
          <div id="username-help" className="sr-only">
            Enter your Reddit username to generate your personalized activity summary
          </div>
        </div>
      </form>

      <footer className="absolute bottom-6 text-white/60 text-sm z-10">
        <div className="text-center">
          <p className="font-semibold">Powered by Devvit & Reddit API</p>
          <p className="text-xs mt-1">No AI needed - Pure statistical analysis</p>
        </div>
      </footer>
    </div>
  );
};
