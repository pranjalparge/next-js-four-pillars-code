const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialsschema = new Schema(
  {
    list1: { type: String, required: true },
    list2: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Testimonials = mongoose.model("4PII_Testimonials", testimonialsschema);

module.exports = Testimonials;
