import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { verifyOtp, sendOtp } from '../../api/auth.api.js';
import ResendOtpButton from '../../components/common/ResendOtpButton';
import { Mail, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const EmailVerification = () => {
    const { user, setUser, loading: authLoading } = useContext(AuthContext);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const hasSentOtp = useRef(false);

    // 1. Auth Guard Effect - Runs when EITHER user or authLoading updates
    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            toast.error("Please log in to verify your email.");
            navigate('/login');
            return;
        }

        if (user.verified || user.isVerified) {
            navigate('/profile');
        }
    }, [user, authLoading, navigate]);

    // 2. Initial OTP Trigger Effect
    useEffect(() => {
        if (authLoading || !user || user.verified || user.isVerified) return;

        async function triggerInitialOtp() {
            if (hasSentOtp.current) return;
            hasSentOtp.current = true;

            try {
                const response = await sendOtp();
                toast.success(response.message)
                console.log("OTP sent on load:", response);
            } catch (error) {
                console.error("Initial OTP trigger error:", error);
            }
        }

        triggerInitialOtp();
    }, [user, authLoading]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp.trim()) {
            toast.error('Please enter the OTP');
            return;
        }

        setLoading(true);
        try {
            await verifyOtp(otp);
            setUser((prev) => ({ ...prev, verified: true, isVerified: true }));
            toast.success('Email verified successfully!');

            localStorage.removeItem('otp_last_sent');
            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.error || error.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    // 3. Render Loading Spinner until auth check is fully resolved
    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                    <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
                <p className="mt-2 text-xs text-gray-600 max-w-sm mx-auto">
                    We sent a verification code to <span className="font-semibold text-gray-900">{user?.email}</span>.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2 text-center">
                                Enter 6-Digit Verification Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                className="w-full tracking-widest text-center text-lg font-bold py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs">
                        <span className="text-gray-500">Didn't receive code? </span>
                        <ResendOtpButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;