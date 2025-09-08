const mongoose = require("mongoose");

const { Schema } = mongoose;

//  all data in array form

const ExEmployeeSchema = new Schema({
  Emp_name: {
    type: String,
  },
  From: {
    type: Date,
  },
  To: {
    type: String,
  },
  Profile: {
    type: String,
  },
  review: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});
module.exports = mongoose.model("saas_Ex_Employee", ExEmployeeSchema);
