// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const aboutUsSchema = new Schema(
//     {
//         info: { type: String},
//         info_head: { type: String},
//         image:{ type:Object },


//     },
//     {
//         timestamps: true,
//     }
// );

// const AboutUs = mongoose.model('Krislin_AboutUs', aboutUsSchema);

// module.exports = AboutUs;


const mongoose = require('mongoose');

const AboutPageSchema = new mongoose.Schema({
  aboutHead: { type: String, required: true },
  aboutContent: { type: String, required: true },
  services: [
    {
      title: { type: String },
      image: { type: String },
      content: { type: String }
    }
  ],
  vissionHead: { type: String },
  vissionContent: { type: String },
  visionSection: {
    heading: { type: String },
    content: { type: String },
    image: { type: String }
  },
  missionHead: { type: String },
  misssionContent: { type: String },
  missionSection: {
    heading: { type: String },
    content: { type: String },
    image: { type: String }
  },
  whychoosHead: { type: String, required: true },
  whychooseContent: { type: String, required: true },
  whyChooseUs: [
    {
      heading: { type: String },
      content: { type: String },
      image: { type: String }
    }
  ]
})

const AboutUs =  mongoose.model('KrislinAboutPage', AboutPageSchema);


module.exports = AboutUs;
