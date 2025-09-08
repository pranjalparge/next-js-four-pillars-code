const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentgatewayintegrationSchema = new Schema(
	{
		
		info:{ type: String, required: true },
		info_head: { type: String, required: true },
		image:{type:Object}
		
	},
	{
		timestamps: true,
	}
);

const Paymentgatewayintegration = mongoose.model(
	'Krislin_SSL',
	PaymentgatewayintegrationSchema
);

module.exports = Paymentgatewayintegration;
