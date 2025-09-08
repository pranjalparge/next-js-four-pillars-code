const mongoose = require("mongoose")

const businessPartnerSchema = new mongoose.Schema({
    image : {type : String},
    company : {type : String,required : true},
    heading : {type : String},
    subheading : {type : String},
    vission : {type : String},
    content : {type : String},
    experties : [
        {
            heading : {type : String},
            content : {type : String}
        }
    ],
    values : [
        {
            heading : {type : String},
            content : {type : String}
        }
    ],
    summaryHeading : {type : String},
    summary : {type : String},
    link : {type : String},
    service : {type : String},
    icon : {type : String}
})

const businessPartnerModel = mongoose.model("businessPartner",businessPartnerSchema)

module.exports = {
    businessPartnerModel
}