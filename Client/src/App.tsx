
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import About from './components/page/About'
import ViewList from './components/page/ViewList'



export default function App() {
  return (
    
     
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/view-list' element={<ViewList/>}/>
      </Routes>
    </div>
     
    
  )
}
