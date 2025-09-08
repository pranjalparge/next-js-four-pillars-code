const mongoose = require("mongoose")

const TravelPropertySchema = new mongoose.Schema(
    {
        name : { type: String},
        location : { type: String},
        price : { type: String},
        PropertySize : { type: String},
        propertyType : { type: String},
        images:[
            {
                image : { type: String }
            }
        ]
    },
    {
        timestamps: true,
    }
)



const traveldestination = new mongoose.Schema({
    city :{
            type: String 
        },
    flateType : {
            type: String 
        },
    property : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'travelProperty'
    }
})

const TravelProperty = mongoose.model("travelProperty",TravelPropertySchema)
const property = mongoose.model("travelpropertyDestinations",traveldestination)
module.exports = {
    TravelProperty,
    property
}