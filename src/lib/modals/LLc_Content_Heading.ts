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

const AboutUs = mongoose.model("LLC_Content_Writing", aboutUsSchema);

module.exports = AboutUs;
