import React, { useContext, useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/auth.api';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg'
const Navbar = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isLogout, setIsLogout] = useState(false)


  async function handleLogout() {
    setIsLogout(true)
    try {
      await logoutUser(); 
    } catch (error) {
      console.error("Logout failed on server:", error);
    } finally {
      setUser(null); 
      navigate('/login'); 
      toast.success("Logout Successfull")
      setIsLogout(false)
    }
  };

return (
  <nav className="w-full sticky top-0 z-100 max-w-7xl mx-auto px-4 sm:px-6 py-6   bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
    <div className="flex items-center justify-between h-16 px-6 bg-white border border-gray-100 rounded-full shadow-sm">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-200">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-xl tracking-tight">
            Notex<span className="text-purple-600">.</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
            Explore Notes <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <a href="#subjects" className="hover:text-gray-900 transition-colors">
            Subjects
          </a>
          <a href="#top-contributors" className="hover:text-gray-900 transition-colors">
            Top Contributors
          </a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">
            Pricing
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      {!user ? <div className="flex items-center gap-3">
        <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-lg transition-colors">
          Log in
        </button>
        <button onClick={() => navigate('/register')} className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition-colors">
          Get Started
        </button>
      </div>
        :
        <div className='flex flex-row gap-2'>
          <button onClick={() => { navigate('/profile') }} className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-full cursor-pointer shadow-sm transition-colors">
            {user.name}
          </button>

          <button
          disabled={isLogout}
          onClick={() => handleLogout()} className="px-4 bg-mist-100 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-full transition-colors">
            {isLogout ?  <CgSpinner className="animate-spin text-xl" /> : "Log Out"}
          </button>
        </div>
      }
    </div>
  </nav>
);
};

export default Navbar;