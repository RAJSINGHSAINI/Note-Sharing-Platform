import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx'; // Update path to your context
import { getCurrentUser,updateProfile } from '../../api/auth.api.js'; // Update path to your API file
import { 
  User, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Edit2, 
  Save, 
  X, 
  ShieldCheck,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // Fetch current user details on mount
  useEffect(() => {
    async function getUser() {
      try {
        const data = await getCurrentUser();
        if (data.student) {
          setUser(data.student);
          setName(data.student.name || '');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
    getUser();
  }, [setUser]);

  // Sync state if context user updates
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // Handle Profile Update Submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty!');
      return;
    }

    setLoading(true);
    try {
      const updatedData = await updateProfile({ name });
      setUser((prev) => ({ ...prev, name: updatedData.student.name }));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update profile.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = () => {
    // Navigate to OTP verification page or trigger send OTP API
    toast.success('Redirecting to OTP verification...');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="h-32 bg-linear-to-r from-purple-600 via-indigo-600 to-purple-800 relative">
            {/* back arrow */}
            <div className='py-10 px-2 flex w-fit'>
               <ArrowLeft onClick={()=>navigate('/home')} className='w-10 text-gray-200' /> 
            </div>
          </div>
          <div className="px-6 pb-6 relative pt-0">
            {/* Avatar & Verification Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 mb-6 gap-4">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                  <div className="w-full h-full bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-3xl font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
              </div>

              {/* Edit Toggle Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-2xs transition-colors self-start sm:self-auto"
                >
                  <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Content Block */}
            {isEditing ? (
              /* --- EDIT PROFILE FORM --- */
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name || '');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* --- VIEW PROFILE CONTENT --- */
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    {user.name || 'Student Name'}
                  </h1>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {user.email}
                  </p>
                </div>

                {/* Verification Status Banner */}
                <div className="pt-2">
                  {user.isVerified ? (
                    /* GREEN VERIFIED BADGE */
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Verified Account
                    </div>
                  ) : (
                    /* RED UNVERIFIED BADGE + VERIFY BUTTON */
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-red-50/70 border border-red-200/80 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-red-900">Email Not Verified</p>
                          <p className="text-[11px] text-red-700">Please verify your email to unlock all features.</p>
                        </div>
                      </div>
                      <button
                        onClick={handleVerifyEmail}
                        className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors shrink-0"
                      >
                        Verify Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" /> Account Security & Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-500 font-medium">Account Status</span>
              <p className={`font-bold mt-0.5 ${user.isVerified ? 'text-emerald-600' : 'text-red-600'}`}>
                {user.isVerified ? 'Active & Verified' : 'Pending Verification'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;