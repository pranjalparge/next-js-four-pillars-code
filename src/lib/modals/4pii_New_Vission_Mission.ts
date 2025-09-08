const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisionMissionschema = new Schema(
  {
    info_head: { type: String },
    info: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const VisionMission = mongoose.model(
  "4PII_New_VisionMission",
  VisionMissionschema
);

module.exports = VisionMission;
