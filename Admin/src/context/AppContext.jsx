import React,{ createContext } from "react";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        // const dateArray = slotDate.split('_')
        // return dateArray[0] + "-" + months[Number(dateArray[1])] + "-" + dateArray[2]

        const dateStr = slotDate.toString().padStart(7, '0'); // Ensure it's always 7 digits
        const day = dateStr.slice(0, dateStr.length - 5);  // Extract day
        const month = dateStr.slice(-5, -4);  // Extract month
        const year = dateStr.slice(-4);  // Extract year
        return `${day}-${month}-${year}`;
    
    }

    // const formatSlotDate = (slotDate) => {
    //     const dateStr = slotDate.toString();
    //     const day = dateStr.slice(0, -6);
    //     const month = dateStr.slice(-6, -4);
    //     const year = dateStr.slice(-4);
    //     return `${day}-${month}-${year}`;
    // };

    // const slotDateFormat = (slotDate) => {
    //     if (!slotDate) return "Invalid Date"; // ✅ Prevents undefined errors
    //     const dateArray = slotDate.split('_');
    //     if (dateArray.length !== 3) return "Invalid Date"; // ✅ Prevents index errors
    
    //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //     return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
    // };

    // console.log("slotDate:", item.slotDate);

    // console.log("slotDate:", slotDate);

    // const slotDateFormat = (slotDate) => {
    //     if (!isNaN(slotDate)) {
    //         // If slotDate is a timestamp, convert it
    //         const date = new Date(Number(slotDate));
    //         return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    //     } else {
    //         // If slotDate is in "DD_MM_YYYY" format
    //         const dateArray = slotDate.split('_');
    //         return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
    //     }
    // };

    // const slotDateFormat = (slotDate) => {
    //     const dateArray = slotDate.split('_');
    //     if (dateArray.length !== 3) return "Invalid Date"; // Handling errors
    //     return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
    // };
    

    // Function to calculate the age eg. ( 20_01_2000 => 24 )
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider