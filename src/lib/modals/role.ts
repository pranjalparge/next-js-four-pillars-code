const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "superadmin", "user"],
    },
    permission: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
// User.createIndexes();
module.exports = mongoose.model("Role", RoleSchema);
