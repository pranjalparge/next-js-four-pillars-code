const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    image : {type : String},
    heading : {type : String},
    content : {type : String},
    heading2 : {type : String},
    content2 :{type : String},
    heading3 : {type : String},
    keyFeatures : [
        {
            stars : {type : Number},
            heading : {type : String},
            content : {type : String},
        }
    ],
    summary : {type : String},
    heading_starColor : {type : String},
    contentColor : {type : String},
    store : [
        {
            heading : {type : String},
            content : {type : String},
            image : {type : String},
        }
    ]
})

const portfolioModel = mongoose.model("99LLCportfoliModel",portfolioSchema)

module.exports = {
    portfolioModel
}