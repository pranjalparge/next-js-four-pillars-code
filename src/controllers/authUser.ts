const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");
const JWT_SECRET = "dfigSUhgduifysuhfiuargjxo";
const asyncMiddleware = require("../middleware/async");
const createToken = require("../utils/createToken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
// const file = require("../utils/file.js");

// admin register part for admin use only  , cannot be accessable from frontend
exports.register = asyncMiddleware(async (req, res) => {
  let { error, value } = Joi.object({
    fname: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .error(new Error("first name must be valid!")),
    lname: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .error(new Error("last name must be valid!")),
    phone: Joi.number().min(10).required(),
    email: Joi.string()
      .lowercase()
      .email()
      .required()
      .error(new Error("Email must be valid!")),
    role: Joi.string(),

    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$"
        )
      )
      .required()
      .error(
        new Error(
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character password required!"
        )
      ),
  }).validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  // Check whether the user with this email already exists
  try {
    let user = await User.findOne({ email: value.email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(value.password, salt);
    user = await User.create({
      fname: value.fname,
      lname: value.lname,
      email: value.email,
      password: secPass,
      role: value.role,
    });
    return res.status(200).json({ Success: "Registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
});
// admin login part
exports.login = asyncMiddleware(async (req, res) => {
  let { value, error } = Joi.object({
    email: Joi.string()
      .lowercase()
      .trim()
      .required()
      .email()
      .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .error(new Error("Invalid Email Input!")),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$"
        )
      )
      .required()
      .error(new Error("Invalid Password Input!")),
  }).validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    let user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({ error: "Please enter valid credentials" });
    }
    const passwordCompare = await bcrypt.compare(value.password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please enter valid credentials" });
    }
    // creating token and qrcode
    const secret = speakeasy.generateSecret({
      // name: "99ideas",
      name: req.body.email,
    });
    // const authtoken = createToken(data, JWT_SECRET);
    if (user.verified === 0) {
      qrcode.toDataURL(secret.otpauth_url, (err, data) => {
        res.json({ code: data });
      });
      await User.updateOne(
        { _id: user.id },
        { $set: { verify_secret: secret.ascii } }
      );
    } else {
      res.status(200).json({ message: "QRcode already generated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
});
// verify the otp from google authenticator app
exports.verify_secret = asyncMiddleware(async (req, res) => {
  let { value, error } = Joi.object({
    // email: Joi.string()
    //   .lowercase()
    //   .trim()
    //   .required()
    //   .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    //   .error(new Error('Invalid Email Input!')),
    email: Joi.string()
      .lowercase()
      .trim()
      .email()
      .required()
      .error(new Error("Invalid Email Input!")),
    otp: Joi.number()
      .min(100000)
      .max(999999)
      .required()
      .error(new Error("invalid otp")),
  }).validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    let user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({ error: "Please enter valid credentials" });
    }
    const secret = user.verify_secret;

    var verified_otp = speakeasy.totp.verify({
      secret: secret,
      encodeing: "ascii",
      token: value.otp,
    });
    if (!verified_otp) return res.status(401).json({ error: "invalid otp" });
    //   const authtoken = createToken(user.id, JWT_SECRET);
    //   if (authtoken) {
    //     // send email for confirmation
    //     // await sendEmail(user.fname, value.email);
    //   }

    // const payload = {
    //   id:user.id,
    //   role:user.role,
    //   email:user.email,
    //   is_enable:user.is_enable
    // }
    // console.log(payload)

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        fname: user.fname,
        email: user.email,
        is_enable: user.is_enable,
        is_enable_llp: user.is_enable_llp,
        is_enable_saas: user.is_enable_saas,
        is_enable_krislin: user.is_enable_krislin,
        is_enable_llc: user.is_enable_llc,
      },
      "mydata",
      { expiresIn: "10d" }
    );
    if (token) {
      await sendEmail(user.fname, value.email, user.role, user.is_enable);
    }

    console.log(token);
    if (user.verified === 0) {
      await User.updateOne({ _id: user.id }, { $set: { verified: 1 } });
    }

    return res.status(200).json({
      fname: user.fname,
      userRole: user.role,
      Permission: user.is_enable,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
});

exports.logout = asyncMiddleware(async (req, res) => {
  await file.deleteFile();
  res.status(200).json({ Message: "Logout successfully" });
});

module.exports.verifyToken = function (req, res, next) {
  const token = req.header("auth-token") || req.body.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "mydata");
    const currentTime = Date.now();
    if (!decoded) {
      return res.send("unautherised request");
    } else {
      return res.status(200).json({ Data: decoded });
    }

    // req.user = decoded

    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid token.");
  }
};

// module.exports.verifyToken = function(req, res, next) {
//   const token = req.header("auth-token") || req.body.token;
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, "mydata");
//     const currentTime  = Date.now()
//     if(decoded){
//       if(decoded.exp < currentTime){
//         res.json({msg:"token has expired"})
//       }

//       res.json({msg:"token valid" , data:decoded} )

//     }
//     // if(!decoded){
//     //   return res.send('unautherised request')
//     // }

//     // req.user = decoded
//     // res.json({Data: decoded})

//     // next();
//   } catch (error) {
//       console.log(error)
//     res.status(400).send("Invalid token.");
//   }
// };

// const QRCode = require('qrcode')
// const speakeasy = require('speakeasy')
// const validateUser = require('../validators/user')

// const User = require('../models/User');
// const handleAsyncError = require('../middleware/async');

// // register a new user => api/v1/auth/register
// exports.registerUser = handleAsyncError(async (req, res, next) => {
//     const { value, error } = validateUser(req.body)
//     if (error) return (error.message, 400)

//     // CHECK IF USER ALREADY EXISTS
//     let existUser = await User.findOne({ email: value.email })
//     if (existUser) {
//         if (existUser.email_verified) {
//             if (existUser.phone_verified)
//                 return  res.json({message:'User already exists with other email. Contact support!'})

//             else {
//                 if (existUser.phone == value.phone)
//                     return  res.json({message:'User already exists with other email. Contact support!'})

//                 return res.json({message:'User already exists with other email. Contact support!'})

//             }
//         } else if (existUser.phone_verified) {
//             if (existUser.phone == value.phone)
//                 return res.json({message:'User already exists with other email. Contact support!'})

//             else
//                 return res.json({message:'User already exists with other email. Contact support!'})

//         }
//         existUser.remove()
//     }
//     existUser = await User.findOne({ phone: value.phone })
//     if (existUser) {
//         if (existUser.phone_verified) {
//             if (existUser.email_verified)
//                return res.json({message:'User already exists with other email. Contact support!'})

//             else {
//                 if (existUser.email == value.email)
//                 return res.json({message:'User already exists with other email. Contact support!'})

//             return res.json({message:'User already exists with other email. Contact support!'})

//             }
//         } else if (existUser.email_verified) {
//             if (existUser.email == value.email)
//             return res.json({message:'User already exists with other email. Contact support!'})

//             else
//                 return res.json({message:'User already exists with other email. Contact support!'})

//         }
//         existUser.remove()
//     }

//     // SAVE UNVERIFIED USER TO DATABASE
//     const user = await User.create(value)

//     // CREATE TWO FACTOR DETAILS
//     const secret = speakeasy.generateSecret({
//         email: value.email,
//     })
//     user.temp_two_factor = secret
//     await user.save()

//     // // SEND OTP -> PROCEED IF SUCCESS -> ELSE THROW ERROR
//     // const emailOTP = Math.floor(100000 + Math.random() * 900000)
//     // await sendOTPEmail(value.email, emailOTP)
//     // user.emailOTP = emailOTP

//     // const phoneOTP = Math.floor(100000 + Math.random() * 900000)
//     // await sendOTPMobile(value.phone, phoneOTP)
//     // user.phoneOTP = phoneOTP

//     await user.save()

//     return res.json({
//         success: true,
//         message: `OTP sent to  your phone and mail. Please verify to proceed.`,
//     }) // ${req.body.email} and
// })
