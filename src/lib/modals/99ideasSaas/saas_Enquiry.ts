const mongoose = require("mongoose");

const { Schema } = mongoose;

const EnquirySchema = new Schema(
  {
    Full_Name: { type: String},
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: "Invalid email format.",
      },
    },
    Phone: {
      type: String,
      // validate: {
      //   validator: function (value) {
      //     return /^\d{10}$/.test(value.toString());
      //   },
      //   message: "Phone number must be exactly 10 digits.",
      // },
    },
    Organisation: { type: String },
    Address: { type: String },
    City: { type: String },
    State: { type: String },
    Country: { type: String },
    Services: { type: Object },
    message: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("saas_Enquiry", EnquirySchema);

module.exports = Enquiry;
