const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  image: { type: String },         
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const CoreFeatureSchema = new mongoose.Schema({
  image: { type: String },           
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const UseCaseSchema = new mongoose.Schema({ 
    title:{type:String}  ,   
  image: { type: String },    
  items: [{ type: String, required: true }],
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
    features: [FeatureSchema],
  },

  coreFeaturesSection: {
    sectionTitle: { type: String },
    sectionContent: { type: String },
    coreFeatures: [CoreFeatureSchema],
  },

  useCasesSection: {
    sectionTitle: { type: String },
    sectionContent: { type: String },
    useCases: [UseCaseSchema],
  },

}, { timestamps: true });

module.exports = mongoose.model('WhatsAppIntegration', WhatsAppIntegrationSchema);
