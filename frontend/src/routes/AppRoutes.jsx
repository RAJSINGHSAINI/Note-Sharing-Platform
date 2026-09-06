import { Routes, Route } from 'react-router-dom'
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Home from '../pages/Home/Home'
import { Toaster } from 'react-hot-toast'
import Profile from '../pages/Profile/Profile'

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

      </Routes>
    </>
  )
}

export default AppRoutes