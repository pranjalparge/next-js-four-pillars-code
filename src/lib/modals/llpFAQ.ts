const mongoose = require("mongoose")

const llpFAQSchema = new mongoose.Schema({
    heading : {type : String},
    headingContent : {type : String},
    categories : [
        {
            heading : {type : String},
            content : [
                {
                    title : {type : String}
                }
            ]
        }
    ],
    faqs : [
        {
            question : {type : String},
            answer : {type : String}
        }
    ]
})

const llpFAQModel = mongoose.model("llpFAQ",llpFAQSchema)

module.exports = {
    llpFAQModel
}