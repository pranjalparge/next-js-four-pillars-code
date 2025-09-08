const mongoose = require("mongoose");

const { Schema } = mongoose;

const EnquirySchema = new Schema(
  {
    Full_Name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: "Invalid email format.",
      },
    },
    Phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value.toString());
        },
        message: "Phone number must be exactly 10 digits.",
      },
    },
    Organisation: { type: String, required: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    Country: { type: String, required: true },
    Services: { type: Object, required: true },
    message: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("99ideasLLC_Enquiry", EnquirySchema);

module.exports = Enquiry;
