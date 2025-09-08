const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"], // Only these values are allowed
      default: "Admin", // Default role
    },
    // role: {
    //   // "Admin":1984,
    //   // "SuperAdmin":5150,
    //   // "User":2001
    //   type: String, // for authorization
    //   // type:[String], // for verifyRoles
    //   required: true,
    //   default: "user",
    //   enum: [
    //     "4pii_admin",
    //     "llc_admin",
    //     "saas_admin",
    //     "llp_admin",
    //     "krislin_admin",
    //     "4pii_superadmin",
    //     "llc_superadmin",
    //     "saas_superadmin",
    //     "llp_superadmin",
    //     "krislin_superadmin",
    //     "all_admin",
    //     "main_superadmin"
    //   ],
    // },
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
    // is_enable_4pii: { type: Number, default: '0' },
    resetPasswordOtp: Number,
    resetPasswordExpire: Date,
    temp_two_factor: Object,
    phoneOTP: Number,
    phoneOTPExpireTime: Date,
    emailOTP: Number,
    emailOTPExpireTime: Date,
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
module.exports = mongoose.model("User", UserSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// // const validator = require("email-validator");
// // const errorHandler = require("../utils/errorHandler");
// // const { readWrite } = require("../config/database");

// const userSchema = new mongoose.Schema(
//     {
//         fname: {
//             type: String,
//             // required: [true, "Please enter your first name."],
//         },
//         lname: {
//             type: String,
//             // required: [true, "Please enter your last name."],
//         },
//         email: {
//             type: String,
//             // required: [true, "Please enter your email address"],
//             // unique: true,
//             // match: [
//             //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//             //     "Enter a valid email",
//             // ],
//         },
//         phone: {
//             type: String,
//             required: [true, "Please enter phone Number"],
//             unique: true,
//             sparse: true,
//             minlength: [10, "Enter a valid phone number."],
//             maxlength: [10, "Enter a valid phone number."],
//         },
//         password: {
//             type: String,
//             required: [true, "Please enter password for your account"],
//             minlength: [8, "Your password must be at least 8 characters long"],
//             select: false, //it means that this field wont be shown when user is fetched
//         },
//         zipcode: {
//             type: Number,
//             // required: [true, "Please enter Zip Code."],
//         },
//         city: {
//             type: String,
//             // required: [true, "Please enter city."],
//         },
//         state: {
//             type: String,
//             // required: [true, "Please enter state."],
//         },
//         role: {
//             type: String,
//             default: "user",
//         },
//         resetPasswordOtp: Number,
//         resetPasswordExpire: Date,
//         temp_two_factor: Object,
//         phoneOTP: Number,
//         phoneOTPExpireTime: Date,
//         emailOTP: Number,
//         emailOTPExpireTime: Date,
//         is_active: { type: Number, default: "1" },
//         is_block: { type: Number, default: "0" },
//         is_trashed: { type: Number, default: "0" },
//         email_verified: { type: Number, default: "0" },
//         phone_verified: { type: Number, default: "0" },
//         two_factor_enabled: { type: Boolean, default: false },
//     },
//     {
//         timestamps: true,
//     }
// );

// //encrypting password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
// });

// // userSchema.pre("save", async function (next) {
// //  if(!validator.validate(this.email)){
// //     return next(new errorHandler("Enter a valid email"))
// //  }
// // });

// // Return JSON Web Token(JWT)
// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_TIME,
//     });
// };

// //comapre user password with password entered by the user
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('users', userSchema);
//   module.exports = User;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// // Create Schema
// const UserSchema = new Schema({
//     firstName: {
//       type: String,
//     //   required: [true, "Please enter your first name."],
//   },
//   lastname: {
//       type: String,
//     //   required: [true, "Please enter your last name."],
//   },
//   email: {
//       type: String,
//       // required: [true, "Please enter your email address"],
//       unique: true,
//     //   match: [
//     //       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//     //       "Enter a valid email",
//     //   ],
//   },
//   phone: {
//       type: Number,
//       required: [true, "Please enter phone Number"],
//       unique: true,
//       sparse: true,
//       minlength: [10, "Enter a valid phone number."],
//       maxlength: [10, "Enter a valid phone number."],
//   },
//   password: {
//       type: String,
//       required: [true, "Please enter password for your account"],
//       minlength: [8, "Your password must be at least 8 characters long"],
//       // select: false, //it means that this field wont be shown when user is fetched
//   },
//   zipcode: {
//       type: Number,
//   },
//   city: {
//       type: String,
//   },
//   state: {
//       type: String,
//   },
//   role: {
//       type: [String],
//       required: [true, "Please select role."],
//   },
//   resetPasswordOtp: Number,
//   resetPasswordExpire: Date,
//   temp_two_factor: Object,
//   phoneOTP: Number,
//   phoneOTPExpireTime: Date,
//   emailOTP: Number,
//   emailOTPExpireTime: Date,
//   is_active: { type: Number, default: "1" },
//   is_block: { type: Number, default: "0" },
//   is_trashed: { type: Number, default: "0" },
//   email_verified: { type: Number, default: "0" },
//   phone_verified: { type: Number, default: "0" },
//   two_factor_enabled: { type: Boolean, default: false },
// });

// const User = mongoose.model('users', UserSchema);
//   module.exports = User;

// //   let User
// // try {
// //   User = mongoose.model('users')
// // } catch (error) {
// //   User = mongoose.model('users', UserSchema)
// // }
// // module.exports = User;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// // Create Schema
// const UserSchema = new Schema({
//     firstName: {
//       type: String,
//     //   required: [true, "Please enter your first name."],
//   },
//   lastname: {
//       type: String,
//     //   required: [true, "Please enter your last name."],
//   },
//   email: {
//       type: String,
//       // required: [true, "Please enter your email address"],
//       unique: true,
//     //   match: [
//     //       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//     //       "Enter a valid email",
//     //   ],
//   },
//   phone: {
//       type: Number,
//       required: [true, "Please enter phone Number"],
//       unique: true,
//       sparse: true,
//       minlength: [10, "Enter a valid phone number."],
//       maxlength: [10, "Enter a valid phone number."],
//   },
//   password: {
//       type: String,
//       required: [true, "Please enter password for your account"],
//       minlength: [8, "Your password must be at least 8 characters long"],
//       // select: false, //it means that this field wont be shown when user is fetched
//   },
//   zipcode: {
//       type: Number,
//   },
//   city: {
//       type: String,
//   },
//   state: {
//       type: String,
//   },
//   role: {
//       type: [String],
//       required: [true, "Please select role."],
//   },
//   resetPasswordOtp: Number,
//   resetPasswordExpire: Date,
//   temp_two_factor: Object,
//   phoneOTP: Number,
//   phoneOTPExpireTime: Date,
//   emailOTP: Number,
//   emailOTPExpireTime: Date,
//   is_active: { type: Number, default: "1" },
//   is_block: { type: Number, default: "0" },
//   is_trashed: { type: Number, default: "0" },
//   email_verified: { type: Number, default: "0" },
//   phone_verified: { type: Number, default: "0" },
//   two_factor_enabled: { type: Boolean, default: false },
// });

// const User = mongoose.model('users', UserSchema);
//   module.exports = User;

// //   let User
// // try {
// //   User = mongoose.model('users')
// // } catch (error) {
// //   User = mongoose.model('users', UserSchema)
// // }
// // module.exports = User;
