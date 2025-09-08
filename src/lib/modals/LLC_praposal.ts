const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const praposalSchema = new Schema({
    Email_Address: { type: String, required: true },
    Company_Name: { type: String, required: true },
    Company_Address: { type: String, required: true },
    Subject : { type: String, required: true },
    Contact_Person_Name:{type:String , required:true},
    Contact_No:{type:String , required:true},
    Services:{type:String , required:true},
    Project_Estimation:{type:String , required:true},
    Message:{type:String , required:true},
    Captcha_Code :{type:String , required:true}
    
  }, {
    timestamps: true,
  }); 
   
  const Praposal = mongoose.model('LLC_Praposal',praposalSchema);
  
  module.exports =Praposal;
