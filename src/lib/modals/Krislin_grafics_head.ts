

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const graficSchema = new Schema({
    
    
    page_heading: { type: String},
    
   
    
    content: { type: String},
    
   
   
   
   
    
  }, {
    timestamps: true,
  }); 
   
  const GraficDesign= mongoose.model('Krislin_GraficDesign_Head', graficSchema);
  
  module.exports =GraficDesign;

