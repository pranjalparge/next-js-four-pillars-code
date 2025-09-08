
const express = require('express');
const asyncMiddleware = require('../middleware/async');


const krislin_About = require('../models/Krislin_Tenant');





// For Krislin About Data

module.exports.Add_krislin = async(req,res) =>{
    
    try{
        const data = await krislin_About.create({
          info:req.body.info,
          info_head:req.body.info_head

        })
        if(req.file){
            data.image = req.file.path
        }
        console.log(req.file)
        

        


        await data.save()
        res.json({message:"about _krislin_data" ,data})
        console.log(data)
    
    
        
    }catch(error){
        res.send(error)
        console.log(error)

    }
   
  
}




module.exports.get_krislin_Data= asyncMiddleware(async(req,res)=>{
    const  lang = req.query.lang
    try{
        let getData = await krislin_About.find()
        return res.status(200).send(getData);

    }catch(error){
        console.log('error', error);
      res.status(500).send("Internal server error");
    }
})

module.exports.update_krislin = asyncMiddleware( async(req,res)=>{
    try{
        console.log(req.params.id)
        console.log(req.body.id)
        const data = await krislin_About.findById(req.body.id)
        if (!data) {
            res.status(400).json({ success: false, msg: 'data  not exits' });
        }
        const mydata = await krislin_About.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

    }catch(error){
        console.log(error)
        res.status(400).json(`Error: ${error}`)

    }

})

module.exports.delete_krislin = asyncMiddleware(async(req,res)=>{
    try {
        console.log(req.body.id);
        const data = await krislin_About.findById(req.body.id)
        if (!data) {
            res.status(400).send('no data found');
        }
        const newdata = await krislin_About.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
    } catch (error) {
        console.log(error);
    }
})
