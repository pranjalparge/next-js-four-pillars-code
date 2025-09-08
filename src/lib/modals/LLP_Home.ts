const { array } = require('joi');
const mongoose = require('mongoose');

const FirstSchema = new mongoose.Schema({
  image: { type: String }, 
  image2:{type:String},
  head: { type: String },        
  title: { type: String, required: true },
  description: { type: String, required: true },////// for 1st
});

const secondSchema = new mongoose.Schema({
  image: { type: String },           
  title: { type: String, required: true },
  description: { type: String, required: true },
  advObject1: { type: String },
  advObject2: { type: String },
  advObject3: { type: String },
 list: [
  {
    image: { type: String },
    content: { type: String },
  }
]

});
const sixObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },
  bgImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  titles: [
    {
      head: { type: String, required: true },
      subhead: { type: String, required: true },
      review: { type: Number, required: true },
      date: { type: Date, required: true },
      image: { type: String },
    },
  ],
});



const WhatsAppIntegrationSchema = new mongoose.Schema({
  heading : {
    // advObject1: { type: String },
    // advObject2: { type: String },
    // advObject3: { type: String },
    title1:{type:String},
    title2:{type:String},
    content:{type:String},
    image: { type: String }, 
  },

  secondSection: {
    sectionTitle: { type: String },
    // sectionContent: { type: String },
    content: { type: String },
    // head: { type: String },
    // secionsubContent:{type:String},
    features: [FirstSchema],
  },

  serviceSection: {
    // sectionTitle: { type: String },
    // sectionContent: { type: String },
    // content: { type: String },
    head: { type: String },
    // secionsubContent:{type:String},
    service: [secondSchema],
  },
  testimonial:sixObjectSchema
}, { timestamps: true });


const llp_serviceSchema = new mongoose.Schema({
  hedaings : {
    title: { type: String},
    image: { type: String },
  },
  service : {
    title: { type: String},
    services :[
      {
        title : {type : String},
        content : {type : String}
      }
    ] 
  },
  offer : {
    title1 : {type : String},
    title2 : {type : String},
    title3 : {type : String},
    constent1 : {type : String},
    constent2 : {type : String},
    image : {type : String}
  }
});

const eventsPageSchema = new mongoose.Schema({
  hero: {
    company: { type: String },
    title: { type: String },
    subtitle: { type: String },
    location: { type: String },
    date: { type: String },
    tags: [
      {
        image : {type : String},
        title : {type : String}
      }
    ],
    buttonText: { type: String },
    image: { type: String }
  },
  awaits: {
    heading: { type: String },
    description: { type: String },
    cards: [
      {
        title: { type: String },
        content: { type: String },
        icon: { type: String },
        image: { type: String }
      }
    ]
  },
  upcomingEvent: {
    heading: { type: String },
    location: { type: String },
    timeline: [
      { 
        image : {type : String},
        title : {type : String}
      }
    ],
    image: { type: String }
  },
  pastEvents: [
    {
      title: { type: String },
      subtitle: { type: String },
      description: { type: String }
    }
  ]
});


const aboutUsSchema = new mongoose.Schema({
  heading: { type: String },
  image: { type: String },
  description: [{ type: String }],
  philosophyTitle: { type: String },
  philosophyContent: { type: String },
  strategyTitle: { type: String },
  strategyContent: [{ type: String }],
  approachPoints: [{ type: String }],
  whyUsTitle: { type: String },
  whyUsCards: [
    {
      title: { type: String },
      content: { type: String },
      icon: { type: String }
    }
  ]
});

const llp_About = mongoose.model('AboutUsPage', aboutUsSchema);


const llp_Events = mongoose.model('EventsPage', eventsPageSchema);


const LLP_HomePage = mongoose.model('LLP_HomePage', WhatsAppIntegrationSchema);
const llp_service = mongoose.model('llp_service', llp_serviceSchema);
module.exports = {
  LLP_HomePage,
  llp_service,
  llp_Events,
  llp_About
}
