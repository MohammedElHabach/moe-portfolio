const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    desc: {
      type: String,
    },
    techStack:{
      type: String,
      required: [true, "Please add a tech stack"]
    },
    img: {
      type: String,
      required: [true, "Please add an image"],
    },
    repoLink: {
      type: String,
      required: [true, "Please add the repo Link"],
    },
    demoLink: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Project", projectSchema);
