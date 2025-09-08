const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const isocertificationSchema = new Schema(
	{
		page_heading: { type: String, required: true },
		page_name: { type: String, required: true },
		page_meta: { type: String, required: true },
		subheading: { type: String, required: true },
		content: { type: String, required: true },
		list1: { type: [String], required: true },
	},
	{
		timestamps: true,
	}
);

const Isocertification = mongoose.model('LLP_IsoCertificate', isocertificationSchema);

module.exports = Isocertification;
