import React, { useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration API integration
    
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center  font-sans text-gray-900">
      <div className="w-full border-2 border-gray-300 shadow-2xl p-3 bg-white rounded-3xl max-w-sm flex flex-col items-center">

        {/* Logo Icon */}
        <div className="mb-6">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Create an account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Start your 30-day free trial.
        </p>

        {/* Tab Switcher */}
        <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-1 flex mb-6">
          <a
            href="/register"
            className="flex-1 text-center py-2 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm transition-all"
          >
            Sign up
          </a>
          <a
            href="/login"
            className="flex-1 text-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md transition-all"
          >
            Log in
          </a>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5 flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1.5">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 shadow-sm transition-all"
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 shadow-sm transition-all"
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-3.5 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 shadow-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  /* Eye Off Icon (Password visible) */
                  <FaEyeSlash />

                ) : (
                  /* Eye Open Icon (Password hidden) */
                  <IoEyeSharp />

                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
          >
            Get started
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-purple-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}