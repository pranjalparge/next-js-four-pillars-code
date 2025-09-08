const Message = require("../models/realTimeChat");
const axios = require("axios");

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";



exports.getAutoResponse = async (message, senderId) => {
  await Message.create({
    senderId,
    senderName: "User",
    message,
    isBot: false,
    isRead: false,
  });

  let botReply = "I'm thinking...";

  try {
    const res = await axios.post(
      GEMINI_API_URL,
      {
        prompt: {
          messages: [{ author: "user", content: message }],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_BEARER_TOKEN}`, // Use OAuth Bearer token or API key
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY, // Optional, if you want to use API key query param
        },
      }
    );

    botReply = res.data?.candidates?.[0]?.message?.content || "Sorry, I couldn't understand that.";
  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    botReply = "Sorry, I couldn't fetch a response.";
  }

  await Message.create({
    senderId: "Bot",
    senderName: "Gemini AI",
    message: botReply,
    isBot: true,
    isRead: true,
  });

  return botReply;
};


exports.getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
};
