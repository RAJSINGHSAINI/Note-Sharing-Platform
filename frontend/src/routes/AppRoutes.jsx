import { Routes, Route } from 'react-router-dom'
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Home from '../pages/Home/Home'
import { Toaster } from 'react-hot-toast'
import Profile from '../pages/Profile/Profile'
import EmailVerification from '../pages/Auth/EmailVerification'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import UploadNote from '../pages/Notes/UploadNote'
const AppRoutes = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/profile' element={<Profile />}/>

        <Route path='/verify-email' element={<EmailVerification />}/>

        <Route path='/forgot-password' element={<ForgotPassword />}/>

        <Route path='/upload-notes' element={<UploadNote />}/>


      </Routes>
    </>
  )
}

export default AppRoutes