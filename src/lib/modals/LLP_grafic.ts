const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const graficSchema = new Schema({
    content:{ type: String, required: true },
    page_name: { type: String, required: true },
    page_heading: { type: String, required: true },
    page_meta: { type: String, required: true },
    info_head1: { type: String, required: true },
    info_head2: { type: String, required: true },
    info_head3: { type: String, required: true },
    info_head4: { type: String, required: true },
    content_heading: { type: String, required: true },
    info1:{ type: String, required: true },
    info2: { type: String, required: true },
    info3:{ type: String, required: true },
    info4:{ type: String, required: true },
   
   
   
   
    
  }, {
    timestamps: true,
  }); 
   
  const GraficDesign= mongoose.model('LLP_GraficDesign', graficSchema);
  
  module.exports =GraficDesign;
