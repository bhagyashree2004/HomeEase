import axios from "axios";
import React,{ createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // console.log("Stored Token in Local Storage:", localStorage.getItem('aToken'));


    // const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [aToken, setAToken] = useState(() => {
        const token = localStorage.getItem('aToken') || '';
        console.log("Token when component loads:", token);  // ✅ Log token when component mounts
        return token;
    });

    const [appointments, setAppointments] = useState([])
    const [professionals, setProfessionals] = useState([])
    const [dashData, setDashData] = useState(false)

    // const authHeaders = {
    //     headers: { Authorization: `Bearer ${aToken}` }  // ✅ Use Bearer token format
    // };

    // Getting all Professionals data from Database using API
    const getAllProfessionals = async () => {

        // console.log("Token being sent:", aToken);
        // console.log("Full Request Headers:", { Authorization: `Bearer ${aToken}` });

        // console.log("Using Token in getAllProfessionals:", aToken); 

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-professionals',  { headers: { Authorization: `Bearer ${aToken}` } })
            console.log("API Response:", data); 
            if (data.success) {
                setProfessionals(data.professionals)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            // toast.error(error.message)

            // console.log("API Error Response:", error.response?.data);  // ✅ Log full error
            // console.log("Full Error Object:", error);  // ✅ Log full error details
            toast.error(error.message);
        }

    }

    // Function to change professionals availablity using API
    const changeAvailability = async (profId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { profId },{ headers: { Authorization: `Bearer ${aToken}` } })
            if (data.success) {
                toast.success(data.message)
                getAllProfessionals()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        console.log("🔹 Fetching Appointments from:", backendUrl + '/api/admin/appointments');



        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { Authorization: `Bearer ${aToken}` } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId },{ headers: { Authorization: `Bearer ${aToken}` } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard',  { headers: { Authorization: `Bearer ${aToken}` } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            // console.log(error)
            // toast.error(error.message)
            console.log("API Error Response:", error.response?.data);
            toast.error(error.message);
        }
        console.log(aToken);
        

    }

    const value = {
        aToken, setAToken,
        professionals,
        getAllProfessionals,
        changeAvailability,
        appointments,
        getAllAppointments,
        getDashData,
        cancelAppointment,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider