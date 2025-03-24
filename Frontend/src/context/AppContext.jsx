// import React,{ createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from 'axios'
// import { professionals } from "../assets/assets";

// export const AppContext = createContext()

// const AppContextProvider = (props) => {

//     const value = {
//         professionals
//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )

// }

// export default AppContextProvider








import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [professionals, setProfessionals] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(null)

    // Getting Professionals using API
    const getProfessionalsData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/professionals/list')
            if (data.success) {
                setProfessionals(data.professionals)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        if (!token) {
            console.log("🔴 No token found, skipping profile fetch.");
            return;
        }

        console.log("🟡 Fetching user profile...");
    

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile',{
                headers: { Authorization: `Bearer ${token}` }
            })


            console.log("🟢 API Response:", data);

            if (data.success) {
                console.log("🟢 User data received:", data.userData);
                setUserData(data.userData)
            } else {
                console.log("🔴 API request failed:", data.message);
                toast.error(data.message)
            }

        } catch (error) {
            // console.log(error)
            // toast.error(error.message)

            console.log("🔴 Axios Error:", error);
            console.log("🔴 Error Response:", error.response?.data);
            toast.error(error.message);
        }

    }

    useEffect(() => {
        console.log("🟡 Checking token:", token);
        getProfessionalsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    

    const value = {
        professionals, getProfessionalsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider