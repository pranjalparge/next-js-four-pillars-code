


const mongoose = require('mongoose');

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
    {
        info: { type: String },
        info_head: { type: String},
        image:{ type:Object },


    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('Krislin_Data_Science', aboutUsSchema);

module.exports = AboutUs;
