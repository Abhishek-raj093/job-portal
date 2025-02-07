import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'


const router = express.Router()

// Register a Company
router.post('/register',upload.single('image'), registerCompany)

// Company login
router.post('/login', loginCompany)

// Get Company Data
router.get('/getCompanyData', getCompanyData)

// Post a Job
router.post('/postJob', postJob)

// Get Applicats Data of Company
router.get('/applicants', getCompanyJobApplicants)

// Get Company Job List
router.get('/list-jobs', getCompanyPostedJobs)

// Change Applcations Status
router.post('/change-status', changeJobApplicationStatus)

// Change Applicants Visibility
router.post('/change-visibility', changeVisibility)

export default router