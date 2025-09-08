const mongoose = require('mongoose');

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
    {
        page_heading: { type: String},
        // head: { type: String},
        // sub_head: { type: String},
        content: { type: String},


    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('4PII_Career_Page_Head', aboutUsSchema);

module.exports = AboutUs;
