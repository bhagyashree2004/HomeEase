import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
// import QRCode from 'qrcode.react';
import QRCode from 'react-qr-code';



const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        // const dateArray = slotDate.split('_')
        // return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]

        const dateStr = slotDate.toString().padStart(7, '0'); // Ensure it's always 7 digits
        const day = dateStr.slice(0, dateStr.length - 5);  // Extract day
        const month = dateStr.slice(-5, -4);  // Extract month
        const year = dateStr.slice(-4);  // Extract year
        return `${day}-${month}-${year}`;
    }

    // Getting User Appointments Data Using API
    // const getUserAppointments = async () => {
    //     try {

    //         const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { Authorization: `Bearer ${token}` } })
    //         // setAppointments(data.appointments.reverse())
    //         console.log("API Response:", data);

    //         if (data?.appointments && Array.isArray(data.appointments)) {
    //             setAppointments([...data.appointments].reverse()); 
    //         } else {
    //             setAppointments([]); // Set an empty array if undefined
    //             console.error("Appointments data is undefined or not an array");
    //         }

    //     } catch (error) {
    //         console.error("Error fetching appointments:", error.response ? error.response.data : error.message);
    //         toast.error(error.message)
    //     }
    // }


    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
                headers: { Authorization: `Bearer ${token}` }
            })
    
            console.log("Full API Response:", data);  // Check the full response
    
            // Ensure that appointments exist and are an array before proceeding
            if (data?.appointments && Array.isArray(data.appointments)) {
                setAppointments([...data.appointments].reverse());  // Reverse if valid
            } else {
                // If appointments are not found or the structure is wrong, log the issue
                console.error("Appointments data is undefined or not an array", data);
                toast.error("No appointments found or data structure is incorrect.");
                setAppointments([]);  // Set an empty array if invalid structure
            }
        } catch (error) {
            // Handle errors and display messages accordingly
            console.error("Error fetching appointments:", error.response?.data || error.message);
            toast.error(error.message);
        }
    }
    

    

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { Authorization: `Bearer ${token}`} });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div className=''>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF]' src={item.profData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.profData.name}</p>
                            <p>{item.profData.speciality}</p>
                            <p className='text-[#464646] font-medium mt-1'>Address:</p>
                            <p className=''>{item.profData.address.line1}</p>
                            <p className=''>{item.profData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-900 hover:text-white transition-all duration-300'>Pay Online</button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" /></button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => navigate(`/upi/${item._id}`)} className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-900 hover:text-white transition-all duration-300">Pay with UPI</button>}
  {/* <p className="text-sm mb-2 font-medium">Pay with UPI (Scan or click):</p> */}

  {/* UPI QR Code */}
  {/* <QRCode
    value={`upi://pay?pa=bhagyashreeumbarkar14304-1@okhdfcbank&pn=Admin&am=${item.profData.rates}&tn=Appointment with ${item.profData.name}&cu=INR`}
    size={160}
  /> */}
{/* 
  <div style={{ height: '160px', width: '160px', margin: '0 auto' }}>
  <QRCode
    value={`upi://pay?pa=bhagyashreeumbarkar14304-1@okhdfcbank&pn=HomeEase&am=${item.profData.rates}&tn=Appointment with ${item.profData.name}&cu=INR`}
    style={{ height: '100%', width: '100%' }}
  />
</div> */}

{/* <button
  onClick={() => navigate(`/upi/${item._id}`)}
  className="className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-900 hover:text-white transition-all duration-300"
>
  Pay with UPI
</button> */}


  {/* UPI deep link (in case user is on mobile) */}
  {/* <a
    href={`upi://pay?pa=bhagyashreeumbarkar14304-1@okhdfcbank&pn=HomeEase&am=${item.profData.rates}&tn=Appointment with ${item.profData.name}&cu=INR`}
    className="block mt-2 text-blue-600 underline text-sm"
    target="_blank"
    rel="noopener noreferrer"
  >
    Open in GPay / PhonePe / Paytm
  </a> */}
    {/* <div className="flex justify-center">
        <button
            className="mt-2 text-xs text-green-600 underline text-center block"
            onClick={() => alert('Thank you! We will verify your payment for ' + item.profData.name)}
        >
            I have paid
        </button>
    </div> */}

                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>}

                            {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

                            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments



