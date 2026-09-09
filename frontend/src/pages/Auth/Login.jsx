import React, { useContext, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { loginUser } from '../../api/auth.api';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [islogin, setIslogin] = useState(false)

  const {setUser}  =useContext(AuthContext);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIslogin(true)
    // Handle login API integration
    const data = {
      email,
      password
    }
    try {
      
      const response = await loginUser(data);
      setUser(response.student);
      toast.success('Login Successfull');
      navigate('/home');
    } catch (error) {
      const message = error.response?.data?.error || 'Something went wrong. Please try again.';
      toast.error(message)
      
    } finally{
      setIslogin(false)
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
          Log in to your account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Welcome back! Please enter your details.
        </p>

        {/* Tab Switcher */}
        <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-1 flex mb-6">
          <a
            href="/register"
            className="flex-1 text-center py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md transition-all"
          >
            Sign up
          </a>
          <a
            href="/login"
            className="flex-1 text-center py-2 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm transition-all"
          >
            Log in
          </a>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
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

          <div className="flex items-center mr-2 justify-end mb-6">
            <a href="/forgot-password" className="text-sm font-semibold text-purple-600 hover:underline">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            disabled={islogin}
            className="w-full py-2.5 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
          >
            { !islogin ? "Sign in" :  <ImSpinner2 className="animate-spin text-xl" />}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}