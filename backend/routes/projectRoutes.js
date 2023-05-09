const express = require('express')
const router = express.Router()
const {getProject,createProject,deleteProject,updateProject } = require("../controllers/projectController")
const {upload}=require('../middleware/multer')

router.route('/').get(getProject).post(upload.single('img'),createProject)
router.route('/:id').put(upload.single('img'),updateProject).delete(deleteProject)

module.exports = router
