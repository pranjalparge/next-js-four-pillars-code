const mongoose = require("mongoose");

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    title: { type: String },
    Company_name: { type: String },
    location: { type: String },
    Experiance: { type: String },
    salary: { type: String },
    skills: { type: [String] },
    description: { type: String },
    postedDate: { type: String },
    expireDate: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("LLC_Career", aboutUsSchema);

module.exports = AboutUs;
