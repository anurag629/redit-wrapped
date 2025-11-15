import React, { useState } from 'react';
import { useWrapped } from '../hooks/useWrapped';
import { WrappedViewer } from '../components/WrappedViewer';

export const App = () => {
  const [username, setUsername] = useState('');
  const { data, loading, error, analyze, reset } = useWrapped();

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

  // Show input form
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-8 p-8 bg-gradient-to-br from-orange-500 to-red-600">
      <div className="text-center space-y-4">
        <img className="object-contain w-32 h-32 mx-auto" src="/snoo.png" alt="Snoo" />
        <h1 className="text-5xl font-black text-white">Reddit Wrapped</h1>
        <p className="text-xl text-white/90">Discover your Reddit story</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Reddit Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., spez or u/spez"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-gray-900 placeholder:text-gray-400"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              'Generate Wrapped'
            )}
          </button>
        </div>

        <div className="text-center text-white/75 text-sm">
          <p>Works with any public Reddit profile</p>
        </div>
      </form>

      <footer className="absolute bottom-4 text-white/50 text-sm">
        <p>Powered by Reddit's public API</p>
      </footer>
    </div>
  );
};
