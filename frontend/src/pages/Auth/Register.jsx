import React, { useContext, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { registerUser } from '../../api/auth.api.js'
import { ImSpinner2 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false)

  const {setUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration API integration

    const data = {
      name,
      email,
      password
    }
    setIsLoading(true)

    try {
      const response = await registerUser(data);
      setUser(response.student);
      toast.success("Registration successful");
      navigate('/home');
      console.log(response);
      
    } catch (error) {
      const message = error.response?.data?.error || "Something went wrong!"
      toast.error(message);
      console.log(error.response);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans text-gray-900">
      <div className="w-full border-2bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-2xl max-w-sm flex flex-col items-center">

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
              className="w-full flex justify-center items-center py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
            >
              {isLoading ? <ImSpinner2 className="animate-spin text-xl" /> : "Get started"}
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