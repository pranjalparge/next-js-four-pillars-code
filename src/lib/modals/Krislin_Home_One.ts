
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const home_oneSchema = new Schema({
    
    
    info: { type: String},
    
   
    
    info_head: { type: String},
    image:{type :Object}
    
   
   
   
   
    
  }, {
    timestamps: true,
  }); 
   
  const GraficDesign= mongoose.model('Krislin_Home_One', home_oneSchema);
  
  module.exports =GraficDesign;

