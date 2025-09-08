const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    page_heading: { type: String },
    page_meta: { type: String },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("4PII_Event_Head", eventSchema);

module.exports = Event;
