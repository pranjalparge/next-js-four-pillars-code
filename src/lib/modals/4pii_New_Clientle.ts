const { array } = require('joi');
const mongoose = require('mongoose');

const FirstSchema = new mongoose.Schema({
  image: { type: String }, 
  head: { type: String },        
  title: { type: String, required: true },
  description: { type: String, required: true },////// for 1st
});

const secondSchema = new mongoose.Schema({
  image: { type: String },   
  head: { type: String },         
  title: { type: String, required: true },
  description: { type: String, required: true },// for 2nd
});
const thirdSchema = new mongoose.Schema({
  image: { type: String },   
  head: { type: String },         
  title: { type: String, required: true },
  description: { type: String, required: true },// for 2nd
});

const fourtSchema = new mongoose.Schema({
  image: { type: String },   
  head: { type: String },         
  title: { type: String, required: true },
  description: { type: String, required: true },// for 2nd
});
const fipthSchema = new mongoose.Schema({
  image: { type: String },   
  head: { type: String },         
  title: { type: String, required: true },
  description: { type: String, required: true },// for 2nd
});
const sixSchema = new mongoose.Schema({
  image: { type: String },   
  head: { type: String },         
  title: { type: String, required: true },
  description: { type: String, required: true },// for 2nd
});


const WhatsAppIntegrationSchema = new mongoose.Schema({
  advObject1: { type: String },
  advObject2: { type: String },
  advObject3: { type: String },
  title:{type:String},
  content:{type:String},

  featuresSection: {
    sectionTitle: { type: String },
    sectionContent: { type: String },
    content: { type: String },
    head: { type: String },
    secionsubContent:{type:String},
    features: [FirstSchema],
  },

  coreFeaturesSection: {
    sectionTitle: { type: String },
    sectionContent: { type: String },
    content: { type: String },
    head: { type: String },
    secionsubContent:{type:String},
    coreFeatures: [secondSchema],
  },

  
  useCasesSection: {
    image: { type: String },   
    sectionTitle: { type: String },
    sectionContent: { type: String },
    content: { type: String },
    head: { type: String },
    secionsubContent:{type:String},
    useCases: [thirdSchema],
  },
    fourtSection: {
    content: { type: String },
    head: { type: String },
    fourthCases: [fourtSchema],
  },
   fipthSection: {
    content: { type: String },
    head: { type: String },
    fipthCases: [fipthSchema],
  },
   sixSection: {
    content: { type: String },
    head: { type: String },
    sixCases: [sixSchema],
  },
}, { timestamps: true });

module.exports = mongoose.model('4PII_Cliental', WhatsAppIntegrationSchema);
