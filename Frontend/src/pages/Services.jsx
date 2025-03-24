import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Services = () => {

  const { speciality } = useParams()

  console.log(speciality);
  

  const [filterProf, setFilterProf] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { professionals } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterProf(professionals.filter(doc => doc.speciality === speciality))
    } else {
      setFilterProf(professionals)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [professionals, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the skilled professionals.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'Home Maintenance' ? navigate('/services') : navigate('/services/Home Maintenance')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Home Maintenance' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Home Maintenance</p>
          <p onClick={() => speciality === 'Beauty & Wellness' ? navigate('/services') : navigate('/services/Beauty & Wellness')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Beauty & Wellness' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Beauty & Wellness</p>
          <p onClick={() => speciality === 'Laundry & Dry Clean' ? navigate('/services') : navigate('/services/Laundry & Dry Clean')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Laundry & Dry Clean' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Laundry & Dry Clean</p>
          <p onClick={() => speciality === 'Elder & Child Care' ? navigate('/services') : navigate('/services/Elder & Child Care')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Elder & Child Care' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Elder & Child Care</p>
          <p onClick={() => speciality === 'Food Cooking' ? navigate('/services') : navigate('/services/Food Cooking')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Food Cooking' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Food Cooking</p>
          <p onClick={() => speciality === 'Maid Service' ? navigate('/services') : navigate('/services/Maid Service')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Maid Service' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Maid Service</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {filterProf.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services