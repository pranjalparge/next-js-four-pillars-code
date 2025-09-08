const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisionMissionschema = new Schema(
  {
    info_head: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const VisionMission = mongoose.model(
  "4PII_Work_With_Client",
  VisionMissionschema
);

module.exports = VisionMission;
