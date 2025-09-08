const mongoose = require("mongoose");

const { Schema } = mongoose;

const OnlienAdmissionSchema = new Schema(
  {
    page_heading: { type: String, required: true },
    page_meta: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const OnlienAdmission = mongoose.model(
  "LLC_Product_Head",
  OnlienAdmissionSchema
);

module.exports = OnlienAdmission;
