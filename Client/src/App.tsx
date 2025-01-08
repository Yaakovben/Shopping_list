
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import About from './components/page/About'
import ViewList from './components/page/ViewList'
import NavBar from './components/NavBar'
import Groups from './components/page/Groups'



export default function App() {
  const location = useLocation()
  return (
    
     
    <div>
      {location.pathname !=="/login" && location.pathname !== "/register" && <NavBar/>}
     
      <Routes>
        <Route path='/' element={<Navigate to={"/login"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/view-list' element={<ViewList/>}/>
        <Route path='/groups' element={<Groups/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
     
    
  )
}
