const {appmodel} = require("../models/4piiAppsModel")
const basepath = process.env.BASE_PATH

const AppHandler = {
    get : async(req,res)=>{
        try {
            const data = await appmodel.find({})
            return res.status(200).send(data)
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    create : async(req,res)=>{
        try {
            const {...body} = req.body;
            const data = await appmodel.create(body)
            if(req.files){
                if(Array.isArray(req.files.image)) data.image = `${basepath}/uploads/${req.files.image[0].filename}`
                if(Array.isArray(req.files.playstore)) data.store[0].image = `${basepath}/uploads/${req.files.playstore[0].filename}`
                if(Array.isArray(req.files.appstore)) data.store[1].image = `${basepath}/uploads/${req.files.appstore[0].filename}`
                await data.save({validateBeforeSave : false})
            }
            return res.status(200).json({success : true, message : "data created", data})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    updatedata : async(req,res)=>{
        try {
            const {id,...body} = req.body
            const updatedData = await appmodel.findByIdAndUpdate(id,body,{new : true})
            if(req.files){
                if(Array.isArray(req.files.image)) updatedData.image = `${basepath}/uploads/${req.files.image[0].filename}`
                if(Array.isArray(req.files.playstore)) updatedData.store[0].image = `${basepath}/uploads/${req.files.playstore[0].filename}`
                if(Array.isArray(req.files.appstore)) updatedData.store[1].image = `${basepath}/uploads/${req.files.appstore[0].filename}`
                await updatedData.save({validateBeforeSave : false})
            }
            return res.status(200).json({success : true,message : "data updated",updatedData})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    deletedata : async(req,res)=>{
        try {
            const deletedData = await appmodel.findByIdAndDelete(req.body.id)
            return res.status(200).json({success : true,message : "data deleted",deletedData})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    }
}

module.exports ={
    AppHandler
}