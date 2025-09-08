




const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema(
  {
    senderId: String,
    senderName: String,
    message: String,
    isBot: Boolean,
    isRead: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
