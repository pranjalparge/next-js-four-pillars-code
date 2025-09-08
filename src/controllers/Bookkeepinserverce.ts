
const express = require('express');
const asyncMiddleware = require('../middleware/async');

const Four_PII_Book = require('../models/4pii_bookkeep');
const krislin_Book = require('../models/krislin_bookkeep');
const LLC_Book = require('../models/LLC_bookkeep');
const LLP_Book = require('../models/LLP_bookkeep');

// for 4PIII About Data

module.exports.Add_4pii = async(req,res) =>{
    

    
    try{
        const data = await Four_PII_Book.create({
            info1:req.body.info1,
            info2:req.body.info2,
            page_heading:req.body.page_heading,
            list1:req.body.list1,
            
        })
        await data.save()
        res.json({message:"about _4pii_data" ,data})
        console.log(data)
    
    
        
    }catch(error){
        res.send(error)
        console.log(error)

    }
   
  
}




module.exports.get_4pii_Data= asyncMiddleware(async(req,res)=>{
    // const  lang = req.query.lang
    try{
        let getData = await Four_PII_Book.find()
        return res.status(200).send(getData);

    }catch(error){
        console.log('error', error);
      res.status(500).send("Internal server error");
    }
})

// for update..data

module.exports.update_4pii = asyncMiddleware( async(req,res)=>{
    try{
        console.log(req.params.id)
        console.log(req.body.id)
        const data = await Four_PII_Book.findById(req.body.id)
        if (!data) {
            res.status(400).json({ success: false, msg: 'data  not exits' });
        }
        const mydata = await Four_PII_Book.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

    }catch(error){
        console.log(error)
        res.status(400).json(`Error: ${error}`)

    }

})


module.exports.delete_4pii = asyncMiddleware(async(req,res)=>{
    try {
        console.log(req.body.id);
        const data = await Four_PII_Book.findById(req.body.id)
        if (!data) {
            res.status(400).send('no data found');
        }
        const newdata = await Four_PII_Book.findOneAndDelete(req.body.id)
        res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
    } catch (error) {
        console.log(error);
    }
})




//  for delete data
// module.exports.delete_4pii = asyncMiddleware(async(req,res)=>{
//     try {
//         console.log(req.body.id);
//         const data = await Four_PII_About.findById(req.body.id);
//         if (!data) {
//             res.status(400).send('no data found');
//         }
//         const newdata = await Four_PII_About.findByIdAndDelete(req.body.id)
//         res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
//     } catch (error) {
//         console.log(error);
//     }
// })



// For Krislin About Data

module.exports.Add_krislin = async(req,res) =>{
    
    try{
        const data = await krislin_Book.create({
            info1:req.body.info1,
            info2:req.body.info2,
            page_heading:req.body.page_heading,
            list1:req.body.list1,

        })
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
        let getData = await krislin_Book.find()
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
        const data = await krislin_Book.findById(req.body.id)
        if (!data) {
            res.status(400).json({ success: false, msg: 'data  not exits' });
        }
        const mydata = await krislin_Book.findByIdAndUpdate(req.body.id, req.body, {
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
        const data = await krislin_Book.findById(req.body.id)
        if (!data) {
            res.status(400).send('no data found');
        }
        const newdata = await krislin_Book.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
    } catch (error) {
        console.log(error);
    }
})




// for 99Ideas_LLP About Data

module.exports.Add_llp = async(req,res) =>{
    
    try{
        const data = await LLP_Book.create({
            info1:req.body.info1,
            info2:req.body.info2,
            page_heading:req.body.page_heading,
            list1:req.body.list1,

        })
           
        await data.save()
        res.json({message:"about _99ideas_llp_data" ,data})
        console.log(data)
    
    
        
    }catch(error){
        res.send(error)
        console.log(error)

    }
   
  
}




module.exports.get_llp_Data= asyncMiddleware(async(req,res)=>{
    const  lang = req.query.lang
    try{
        let getData = await LLP_Book.find()
        return res.status(200).send(getData);

    }catch(error){
        console.log('error', error);
      res.status(500).send("Internal server error");
    }
})


module.exports.update_llp = asyncMiddleware( async(req,res)=>{
    try{
        console.log(req.params.id)
        console.log(req.body.id)
        const data = await LLP_Book.findById(req.body.id)
        if (!data) {
            res.status(400).json({ success: false, msg: 'data  not exits' });
        }
        const mydata = await LLP_Book.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

    }catch(error){
        console.log(error)
        res.status(400).json(`Error: ${error}`)

    }

})



module.exports.delete_llp = asyncMiddleware(async(req,res)=>{
    try {
        console.log(req.body.id);
        const data = await LLP_Book.findById(req.body.id)
        if (!data) {
            res.status(400).send('no data found');
        }
        const newdata = await LLP_Book.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
    } catch (error) {
        console.log(error);
    }
})



// for 99ideas LLC About Data


module.exports.Add_llc = async(req,res) =>{
    
    try{
        const data = await LLC_Book.create({
            info1:req.body.info1,
            info2:req.body.info2,
            page_heading:req.body.page_heading,
            list1:req.body.list1,

        })
        await data.save()
        res.json({message:"about _99ideas_llc_data" ,data})
        console.log(data)
    
    
        
    }catch(error){
        res.send(error)
        console.log(error)

    }
   
  
}




module.exports.get_llc_Data= asyncMiddleware(async(req,res)=>{
    const  lang = req.query.lang
    try{
        let getData = await LLC_Book.find()
        return res.status(200).send(getData);

    }catch(error){
        console.log('error', error);
      res.status(500).send("Internal server error");
    }
})

module.exports.update_llc = asyncMiddleware( async(req,res)=>{
    try{
        console.log(req.params.id)
        console.log(req.body.id)
        const data = await LLC_Book.findById(req.body.id)
        if (!data) {
            res.status(400).json({ success: false, msg: 'data  not exits' });
        }
        const mydata = await LLC_Book.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

    }catch(error){
        console.log(error)
        res.status(400).json(`Error: ${error}`)

    }

})



module.exports.delete_llc = asyncMiddleware(async(req,res)=>{
    try {
        console.log(req.body.id);
        const data = await LLC_Book.findById(req.body.id)
        if (!data) {
            res.status(400).send('no data found');
        }
        const newdata = await krislin_About.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
    } catch (error) {
        console.log(error);
    }
})

