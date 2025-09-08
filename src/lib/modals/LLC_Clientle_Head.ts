const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const clienteleSchema = new Schema({

  page_name:{ type: String},
  content:{type: String}
  

    
  }, {
    timestamps: true,
  }); 
   
  const Clientele = mongoose.model('LLc_Clientele_Head', clienteleSchema);
  
  module.exports =Clientele;
