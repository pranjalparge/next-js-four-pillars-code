// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const Footer_PageSchema = new Schema(
//   {
//     Address_line_1: { type: String },
//     Address_line_2: { type: String },
//     state: { type: String },
//     pincode: { type: String },
//     phone: { type: String },
//     email: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Footer_Page = mongoose.model("LLC_FooterPage", Footer_PageSchema);

// module.exports = Footer_Page;

const mongoose = require("mongoose");

const { Schema } = mongoose;

const Footer_PageSchema = new Schema(
  {
    data1: {
      head: { type: String, required: true },
      content: { type: String, required: true },
      button: { type: String, required: true }
    },
data2: {
  head: { type: String, required: true },
  list: { type: [String], required: true },
  button: { type: String, required: true }
    },
data3: {
head: { type: String, required: true },
content: { type: String, required: true },
content2: { type: String, required: true }
    },
  },
  {
    timestamps: true,
  }
);

const Footer_Page = mongoose.model("FooterPage", Footer_PageSchema);

module.exports = Footer_Page;
