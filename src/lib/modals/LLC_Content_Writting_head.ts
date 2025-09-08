const mongoose = require('mongoose');

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
    {
        page_heading: { type: String},
        content: { type: String},
        // list_head :{type:String},
        // list:{type:[String]},
        // image:{ type:Object },


    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('LLC_Content_Writing_Head', aboutUsSchema);

module.exports = AboutUs;
