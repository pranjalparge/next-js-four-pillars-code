const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisionMissionschema = new Schema(
  {
    info_head1: { type: String, required: true },
    info_head2: { type: String, required: true },
    list1: { type: [String], required: true },
    list2: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const VisionMission = mongoose.model(
  "Krislin_VisionMission",
  VisionMissionschema
);

module.exports = VisionMission;
