const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const graficSchema = new Schema(
  {
    info: { type: String, required: true },
    info_head: { type: String, required: true },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const GraficDesign = mongoose.model("saas_IsoCertification", graficSchema);

module.exports = GraficDesign;
