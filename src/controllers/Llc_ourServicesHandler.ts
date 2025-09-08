const {LlcOurservicesModel} = require("../models/Llc_ourservicesModel")
const basepath = process.env.BASE_PATH;


module.exports.handleGetData = async(req,res)=>{
    try {
        const fourthObject = await LlcOurservicesModel.find({})
        res.status(200).json({fourthObject})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports.handleCreateData = async(req,res)=>{
    try {
        const body = req.body
        if(!body){
            return res.status(400).send("No data Here")
        }
        if(body.fourthObject){
            await LlcOurservicesModel.create({
                head : body.fourthObject.head,
                subhead : body.fourthObject.subhead,
                content : body.fourthObject.content,
                titles : body.fourthObject.titles
            })
        }
        // if(req.files){
        //     if(body.servicePage)
        // }
        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}