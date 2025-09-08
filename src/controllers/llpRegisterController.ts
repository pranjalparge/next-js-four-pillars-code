const Joi = require("joi")
const {llpRegistermodel} = require("../models/llpRegisterModel")
const  {sendEmail}  = require("../utils/mail");

const handler = {
    postData : async(req,res)=>{
        let {error,value} = Joi.object({
            fullname : Joi.string().required(),
            email : Joi.string().email().trim().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
            .error(new Error("Invalid Email Input!")).required(),
            address : Joi.string().required(),
            city : Joi.string().required(),
            event : Joi.string().required()
        }).validate(req.body)
        if(error){
            console.log(error)
            return res.status(400).json({success : false,message : error.message})
        }
        try {
            const {...body} = req.body
            const data = await llpRegistermodel.create(body)
            if(!data) return res.status(500).json({success : false,message : 'internal server error'})
            await sendEmail(
                value.email,
                value.fullname,
                "Your request has been received",
                "We will get back to you soon."
            )
            return res.status(200).json({success : true,message : "data created"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    }
}

module.exports = handler