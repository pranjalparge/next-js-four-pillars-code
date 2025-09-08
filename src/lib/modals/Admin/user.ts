const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
        type: String,
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      enum: [0,1], // Only these values are allowed
      default: 0, // Default role(admin)
    },
 
    verified: {
      type: Number,
      default: "0",
    },
    verify_secret: {
      type: String,
      default: "",
    },
    is_enable_llc: { type: Number, default: "0", enum: [0, 1] },
    is_enable_llp: { type: Number, default: "0" },
    is_enable_krislin: { type: Number, default: "0" },
    is_enable_saas: { type: Number, default: "0", enum: [0, 1] },

    project: {
      type: String,
    },
    is_enable: { type: Number, default: "0" },

    is_active: { type: Number, default: "1" },
    is_block: { type: Number, default: "0" },

    is_trashed: { type: Number, default: "0" },
    email_verified: { type: Number, default: "0" },
    phone_verified: { type: Number, default: "0" },
    two_factor_enabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
// User.createIndexes();
module.exports = mongoose.model("adminUsers", UserSchema);
