const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookkeepinserviceschema = new Schema(
	{
		info1: { type: String, required: true },
		info2: { type: String, required: true },
		page_heading: { type: String, required: true },
		list1: { type: [String], required: true },
	},
	{
		timestamps: true,
	}
);

const BookKeepInservice = mongoose.model('krislin_BookKeepI', bookkeepinserviceschema);

module.exports = BookKeepInservice;
