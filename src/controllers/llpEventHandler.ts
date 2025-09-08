const {llpEventModel} = require("../models/llpEvents")
const basepath = process.env.BASE_PATH;


const handler = {
    getAllData : async(req,res)=>{
        try {
            const allData = await llpEventModel.find({})
            return res.status(200).send(allData)
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    getEventData : async(req,res)=>{
        try {
            const {id} = req.body;
            if(!id) return res.status(400).json({success : false,message : "id is required"})
            const event = await llpEventModel.findById(id)
            return res.status(200).send(event)
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    createEvent : async(req,res)=>{
        try {
            const body = req.body
            const createdData = await llpEventModel.create({
                aboutEvent : body.aboutEvent,
                benefits : body.benefits,
                cost : body.cost,
                day : body.day,
                eventOption : body.eventOption,
                heading : body.heading,
                image : req.files && Array.isArray(req.files.image)?`${basepath}/uploads/${req.files.image[0].filename}`:"",
                keyFeatures : body.keyFeatures,
                learn : body.learn,
                schedule : body.schedule,
                speakers : body.speakers,
                time : body.time
            })
            return res.status(200).json({success : true,createdData,message : "data created"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    upadteData : async(req,res)=>{
        try {
            const body = req.body;
            const obj = await llpEventModel.findById(body.id)
            const updatedData = await llpEventModel.findByIdAndUpdate(body.id,{
                aboutEvent : body.aboutEvent?body.aboutEvent:obj.aboutEvent,
                benefits : body.benefits?body.benefits:obj.benefits,
                cost : body.cost?body.cost:obj.cost,
                day : body.day?body.day:obj.day,
                eventOption : body.eventOption?body.eventOption:obj.eventOption,
                heading : body.heading?body.heading:obj.heading,
                image : req.files && Array.isArray(req.files.image)?`${basepath}/uploads/${req.files.image[0].filename}`:obj.image!=""?obj.image:"",
                keyFeatures : body.keyFeatures?body.keyFeatures:obj.keyFeatures,
                learn : body.learn?body.learn:obj.learn,
                schedule : body.schedule?body.schedule:obj.schedule,
                speakers : body.speakers?body.speakers:obj.speakers,
                time : body.time?body.time:obj.time
            },{
                new : true
            })
            return res.status(200).json({success : false,updatedData,message :"data upadated"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    },
    deleteData : async(req,res)=>{
        try {
            const body = req.body
            const deletedData = await llpEventModel.findByIdAndDelete(body.id)

            return res.status(200).json({success : true,deletedData,message : "data deleted"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    }
}

module.exports = {
    handler
}