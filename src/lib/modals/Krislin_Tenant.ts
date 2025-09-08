

const mongoose = require('mongoose');

const { Schema } = mongoose;

const New_propertySchema = new Schema(
    {
        info: { type: String, required: true },
        info_head: { type: String, required: true },
        image:{type:Object}


    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('Krislin_Tenant',New_propertySchema);

module.exports = AboutUs;