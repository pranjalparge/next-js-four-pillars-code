const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    info: { type: String, required: true },
    info_head: { type: String, required: true },
    image: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("LLC_Product", productSchema);

module.exports = Product;
