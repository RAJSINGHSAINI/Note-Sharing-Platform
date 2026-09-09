// components/VerifyEmail.jsx
import React, { useState, useEffect } from 'react';
import { sendOtp } from '../../api/auth.api.js';
import { toast } from 'react-hot-toast';

const COOLDOWN_SECONDS = 60;

const ResendOtpButton = () => {
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  // Restore remaining cooldown on component mount / page refresh
  useEffect(() => {
    const lastSentTime = localStorage.getItem('otp_last_sent');
    if (lastSentTime) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(lastSentTime, 10)) / 1000);
      if (elapsedSeconds < COOLDOWN_SECONDS) {
        setCooldown(COOLDOWN_SECONDS - elapsedSeconds);
      }
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    if (cooldown > 0 || loading) return;

    setLoading(true);
    try {
      await sendOtp();
      toast.success('OTP sent to your email!');

      // Save timestamp & start 60s cooldown
      localStorage.setItem('otp_last_sent', Date.now().toString());
      setCooldown(COOLDOWN_SECONDS);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSendOtp}
      disabled={cooldown > 0 || loading}
      className="text-xs font-semibold text-purple-600 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading
        ? 'Sending...'
        : cooldown > 0
        ? `Resend OTP in ${cooldown}s`
        : 'Resend Code'}
    </button>
  );
};

export default ResendOtpButton;