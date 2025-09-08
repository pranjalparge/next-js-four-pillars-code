const mongoose = require("mongoose");

const { Schema } = mongoose;

const Landing_PageSchema = new Schema(
  {
    page_heading: { type: String, required: true },
    page_content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Landing_Page = mongoose.model("saas_LandingPage", Landing_PageSchema);

module.exports = Landing_Page;
