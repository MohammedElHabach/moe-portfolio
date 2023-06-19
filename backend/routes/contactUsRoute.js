const express = require('express')
const router = express.Router()
const {contactus} = require("../controllers/contactUsController")

router.route('/contact').post(contactus)

module.exports = router