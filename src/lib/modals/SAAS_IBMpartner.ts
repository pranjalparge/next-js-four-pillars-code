const mongoose = require("mongoose")

const SaasPeatnerSchema = new mongoose.Schema({
    image : {type : String},
    smarthinker : {type : String},
    heading : {type : String},
    subheading : {type : String},
    content : {type : String},
    heading2 : {type : String},
    content2 : {type : String},
    partnerValue : [
        {
            heading : {type : String},
            image : {type : String},
            content : {type : String},
        }
    ],
    heading3 : {type : String},
    whatMatters : [
        {
            heading : {type : String},
            content : {type : String},
            subheading : {type : String},
            progress : {type : Number}
        }
    ],
    heading4:{type : String},
    content4 : {type : String},
})

const SaasPartner = mongoose.model("SAAS_Partner",SaasPeatnerSchema)

module.exports = {
    SaasPartner
}