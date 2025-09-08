const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  position: {
    type: String,
    required : true
  },
  skills: [
    {
      skill : {type : String}
    },
  ],
  experience: {
    type: String,
  },
  timeline: {
    type: String,
    required: true,
  },
  education: {
    type: String,
  },
  description: {
    type: String,
  },
  imagePath: {
    type: String,
  },
  mail: {
    type: String,
  },
  roleDescription: {
    type: String,
  },
  emp_id : {
    type : String
  },
  link : {type : String}
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
