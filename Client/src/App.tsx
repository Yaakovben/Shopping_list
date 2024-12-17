import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AddTodo from './components/page/AddTodo'
import About from './components/page/About'
import ListTodo from './components/page/ListTodo'


export default function App() {
  return (
    
     
    <div>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/all' element={<ListTodo/>}/>
        <Route path='/add' element={<AddTodo/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
     
    
  )
}
