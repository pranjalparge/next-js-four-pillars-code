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

const Onetimepassword = mongoose.model("saas_OtpHead", onetimepasswordSchema);

module.exports = Onetimepassword;
