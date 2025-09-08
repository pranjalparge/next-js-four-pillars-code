const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onetimepasswordSchema = new Schema(
  {
    page_heading: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const Onetimepassword = mongoose.model(
  "4PII_Onetimepassword_head",
  onetimepasswordSchema
);

module.exports = Onetimepassword;
