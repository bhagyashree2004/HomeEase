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








// import React, { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from 'axios'

// export const AppContext = createContext()

// const AppContextProvider = (props) => {

//     const currencySymbol = '₹'
//     const backendUrl = import.meta.env.VITE_BACKEND_URL

//     const [professionals, setProfessionals] = useState([])
//     const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
//     const [userData, setUserData] = useState(null)
//     // const [appointments, setAppointments] = useState([]);


//     // const getAppointmentsData = async () => {
//     //     try {
//     //         const { data } = await axios.get(backendUrl + '/api/appointments/my', {
//     //             headers: { Authorization: `Bearer ${token}` }
//     //         });

//     //         console.log("📅 Appointments API response:", data);

//     //         if (data.success && Array.isArray(data.appointments)) {
//     //             setAppointments(data.appointments);
//     //         } else {
//     //             console.warn("Appointments response not an array or unsuccessful");
//     //             setAppointments([]);
//     //         }

//     //     } catch (error) {
//     //         console.log("🔴 Error loading appointments:", error);
//     //         toast.error("Failed to load appointments");
//     //     }
//     // };

//     // Getting Professionals using API
//     const getProfessionalsData = async () => {

//         try {

//             const { data } = await axios.get(backendUrl + '/api/professionals/list')
//             if (data.success) {
//                 setProfessionals(data.professionals)
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }

//     }

//     // Getting User Profile using API
//     const loadUserProfileData = async () => {

//         if (!token) {
//             console.log("🔴 No token found, skipping profile fetch.");
//             return;
//         }

//         console.log("🟡 Fetching user profile...");
    

//         try {

//             const { data } = await axios.get(backendUrl + '/api/user/get-profile',{
//                 headers: { Authorization: `Bearer ${token}` }
//             })


//             console.log("🟢 API Response:", data);

//             if (data.success) {
//                 console.log("🟢 User data received:", data.userData);
//                 setUserData(data.userData)
//             } else {
//                 console.log("🔴 API request failed:", data.message);
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             // console.log(error)
//             // toast.error(error.message)

//             console.log("🔴 Axios Error:", error);
//             console.log("🔴 Error Response:", error.response?.data);
//             toast.error(error.message);
//         }

//     }

//     useEffect(() => {
//         console.log("🟡 Checking token:", token);
//         getProfessionalsData()
//     }, [])

//     useEffect(() => {
//         if (token) {
//             loadUserProfileData()
//         }
//     }, [token])

    

//     const value = {
//         professionals, getProfessionalsData,
//         currencySymbol,
//         backendUrl,
//         token, setToken,
//         userData, setUserData, loadUserProfileData
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
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [professionals, setProfessionals] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData, setUserData] = useState(null);

    console.log(token);
    

    // Getting Professionals using API
    const getProfessionalsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/professionals/list');
            if (data.success) {
                setProfessionals(data.professionals);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Getting User Profile using API
    const loadUserProfileData = async () => {
        if (!token) {
            console.log("🔴 No token found, skipping profile fetch.");
            return;
        }

        console.log("🟡 Fetching user profile...");

        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("🟢 API Response:", data);


            if (data.success) {
                if (data.userData) {   // ✅ ✅ ✅ Correction: Only set userData if it's not null
                    console.log("🟢 User data received:", data.userData);
                    // const rawDob = data.userData.dob;
                    // const formattedDob = rawDob
                    // ? new Date(rawDob).toISOString().split("T")[0]
                    // : "";

                    // // Set default gender if missing
                    // const gender = data.userData.gender || "Not Selected";

                    // setUserData({
                    //     ...data.userData,
                    //     dob: formattedDob,
                    //     gender: gender,
                    // });
                    setUserData(data.userData);
                } else {
                    console.log("🟠 Warning: Received null userData from backend.");
                }
            } else {
                console.log("🔴 API request failed:", data.message);
                toast.error(data.message);
            }

        } catch (error) {
            console.log("🔴 Axios Error:", error);
            console.log("🔴 Error Response:", error.response?.data);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        console.log("🟡 Checking token:", token);
        getProfessionalsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token]);

    const value = {
        professionals, getProfessionalsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
