const mongoose = require("mongoose");

const { Schema } = mongoose;

const OnlienAdmissionSchema = new Schema(
  {
    page_heading: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const OnlienAdmission = mongoose.model(
  "saas_OnlienAdmission_Head",
  OnlienAdmissionSchema
);

module.exports = OnlienAdmission;
