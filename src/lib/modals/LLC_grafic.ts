const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const graficSchema = new Schema(
  {
    info_head: { type: String },
    info: { type: String },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const GraficDesign = mongoose.model("LLC_GraficDesign", graficSchema);

module.exports = GraficDesign;
