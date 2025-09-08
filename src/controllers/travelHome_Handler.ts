const {Travel_Homepage} = require("../models/travelWeb_homepage")
const {TravelProperty,property} = require("../models/tavel_homeProperty")
const uploadToR2 = require('../utils/cloudFlare/uploadToR2');
const {generateSignedUrl} = require("../utils/cloudFlare/getSignedUrl")

const handler = {
    get : async (req,res)=>{
        try {
            const data = await Travel_Homepage.find()
            // const property = await TravelProperty.find()
            // data.property = property
            return res.status(200).json(data[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message : error.message,success : false})
        }
    },
    getProperty : async(req,res)=>{
        try {
            const { getcity, flateType } = req.query;
            
            const match = {};
            if (getcity) match.name = getcity;
            if (flateType) match.location = flateType;
            
            let data = await TravelProperty.aggregate([
                { $match: match }
            ]);
            await Promise.all(
            data.map(async (d) => {
            d.images = await Promise.all(
            d.images.map(async (e) => {
                return { image: await generateSignedUrl(e.image) };
            })
            )}));
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message : error.message,success : false})
        }
    },
    postHome : async(req,res)=>{
        try {
            const {...body} = req.body
            const data = await Travel_Homepage.create(body)
            return res.status(200).json({status : 200,message : "data has created"})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message : error.message,success : false})
        }
    },
    postPropety : async (req,res)=>{
        try {
            const {id,...body} = req.body
            if(id){
               const data =  await TravelProperty.findByIdAndUpdate(id,{body})
               if(Array.isArray(req.files.image) && req.files.image.length>0){
                    data.images = []
                    const upload = req.files.image.map(async element => {
                        const upload = await uploadToR2(element,"travelHome/")
                        return ({image : upload})
                    })
                    data.images = await Promise.all(upload)
               }
               await data.save({validateBeforeSave :false})
                await property.create({
                    city : data.location,
                    flateType : data.propertyType,
                    property : data._id
                })
            }else{
                const data = await TravelProperty.create(body)
                 await property.create({
                    city : data.location,
                    flateType : data.propertyType,
                    property : data._id
                })
            }
           
            return res.status(200).json({message : "data has created" , success : true})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message : error.message,success : false})
        }
    },
    getProprtyInfo : async(req,res)=>{
            try {
                let data = await TravelProperty.find();
                console.log(data)
                let uniqueCities = new Set();
                let uniqueFlatTypes = new Set();
    
                data.forEach(item => {
                    uniqueCities.add(item.name);
                    uniqueFlatTypes.add(item.location);
                });
                // console.log(uniqueCities,uniqueFlatTypes)
    
    // Convert sets to arrays (if needed)
                const city = Array.from(uniqueCities).map(city => ({ city }));
                const flateType = Array.from(uniqueFlatTypes).map(type => ({ flateType: type }));
    
    // Final output structure
                data = { city, flateType };
                return res.status(200).send(data)
            } catch (error) {
                console.log(error)
                return res.status(500).json({success : false,error})
            }
        }
}

module.exports = handler