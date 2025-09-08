const mongoose = require('mongoose');

const { Schema } = mongoose;

const OnlienAdmissionSchema = new Schema(
    {
        page_meta: { type: String, required: true },
        info1: { type: String, required: true },
        info2: { type: String, required: true },
        info3: { type: String, required: true },
        info4: { type: String, required: true },
        info5: { type: String, required: true },
        info_head1: { type: String, required: true },
        info_head2: { type: String, required: true },
        info_head3: { type: String, required: true },
        info_head4: { type: String, required: true },
        info_head5: { type: String, required: true },
        content_heading: { type: String, required: true },
        content: { type: String, required: true },
        list1: { type: [String], required: true },
    },
    {
        timestamps: true,
    }
);

const OnlienAdmission = mongoose.model('LLP_OnlienAdmission', OnlienAdmissionSchema);

module.exports = OnlienAdmission;
