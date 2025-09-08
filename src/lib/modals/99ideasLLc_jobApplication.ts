const mongoose = require("mongoose");

const { Schema } = mongoose;

const JobApplicationSchema = new Schema(
  {
    Full_Name: { type: String },
    Email_Address: {
      type: String,
      required: true,
      
    },
    Phone: {
      type: Number,
      required: true,
     
    },
    Job_title: { type: String },
    Experience: { type: String },
    Current_Company: { type: String },
    Current_CTC: { type: String },
    Expected_CTC: { type: String },
    Notice_Period: { type: String },
    gender: {type : String , enum:["male","female"]},
    resume: { type: String},
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model(
  "99ideasLLC_JobApplication",
  JobApplicationSchema
);

module.exports = JobApplication;
