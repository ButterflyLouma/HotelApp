import React, { useState, useCallback } from 'react';

interface AuthPageProps {
  onLogin: (success: boolean) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate API call for login
    try {
      // Basic validation for demonstration purposes
      if (email.length > 0 && password.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        onLogin(true);
      } else {
        setError('Please enter both email and password.');
        onLogin(false);
      }
    } catch (err) {
      setError('An unexpected error occurred during login.');
      onLogin(false);
    } finally {
      setLoading(false);
    }
  }, [email, password, onLogin]);

  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome Back!</h2>
      <p className="text-lg text-gray-600 mb-8">Sign in to explore amazing hotels.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Email address (e.g., user@example.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Password (any input)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm mt-2">{error}</div>
        )}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};