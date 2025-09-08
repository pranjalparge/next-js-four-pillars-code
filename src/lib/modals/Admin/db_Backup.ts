const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    // },

    // password: {
    //   type: String,
    //   required: true,
    // },
    // host: {
    //   type: String,
    //   required: true,
    // },
    file: {
        type: String,
        required: true,
      },
 


 
  },
  {
    timestamps: true,
  }
);
// User.createIndexes();
module.exports = mongoose.model("db_Backup", UserSchema);
