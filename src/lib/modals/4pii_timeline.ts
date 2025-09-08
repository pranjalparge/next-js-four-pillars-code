const { array } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define subdocument schema for module
const moduleSchema = new Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true, 
  },
});

// Main timeLine schema
const timeLineSchema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: String,
  },
  description: {
    type: String, 
  },
  subDescription: {
    type: String,
  },
  companyDescription: {
    type: String,
  },
  module: [moduleSchema],  // Array of module objects
  status: {
    type: String,
  },
  clientName: {
    type: String,
  },
  achievements: {
    type: String,
  },
  image: {
    type: Object,
  },
  link: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("4pii_TimeLine", timeLineSchema);
