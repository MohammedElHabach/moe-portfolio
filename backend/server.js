const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/projects',require("./routes/projectRoutes"))
app.use('/api/admin',require("./routes/adminRoutes"))
app.use('/api',require('../backend/routes/contactUsRoute'))
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on port ${port} `))