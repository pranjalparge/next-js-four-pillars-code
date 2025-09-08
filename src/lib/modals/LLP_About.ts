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

// const AboutUs = mongoose.model('LLP_AboutUs', aboutUsSchema);

// module.exports = AboutUs;

const mongoose = require("mongoose");
const { Schema } = mongoose;
const BlogSchema = new Schema({
 
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  description: {
    type: String,
  },
  description2:{
    type : String
  },
  authorName: {
    type: String,
  },
  authorPicture : {
    type : String
  },
  readingTime : {
    type : String
  },
  image: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hide : {
    type : Number,
    enum:[0,1],
    default : 0
  }
});
module.exports = mongoose.model("LLP_AboutUs", BlogSchema);
