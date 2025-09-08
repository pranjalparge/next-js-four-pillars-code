const mongoose = require("mongoose");

const { Schema } = mongoose;

//  all data in array form

const JobAddSchema = new Schema({
  Job_Add: [
    {
      title: { type: String },
      Company_name: { type: String },
      location: { type: String },
      Experiance: { type: String },
      salary: { type: String },
      skills: { type: String },
      description: { type: [String] },
      postedDate: { type: String },
      expireDate: { type: String },
    },
  ],

  createdAt: {
    type: String,
  },
});
module.exports = mongoose.model("saas_Job_Add", JobAddSchema);
