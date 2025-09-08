const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crmSchema = new Schema(
	{
		page_heading: { type: String, required: true },
		info1: { type: String, required: true },
		info2: { type: String, required: true },
		info3: { type: String, required: true },
		info_head1: { type: String, required: true },
		info_head2: { type: String, required: true },
		list1: { type: [String], required: true },
		allcontent: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Crm = mongoose.model('LLC_Crm', crmSchema);

module.exports = Crm;
