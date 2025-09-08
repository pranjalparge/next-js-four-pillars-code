const {aboutusModel,serviceModel} = require("../models/LLP_Models")
const basepath = process.env.BASE_PATH;

const getServiceData = async(req,res)=>{
    try {
        const data = await serviceModel.find({})
        if(!data) return res.status(500).json({message : "no data is present"})
        return res.status(200).send(data[0].service)
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const getAboutData = async(req,res)=>{
    try {
        const data = await aboutusModel.find({})
        if(!data) return res.status(500).json({message : "no data is present"})
        return res.status(200).send(data[0].about)
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const createAboutData = async(req,res)=>{
    try {
        const body = req.body
        if(req.file){
            let data = await aboutusModel.findById(body.id)
            let title = data.about.titles.filter((obj)=>(
                obj._id==body.titleId
            ))
            title[0].image = `${basepath}/uploads/${req.file.filename}`
            data.about.titles = data.about.titles.map((obj)=>(
                obj._id==body.titleId?title[0]:obj
            ))
            await aboutusModel.findByIdAndUpdate(body.id,{about : data.about})
        }else{
            const data = await aboutusModel.create({
                about : body.about
            })
            if(!data) return res.status(500).json({message : "error while uploading"})
        }
        return res.status(200).json({message : "data created"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const createServiceData = async(req,res)=>{
    try {
        const body = req.body
        if(req.file){
            let data = await serviceModel.findById(body.id)
            let title = data.service.titles.filter((obj)=>(
                obj._id==body.titleId
            ))
            title[0].image = `${basepath}/uploads/${req.file.filename}`
            data.service.titles = data.service.titles.map((obj)=>(
                obj._id==body.titleId?title[0]:obj
            ))
            await serviceModel.findByIdAndUpdate(body.id,{service : data.service})
        }else{
            const data = await serviceModel.create({
                service : body.service
            })
            if(!data) return res.status(500).json({message : "error while uploading"})
        }
        return res.status(200).json({message : "data created"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports={
    getAboutData,
    getServiceData,
    createAboutData,
    createServiceData
}