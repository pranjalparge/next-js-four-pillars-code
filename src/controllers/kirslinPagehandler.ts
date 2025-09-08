const {krislinPage} = require("../models/krislin_homepageModel")

const handler = {
    cetateData : async(req,res)=>{
        try {
            const {...body} = req.body
            const data = await krislinPage.create(body)
            return res.status(200).json({success : true,message : "data ceated"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : "data cerated"})
        }
    },
    getData : async(req,res)=>{
        try {
            const data = await krislinPage.find({})
            return res.status(200).send(data[0])
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : "data cerated"})
        }
    }
}


module.exports = {
    handler
}