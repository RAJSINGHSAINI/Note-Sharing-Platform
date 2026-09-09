import React, { useContext } from 'react';
import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import {
  UploadCloud,
  DownloadCloud,
  ArrowRight,
  Search,
  Home as HomeIcon,
  FileText,
  Filter,
  FileCode,
  Sparkles,
  ShieldAlert,
  Lock,
  UserPlus,
  LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedOut = !user;
  const isUnverified = user && !user.isVerified;
  const isFullyVerified = user && user.isVerified;

  return (
    <div className="min-h-screen bg-white relative font-sans flex flex-col">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-14 pb-16 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-purple-50 border border-purple-200/80 rounded-full text-xs sm:text-sm text-purple-900 font-medium mb-8 cursor-pointer hover:bg-purple-100/70 transition-colors">
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-white border border-purple-200 rounded-full text-purple-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3 h-3 text-purple-600" />
            Notex v2.0
          </span>
          <span className="text-gray-700">notes shared by students</span>
          <ArrowRight className="w-4 h-4 text-purple-600" />
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.15]">
          Share knowledge, access verified notes & learning together
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
          An open platform to upload your study materials, download top-rated notes from peers, and track your learning progress seamlessly.
        </p>

        {/* Dual Primary Action Cards Container */}
        <div className="relative max-w-2xl mx-auto text-left rounded-2xl overflow-hidden p-1">
          
          {/* Overlay for Unauthenticated Users */}
          {isLoggedOut && (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/70 flex flex-col items-center justify-center p-6 text-center rounded-2xl border border-gray-200 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Access Restricted</h3>
              <p className="text-xs text-gray-600 max-w-sm mb-5">
                Please log in or sign up to upload materials or access peer-shared notes.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          )}

          {/* Overlay for Unverified Users */}
          {isUnverified && (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/70 flex flex-col items-center justify-center p-6 text-center rounded-2xl border border-purple-200 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Account Not Verified</h3>
              <p className="text-xs text-gray-600 max-w-sm">
                Your account is not verified yet. Please complete email verification below to unlock downloads and uploads.
              </p>
            </div>
          )}

          {/* Inner Action Cards Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-300 ${!isFullyVerified ? 'filter blur-[3px] select-none pointer-events-none' : ''}`}>
            
            {/* Action 1: Upload Notes */}
            <div
              onClick={() => navigate('/upload-notes')}
              className="group relative p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full z-0 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Upload Notes</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Share your lecture notes, code snippets, or PDF guides to help fellow students and earn rewards.
                </p>
              </div>
              <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-bold text-purple-600 group-hover:text-purple-700">
                Start Uploading <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Action 2: Download Notes */}
            <div
              onClick={() => navigate('/notes')}
              className="group relative p-6 bg-linear-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-tl-full z-0 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mb-4">
                  <DownloadCloud className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Download Notes</h3>
                <p className="text-xs text-purple-100 leading-relaxed">
                  Search, preview, and download high-quality notes across computer science, engineering, and more.
                </p>
              </div>
              <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-bold text-white">
                Browse Repository <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Notes Platform Dashboard Section - Rendered ONLY when user is logged in */}
      {user && (
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-24 w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Explore Platform Insights</h2>
            <p className="text-xs text-gray-500">Live preview of your personal notes manager and learning dashboard</p>
          </div>

          {/* Dashboard Wrapper Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            
            {/* Unverified Overlay Box for Dashboard */}
            {isUnverified && (
              <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/60 flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
                <div className="max-w-md bg-white p-8 rounded-2xl border border-purple-100 shadow-2xl flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-xs">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Verify Your Account</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Verify your email address to unlock your interactive dashboard, access uploaded materials, and track your downloads.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/verify-email')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-5 bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <span>Verify Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Dashboard Mockup Content */}
            <div className={`bg-white flex flex-col md:flex-row min-h-130 transition-all duration-300 ${isUnverified ? 'filter blur-[3px] select-none pointer-events-none' : ''}`}>
              
              {/* Dashboard Sidebar */}
              <aside className="w-full md:w-60 border-r border-gray-100 p-4 bg-gray-50/50 flex flex-col gap-6">
                <div className="flex items-center gap-2 px-2 pt-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                    N
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Notex Portal</span>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notes, topics..."
                    readOnly
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none cursor-default text-gray-400"
                  />
                </div>

                {/* Sidebar Links */}
                <nav className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50 text-purple-700 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <HomeIcon className="w-4 h-4 text-purple-600" />
                      My Dashboard
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <UploadCloud className="w-4 h-4 text-gray-400" />
                      Uploaded Notes
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full text-[10px]">12</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <DownloadCloud className="w-4 h-4 text-gray-400" />
                      Saved Downloads
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-[10px]">48</span>
                  </div>
                </nav>
              </aside>

              {/* Dashboard Main Area */}
              <main className="flex-1 p-6 md:p-8 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Student Learning Dashboard</h2>
                      <p className="text-xs text-gray-500">Track your uploads, downloads, and community engagement</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50">
                      <Filter className="w-3.5 h-3.5 text-gray-500" /> Filter Stats
                    </button>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-2xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          +12.4%
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-500">Total Downloads</p>
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">1,284</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-2xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <UploadCloud className="w-4 h-4" />
                        </div>
                        <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          +4 new
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-500">My Uploads</p>
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">24 PDF Notes</p>
                    </div>
                  </div>

                  {/* Recent Files Table */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100 text-xs font-bold text-gray-600 flex justify-between">
                      <span>Recently Uploaded Notes</span>
                      <span>Subject</span>
                    </div>
                    <div className="divide-y divide-gray-100 text-xs text-gray-700">
                      <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50/50">
                        <div className="flex items-center gap-2">
                          <FileCode className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-gray-900">Data Structures & Algorithms - Cheat Sheet.pdf</span>
                        </div>
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px]">Computer Science</span>
                      </div>
                      <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50/50">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-600" />
                          <span className="font-semibold text-gray-900">Spring Boot Microservices Architecture Guide.pdf</span>
                        </div>
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px]">Backend Dev</span>
                      </div>
                    </div>
                  </div>

                </div>
              </main>
            </div>
          </div>
        </section>
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;