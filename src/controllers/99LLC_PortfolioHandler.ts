const {portfolioModel} = require("../models/99LLC_PortfolioNew")
const basepath = process.env.BASE_PATH;
// const basepath = "https://pw73zddd-4071.inc1.devtunnels.ms/api"

module.exports.handleGetData = async(req,res)=>{
    try {

        const portFolio = await portfolioModel.find({})

        res.status(200).send(portFolio)
    } catch (error) {
        onsole.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports.handleCreateData = async(req,res)=>{
    try {
        const {...body} = req.body
        let data = await portfolioModel.create(body)
        if(req.files){
            if(Array.isArray(req.files.image)) data.image = `${basepath}/uploads/${req.files.image[0].filename}`
            await data.save()
        }
        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        onsole.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}