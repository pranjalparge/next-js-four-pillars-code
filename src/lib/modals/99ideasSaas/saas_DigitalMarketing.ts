const mongoose = require("mongoose");

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    page_heading: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("saas_DigitalMarketing", aboutUsSchema);

module.exports = AboutUs;
