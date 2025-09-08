const { array } = require('joi');
const mongoose = require('mongoose');

const FirstSchema = new mongoose.Schema({
  image: { type: String },         
  title: { type: String, required: true },
  description: { type: String, required: true },////// for 1st
});

const secondSchema = new mongoose.Schema({
  image: { type: String },           
  title: { type: String, required: true },
  description: { type: String, required: true },// for 2nd
});

const thirdSchema = new mongoose.Schema({ 
    title:{type:String}  ,   
  image: { type: String },    
  description: { type: String, required: true }, // 3rd
});

const fourthSchema = new mongoose.Schema({ 
    title:{type:String}  ,   
  image: { type: String },    
  description: { type: String, required: true }, // 4th
});

const WhatsAppIntegrationSchema = new mongoose.Schema({
  advObject1: { type: String },
  advObject2: { type: String },
  advObject3: { type: String },
  title:{type:String},
  content:{type:String},
 list: {
  type: [String],
  required: true,
},


  featuresSection: {
    sectionTitle: { type: String },
    sectionContent: { type: String },
    features: [FirstSchema],
  },

  coreFeaturesSection: {
    sectionTitle: { type: String },
    sectionContent: { type: String },
    coreFeatures: [secondSchema],
  },

  useCasesSection: {
    sectionTitle: { type: String },
    sectionContent: { type: String },
    useCases: [thirdSchema],
  },

 corevalueSection: {
  sectionTitle: { type: String },
  sectionContent: { type: String },
  useCases: [fourthSchema],
},


}, { timestamps: true });

module.exports = mongoose.model('4PII_AboutUs', WhatsAppIntegrationSchema);
