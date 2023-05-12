const express = require('express')
const router = express.Router()
const {getProject,createProject,deleteProject,updateProject } = require("../controllers/projectController")
const {upload}=require('../middleware/multer')
const { protect } = require('../middleware/authMidlleware')

router.route('/').get(getProject).post(upload.single('img'),protect,createProject)
router.route('/:id').put(upload.single('img'),protect,updateProject).delete(protect,deleteProject)

module.exports = router
