import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Records from './pages/Dashboard/Records'
import RecordModalContext from './context/Context'
import RecordModal from './components/RecordModal/RecordModal'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <RecordModalContext>
      <RecordModal />
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
         <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<h1>About</h1>} />
          <Route path={"/auth/signup"} element={<Signup />} />
          <Route path={"/auth/login"} element={<Login />} />
          <Route path={"/dashboard/*"} element={<Dashboard />} />
          <Route path='records' element={<Records />} />
          <Route path='analytics' element={<h1>Analytics</h1>} />
          <Route path='settings' element={<h1>Settings</h1>} />
         </Routes>
      </BrowserRouter>
    </RecordModalContext>
      
    </>
  )
}

export default App
