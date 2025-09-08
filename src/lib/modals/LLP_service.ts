const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema(
	{
		// heading: { type: String, required: true },
		// description: { type: String, required: true },
		// url: { type: String, required: true },
		// is_active: { type: Number }
		page_meta: { type: String, required: true },
		info1: { type: String, required: true },
		info2: { type: String, required: true },
		info3: { type: String, required: true },
		info4: { type: String, required: true },
		info5: { type: String, required: true },
		info6: { type: String, required: true },
		info_head1: { type: String, required: true },
		info_head2: { type: String, required: true },
		info_head3: { type: String, required: true },
		info_head4: { type: String, required: true },
		info_head5: { type: String, required: true },
		info_head6: { type: String, required: true },
		list1: { type: [String], required: true },
		list2: { type: [String], required: true },
	},
	{
		timestamps: true,
	}
);

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;
