import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// Register a new Company
export const registerCompany = async (req,res) => {

    const {name, email, password} = req.body

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile) {
        return res.json({success:false, message: 'Missing Details'})
    }

    try {

        const companyExists = await Company.findOne({email})

        if (companyExists) {
            return res.json({success:false, message: 'Company already registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success:true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({success:false, message: error.message})
    }

}

// Company Login
export const loginCompany = async (req,res) => {

    const {email, password} = req.body

    // if(!email || !password) {
    //     return res.json({success:false, message: 'Missing Details'})
    // }

    try {

        const company = await Company.findOne({email})

        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success:true, 
                company:{
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else {
            res.json({success:false, message: 'Invalid Email or Password'})
        }

    } catch (error) {
            res.json({ success: false, message: error.message })
    }
}

// Get Company Data
export const getCompanyData = async (req,res) => {

    try {

        const company = req.company

        res.json({success: true, company})

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Post a new Job
export const postJob = async (req, res) => {

    const {title, description, location, salary, level, category} = req.body

    const companyId = req.company._id

    try {

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save()

        res.json({success:true, newJob})

    } catch (error) {

        res.json({success:false, message: error.message})

    }

}

// Get Company Jobs Applicants
export const getCompanyJobApplicants = async (req,res) => {

}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req,res) => {
    try {

        const companyId = req.company._id

        const jobs = await Job.find({companyId})

        // Adding No. of Applications info in Data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({jobId: job._id})
            return {...job.toObject(), applicants: applicants.length}
        }))

        res.json({success:true, jobsData})

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

// Change Job Application Status
export const changeJobApplicationStatus = async (req,res) => {

}

// Change Job Visiblity
export const changeVisibility = async (req,res) => {
    try {

        const {id} = req.body
        const companyId = req.company._id
        const job = await Job.findById(id)
        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()

        res.json({success: true, job})

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}