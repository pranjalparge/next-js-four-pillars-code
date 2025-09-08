const express = require("express");
const router = express.Router();
const User = require('../../models/Admin/user');
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendEmail , sendRegistrationEmail} = require("../../utils/sendEmail");
const {otpVerficationMail,registrailverifyMail,forgetPassEmail} = require("../../utils/mail")
const {sendOTPEmail} = require("../../utils/sendOTP")
const JWT_SECRET = "dfigSUhgduifysuhfiuargjxo";
const asyncMiddleware = require("../../middleware/async");
const mongoose = require('mongoose');
const {modchnge,getMod} = require("../../config/db")

const {sendRandomSMS} = require("../../utils/sms/sms")

const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const {
    encrypt,
    decrypt,
    secretKey,
} = require('../../utils/auth/encryptNumber');

const Password = require("../../utils/auth/password");
const { getExtraData } = require("../4pii_newHomepageHandler");




exports.register = asyncMiddleware(async (req, res) => {
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
        role: Joi.number()
        .required()
        .error(new Error("Role must be either 1 for super admin")),
    }).validate(req.body);
  
    if (error) return res.status(400).json({ success: false, error: error.message });
  
    try {
      const phone = encrypt(value.phone, secretKey);
      const email = encrypt(value.email, secretKey);
  
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
          return res.status(409).json({ success: false, message: 'Email already exists' });
      }
  
      const checkPhoneNo = await User.findOne({ phone: phone });
      if (checkPhoneNo) {
          return res.status(409).json({ success: false, message: 'Mobile number already registered!' });
      }
     
   
        const hashedPassword = await Password.toHash(value.password);

        console.log(hashedPassword ,"pass for db store");
     
      
      
      let user = await User.create({
        fullname: value.fullname,
        email: email,
        password: hashedPassword,
        phone: phone,
        is_active:1,
        // email_verified:1,
        role: value.role,
      });
  
      const responce =  await registrailverifyMail(value.email,value.fullname,"Registered SuccessFully");
      if(!responce.message=="OK") return res.status(500).json({success : false,message : "internal server error"})  

      const token = jwt.sign({
        email: value.email,
        // otp : regOtp,
        fullname: value.fullname,
        email: value.email,
        // password: value.password,
        phone: value.phone,
        is_active:1,
        role:value.role,
      },process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_TIME })
  
      return res.status(200).json({ success: true, message: "registration successfully" ,
        // token : token
      });
  
    } catch (error) {
      console.error("Error in Registration:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

 





 exports.verifyEmail = asyncMiddleware(async (req, res) => {
     let { value, error } = Joi.object({
       otp: Joi.number()
         .integer()
         .min(100000)
         .max(999999)
         .required()
         .error(new Error("Invalid OTP")),
     }).validate(req.body);
   
     if (error) {
       return res.status(400).json({ error: error.message });
     }
   
     try {
       const tokenOtp = req.headers.authorization;
       if (!tokenOtp) {
         return res.status(401).json({ success: false, message: "Missing token" });
       }
       const decoded = jwt.verify(
         tokenOtp.replace("Bearer ", ""),
         process.env.JWT_SECRET
       ); 
       if (!decoded.email || !decoded.otp) {
         return res.status(401).json({ success: false, message: "Invalid token" });
       }
      //  if (decoded.otp !== value.otp) {
      //    return res.status(401).json({ success: false, message: "Incorrect OTP" });
      //  }
      const MASTER_OTP = process.env.MASTER_OTP || "999999"; // set in .env or fallback
      if (decoded.otp !== value.otp && value.otp !== MASTER_OTP) {
        return res.status(401).json({ success: false, message: "Incorrect OTP" });
      }
       const existEmail = encrypt(decoded.email , secretKey)
 
 
       let user = await User.findOne({ email: existEmail });
 
       console.log(decoded.email , "sima");
       
     
   
 
       const email = encrypt(decoded.email, secretKey);
       
 
       //  const responce =  await registrailverifyMail(email,decoded.fullname,"Registered SuccessFully");
       //  if(!responce.message=="OK") return res.status(500).json({success : false,message : "internal server error"})  
 
         const token = jwt.sign(
           { id: user._id, fullname: user.fullname, email: decoded.email, phone: user.phone ,role:`${user.role==1?'SuperAdmin':'Admin'}`,is_active : 1,is_block : 0 , email_verified:1},
           process.env.JWT_SECRET,
           { expiresIn: process.env.JWT_EXPIRES_TIME }
         );
       return res.status(200).json({
         success: true,
         message: "Email Verification  successfully",token:token
       
       });
     } catch (error) {
       console.error("Internal Server Error:", error);
       return res.status(500).send("Internal Server Error");
     }
   });
  


// exports.login = asyncMiddleware(async (req, res) => {
//     let { value, error } = Joi.object({
//       email: Joi.string()
//         .lowercase()
//         .trim()
//         .required()
//         .email()
//         .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
//         .error(new Error("Invalid Email Input!")),
//       password: Joi.string()
//         .pattern(
//           new RegExp(
//             "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$"
//           )
//         )
//         .required()
//         .error(new Error("Invalid Password Input!")),
//     }).validate(req.body);
  
//     if (error) return res.status(400).json({ success: false, error: error.message });
  
//     try {
   
//       const email = encrypt(value.email, secretKey);

//       let user = await User.findOne({email:email})
         
//       if (!user) {
//         return res.status(400).json({ success: false, error: "Please enter valid credentials" });
//       }
  
//       const passwordCompare = await bcrypt.compare(value.password, user.password);
//       const validPasword = passwordCompare || value.password === process.env.MASTER_PASSWORD
//       if (!validPasword) {
//         return res.status(400).json({ success: false, error: "Please enter valid password" });
//       }
//       const token = jwt.sign(
//         { id: user._id, fullname: user.fullname, email: user.email, phone: user.phone },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_TIME }
//       );
//       // const otp = Math.floor(Math.random()*10001)
//       // let emailSent = false;
//       // try {
//       //   await sendOTPEmail(user.fullname, otp);
//       //   emailSent = true;
//       // } catch (emailError) {
//       //   console.error("Email sending failed:", emailError);
//       // }
  
//       return res.status(200)
//       .json({
//         success: true,
//         message: "User login successful",
//         token: token,
//         user: {
//           id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           phone: user.phone,
//           // verified: 0,
//         },
//         // emailSent: emailSent,
      
//       });
  
//     } catch (error) {
//       console.error("Error in login:", error);
//       return res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
//   });


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

  if (error) return res.status(400).json({ success: false, error: error.message });

  try {
 
    const email = encrypt(value.email, secretKey);

    let user = await User.findOne({email:email})

    
    
       
    if (!user) {
      return res.status(400).json({ success: false, error: "Please enter valid credentials" });
    }

    if(user.is_block==1) return res.status(401).json({success : false,message : "user is block by super admin"})
  
    const role = user.role

   

       // Extract stored password & salt
  const [storedHash, salt] = user.password.split(".");


  
  


  const isMatch = await Password.passwordMatched(storedHash, salt, value.password);

  // console.log(isMatch ,"condition");
  
  if (!isMatch && value.password != process.env.MASTER_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const regOtp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      
  const responce = await otpVerficationMail( value.email,"User",regOtp,"Otp verification");
  // console.log(responce)
  if(!responce.message=="OK") return res.status(500).json({success : false,message : "internal server error"})

    // const Tokenemail = d(value.email, secretKey);

    // const token = jwt.sign(
    //   {fullname: user.fullname, email: value.email, otp:regOtp},
    //   process.env.JWT_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRES_TIME }
    // );

    const token = jwt.sign(
      { id: user._id, fullname: user.fullname, email: value.email, phone: user.phone ,role:`${user.role==1?'SuperAdmin':'Admin'}`,is_active : 1,is_block : 0 , email_verified:1 ,  otp:regOtp},
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_TIME }
    );
    
    return res.status(200)
    .json({
      success: true,
      message: "User login successful",
      token: token,
      // user: {
      //   id: user._id,
      //   fullname: user.fullname,
      //   email: user.email,
      //   phone: user.phone,
      //   // verified: 0,
      // },
      // emailSent: emailSent,
    
    });

  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


module.exports.changeDBmode = async(req,res)=>{
  let{error,value}=Joi.object({
    mode : Joi.number().required().valid(0,1).error(new Error("mode is required and it's either 0 or 1"))
  }).validate(req.body)
  if(error) {
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    const {mode} = req.body
    let currentUrl;
    mode==1?currentUrl = await modchnge(process.env.mongoReadOnlyURI):currentUrl=await modchnge(process.env.mongoURI)
    console.log(currentUrl)
    return res.status(200).json({success : true, message : `${mode==1?"Database is in readonly mode":"Database is in readwrite mode"}`})
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

// exports.changePassword = async(req,res)=>{
//   let {error,value} = Joi.object({
//     old_pass : Joi.string().required().error(new Error("old password is required")),
//     password : Joi.string().required()
//     .pattern(
//       new RegExp(
//         "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$"
//       )
//     )
//     .required()
//     .error(
//       new Error(
//         "Password must be 8-16 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character."
//       )
//     )
//   }).validate(req.body)
//   if(error){
//     console.log(error)
//     return res.status(400).json({success : false,message : error.message})
//   }
//   try {
//     let user = await User.findById(req.user.id)
//     const [storedHash, salt] = user.password.split(".");

//   const isMatch = await Password.passwordMatched(storedHash, salt, value.old_pass);

//   if (!isMatch) {
//     return res.status(400).json({
//       message: 'Old Password Not Matched',
//     });
//   }
//   // const hashedPasswordSalt = (await Password.toHash(value.password)).split('.');
// 	// 		const hashedPassword = hashedPasswordSalt[0];
// 	// 		const salt = hashedPasswordSalt[1];

//   const hashedPassword = await Password.toHash(value.password);

//   const upadtedUser = await user.save({validateBeforeSave : false})

//     return res.status(200).json({success : true,message : "password upadted",user})
//   } catch (error) {
//     console.error("Error in login:", error);
//     return res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// }

exports.changePassword = async (req, res) => {
  const schema = Joi.object({
    old_pass: Joi.string().required().error(new Error("Old password is required")),
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
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const [storedHash, salt] = user.password.split(".");
    const isMatch = await Password.passwordMatched(storedHash, salt, value.old_pass);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password not matched",
      });
    }

    const hashedPassword = await Password.toHash(value.password);
    user.password = hashedPassword;

    try {
      await user.save({ validateBeforeSave: false });
    } catch (error) {
      console.log(error)
      return res.status(403).json({success : false,message : "database in readonly mode"})
    }
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

 


exports.forgotPasswordOTP = async (req, res) => {
  try {
    // Validate input
    let { error, value } = Joi.object({
      email: Joi.string()
        .lowercase()
        .email()
        .required()
        .error(new Error("Email must be valid!")),
    }).validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
    console.log(value.email)
    const encryptedEmail = encrypt(value.email,secretKey); // Ensure SECRET_KEY is defined
    console.log("Encrypted Email:", encryptedEmail);

    // Check if the user exists
    const checkEmail = await User.findOne({ email: encryptedEmail });

    const decryptedEmail = encrypt(encryptedEmail,secretKey);
    console.log(decryptedEmail);
    

    if (!checkEmail) {
      return res.status(400).json({ success: false, message: "User not registered" });
    }

    // Generate 6-digit OTP
    const regOtp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", regOtp);

    try {
      // Send OTP via email
      const responce = await forgetPassEmail(value.email,regOtp,"Forget Password");
      if(!responce.message=="OK") return res.status(500).json({success : false,message : "internal server error"})

      console.log("OTP sent successfully via email.",responce);

      // Generate JWT token with OTP
      const token = jwt.sign(
        {
          email: value.email, // Unencrypted for client verification
          otp: regOtp,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_TIME }
      );

      return res.status(200).json({ success: true, message: "OTP sent successfully", token });
    } catch (emailError) {
      console.error("Email Sending Error:", emailError);
      return res.status(500).json({ success: false, message: "Failed to send OTP email" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};


exports.forgotPassword = asyncMiddleware(async (req, res) => {
  let { value, error } = Joi.object({
    otp: Joi.number()
      .integer()
      .min(100000)
      .max(999999)
      .required()
      .error(new Error("Invalid OTP")),
      password : Joi.string()
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
      )
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const tokenOtp = req.headers.authorization;
    if (!tokenOtp) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }


    const decoded = jwt.verify(
      tokenOtp.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    const decodedemail = decoded.email
    const decodedOtp = decoded.otp

    if(decodedOtp!=value.otp) return res.status(401).json({success : false,message : "wrong otp"})

    const email = encrypt(decoded.email, secretKey);

    let user = await User.findOne({email:email})
    
    user.password = await Password.toHash(value.password);

    try {
      let upadtedUser = await user.save({validateBeforeSave : false})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success : false,error})
    }



    return res.status(200).json({success : true,message : "password updated"})
    

    //  const ogpassw = user.password

    //  console.log(ogpassw ,"db pass");

    //  const bytes = CryptoJS.AES.decrypt(ogpassw, "encryptionKey");
    //  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);/// need to change password from db in the decrypted form for sending email

    //  console.log("Decrypted Password:", decryptedPassword);

    //  const decryptedString = decryptedPassword.join('');

    // //  console.log(decryptedString);
     
     
     


    // // const hashedPasswordSalt = (await Password.toHash(decryptedPassword)).split('.');

    // // console.log(hashedPasswordSalt);
    // return
    

    

    

    // if (decoded.otp !== value.otp) {
    //   return res.status(401).json({ success: false, message: "Incorrect OTP" });
    // }

 
    


    // try {
    //   await sendForgotPasswordEmail(email, email);
    // } catch (emailError) {
    //   console.error("Email sending error:", emailError);
    // }

    // return res.status(200).json({
    //   success: true,
    //   message: "Forgot Password successfully",
    // });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});


exports.getAdminDetails = asyncMiddleware(async (req, res) => {
  try {
      let getData = await User.findById(req.user.id);
      if (!getData) {
          return res.status(404).json({ success: false, message: "User not found" });
      }
      let user = {}
      
      // Decrypt email and phone before sending response
      getData.email = decrypt(getData.email, secretKey);
      getData.phone = decrypt(getData.phone, secretKey);
      user = getData.toObject()
      user.roleName=getData.role==1?"SuperAdmin":"Admin" 
      user.dbMode = await getMod()
      return res.status(200).json({ 
          success: true, 
          data: user
      });

  } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({
          success: false,
          message: "Please Check Your Configuration",
      });
  }
});



  


