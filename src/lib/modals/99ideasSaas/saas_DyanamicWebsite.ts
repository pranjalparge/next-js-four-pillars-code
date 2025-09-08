const mongoose = require("mongoose");

const { Schema } = mongoose;

const OnlienAdmissionSchema = new Schema(
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
  "saas_Dynamic_Website",
  OnlienAdmissionSchema
);

module.exports = OnlienAdmission;
