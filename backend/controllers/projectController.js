const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
// @desc    Get projects
// @route   GET /api/projects
// @access  Public
const getProject = async (req, res) => {
  const projects = await Project.find();
  res.status(200).json(projects);
};

// @desc    Create project
// @route   GET /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  if (!req.body.repoLink) {
    res.status(400);
    throw new Error("Please add a repo Link");
  }

  const project = await Project.create({
    name: req.body.name,
    desc: req.body.desc,
    techStack:req.body.techStack,
    img: req.file.path,
    repoLink: req.body.repoLink,
    demoLink: req.body.demoLink,
  });

  res.status(200).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error("Project Not Found");
  }
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    { ...req.body, img: req.file && req.file.path },
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error("Project Not Found");
  }
  await project.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id, msg: "Deleted Successfully" });
});

module.exports = {
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
