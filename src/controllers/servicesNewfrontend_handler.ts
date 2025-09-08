const {servicesNewfrontendModel} = require("../models/Services_NewFrontend")
const basepath = process.env.BASE_PATH;


module.exports.handleGetData = async(req,res)=>{
    try {

        const service = await servicesNewfrontendModel.find({})

        res.status(200).send(service)
        
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.handleCreateData = async(req,res)=>{
    try {
        const body = req.body

        if(body.services){
            await servicesNewfrontendModel.create({
                firstObject : body.services.firstObject,
                secondObject : body.services.secondObject,
                thirdObjet : body.services.thirdObjet
            })
        }
        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}