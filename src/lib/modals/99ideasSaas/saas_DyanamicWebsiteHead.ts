const mongoose = require("mongoose");

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    page_heading: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("saas_Dynamic_Website_Head", aboutUsSchema);

module.exports = AboutUs;
