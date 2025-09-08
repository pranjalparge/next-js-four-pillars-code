const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialsschema = new Schema(
  {
    page_heading: { type: String },
    page_meta: { type: String },
  },
  {
    timestamps: true,
  }
);

const Testimonials = mongoose.model("LLc_Testimonial_Head", testimonialsschema);

module.exports = Testimonials;
