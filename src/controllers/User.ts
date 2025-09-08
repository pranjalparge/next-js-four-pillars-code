const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asyncMiddleware = require("../middleware/async");

const User = require("../models/Admin/user");

const Password = require("../utils/auth/password");
const {
  encrypt,
  decrypt,
  secretKey,
} = require('../utils/auth/encryptNumber');

const {UserPasswordEmail} = require("../utils/mail")

module.exports.getuser = asyncMiddleware(async (req, res) => {
  try {
    const user = await User.find();
    let newuser = user.filter(u=>u.role==0)
    newuser = newuser.map(u=>{
      u.email=decrypt(u.email,secretKey)
      u.phone = decrypt(u.phone,secretKey)
      return u
  })
    if (user) {
      res.status(200).json({
        success: true,
        data: newuser,
      });
    } else {
      res.json({ message: "user not found" });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});



/// user registration



exports.userRegister = asyncMiddleware(async (req, res) => {
  let { error, value } = Joi.object({
    fullname: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .error(new Error("Full name must be valid!")),
    phone: Joi.string().min(10).required(),
    email: Joi.string()
      .lowercase()
      .email()
      .required()
      .error(new Error("Email must be valid!")),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$"
        )
      )
      .required()
      .error(
        new Error(
          "Password must be 8-16 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character."
        )
      ),
  }).validate(req.body);

  if (error) return res.status(400).json({ success: false, error: error.message });

  try {
    const phone = encrypt(value.phone, secretKey);
    const email = encrypt(value.email, secretKey);
    console.log(phone);
    

    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
        return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const checkPhoneNo = await User.findOne({ phone: phone });
    if (checkPhoneNo) {
        return res.status(409).json({ success: false, message: 'Mobile number already registered!' });
    }
    const hashedPassword = await Password.toHash(value.password);
  
      // Save the user to the database
      let user = await User.create({
        fullname: value.fullname,
        email: email,
        password: hashedPassword, 
        phone: phone,
        is_active: 1,
        email_verified: 1,
        // role:value.role,
      });
   

           
      const responce = await UserPasswordEmail( value.email,value.password,value.fullname,"User Credintials");
      
      if(!responce.message=="OK") return res.status(500).json({success : false,message : "internal server error"})



    const token = jwt.sign({
      email: value.email,
      fullname: value.fullname,
      email: email,
      phone: phone,
      is_active:1,
    },process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_TIME })

    return res.status(200).json({ success: true, message: "User Registration Successfully"});

  } catch (error) {
    console.error("Error in Registration:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});




// update user

module.exports.update_user = asyncMiddleware(async (req, res) => {
  try {
    const data = await User.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    let email;
    let phone;
    let user = {}
    if(req.body.email) {
      email = encrypt(req.body.email,secretKey)
      user.email = email
    }
    if(req.body.phone) {
      phone = encrypt(req.body.phone,secretKey)
      user.phone = phone
    }

    user.name = req.body.fullname;

    const mydata = await User.findByIdAndUpdate(req.body.id, user, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      updateddata: mydata,
      msg: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error: ${error}`);
  }
});

// By Admin

module.exports.getUserAdmin = asyncMiddleware(async (req, res) => {
  const user = await User.find().sort("-createdAt");
  if (!user[0]) {
    res.status(400).json({ success: false, msg: "data  not exits" });
  }
  const userData = [];

  user.forEach((users) => {
    if (
      users.role == "user" &&
      users.is_active == 1 &&
      users.is_block == 0 &&
      users.is_trashed == 0
    ) {
      userData.push(users);
    }
  });
  if (!userData[0]) {
    res.status(400).json({ success: false, msg: "userdata  not exits" });
  }
  res.status(200).json({
    success: true,
    results: userData.length,
    data: userData,
  });
});

//  delete user

module.exports.deleteUser = asyncMiddleware(async (req, res) => {
  // deleteuserData(req.user.id , req.user.role)

  const user = await User.findById(req.body.id);
  if (!user) {
    res.status(400).json({ success: false, msg: "userdata  not exits" });
  }

  const userdata = await User.findByIdAndDelete(req.body.id);

  res.status(200).json({
    success: true,
    message: "Your account has been deleted.",
  });
});

module.exports.deleteBySuperAdmin = asyncMiddleware(async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (req.user.role == "Admin") {
      await user.remove();
    } else {
      res.status(403).json("you are not allowed to delete");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports.blockUser = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.body.id);
  if (!user) {
    return next(("No user found with the ID", 404));
  } else if (user) {
    const data = {
      is_block: 1,
      is_active: 0,
    };
    const user = await User.findByIdAndUpdate(req.body.id, data, {
      new: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "User is Blocked by Admin.",
    });
  }
});

//  admin enable disable by super admin

// module.exports.For_Enable = asyncMiddleware(async(req,res,next) =>{
//     const user = await User.findById(req.body.id)
//     console.log(user)
//     if(user){
//         const data ={
//             is_enable : 1
//         }
//         const userdata = await User.findByIdAndUpdate(req.body.id , data,{
//             new: true,
//             runValidators: true,
//         })
//         res.status(200).json({
//             success: true,
//             data : userdata,
//             message: 'Admin is enable by SuperAdmin.',
//         })

//     }
// })

//  for llc admin enable by superadmin

module.exports.LLc_Enable = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.body.id);
  console.log(user);
  if (user) {
    const data = {
      is_enable_llc: 1,
    };
    const userdata = await User.findByIdAndUpdate(req.body.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: userdata,
      message: "Admin is enable by SuperAdmin.",
    });
  }
});

module.exports.LLp_Enable = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.body.id);
  if (user) {
    if (user) {
      const data = {
        is_enable_llp: 1,
      };

      const userdata = await User.findByIdAndUpdate(req.body.id, data, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        data: userdata,
        message: "Admin is enable by SuperAdmin.",
      });
    }
  }
});

module.exports.KRISLIN_Enable = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.body.id);
  if (user) {
    const data = {
      is_enable_krislin: 1,
    };
    const userdata = await User.findByIdAndUpdate(req.body.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: userdata,
      message: "Admin is enable by SuperAdmin.",
    });
  }
});

module.exports.saas_Enable = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.body.id);
  if (user) {
    const data = {
      is_enable_saas: 1,
    };
    const userdata = await User.findByIdAndUpdate(req.body.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: userdata,
      message: "Admin is enable by SuperAdmin.",
    });
  }
});

module.exports.For_Enable = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.body.id);
  console.log(user);
  if (user) {
    const data = {
      is_enable: req.body.is_enable,
    };
    console.log(data);
    const userdata = await User.findByIdAndUpdate(req.body.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: userdata,
      message: "Admin is enable by SuperAdmin.",
    });
  } else {
    res.status(400).json({
      message: "id is not found",
    });
  }
});
