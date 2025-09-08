

const mongoose = require('mongoose');

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
    {
        page_heading: { type: String},
        page_meta: { type: String},
        


    },
    {
        timestamps: true,
    }
);

const ProductUs = mongoose.model('Krislin_Property_Man_Head', aboutUsSchema);

module.exports = ProductUs;

