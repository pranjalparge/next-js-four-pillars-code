

const mongoose = require('mongoose');

const { Schema } = mongoose;

const New_propertySchema = new Schema(
    {
        name : { type: String, required: true },
        location : { type: String, required: true },
        price : { type: String},
        PropertySize : { type: String, required: true },
        propertyType : { type: String, required: true },
        images:[
            {
                image : { type: String, required: true }
            }
        ]
    },
    {
        timestamps: true,
    }
);

const propertyDestinations = new mongoose.Schema({
    city :{
            type: String 
        },
    flateType : {
            type: String 
        },
    property : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Krislin_Property'
    }
})

const krislinProperty = mongoose.model('Krislin_Property',New_propertySchema);
const properties = mongoose.model('propertyDestinations',propertyDestinations);

module.exports = {krislinProperty, properties};