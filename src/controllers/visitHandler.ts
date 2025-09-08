const {visit} = require("../models/visitModel")

const visitHanlder = {
    createData : async(req,res)=>{
        try {
            if(req.method=="POST"){
            const {...body} = req.body
            await visit.create(body)
            return res.status(200).send("data saved")
            }else if(req.method=="GET"){
            const data = await visit.find().sort({timestamp : -1})
            const uniqueVisits = [];
            const seenIps = new Set();

            for (const visit of data) {
            if (!seenIps.has(visit.ip)) {
                uniqueVisits.push(visit);
                seenIps.add(visit.ip);
            }
            }
            return res.status(200).send(uniqueVisits);
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({success : false,message : error})
        }
    }
}

module.exports = {
    visitHanlder
}