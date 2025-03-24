import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addProfessional, allProfessionals, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/professionalController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-professional", authAdmin, upload.single('image'), addProfessional)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-professionals", authAdmin, allProfessionals)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;