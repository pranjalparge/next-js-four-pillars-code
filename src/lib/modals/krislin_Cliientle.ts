const mongoose = require('mongoose');

const { Schema } = mongoose;

const New_productSchema = new Schema(
    {
        info: { type: String },
        info_head: { type: String},
        image:{type:Object},


    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('Krislin_Clientle',New_productSchema);

module.exports = AboutUs;
