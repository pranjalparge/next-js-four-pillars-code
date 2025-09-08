const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const elerningSchema = new Schema(
  {
    content: { type: String, required: true },
    content_head1: { type: String, required: true },
    info_head1: { type: String, required: true },
    info_head2: { type: String, required: true },
    info1: { type: String, required: true },
    info2: { type: String, required: true },
    info3: { type: String, required: true },
    info4: { type: String, required: true },
    subheading: { type: String, required: true },
    list1: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Elerning = mongoose.model("saas_Elerning", elerningSchema);

module.exports = Elerning;
