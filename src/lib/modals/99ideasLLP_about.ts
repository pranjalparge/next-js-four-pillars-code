const mongoose = require('mongoose');

const { Schema } = mongoose;

const aboutUsSchema = new Schema(
    {
        page_heading: { type: String, required: true },
        page_meta: { type: String, required: true },
        info1: { type: String, required: true },
        info2: { type: String, required: true },
        info3: { type: String, required: true },
        info_head1: { type: String, required: true },
        info_head2: { type: String, required: true },
        info_head3: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('99ideasLLP_AboutUs', aboutUsSchema);

module.exports = AboutUs;
