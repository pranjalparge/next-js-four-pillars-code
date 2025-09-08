const mongoose = require("mongoose");

const { Schema } = mongoose;

const Home_PageSchema = new Schema(
  {
    website_head: { type: String },
    website_content: { type: String },
    e_learning_head: { type: String },
    e_learning_content: { type: String },
    onlien_Add_head: { type: String },
    onlien_Add_content: { type: String },
    book_keeping_head: { type: String },
    book_keeping_content: { type: String },
    payment_gateway_head: { type: String },
    payment_gateway_content: { type: String },
    otp_head: { type: String },
    otp_content: { type: String },
    cms_head: { type: String },
    cms_content: { type: String },
    product_head: { type: String },
    product_content: { type: String },
    cms_develop_head: { type: String },
    cms_develop_content: { type: String },
    content_writing_head: { type: String },
    content_writing_content: { type: String },
    grafic_design_head: { type: String },
    grafic_design_content: { type: String },
    domain_regi_head: { type: String },
    domain_regi_content: { type: String },
    iso_head: { type: String },
    iso_head_content: { type: String },
    ssl_head: { type: String },
    ssl_content: { type: String },
    head: { type: String },
  },
  {
    timestamps: true,
  }
);
const Home_Page = mongoose.model("saas_HomePage", Home_PageSchema);

module.exports = Home_Page;
