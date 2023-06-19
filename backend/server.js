const express = require("express")
const cors = require('cors');
const path = require("path");

const colors = require('colors')
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()
const app = express()
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/projects',require("./routes/projectRoutes"))
app.use('/api/admin',require("./routes/adminRoutes"))
app.use('/api',require('../backend/routes/contactUsRoute'))
app.use(errorHandler)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  

app.listen(port,()=>console.log(`server started on port ${port} `))