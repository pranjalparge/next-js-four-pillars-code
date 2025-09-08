
const express = require('express');
const asyncMiddleware = require('../middleware/async');

const Role = require('../models/role');

// for 4PIII About Data

module.exports.Add_role = async(req,res) =>{
    
    try{
        const data = await Role.create({
            role : req.body.role,
            permission:req.body.permission
        })
        await data.save()
        res.json({message:"about role of user " ,data})
        console.log(data)
    
    
        
    }catch(error){
        res.send(error)
        console.log(error)

    }
   
  
}




// module.exports.get_4pii_Data= asyncMiddleware(async(req,res)=>{
//     // const  lang = req.query.lang
//     try{
//         let getData = await Four_PII_About.find()
//         return res.status(200).send(getData[0]);

//     }catch(error){
//         console.log('error', error);
//       res.status(500).send("Internal server error");
//     }
// })

// // for update..data

// module.exports.update_4pii = asyncMiddleware( async(req,res)=>{
//     try{
//         console.log(req.params.id)
//         console.log(req.body.id)
//         const data = await Four_PII_About.findById(req.body.id)
//         if (!data) {
//             res.status(400).json({ success: false, msg: 'data  not exits' });
//         }
//         const mydata = await Four_PII_About.findByIdAndUpdate(req.body.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

//     }catch(error){
//         console.log(error)
//         res.status(400).json(`Error: ${error}`)

//     }

// })

// //  for delete data
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



// // For Krislin About Data

// module.exports.Add_krislin = async(req,res) =>{
    
//     try{
//         const data = await krislin_About.create({
//             page_meta:req.body.page_meta,
//             info1:req.body.info1, 
//             info2:req.body.info2,
//             info3:req.body.info3,
//             info4:req.body.info4,
//             info5:req.body.info5,
//             info_head1:req.body.info_head1,
//             info_head2:req.body.info_head2,
//             info_head3:req.body.info_head3,
//             info_head4:req.body.info_head4,
//             info_head5:req.body.info_head5,
//             content_heading:req.body.content_heading,
//             content:req.body.content,

//         })
//         await data.save()
//         res.json({message:"about _krislin_data" ,data})
//         console.log(data)
    
    
        
//     }catch(error){
//         res.send(error)
//         console.log(error)

//     }
   
  
// }




// module.exports.get_krislin_Data= asyncMiddleware(async(req,res)=>{
//     const  lang = req.query.lang
//     try{
//         let getData = await krislin_About.find()
//         return res.status(200).send(getData[0]);

//     }catch(error){
//         console.log('error', error);
//       res.status(500).send("Internal server error");
//     }
// })

// module.exports.update_krislin = asyncMiddleware( async(req,res)=>{
//     try{
//         console.log(req.params.id)
//         console.log(req.body.id)
//         const data = await krislin_About.findById(req.body.id)
//         if (!data) {
//             res.status(400).json({ success: false, msg: 'data  not exits' });
//         }
//         const mydata = await krislin_About.findByIdAndUpdate(req.body.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

//     }catch(error){
//         console.log(error)
//         res.status(400).json(`Error: ${error}`)

//     }

// })


// // for 99Ideas_LLP About Data

// module.exports.Add_llp = async(req,res) =>{
    
//     try{
//         const data = await LLP_About.create({
//             page_meta:req.body.page_meta,
//             info1:req.body.info1, 
//             info2:req.body.info2,
//             info3:req.body.info3,
//             info4:req.body.info4,
//             info5:req.body.info5,
//             info_head1:req.body.info_head1,
//             info_head2:req.body.info_head2,
//             info_head3:req.body.info_head3,
//             info_head4:req.body.info_head4,
//             info_head5:req.body.info_head5,
//             content_heading:req.body.content_heading,
//             content:req.body.content,

//         })
//         await data.save()
//         res.json({message:"about _99ideas_llp_data" ,data})
//         console.log(data)
    
    
        
//     }catch(error){
//         res.send(error)
//         console.log(error)

//     }
   
  
// }




// module.exports.get_llp_Data= asyncMiddleware(async(req,res)=>{
//     const  lang = req.query.lang
//     try{
//         let getData = await LLP_About.find()
//         return res.status(200).send(getData[0]);

//     }catch(error){
//         console.log('error', error);
//       res.status(500).send("Internal server error");
//     }
// })


// module.exports.update_llp = asyncMiddleware( async(req,res)=>{
//     try{
//         console.log(req.params.id)
//         console.log(req.body.id)
//         const data = await LLP_About.findById(req.body.id)
//         if (!data) {
//             res.status(400).json({ success: false, msg: 'data  not exits' });
//         }
//         const mydata = await LLP_About.findByIdAndUpdate(req.body.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

//     }catch(error){
//         console.log(error)
//         res.status(400).json(`Error: ${error}`)

//     }

// })

// // for 99ideas LLC About Data


// module.exports.Add_llc = async(req,res) =>{
    
//     try{
//         const data = await LLC_About.create({
//             page_meta:req.body.page_meta,
//             info1:req.body.info1, 
//             info2:req.body.info2,
//             info3:req.body.info3,
//             info4:req.body.info4,
//             info5:req.body.info5,
//             info_head1:req.body.info_head1,
//             info_head2:req.body.info_head2,
//             info_head3:req.body.info_head3,
//             info_head4:req.body.info_head4,
//             info_head5:req.body.info_head5,
//             content_heading:req.body.content_heading,
//             content:req.body.content,

//         })
//         await data.save()
//         res.json({message:"about _99ideas_llc_data" ,data})
//         console.log(data)
    
    
        
//     }catch(error){
//         res.send(error)
//         console.log(error)

//     }
   
  
// }




// module.exports.get_llc_Data= asyncMiddleware(async(req,res)=>{
//     const  lang = req.query.lang
//     try{
//         let getData = await LLC_About.find()
//         return res.status(200).send(getData[0]);

//     }catch(error){
//         console.log('error', error);
//       res.status(500).send("Internal server error");
//     }
// })

// module.exports.update_llc = asyncMiddleware( async(req,res)=>{
//     try{
//         console.log(req.params.id)
//         console.log(req.body.id)
//         const data = await LLC_About.findById(req.body.id)
//         if (!data) {
//             res.status(400).json({ success: false, msg: 'data  not exits' });
//         }
//         const mydata = await LLC_About.findByIdAndUpdate(req.body.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

//     }catch(error){
//         console.log(error)
//         res.status(400).json(`Error: ${error}`)

//     }

// })