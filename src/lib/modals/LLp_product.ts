const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const productSchema = new Schema({
  page_meta:{ type: String, required: true },
  info1:{ type: String, required: true }, 
  info2:{ type: String, required: true },
  info3:{ type: String, required: true },
  info4:{ type: String, required: true },
  info5:{ type: String, required: true },
  info_head1:{ type: String, required: true },
  info_head2:{ type: String, required: true },
  info_head3:{ type: String, required: true },
  info_head4:{ type: String, required: true },
  info_head5:{ type: String, required: true },
  content_heading:{ type: String, required: true },
  content:{ type: String, required: true },
    // heading: { type: String, required: true, minlength:5 },
    // product1: { type: String, required: true },
    // product2: { type: String, required: true },
    // product3: { type: String, required: true },
    // product4: { type: String, required: true },
    // product5: { type: String, required: true },
    // description: { type: String, required: true },
    // url: { type: String, required: true },
    
  }, {
    timestamps: true,
  }); 
   
  const Product = mongoose.model('LLp_Product', productSchema);
  
  module.exports = Product;
