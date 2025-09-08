const {careerNewfrontemdModel} = require("../models/Career_Newfrontend")
const {fpiiCareerNewfrontemdModel} = require("../models/4pii_CarrerNewfrontend")
const basepath = process.env.BASE_PATH;


module.exports.handleGetdata = async(req,res)=>{
    try {
        
        const career = await careerNewfrontemdModel.find({}).sort({ _id: -1 })
        
        return res.status(200).send(career)
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.createJobs = async(req,res)=>{
    try {
        const {qualities,candidates,date,heading,hide} = req.body
        const jobs = await careerNewfrontemdModel.find({})
        let job = jobs[0].secondObject
        let newJob = {}
        if(heading) newJob.heading = heading
        if(date) newJob.date = date
        if(candidates) newJob.candidates = candidates
        if(qualities) newJob.qualities = qualities
        if(hide) newJob.hide = hide
        if(req.files){
            if(Array.isArray(req.files.image)) newJob.image = `${basepath}/uploads/${req.files.image[0].filename}`
            if(Array.isArray(req.files.icon)) newJob.icon = `${basepath}/uploads/${req.files.image[0].icon}`
        }
        job.push(newJob)
        await careerNewfrontemdModel.findByIdAndUpdate("674d9083ea9ca995a6123db0",{secondObject : job})
        // console.log(job)
        return res.status(200).json({success : true,message : "job created"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}
 
module.exports.updateJobs = async(req,res)=>{
    try {
        const {qualities,candidates,date,heading,id,hide} = req.body
        const jobs = await careerNewfrontemdModel.find({})
        let job = jobs[0].secondObject
        let newJob = job.find(j=>j._id==id)
        if(heading) newJob.heading = heading
        if(date) newJob.date = date
        if(candidates) newJob.candidates = candidates
        if(qualities) newJob.qualities = qualities
        if(hide) newJob.hide = hide
        if(req.files){
            if(Array.isArray(req.files.image)) newJob.image = `${basepath}/uploads/${req.files.image[0].filename}`
            if(Array.isArray(req.files.icon)) newJob.icon = `${basepath}/uploads/${req.files.image[0].icon}`
        }
        job=job.map((j)=>(
            j._id == id ? newJob : j
        ))
        await careerNewfrontemdModel.findByIdAndUpdate("674d9083ea9ca995a6123db0",{secondObject : job})
        return res.status(200).json({success : true,message : "job updated"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.deleteJob = async(req,res)=>{
    try {
        const {id} = req.body
        const jobs = await careerNewfrontemdModel.find({})
        let job = jobs[0].secondObject
        job = job.filter(j=>j._id != id)
        await careerNewfrontemdModel.findByIdAndUpdate("674d9083ea9ca995a6123db0",{secondObject : job})
        return res.status(200).json({success : true,message : "job deleted"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.handleCreateData= async(req,res)=>{
    try {

        const body = req.body

        if(body.career){
            await careerNewfrontemdModel.create({
                firstObject : body.career.firstObject,
                secondObject : body.career.secondObject
            })
        }

        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.handleGetFpii = async(req,res)=>{
    try {
        
        const career = await fpiiCareerNewfrontemdModel.find({}).sort({ _id: -1 })

        res.status(200).send(career)
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.handleCreateFpii = async(req,res)=>{
    try {

        const body = req.body

        if(body.career){
            await fpiiCareerNewfrontemdModel.create({
                firstObject : body.career.firstObject,
                secondObject : body.career.secondObject
            })
        }

        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.fpiiCreateJobs = async(req,res)=>{
    try {
        const {qualities,candidates,date,heading,hide} = req.body
        const jobs = await fpiiCareerNewfrontemdModel.find({})
        let job = jobs[0].secondObject
        let newJob = {}
        if(heading) newJob.heading = heading
        if(date) newJob.date = date
        if(candidates) newJob.candidates = candidates
        if(qualities) newJob.qualities = qualities
        if(hide) newJob.hide = hide
        if(req.files){
            if(Array.isArray(req.files.image)) newJob.image = `${basepath}/uploads/${req.files.image[0].filename}`
            if(Array.isArray(req.files.icon)) newJob.icon = `${basepath}/uploads/${req.files.image[0].icon}`
        }
        job.push(newJob)
        await fpiiCareerNewfrontemdModel.findByIdAndUpdate("6790c3a5f0ddf1de5d8aa087",{secondObject : job})
        // console.log(job)
        return res.status(200).json({success : true,message : "job created"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.fpiiUpdateJobs = async(req,res)=>{
    try {
        const {qualities,candidates,date,heading,id,hide} = req.body
        const jobs = await fpiiCareerNewfrontemdModel.find({})
        let job = jobs[0].secondObject
        let newJob = job.find(j=>j._id==id)
        if(heading) newJob.heading = heading
        if(date) newJob.date = date
        if(candidates) newJob.candidates = candidates
        if(qualities) newJob.qualities = qualities
        console.log(qualities)
        if(hide) newJob.hide = hide
        if(req.files){
            if(Array.isArray(req.files.image)) newJob.image = `${basepath}/uploads/${req.files.image[0].filename}`
            if(Array.isArray(req.files.icon)) newJob.icon = `${basepath}/uploads/${req.files.image[0].icon}`
        }
        job=job.map((j)=>(
            j._id == id ? newJob : j
        ))
        console.log(newJob)
        await fpiiCareerNewfrontemdModel.findByIdAndUpdate("6790c3a5f0ddf1de5d8aa087",{secondObject : job})
        return res.status(200).json({success : true,message : "job updated"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}

module.exports.fpiiDeleteJobs = async(req,res)=>{
    try {
        const {id} = req.body
        const jobs = await fpiiCareerNewfrontemdModel.find({})
        let job = jobs[0].secondObject
        job = job.filter(j=>j._id != id)
        await fpiiCareerNewfrontemdModel.findByIdAndUpdate("6790c3a5f0ddf1de5d8aa087",{secondObject : job})
        return res.status(200).json({success : true,message : "job deleted"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Internal server error");
    }
}