import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import professionalModel from "../models/professionalModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';
// import professionalModel from "../models/professionalModel.js";

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password, contact, address } = req.body;

        // checking for all data to register user
        if (!name || !email || !password || !contact || !address) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
            contact,
            address
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        // const { userId } = req.body
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

        // const { userId } = req.query;  // Get userId from query parameters
        // const userData = await userModel.findById(userId).select('-password');

        // if (!userData) {
        //     return res.json({ success: false, message: 'User not found' });
        // }

        // res.json({ success: true, userData });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const userId = req.userId;
        const { name, contact, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !contact || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, contact, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment 
// const bookAppointment = async (req, res) => {

//     try {

//         const { userId, profId, slotDate, slotTime } = req.body
//         const profData = await professionalModel.findById(profId).select("-password")

//         if (!profData.available) {
//             return res.json({ success: false, message: 'Professional Not Available' })
//         }

//         let slots_booked = profData.slots_booked

//         // checking for slot availablity 
//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot Not Available' })
//             }
//             else {
//                 slots_booked[slotDate].push(slotTime)
//             }
//         } else {
//             slots_booked[slotDate] = []
//             slots_booked[slotDate].push(slotTime)
//         }

//         const userData = await userModel.findById(userId).select("-password")

//         delete profData.slots_booked

//         const appointmentData = {
//             userId,
//             profId,
//             userData,
//             profData,
//             amount: profData.rates,
//             slotTime,
//             slotDate,
//             date: Date.now()
//         }

//         const newAppointment = new appointmentModel(appointmentData)
//         await newAppointment.save()

//         // save new slots data in profData
//         await professionalModel.findByIdAndUpdate(profId, { slots_booked })

//         res.json({ success: true, message: 'Appointment Booked' })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }

// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, profId, slotDate, slotTime } = req.body;

//         // Fetch professional data
//         const profData = await professionalModel.findById(profId).select("-password");

//         if (!profData) {
//             return res.json({ success: false, message: 'Professional not found' });
//         }

//         if (!profData.available) {
//             return res.json({ success: false, message: 'Professional Not Available' });
//         }

//         // Handle slot availability
//         let slots_booked = profData.slots_booked || {};  // Default to an empty object if no slots booked

//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot Not Available' });
//             } else {
//                 slots_booked[slotDate].push(slotTime);
//             }
//         } else {
//             slots_booked[slotDate] = [slotTime];  // Create an array with the slotTime if no slots exist for the date
//         }

//         // Fetch user data
//         const userData = await userModel.findById(userId).select("-password");

//         if (!userData) {
//             return res.json({ success: false, message: 'User not found' });
//         }

//         // Remove unnecessary data from the professional data object
//         delete profData.slots_booked;

//         // Create the appointment data
//         const appointmentData = {
//             userId,
//             profId,
//             userData,
//             profData,
//             amount: profData.rates,
//             slotTime,
//             slotDate,
//             date: Date.now()
//         };

//         // Create a new appointment record
//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         // Update the professional's booked slots
//         await professionalModel.findByIdAndUpdate(profId, { slots_booked });

//         // Return success response
//         res.json({ success: true, message: 'Appointment Booked' });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };

const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { profId, slotDate, slotTime } = req.body;

        // Check if userId and profId are valid
        // if (!userId || !profId) {
        //     return res.json({ success: false, message: 'User ID or Professional ID is missing' });
        // }

        if (!userId || !profId || !slotDate || !slotTime) {
            return res.json({ success: false, message: 'Missing required fields' });
        }

        // Fetch professional data
        const profData = await professionalModel.findById(profId).select("-password");

        if (!profData) {
            return res.json({ success: false, message: 'Professional not found' });
        }

        if (!profData.available) {
            return res.json({ success: false, message: 'Professional Not Available' });
        }

        // Handle slot availability
        let slots_booked = profData.slots_booked || {};  // Default to an empty object if no slots booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' });
            } else {
                slots_booked[slotDate].push(slotTime);  // Add the new slot to the array
            }
        } else {
            slots_booked[slotDate] = [slotTime];  // Initialize array if no slots exist for this date
        }

        // Fetch user data
        const userData = await userModel.findById(userId).select("-password");

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Remove unnecessary data from the professional data object
        const { slots_booked: _, ...cleanedProfData } = profData.toObject();  // Removing slots_booked to prevent sending unnecessary data

        // Create the appointment data
        const appointmentData = {
            userId,
            profId,
            userData,
            profData: cleanedProfData,
            amount: profData.rates,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        // Create a new appointment record
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update the professional's booked slots
        await professionalModel.findByIdAndUpdate(profId, { slots_booked });

        // Return success response
        res.json({ success: true, message: 'Appointment Booked' });
    } catch (error) {
        console.error("Error in booking appointment:", error);  // Added more context to the error log
        res.json({ success: false, message: error.message });
    }
};



// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const userId = req.userId;
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user 
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing professional slot 
        const { profId, slotDate, slotTime } = appointmentData

        const professionalData = await professionalModel.findById(profId)

        let slots_booked = professionalData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await professionalModel.findByIdAndUpdate(profId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments for frontend my-appointments page
// const listAppointment = async (req, res) => {
//     try {

//         const { userId } = req.user.id;  //req.body
//         const appointments = await appointmentModel.find({ userId })

//         res.json({ success: true, appointments })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

const listAppointment = async (req, res) => {
    try {
        // Access userId from req.user (assumed to be set by authUser middleware)
        const userId = req.userId;  // Corrected line to access the userId

        // Query the database for appointments related to this userId
        const appointments = await appointmentModel.find({ userId });

        // Check if appointments exist, and return them
        // if (appointments.length > 0) {
        //     res.json({ success: true, appointments });
        // } else {
        //     res.json({ success: false, message: 'No appointments found for this user.' });
        // }

        res.json({ success: true, appointments });

    } catch (error) {
        // Error handling
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const { origin } = req.headers

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Service Charges"
                },
                unit_amount: appointmentData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
            cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    try {

        const { appointmentId, success } = req.body

        if (success === "true") {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id); // ✅ FIXED
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe,
    getAppointmentById 
}