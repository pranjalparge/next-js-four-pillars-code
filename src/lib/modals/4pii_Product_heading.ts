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

const ProductUs = mongoose.model("4PII_Product_Head_page", aboutUsSchema);

module.exports = ProductUs;
