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
  "SAAS_InnerBAREMETAHOST",
  dynamicWebSchema
);

module.exports = OnlienAdmission;
