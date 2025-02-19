import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'


const router = express.Router()

// Register a Company
router.post('/register',upload.single('image'), registerCompany)

// Company login
router.post('/login', loginCompany)

// Get Company Data
router.get('/company', protectCompany, getCompanyData)

// Post a Job
router.post('/post-job', protectCompany, postJob)

// Get Applicats Data of Company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

// Get Company Job List
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

// Change Applcations Status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

// Change Applicants Visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router