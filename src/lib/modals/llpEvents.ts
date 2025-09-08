const mongoose = require("mongoose")

const llpEventsSchema = new mongoose.Schema({
    image : {type : String},
    heading : {type :String},
    day : {type : String},
    time : {type : String},
    eventOption : {type : String},
    cost : {type : String},
    aboutEvent : {type : String},
    keyFeatures : [
        {
            head : {type : String},
        }
    ],
    benefits : [
        {
            head : {type : String},
        }
    ],
    speakers : [
        {
            head : {type : String},
        }
    ],
    learn : [
        {
            head : {type : String},
        }
    ],
    schedule : [
        {
            head : {type : String},
        }
    ]
})

const llpEventModel = mongoose.model("llpevent",llpEventsSchema)

module.exports = {llpEventModel}