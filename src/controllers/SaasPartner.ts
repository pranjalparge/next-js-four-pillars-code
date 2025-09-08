const {SaasPartner}=require("../models/SAAS_IBMpartner")
const basepath = process.env.BASE_PATH
const handler = {
    create : async(req,res)=>{
        try {
            const {...body} = req.body
            const data = await SaasPartner.create(body)
            return res.status(200).json({success : true,message : "data created"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    get : async(req,res)=>{
        try {
            const data = await SaasPartner.find()
            return res.status(200).send(data[0])
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    update : async(req,res)=>{
        try {
            const data1  = await SaasPartner.find()
            const {...body} = req.body
            const data = await SaasPartner.findByIdAndUpdate(data1[0]._id,body)
            if(Array.isArray(req.files.image) && req.files.image[0]){
                data.image = `${basepath}/uploads/${req.files.image[0].filename}`
                await data.save({validateBeforeSave : false})
            }
            return res.status(200).json({success : true,message : "data updated"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    }
}

module.exports = {handler}