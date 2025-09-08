const mongoose = require("mongoose");
const { Schema } = mongoose;
const BlogSchema = new Schema({
 
  title: {
    type: String
  },
  content: {
    type: String,
    
  },
  description: {
    type: String
  },
   authorName:{ 
    type: String
   },
   image:{ 
    type:Object 
  },
  
   createdAt: {
    type: Date,
    default: Date.now,
  },
   
});
module.exports = mongoose.model("LLP_Blog", BlogSchema);
