import {Routes,Route} from 'react-router-dom'
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Home from '../pages/Home/Home'
const AppRoutes = () => {
  return (
    <>
        <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />}/>

        </Routes>
    </>
  )
}

export default AppRoutes