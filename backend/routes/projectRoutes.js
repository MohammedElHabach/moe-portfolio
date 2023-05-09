const express = require('express')
const router = express.Router()
const {getProject,createProject,deleteProject,updateProject } = require("../controllers/projectController")

router.route('/').get(getProject).post(createProject)
router.route('/:id').put(updateProject).delete(deleteProject)

module.exports = router
