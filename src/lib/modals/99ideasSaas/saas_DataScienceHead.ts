const mongoose = require("mongoose");

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    page_heading: { type: String },
    page_meta: { type: String },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("saas_Data_Science_Head", aboutUsSchema);

module.exports = AboutUs;
