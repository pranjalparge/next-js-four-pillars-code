const {internsDataModel} = require("../models/saasInternsData.js")
const basepath = process.env.BASE_PATH

const internsController = {
    getData : async (req,res)=>{
        try {
            const data = await internsDataModel.find({})
            if(!data) return res.status(500).json({message : "internal server error",success : false})
            return res.status(200).send(data)
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message : "server error",
                error : error.message,
                success : false
            })
        }
    },
    createData : async (req,res)=>{
        try {
            const {...body} = req.body
            if(Object.keys(body).length==0){
                return res.status(400).json({message : "body is empty"})
            }
            let internData = await internsDataModel.create(body)
            if(!internData) return res.status(500).json({message : "insternal server error",success : false})
            if(req.files){
                internData.imagePath = `${basepath}/uploads/${req.files?.image[0]?.filename}`
                await internData.save()
            }
            return res.status(201).json({message : "data created ",internData,success : true})
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message : "server error",
                error : error.message,
                success : false
            })
        }
    },
    updateData : async (req,res)=>{
        try {
            const {id, ...body} = req.body
            if(!id) return res.status(400).json({message : "id is required", success : false})
            const updateData = await internsDataModel.findByIdAndUpdate(id,body,{new : true});
            if(!updateData) return res.status(500).json({message : "internal server error",success : false})
            if(req.files?.image?.length>0){
                updateData.imagePath = `${basepath}/uploads/${req.files?.image[0]?.filename}`
                await updateData.save({validateBeforeSave : false})
            }
            return res.status(200).json({message : "data updated",updateData,success : true})
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message : "server error",
                error : error.message,
                success : false
            })
        }
    },
    deleteData : async(req,res)=>{
        try {
            if(!req.body.id) return res.status(400).json({message : "id is needed"})
            await internsDataModel.findByIdAndDelete(req.body.id)
            return res.status(200).json({message : "data deleted"})
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message : "server error",
                error : error.message,
                success : false
            })
        }
    }
}

module.exports = {
    internsController
}