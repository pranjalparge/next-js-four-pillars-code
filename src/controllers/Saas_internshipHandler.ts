const {internshipModel} = require("../models/Saas_internship")
const basepath = process.env.BASE_PATH;

const getData = async(req,res)=>{
    try {
        const data = await internshipModel.find({})
        if(!data) return res.status(500).json({message : "no data found"})
        return res.status(200).send(data[0])
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const uploadData = async(req,res)=>{
    try {
        const body = req.body
        if(req.file){
            let data = await internshipModel.find({})
            if(!data) return res.status(400).json({message : "no data found"})
            let title = data[0].titles.filter((obj)=>(
                obj._id==body.titleId
            ))
            title[0].image = `${basepath}/uploads/${req.file.filename}`
            data[0].titles = data[0].titles.map((obj)=>(
                obj._id==body.titleId?title[0]:obj
            ))
            await internshipModel.findByIdAndUpdate(body.id,{titles : data[0].titles})
        }else{
            if(!body) return res.status(400).json({message : "no body found"})
                const data = await internshipModel.create({
                    heading : body.heading,
                    content : body.content,
                    titles : body.titles
                })
                if(!data) return res.status(500).json({message : "internal server error"})
        }
        return res.status(200).json({message : "data uploaded"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const updateData=async(req,res)=>{
    try {
        const body = req.body
        let data = await internshipModel.findById(body.id)
        let title = data.titles.filter((obj)=>(
            obj._id == body.titleId
        ))
        title[0].heading = body.title.heading
        title[0].content = body.title.content
        title[0].learnings = body.title.learnings
        data.titles = data.titles.map((obj)=>(
            obj._id == body.titleId ? title[0]:obj
        ))
        await internshipModel.findByIdAndUpdate(body.id,{titles : data.titles})
        return res.status(200).json({message : "data updated"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const deleteData = async(req,res)=>{
    try {
        const body = req.body
        let data = await internshipModel.findById(body.id)
        data.titles = data.titles.filter((obj)=>(
            obj._id!=body.titleId
        ))
        await internshipModel.findByIdAndUpdate(body.id,{titles : data.titles})
        return res.status(200).json({message : "data updated"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}




module.exports = {
    getData,
    uploadData,
    updateData,
    deleteData
}