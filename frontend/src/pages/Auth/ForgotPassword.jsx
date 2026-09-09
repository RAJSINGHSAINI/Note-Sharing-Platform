import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resetPassword, sendPasswordResetOtp } from '../../api/auth.api.js';
import { Mail, Lock, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImSpinner2 } from 'react-icons/im';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password Visibility States
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI Flow States
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  const navigate = useNavigate();

  // Step 1: Send OTP to User Email
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setSendingOtp(true);
    try {
      await sendPasswordResetOtp(email);
      setIsOtpSent(true);
      toast.success('Verification code sent to your email!');
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to send OTP. Please try again.'
      );
    } finally {
      setSendingOtp(false);
    }
  };

  // Step 2: Submit OTP & New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setResettingPassword(true);
    try {
      await resetPassword({
        email,
        otp,
        newPassword,
      });

      toast.success('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to reset password. Check your OTP and try again.'
      );
    } finally {
      setResettingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4 shadow-xs transition-transform hover:scale-105 duration-200">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
        <p className="mt-2 text-xs text-gray-600 max-w-sm mx-auto">
          {isOtpSent
            ? 'Enter the OTP sent to your email along with your new password.'
            : 'Enter your registered email address to receive an OTP.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10 transition-all duration-300">

          {/* SECTION 1: Email & Send OTP */}
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isOtpSent || sendingOtp}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900 text-xs font-medium disabled:opacity-60 disabled:bg-gray-100 transition-all duration-200"
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                {isOtpSent && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-3 top-3 animate-pulse" />
                )}
              </div>
            </div>

            {!isOtpSent ? (
              <button
                type="submit"
                disabled={sendingOtp}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 active:scale-[0.99] shadow-xs transition-all duration-200 disabled:opacity-50"
              >
                {sendingOtp ? (
                  <>
                    <ImSpinner2 className="animate-spin w-4 h-4" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <div className="flex justify-between items-center text-xs text-emerald-600 font-medium px-1 pt-1">
                <span>✓ OTP sent to email</span>
                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Change Email
                </button>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-400 font-medium">
                {isOtpSent ? 'Enter New Password Below' : 'Locked Section'}
              </span>
            </div>
          </div>

          {/* SECTION 2: Unlocks when OTP sends successfully */}
          <form
            onSubmit={handleResetPassword}
            className={`space-y-4 transition-all duration-500 ease-in-out ${
              isOtpSent
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-40 translate-y-2 pointer-events-none blur-[0.5px]'
            }`}
          >
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!isOtpSent || resettingPassword}
                placeholder="123456"
                maxLength={6}
                className="w-full tracking-widest text-center text-base font-bold py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900 disabled:cursor-not-allowed transition-all duration-200"
                required={isOtpSent}
              />
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!isOtpSent || resettingPassword}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900 text-xs font-medium disabled:cursor-not-allowed transition-all duration-200"
                  required={isOtpSent}
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  disabled={!isOtpSent || resettingPassword}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors disabled:cursor-not-allowed"
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <IoEyeSharp className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!isOtpSent || resettingPassword}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900 text-xs font-medium disabled:cursor-not-allowed transition-all duration-200"
                  required={isOtpSent}
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  disabled={!isOtpSent || resettingPassword}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <IoEyeSharp className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isOtpSent || resettingPassword}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 active:scale-[0.99] shadow-xs transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {resettingPassword ? (
                <>
                  <ImSpinner2 className="animate-spin w-4 h-4" />
                  <span>Setting New Password...</span>
                </>
              ) : (
                <>
                  <span>Set New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center text-xs">
            <Link
              to="/login"
              className="text-gray-500 hover:text-purple-600 font-medium transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;