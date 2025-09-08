const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const graficSchema = new Schema(
  {
    info_head: { type: String, required: true },
    info: { type: String, required: true },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const GraficDesign = mongoose.model(
  "99ideasLLC_IsoCertification",
  graficSchema
);

module.exports = GraficDesign;
