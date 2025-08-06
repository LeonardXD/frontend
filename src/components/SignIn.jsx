import React, { useState } from 'react';
import { useTitle } from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = ({
  useEmail = true,
  title = 'Welcome Back',
  subtitle = 'Please sign in to your account',
  showSignUpLink = true,
}) => {
  useTitle('Login');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [name, setName] = useState(''); // Keep if you might use name-based login later
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Clear previous errors

    if (!email || !password) { // Assuming useEmail is always true for user login
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/user_management.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login', // Specify the login action
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store authentication data
        if (rememberMe) {
          localStorage.setItem('user_token', data.data.token);
          localStorage.setItem('user_name', data.data.full_name);
          localStorage.setItem('user_email', data.data.email);
          localStorage.setItem('user_id', data.data.user_id.toString());
          localStorage.setItem('coinBalance', data.data.balance.toString()); // Store current balance
        } else {
          sessionStorage.setItem('user_token', data.data.token);
          sessionStorage.setItem('user_name', data.data.full_name);
          sessionStorage.setItem('user_email', data.data.email);
          sessionStorage.setItem('user_id', data.data.user_id.toString());
          sessionStorage.setItem('coinBalance', data.data.balance.toString()); // Store current balance
        }

        console.log('Login successful:', data.data);
        navigate(data.redirect); // Redirect to dashboard
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {useEmail ? (
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="name@company.com"
                  disabled={loading}
                />
              </div>
            </div>
          ) : (
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your Name"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                disabled={loading}
              >
                {passwordVisible ? (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C3.732 4.943 10 4.943 16.268 10c-3.278 5.057-9.536 5.057-12.81 0zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C16.268 4.943 10 4.943 3.732 10a10.014 10.014 0 00-1.473-1.473L.293 3.707a1 1 0 00-1.414-1.414L3.707 2.293zM10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={loading}
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-green-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {showSignUpLink && (
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-green-600 hover:underline">
              Sign Up
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
