import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router()

// Route to get all Jobs Data
router.get('/', getJobs)

// Route to get a single Jobs by ID
router.get('/:id', getJobById)

export default router;