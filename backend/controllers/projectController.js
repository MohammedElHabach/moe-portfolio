const asyncHandler = require('express-async-handler')

// @desc    Get projects
// @route   GET /api/projects
// @access  Public
const getProject = async(req,res) => {
    res.status(200).json({message:'get projects'}) 
}

// @desc    Create project
// @route   GET /api/projects
// @access  Private
const createProject = asyncHandler( async(req,res) => {
    if(!req.body.name){
        res.status(400)
        throw new Error('Please add a name field')
    }if(!req.body.img){
        res.status(400)
        throw new Error('Please add a pic')
    }
    if(!req.body.desc){
        res.status(400)
        throw new Error('Please add a description')
    }
    if(!req.body.repoLink){
        res.status(400)
        throw new Error('Please add a repo Link')
    }
    if(!req.body.demoLink){
        res.status(400)
        throw new Error('Please add a demo Link')
    }
    res.status(200).json({message:'create projects'}) 

})

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler( async(req,res) => {
    res.status(200).json({message:`update project ${req.params.id}`}) 
})

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler( async(req,res) => {
    res.status(200).json({message:`delete project ${req.params.id}`}) 

})



module.exports= {
    getProject,
    createProject,
    updateProject,
    deleteProject
}