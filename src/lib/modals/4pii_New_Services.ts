const mongoose = require("mongoose");

const { Schema } = mongoose;

const New_servicesSchema = new Schema(
  {
    info: { type: String, required: true },
    info_head: { type: String, required: true },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("4PII_New_Services", New_servicesSchema);

module.exports = AboutUs;
