const mongoose = require("mongoose");

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    info: { type: String },
    info_head: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("saas_Clientele", aboutUsSchema);

module.exports = AboutUs;
