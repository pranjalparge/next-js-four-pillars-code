const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const onetimepasswordSchema = new Schema({
  info1:{type: String, required: true},
  info2:{type: String, required: true},
  info3:{type: String, required: true},
  info4:{type: String, required: true},
  info5:{type: String, required: true},
  info6:{type: String, required: true},
  info_head1:{type: String, required: true},
 
    
  }, {
    timestamps: true,
  }); 
   
  const Onetimepassword= mongoose.model('LLP_Onetimepassword',onetimepasswordSchema);
  
  module.exports =Onetimepassword;
