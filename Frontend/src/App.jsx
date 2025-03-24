
import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Appointment from './pages/Appointment.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'


function App() {
  

  return (
    
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/services' element={<Services />} />
        <Route path='/services/:speciality' element={<Services />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:profId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
      </div>
  
  )
}

export default App
