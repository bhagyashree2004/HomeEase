import React, { useContext } from 'react'
import { ProfessionalContext } from './context/ProfessionalContext.jsx';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddProfessional from './pages/Admin/AddProfessional';
import ProfessionalsList from './pages/Admin/ProfessionalsList';
import Login from './pages/Login';
import ProfessionalAppointment from './pages/Professional/ProfessionalAppointment';
import ProfessionalDashboard from './pages/Professional/ProfessionalDashboard';
import ProfessionalProfile from './pages/Professional/ProfessionalProfile';
import UserDetails from './pages/Admin/UserDetails.jsx';

const App = () => {

  const { dToken } = useContext(ProfessionalContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/user-data/:id' element={<UserDetails/>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-professional' element={<AddProfessional />} />
          <Route path='/professional-list' element={<ProfessionalsList />} />
          <Route path='/professional-dashboard' element={<ProfessionalDashboard />} />
          <Route path='/professional-appointments' element={<ProfessionalAppointment />} />
          <Route path='/professional-profile' element={<ProfessionalProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App
