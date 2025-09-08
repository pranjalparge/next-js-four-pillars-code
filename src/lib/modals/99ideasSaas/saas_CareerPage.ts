const mongoose = require("mongoose");

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
  {
    title: { type: String },
    // Company_name: { type: String },
    location: { type: String },
    Experiance: { type: String },
    salary: { type: String , default : "free"},
    time : {type : String},
    role : {type : String,default : "nothing"},
    // skills: { type: [String] },
    // description: { type: String },
    postedDate: { type: String },
    // expireDate: { type: String },
    // postDate : {type : String},
    image: { type: Object },
    hide : {type : Number,enum : [0,1],default : 0}
  },
  {
    timestamps: true,
  }
);

const AboutUs = mongoose.model("saas_Career", aboutUsSchema);

module.exports = AboutUs;
