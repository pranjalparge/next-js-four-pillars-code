const mongoose = require("mongoose");

const { Schema } = mongoose;

const Home_PageSchema = new Schema(
  {
    head: { type: String, required: true },
    website_head: { type: String, required: true },
    website_content: { type: String, required: true },
    Dynamic_website: [
      {
        title: { type: String },
        content: { type: String },
      },
    ],
    data_science_head: { type: String, required: true },
    data_content: { type: String, required: true },
    Data_Science: [
      {
        title: { type: String },
        content: { type: String },
      },
    ],
    mobile_app_head: { type: String },
    mobile_app_content: { type: String, required: true },
    whatsap_inte_head: { type: String },
    whatsap_inte_content: { type: String, required: true },
    onlien_Add_head: { type: String, required: true },
    onlien_Add_content: { type: String, required: true },
    report_man_head: { type: String, required: true },
    report_man_content: { type: String, required: true },
    service_head: { type: String, required: true },
    service_info_head: { type: String, required: true },
    service_content: { type: String, required: true },
    Services: [
      {
        title: { type: String },
        content: { type: String },
      },
    ],
  },
    
  {
    timestamps: true,
  }
);

const Home_Page = mongoose.model("4PII_HomePage", Home_PageSchema);

module.exports = Home_Page;
