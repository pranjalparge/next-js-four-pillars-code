const {krislinProperty,properties} = require("../models/Krislin_Property")
const basepath = process.env.BASE_PATH


const krislinPropertyHandler = {
    getData: async (req, res) => {
        try {
            const { city, flateType } = req.query;

            const match = {};
            if (city) match.location = city;
            if (flateType) match.propertyType = flateType;

            const data = await krislinProperty.aggregate([
                { $match: match }
            ]);

            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error });
        }
    },
    
    createData : async(req,res)=>{
        try {
            const {...body} = req.body
            const data = await krislinProperty.create(body)
            data.images = []
            if(req.files && Array.isArray(req.files)){
                req.files.forEach((image)=>{
                    data.images.push({image : `${basepath}/uploads/${image.filename}`})
                })
                await data.save({validateBeforeSave : false})
            }
            // const property = await properties.aggregate([
            //     {
            //         $match : {
            //             city : data.location
            //         }
            //     }
            // ]) && await properties.aggregate([
            //     {
            //         $match :{
            //             flateType : data.propertyType
            //         }
            //     }
            // ])
                await properties.create({
                    city : data.location,
                    flateType : data.propertyType,
                    property : data._id
                })
            return res.status(200).json({success : true,message : "data created"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,error})
        }
    },
    updateData : async(req,res)=>{
        try {
            const {id,...body} = req.body
            const data = await krislinProperty.findByIdAndUpdate(id,body,{new : true})
            if(req.files && Array.isArray(req.files)){
                req.files.forEach((image)=>{
                    data.images.push({image : `${basepath}/uploads/${image.filename}`})
                })
                await data.save({validateBeforeSave : false})
            }
            await properties.findOneAndUpdate({property : data._id},{city : data.location,flateType : data.propertyType})
            return res.status(200).json({success : true,message : "data created",data})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,error})
        }
    },
    deleteData : async(req,res)=>{
        try {
            const {id} = req.body
            const deletedata = await krislinProperty.findByIdAndDelete(id)
            await properties.findOneAndDelete({property : deletedata._id})
            return res.status(200).json({success : false,message : "data deleted", deletedata})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,error})
        }
    },
    getProperties : async(req,res)=>{
        try {
            let data = await properties.find();

            let uniqueCities = new Set();
            let uniqueFlatTypes = new Set();

            data.forEach(item => {
                uniqueCities.add(item.city);
                uniqueFlatTypes.add(item.flateType);
            });

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


module.exports = {
    krislinPropertyHandler
}