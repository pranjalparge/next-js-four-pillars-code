const { string } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    info: { type: String },
    info_head: { type: String },
    info_one: { type: String },
    info_two: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("99ideasLLC_Testimonial", aboutUsSchema);

module.exports = AboutUs;
