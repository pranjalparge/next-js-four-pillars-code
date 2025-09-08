const {serviceModel,saasProductModel} = require("../models/service_SAAS")
const basepath = process.env.BASE_PATH;


const getData = async(req,res)=>{
    try {
        const data = await serviceModel.find({})
        if(!data) return res.status(500).json({message : "no data found"})
        return res.status(200).send(data[0])
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const createSaasProduct = async(req,res)=>{
    try {
        const {...body} = req.body
        try {
            const data = await saasProductModel.create(body)
            if(req.files){
                if(Array.isArray(req.files.image)) data.image = `${basepath}/uploads/${req.files.image[0].filename}`
                if(Array.isArray(req.serviceImage1)) data.serviceImage1 = `${basepath}/uploads/${req.files.serviceimage1[0].filename}`
                await data.save({validateBeforeSave : false})
            }
        } catch (error) {
            console.log(error)
            return res.status(403).json({success : false, message : "database is in readonly mode"})
        }
        return res.status(200).json({success : true,message : "data created"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({success : false, message: "Internal Server Error", error: error.message });
    }
}

const updateSaasProduct = async(req,res)=>{
    try {
        const {id,...body} = req.body
        try {
            const data = await saasProductModel.findByIdAndUpdate(id,body,{new : true})
            if(req.files){
                if(Array.isArray(req.files.image)) data.image = `${basepath}/uploads/${req.files.image[0].filename}`
                if(Array.isArray(req.serviceImage1)) data.serviceImage1 = `${basepath}/uploads/${req.files.serviceimage1[0].filename}`
                await data.save({validateBeforeSave : false})
            }
        } catch (error) {
            console.log(error)
            return res.status(403).json({success : false, message : "database is in readonly mode"})
        }
        return res.status(200).json({success : true,message : "data updated"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const deleteSaasProduct=async(req,res)=>{
    try {
        const {id}=req.body
        try {
            const data = await saasProductModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
            return res.status(403).json({success : false, message : "database is in readonly mode"})
        }
        return res.status(200).json({success : true,message : "data deleted"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const saasGetProduct = async(req,res)=>{
    try {
        const data = await saasProductModel.find()
        return res.status(200).send(data)
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


const createData = async(req,res)=>{
    try {
        const body = req.body
        if(req.files){
            let data = await serviceModel.find({})
            if(!data) return res.status(400).json({message : "no data found"})
            let title = data[0].titles.filter((obj)=>(
                obj._id==body.titleId
            ))
            if(req.files.image){
                title[0].image = `${basepath}/uploads/${req.files.image[0].filename}`
            }
            if(req.files.serviceImage1){
                title[0].serviceimage1 = `${basepath}/uploads/${req.files.serviceImage1[0].filename}`
            }
            if(req.files.serviceImage2){
                title[0].serviceimage2 = `${basepath}/uploads/${req.files.serviceImage2[0].filename}`
            }
            data[0].titles = data[0].titles.map((obj)=>(
                obj._id==body.titleId?title[0]:obj
            ))
            await serviceModel.findByIdAndUpdate(body.id,{titles : data[0].titles})
        }else{
            if(!body) return res.status(400).json({message : "no body found"})
                const data = await serviceModel.create({
                    head : body.head,
                    subhead : body.subhead,
                    content : body.content,
                    titles : body.titles
                })
                if(!data) return res.status(500).json({message : "something went wrong while creating"})
        }
        return res.status(200).json({message : "data created"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    createData,
    getData,
    saasGetProduct,
    deleteSaasProduct,
    updateSaasProduct,
    createSaasProduct
}