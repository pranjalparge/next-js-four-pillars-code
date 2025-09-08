const mongoose = require("mongoose");

const { Schema } = mongoose;

const JobApplicationSchema = new Schema(
  {
    Full_Name: { type: String },
    Email_Address: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: "Invalid email format.",
      },
    },
    Phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value.toString());
        },
        message: "Phone number must be exactly 10 digits.",
      },
    },
    Job_title: { type: String },
    Experience: { type: String },
    Current_Company: { type: String },
    Current_CTC: { type: String },
    Expected_CTC: { type: String },
    Notice_Period: { type: String },
    resume: { type: Object },
    gender :{type : String,  enum: ["male", "female"],}
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model(
  "saas_JobApplication",
  JobApplicationSchema
);

module.exports = JobApplication;
