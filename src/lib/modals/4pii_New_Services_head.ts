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

const ProductUs = mongoose.model("4PII_Services_Head_page", aboutUsSchema);

module.exports = ProductUs;
