import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import professionalModel from "../models/professionalModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API for professional Login 
const loginProfessional = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await professionalModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get professional appointments for professional panel
const appointmentsProfessional = async (req, res) => {
    try {

        const { profId } = req.body
        const appointments = await appointmentModel.find({ profId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for professional panel
const appointmentCancel = async (req, res) => {
    try {

        const { profId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.profId === profId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark appointment completed for professional panel
const appointmentComplete = async (req, res) => {
    try {

        const { profId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.profId === profId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all professionals list for Frontend
const professionalList = async (req, res) => {
    try {

        const professionals = await professionalModel.find({}).select(['-password', '-email'])
        res.json({ success: true, professionals })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change professional availablity for Admin and Professional Panel
const changeAvailablity = async (req, res) => {
    try {

        const { profId } = req.body

        const profData = await professionalModel.findById(profId)
        await professionalModel.findByIdAndUpdate(profId, { available: !profData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get professional profile for Professional Panel
const professionalProfile = async (req, res) => {
    try {

        const { profId } = req.body
        const profileData = await professionalModel.findById(profId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update professional profile data from  Professional Panel
const updateProfessionalProfile = async (req, res) => {
    try {

        const { profId, rates, address, available } = req.body

        await professionalModel.findByIdAndUpdate(profId, { rates, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for professional panel
const professionalDashboard = async (req, res) => {
    try {

        const { profId } = req.body

        const appointments = await appointmentModel.find({ profId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let customer = []

        appointments.map((item) => {
            if (!customer.includes(item.userId)) {
                customer.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            customer: customer.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginProfessional,
    appointmentsProfessional,
    appointmentCancel,
    professionalList,
    changeAvailablity,
    appointmentComplete,
    professionalDashboard,
    professionalProfile,
    updateProfessionalProfile
}