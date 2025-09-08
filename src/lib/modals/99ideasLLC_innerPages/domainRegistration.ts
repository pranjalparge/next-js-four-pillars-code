const mongoose = require("mongoose");

const { Schema } = mongoose;

const dynamicWebSchema = new Schema(
  {
    info: { type: String, required: true },
    info_head: { type: String, required: true },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const OnlienAdmission = mongoose.model(
  "99ideasLLC_InnerDomainregistration",
  dynamicWebSchema
);

module.exports = OnlienAdmission;
