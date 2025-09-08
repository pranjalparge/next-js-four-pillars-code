const {llpFAQModel} = require("../models/llpFAQ")

const llpFAQhandler = {
    getdata : async(req,res)=>{
        try {
            const data = await llpFAQModel.find({})
            return res.status(200).send(data)
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    createdata : async(req,res)=>{
        try {
            const {...body} = req.body
            const data = await llpFAQModel.create(body)
            return res.status(200).json({success : false,message : "data created"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    }
}

module.exports = {
    llpFAQhandler
}