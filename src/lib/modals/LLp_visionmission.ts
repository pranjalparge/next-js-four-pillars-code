const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const VisionMissionschema = new Schema(
  {
    info_head: { type: String },
    info: { type: String },
  },
  {
    timestamps: true,
  }
);

  const VisionMission = mongoose.model('LLP_VisionMission',VisionMissionschema);
  
  module.exports =VisionMission;
