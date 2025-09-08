const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const aboutUsSchema = new Schema(
  {
    info: { type: String },
    info_head: { type: String },
    info_one: { type: String },
    info_two: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);
   
  const Testimonials = mongoose.model('LLP_Testimonials',aboutUsSchema);
  
  module.exports = Testimonials;
