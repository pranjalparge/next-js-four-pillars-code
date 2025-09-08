const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentgatewayintegrationSchema = new Schema(
	{
		page_heading: { type: String },
		content: {type: String},
	},
	{
		timestamps: true,
	}
);

const Paymentgatewayintegration = mongoose.model(
	'Krislin_SSL_Head',
	PaymentgatewayintegrationSchema
);

module.exports = Paymentgatewayintegration;

