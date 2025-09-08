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
  "4PII_Work_With_Client_Heading",
  VisionMissionschema
);

module.exports = VisionMission;
