

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
    type: String,
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
module.exports = mongoose.model("travel_blog", BlogSchema);



