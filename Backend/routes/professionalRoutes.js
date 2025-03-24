
import express from 'express';
import { loginProfessional, appointmentsProfessional, appointmentCancel, professionalList, changeAvailablity, appointmentComplete, professionalDashboard, professionalProfile, updateProfessionalProfile } from '../controllers/professionalController.js';
import authProfessional from '../middleware/authProfessional.js';
const professionalRouter = express.Router();

professionalRouter.post("/login", loginProfessional)
professionalRouter.post("/cancel-appointment", authProfessional, appointmentCancel)
professionalRouter.get("/appointments", authProfessional, appointmentsProfessional)
professionalRouter.get("/list", professionalList)
professionalRouter.post("/change-availability", authProfessional, changeAvailablity)
professionalRouter.post("/complete-appointment", authProfessional, appointmentComplete)
professionalRouter.get("/dashboard", authProfessional, professionalDashboard)
professionalRouter.get("/profile", authProfessional, professionalProfile)
professionalRouter.post("/update-profile", authProfessional, updateProfessionalProfile)

export default professionalRouter;