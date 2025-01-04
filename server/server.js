import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'

// Initialize Express
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Connect to database
await connectDB()

// Routes
app.get('/',(req,res)=> res.send("API Working"))

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})