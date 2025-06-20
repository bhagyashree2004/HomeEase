// // import React, {useContext, useEffect, useState} from 'react'
// // import {useParams} from 'react-router-dom'
// // import {AppContext} from '../context/AppContext.jsx'

// // const Appointment = () => {

// //     const {profId} = useParams()
// //     const {professionals} = useContext(AppContext)
// //     const [profInfo, setProfInfo] = useState(null)

// //     const fetchProfInfo = async() => {
// //         const profInfo = professionals.find(prof => prof._id === profId)
// //         setProfInfo(profInfo)
// //         console.log(profInfo);
// //         console.log("profId from useParams:", profId);
// //         console.log("Professionals array:", professionals);
// //     }

// //     useEffect(()=>{
// //         fetchProfInfo()
// //     },[professionals, profId])

// //   return (
// //    <div>

// //    </div>
// //   )
// // }

// // export default Appointment


// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import RelatedProfessionals from '../components/RelatedProfessionals'
// import axios from 'axios'
// import { toast } from 'react-toastify'




// const Appointment = () => {

//     const { profId } = useParams()
//     const { professionals, currencySymbol, backendUrl, token, getProfessionalsData } = useContext(AppContext)
//     const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//     const [profInfo, setProfInfo] = useState(null)
//     const [profSlots, setProfSlots] = useState([])
//     const [slotIndex, setSlotIndex] = useState(0)
//     const [slotTime, setSlotTime] = useState('')

//     const navigate = useNavigate()

//     const fetchProfInfo = async () => {
//         const profInfo = professionals.find((prof) => prof._id === profId)
//         setProfInfo(profInfo)
//         console.log(profInfo);
        
//     }

   

//     const getAvailableSlots = async () => {

//         setProfSlots([])


//       // getting current date
//       let today = new Date()

//       for (let i = 0; i < 7; i++) {

//           // getting date with index 
//           let currentDate = new Date(today)
//           currentDate.setDate(today.getDate() + i)

//           // setting end time of the date with index
//           let endTime = new Date()
//           endTime.setDate(today.getDate() + i)
//           endTime.setHours(21, 0, 0, 0)

//           // setting hours 
//           if (today.getDate() === currentDate.getDate()) {
//               currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//               currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//           } else {
//               currentDate.setHours(10)
//               currentDate.setMinutes(0)
//           }

//           let timeSlots = [];


//           while (currentDate < endTime) {
//               let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//               let day = currentDate.getDate()
//               let month = currentDate.getMonth() + 1
//               let year = currentDate.getFullYear()

//               const slotDate = day + "" + month + "" + year
//               const slotTime = formattedTime

//               const isSlotAvailable = profInfo.slots_booked?.[slotDate]?.includes(slotTime) ? false : true;

//               if (isSlotAvailable) {

//                   // Add slot to array
//                   timeSlots.push({
//                       datetime: new Date(currentDate),
//                       time: formattedTime
//                   })
//               }

//               // Increment current time by 30 minutes
//               currentDate.setMinutes(currentDate.getMinutes() + 30);
//           }

//           setProfSlots(prev => ([...prev, timeSlots]))


//         }

//     }

//     const bookAppointment = async () => {

//         console.log("Function working");
        

//         if (!token) {
//             toast.warning('Login to book appointment')
//             return navigate('/login')
//         }

//         console.log(token);

//         // ✅ Check if profSlots is defined and has data
//         if (!profSlots || profSlots.length === 0) {
//             console.error("❌ profSlots is undefined or empty:", profSlots);
//             return toast.error("No available slots!");
//         }

//     // ✅ Check if slotIndex is valid
//         if (!profSlots[slotIndex] || profSlots[slotIndex].length === 0) {
//             console.error("❌ Invalid slotIndex or empty slot array:", slotIndex, profSlots[slotIndex]);
//             return toast.error("Selected slot is not available!");
//         }

        

//         const date = profSlots[slotIndex][0].datetime

//         let day = date.getDate()
//         let month = date.getMonth() + 1
//         let year = date.getFullYear()

//         const slotDate = day + "" + month + "" + year

//         const slotTime = profSlots[slotIndex][0]?.time; // Ensure slotTime is defined
//         if (!slotTime) throw new Error("Invalid slot time");

//         console.log("Slot Time:", slotTime);

        
        

//         try {

//             const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { profId, slotDate, slotTime }, { headers: { Authorization: `Bearer ${token}` } })
//             console.log(slotTime);
            
//             if (data.success) {
//                 toast.success(data.message)
//                 getProfessionalsData()
//                 navigate('/my-appointments')
//                 console.log("success");
                
//             } else {
//                 toast.error(data.message)
//                 console.log("fail");
//             }

//         } catch (error) {
//             // console.log(error)
//             // toast.error(error.message)

//             console.log("🔴 Axios Error:", error); // Log full error object
//             console.log("🔴 Error Response:", error.response?.data); // Log server response
//             toast.error(error.message);
//         }
//     }        

//     useEffect(() => {
//         if (professionals.length > 0) {
//             fetchProfInfo()
//         }
//     }, [professionals, profId])

//     useEffect(() => {
//         if (profInfo) {
//             getAvailableSlots()
//         }
//     }, [profInfo])



//     return profInfo ?(
//         <div>

//             {/* ---------- Prof. Details ----------- */}
//             <div className='flex flex-col sm:flex-row gap-4'>
//                 <div>
//                     <img className='bg-grey-900 w-full sm:max-w-72 rounded-lg' src={profInfo.image} alt="" />
//                 </div>

//                 <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

//                     {/* ----- Prof Info : name, degree, experience ----- */}


//                     <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
//                     <div className='flex items-center gap-2 mt-1 text-gray-600'>
//                         <p>{profInfo.speciality}</p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{profInfo.experience}</button>
//                     </div>

//                     {/* ----- prof About ----- */}
//                     <div>
//                         <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profInfo.about}</p>
//                     </div>

//                     <p className='text-gray-600 font-medium mt-4'>Service Charge: <span className='text-gray-800'>{currencySymbol}{profInfo.fees}</span> </p>
//                 </div>
//             </div>

//             {/* Booking slots */}
//             <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
//                 <p >Booking slots</p>
//                 <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//                     {profSlots.length > 0 && profSlots?.map((item, index) => (
//                         <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-gray-900 text-white' : 'border border-[#DDDDDD]'}`}>
//                             <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                             <p>{item[0] && item[0].datetime.getDate()}</p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//                     {profSlots.length > 0 && profSlots[slotIndex]?.map((item, index) => (
//                         <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-gray-900 text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
//                     ))}
//                 </div>

//                 <button onClick={bookAppointment} className='bg-gray-900 text-white text-sm font-light px-20 py-3 rounded-full my-6'>Request a visit</button>
//             </div>

//             {/* Listing Releated Doctors */}
//             <RelatedProfessionals speciality={profInfo.speciality} profId={profId} />
//         </div>
//     ) : null
// }

//     export default Appointment


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedProfessionals from '../components/RelatedProfessionals';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { profId } = useParams();
    const { professionals, currencySymbol, backendUrl, token, getProfessionalsData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [profInfo, setProfInfo] = useState(null);
    const [profSlots, setProfSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (professionals.length > 0) {
            const profInfo = professionals.find((prof) => prof._id === profId);
            setProfInfo(profInfo);
        }
    }, [professionals, profId]);

    useEffect(() => {
        if (profInfo) {
            generateAvailableSlots();
        }
    }, [profInfo]);

    const generateAvailableSlots = () => {
        setProfSlots([]);
        let today = new Date();
        let slots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10, 0, 0, 0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                let slotDate = `${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}`;
                const isSlotAvailable = !profInfo.slots_booked?.[slotDate]?.includes(formattedTime);
                
                if (isSlotAvailable) {
                    timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            slots.push(timeSlots);
        }
        setProfSlots(slots);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment');
            return navigate('/login');
        }

        if (!profSlots.length || !profSlots[slotIndex]?.length) {
            return toast.error("No available slots!");
        }

        const date = profSlots[slotIndex][0].datetime;
        const slotDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
        const slotTime = profSlots[slotIndex][0]?.time;

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/book-appointment`,
                { profId, slotDate, slotTime },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                toast.success(data.message);
                getProfessionalsData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Axios Error:", error);
            toast.error(error.message);
        }
    };

    return profInfo ? (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <img className='bg-grey-900 w-full sm:max-w-72 rounded-lg' src={profInfo.image} alt="" />
                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='text-3xl font-medium text-gray-700'>{profInfo.name}</p>
                    <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profInfo.about}</p>
                    <p className='text-gray-600 font-medium mt-4'>Service Charge: {currencySymbol}{profInfo.rates}</p>
                </div>
            </div>
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {profSlots.map((item, index) => (
                        <div key={index} onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-gray-900 text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{daysOfWeek[item[0]?.datetime.getDay()]}</p>
                            <p>{item[0]?.datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {profSlots[slotIndex]?.map((item, index) => (
                        <p key={index} onClick={() => setSlotTime(item.time)} className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-gray-900 text-white' : 'border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>
                <button onClick={bookAppointment} className='bg-gray-900 text-white text-sm px-20 py-3 rounded-full my-6'>Request a visit</button>
            </div>
            <RelatedProfessionals />
        </div>
    ) : null;
};

export default Appointment;
