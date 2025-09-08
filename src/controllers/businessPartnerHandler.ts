const {businessPartnerModel} = require("../models/BusinessPartner")
const basepath = process.env.BASE_PATH

module.exports.getData=async(req,res)=>{
    try {
        const data = await businessPartnerModel.find({})

        return res.status(200).json({data})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports.createData=async(req,res)=>{
    try {
        const body = req.body
        if(req.files){
            if(req.files.image){
                await businessPartnerModel.findByIdAndUpdate(body.id,{image : `${basepath}/uploads/${req.files.image[0].filename}`})
            }
            if(req.files.icon){
                await businessPartnerModel.findByIdAndUpdate(body.id,{icon : `${basepath}/uploads/${req.files.icon[0].filename}`})
            }
        }else{
            const data = await businessPartnerModel.create({
                company : body.company,
                heading : body.heading?body.heading:"",
                subheading : body.subheading?body.subheading:"",
                vission : body.vission?body.vission:"",
                content : body.content?body.content:"",
                experties : body.experties?body.experties:[],
                values : body.values?body.values:[],
                summaryHeading : body.summaryHeading?body.summaryHeading:"",
                summary : body.summary?body.summary:"",
                image : body.image?body.image:"image.png",
                link : body.link?body.link:"",
                service : body.service?body.service:"",
                icon : body.icon?body.icon:"icon.png"
            })
            if(!data) return res.status(500).json({message : "something while creating"})
        }
        
        return res.status(200).json({message : "data created successfully"})
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}