

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const home_One_HeadSchema = new Schema({
    
    
    page_heading: { type: String},
    
   
    
    content: { type: String},
    
   
   
   
   
    
  }, {
    timestamps: true,
  }); 
   
  const GraficDesign= mongoose.model('Krislin_Home_Head', home_One_HeadSchema);
  
  module.exports =GraficDesign;

