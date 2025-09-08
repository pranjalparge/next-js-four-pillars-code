const mongoose = require("mongoose")

const visitSchema = new mongoose.Schema({
    ip: { type: String },
    city: { type: String },
    country: { type: String },
    timezone: { type: String },
    org: { type: String },
    userAgent: { type: String },
    page: { type: String },
    timestamp: { type: Date, default: Date.now }
})

exports.visit = mongoose.model("visit", visitSchema)

