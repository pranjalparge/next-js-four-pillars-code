const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesCmsDevelopmentSchema = new Schema(
	{
		page_meta: { type: String, required: true },
		page_name: { type: String, required: true },
		page_heading: { type: String, required: true },
		heading: { type: String, required: true },
		content_heading: { type: String, required: true },
		info_head1: { type: String, required: true },
		info_head2: { type: String, required: true },
		list1: { type: [String], required: true },
		list2: { type: [String], required: true },
		list3: { type: [String], required: true },
	},
	{
		timestamps: true,
	}
);

const ServicesCmsDevelopment = mongoose.model(
	'4PII_ServicesCmsDevelopment',
	servicesCmsDevelopmentSchema
);

module.exports = ServicesCmsDevelopment;
