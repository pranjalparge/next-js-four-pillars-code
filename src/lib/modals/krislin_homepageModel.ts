const mongoose = require("mongoose")

const KrislinPageSchema = new mongoose.Schema({
    heading : {type : String},
    content : {type : String},
    ownerAndTenats : [
        {
            heading : {type : String},
            content : {type : String}
        }
    ],
    services : [
        {
            heading : {type : String},
            content : {type : String}
        }
    ],
    support : [
        {
            image : {type : String},
            content : {type : String},
            linkHead : {type : String},
            link : {type : String},
            linkColor : {type : String},
            heading : {type : String}
        }
    ],
    customer : [
        {
            company : {type : String},
            comment : {type : String},
            profile : {type : String},
            location : {type : String}
        }
    ]

})

const krislinPage = mongoose.model("krislinPageMode",KrislinPageSchema)

module.exports = {
    krislinPage
}
