const {BrandCreationModel} = require("../models/BrandCreation")
const basepath = process.env.BASE_PATH
// const basepath = "https://pw73zddd-4071.inc1.devtunnels.ms/api"

module.exports.getData = async(req,res)=>{
    try {
        const data = await BrandCreationModel.find({})
        // res.status(200).json({data})
        const updatedData = data.filter((obj)=>(
            obj._id!="67922caa2d921f271a9d9a5b"
        ))
        return res.status(200).json(updatedData)
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports.createData = async(req,res)=>{
    try {
        const body = req.body
            const data = await BrandCreationModel.create({
                // headerSection : body.headerSection,
                // middleSection : body.middleSection,
                // lastSection : body.lastSection
                heading : body.heading,
                content : body.content,
                ratings : body.ratings,
                subcontent1 : body.subcontent1,
                subheading1 : body.subheading1,
                subheading2 : body.subheading2,
                subheading3 : body.subheading3,
                subcontent3 : body.subcontent3,
                urlContent : body.urlContent,
                redirectUrl : body.redirectUrl,
                headingColor : body.headingColor,
                subheadingColor : body.subheadingColor
            })
            if(!data) return res.status(500).json({message : "Something Went wrong while uploading data "})
            if(req.files){
                if(Array.isArray(req.files.image)) data.image =`${basepath}/uploads/${req.files?.image[0]?.filename}`
                await data.save({validateBeforeSave : false})
            }
        return res.status(200).json({message : "Data save Successfully"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports.updateData = async(req,res)=>{
    try {
        const {id,...updateFields} = req.body
        if(!id) return res.status(400).json({message : "id is required"})
        // const data = await BrandCreationModel.findById(body.id)
        const updatedData = await BrandCreationModel.findByIdAndUpdate(id,updateFields,{new : true})
        if(!updatedData) return res.status(500).json({message : "Internal Srever Error"})
        if(req.files){
            if(Array.isArray(req.files.image)) updatedData.image =`${basepath}/uploads/${req.files?.image[0]?.filename}`
            await updatedData.save({validateBeforeSave : false})
        }
        return res.status(200).json({message : "data updated successfully",updatedData})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports.deleteData = async(req,res)=>{
    try {
        const {id} = req.body
        const deletedData = await BrandCreationModel.findByIdAndDelete(id)
        if(!deletedData) return res.status(500).json({message : "Internal Server Error"})
        return res.status(200).json({message : "data deleted"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}