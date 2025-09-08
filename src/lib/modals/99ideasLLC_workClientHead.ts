const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisionMissionschema = new Schema(
  {
    page_head: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const VisionMission = mongoose.model(
  "99ideas_Work_Client_Head",
  VisionMissionschema
);

module.exports = VisionMission;
