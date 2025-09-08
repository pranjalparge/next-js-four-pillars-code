const express = require("express");
const asyncMiddleware = require("../middleware/async");

const Four_PII_About = require("../models/4pii_home");
// const krislin_About = require('../models/krislin_grafic');
const LLC_About = require("../models/99ideasLLC_home");
const saas_About = require("../models/99ideasSaas/saas_Home");
const LLP_About = require('../models/LLP_Home');

const {LLP_HomePage,llp_service,llp_Events,llp_About} = require('../models/LLP_Home'); // adjust path as needed
const {uploadFile,getFileUrl} = require("./cloudFare/controller")
const {generateSignedUrl} = require("../utils/cloudFlare/getSignedUrl")
const uploadToR2 = require('../utils/cloudFlare/uploadToR2'); // Path to your R2 upload utility
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const Joi = require('joi');

// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  try {
    const data = await Four_PII_About.create({
      page_heading: req.body.page_heading,
      page_content: req.body.page_content,
      head: req.body.head,
      website_head: req.body.website_head,
      website_content: req.body.website_content,
      Dynamic_website: req.body.Dynamic_website,
      data_science_head: req.body.data_science_head,
      data_content: req.body.data_content,
      Data_Science: req.body.Data_Science,
      onlien_Add_head: req.body.onlien_Add_head,
      onlien_Add_content: req.body.onlien_Add_content,
      report_man_head: req.body.report_man_head,
      report_man_content: req.body.report_man_content,
      service_head: req.body.service_head,
      service_info_head: req.body.service_info_head,
      service_content: req.body.service_content,
      Services: req.body.Services,
      Contact: req.body.Contact,
      mobile_app_head:req.body.mobile_app_head,
      mobile_app_content:req.body.mobile_app_content,
      whatsap_inte_head: req.body.whatsap_inte_head,
      whatsap_inte_content:req.body.whatsap_inte_content
    });
    await data.save();
    res.json({ message: "about _4pii_data_home_page", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_4pii_Data = asyncMiddleware(async (req, res) => {
  // const  lang = req.query.lang
  try {
    let getData = await Four_PII_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

// for update..data

module.exports.update_4pii = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.id);
    const data = await Four_PII_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await Four_PII_About.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      updateddata: mydata,
      msg: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error: ${error}`);
  }
});

//  for delete data
module.exports.delete_4pii = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
    const data = await Four_PII_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await Four_PII_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

// // For Krislin About Data

// module.exports.Add_krislin = async(req,res) =>{

//     try{
//         const data = await krislin_About.create({
//             content:req.body.content,
//             page_name:req.body.page_name,
//             page_heading: req.body.page_heading,
//             page_meta:req.body.page_meta,
//             info_head1:req.body.info_head1,
//             info_head2:req.body.info_head2,
//             info_head3:req.body.info_head3,
//             info_head4:req.body.info_head4,
//             content_heading:req.body.content_heading,
//             info1:req.body.info1,
//             info2:req.body.info2,
//             info3:req.body.info3,
//             info4:req.body.info4

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

// module.exports.delete_krislin = asyncMiddleware(async(req,res)=>{
//     try {
//         console.log(req.body.id);
//         const data = await krislin_About.findById(req.body.id)
//         if (!data) {
//             res.status(400).send('no data found');
//         }
//         const newdata = await krislin_About.findByIdAndDelete(req.body.id)
//         res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
//     } catch (error) {
//         console.log(error);
//     }
// })

// for 99Ideas_LLP About Data

module.exports.Add_llp = async(req,res) =>{

    try{
        const data = await LLP_About.create({
          page_heading: req.body.page_heading,
          page_content: req.body.page_content,
          head: req.body.head,
          website_head: req.body.website_head,
          website_content: req.body.website_content,
          Dynamic_website: req.body.Dynamic_website,
          data_science_head: req.body.data_science_head,
          data_content: req.body.data_content,
          Data_Science: req.body.Data_Science,
          onlien_Add_head: req.body.onlien_Add_head,
          onlien_Add_content: req.body.onlien_Add_content,
          report_man_head: req.body.report_man_head,
          report_man_content: req.body.report_man_content,
          service_head: req.body.service_head,
          service_info_head: req.body.service_info_head,
          service_content: req.body.service_content,
          Services: req.body.Services,
          Contact: req.body.Contact,
          mobile_app_head:req.body.mobile_app_head,
          mobile_app_content:req.body.mobile_app_content,
          whatsap_inte_head: req.body.whatsap_inte_head,
          whatsap_inte_content:req.body.whatsap_inte_content,
          head:req.body.head,
          content:req.body.content,
          data:req.body.data,
          data_1:req.body.data_1


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
        let getData = await LLP_About.find()
        return res.status(200).send(getData[0]);

    }catch(error){
        console.log('error', error);
      res.status(500).send("Internal server error");
    }
})

module.exports.update_llp = asyncMiddleware( async(req,res)=>{
    try{
        console.log(req.params.id)
        console.log(req.body.id)
        const data = await LLP_About.findById(req.body.id)
        if (!data) {
            res.status(400).json({ success: false, msg: 'data  not exits' });
        }
        const mydata = await LLP_About.findByIdAndUpdate(req.body.id, req.body, {
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
        const data = await LLP_About.findById(req.body.id)
        if (!data) {
            res.status(400).send('no data found');
        }
        const newdata = await LLP_About.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: true, msg: 'Successfully Deleted task.' });
    } catch (error) {
        console.log(error);
    }
})

// // for 99ideas LLC About Data

module.exports.Add_llc = async (req, res) => {
  try {
    const data = await LLC_About.create({
      website_head: req.body.website_head,
      website_content: req.body.website_content,
      e_learning_head: req.body.e_learning_head,
      e_learning_content: req.body.e_learning_content,
      onlien_Add_head: req.body.onlien_Add_head,
      onlien_Add_content: req.body.onlien_Add_head,
      book_keeping_head: req.body.book_keeping_head,
      book_keeping_content: req.body.book_keeping_content,
      payment_gateway_head: req.body.payment_gateway_head,
      payment_gateway_content: req.body.payment_gateway_content,
      otp_head: req.body.otp_head,
      otp_content: req.body.otp_content,
      cms_head: req.body.cms_head,
      cms_content: req.body.cms_content,
      product_head: req.body.product_head,
      product_content: req.body.product_content,
      cms_develop_head: req.body.cms_develop_head,
      cms_develop_content: req.body.cms_develop_content,
      content_writing_head: req.body.content_writing_head,
      content_writing_content: req.body.content_writing_content,
      grafic_design_head: req.body.grafic_design_head,
      grafic_design_content: req.body.grafic_design_content,
      domain_regi_head: req.body.domain_regi_head,
      domain_regi_content: req.body.domain_regi_content,
      iso_head: req.body.iso_head,
      iso_head_content: req.body.iso_head_content,
      ssl_head: req.body.ssl_head,
      ssl_content: req.body.ssl_content,
      head: req.body.head,
    });
    await data.save();
    res.json({ message: "about _99ideas_llc_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_llc_Data = asyncMiddleware(async (req, res) => {
  const lang = req.query.lang;
  try {
    let getData = await LLC_About.find();
    return res.status(200).send(getData[0]);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.update_llc = asyncMiddleware(async (req, res) => {
  try {
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await LLC_About.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      updateddata: mydata,
      msg: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error: ${error}`);
  }
});

module.exports.delete_llc = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await LLC_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

//------------------------SAAS DATA---------------------------

module.exports.Add_saas = async (req, res) => {
  try {
    const data = await saas_About.create({
      website_head: req.body.website_head,
      website_content: req.body.website_content,
      e_learning_head: req.body.e_learning_head,
      e_learning_content: req.body.e_learning_content,
      onlien_Add_head: req.body.onlien_Add_head,
      onlien_Add_content: req.body.onlien_Add_head,
      book_keeping_head: req.body.book_keeping_head,
      book_keeping_content: req.body.book_keeping_content,
      payment_gateway_head: req.body.payment_gateway_head,
      payment_gateway_content: req.body.payment_gateway_content,
      otp_head: req.body.otp_head,
      otp_content: req.body.otp_content,
      cms_head: req.body.cms_head,
      cms_content: req.body.cms_content,
      product_head: req.body.product_head,
      product_content: req.body.product_content,
      cms_develop_head: req.body.cms_develop_head,
      cms_develop_content: req.body.cms_develop_content,
      content_writing_head: req.body.content_writing_head,
      content_writing_content: req.body.content_writing_content,
      grafic_design_head: req.body.grafic_design_head,
      grafic_design_content: req.body.grafic_design_content,
      domain_regi_head: req.body.domain_regi_head,
      domain_regi_content: req.body.domain_regi_content,
      iso_head: req.body.iso_head,
      iso_head_content: req.body.iso_head_content,
      ssl_head: req.body.ssl_head,
      ssl_content: req.body.ssl_content,
      head: req.body.head,
    });

    await data.save();
    res.json({ message: "about _99ideas_saas_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_saas_Data = asyncMiddleware(async (req, res) => {
  try {
    let getData = await saas_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.update_saas = asyncMiddleware(async (req, res) => {
  try {
    const data = await saas_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await saas_About.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      success: true,
      updateddata: mydata,
      msg: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error: ${error}`);
  }
});

module.exports.delete_saas = asyncMiddleware(async (req, res) => {
  try {
    const data = await saas_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await saas_About.findOneAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});









exports.add_llp_homapage = async(req,res)=>{
  try {
    const body = req.body;
    const data = await LLP_HomePage.create({
      heading : body.heading,
      secondSection : body.secondSection,
      serviceSection : body.serviceSection,
      testimonial : body.testimonial
    });
    res.status(201).json({
      success: true,
      message: "content added successfully!",
      data: data
    });
  } catch (error) {
    console.error('Error in Add_AboutUs controller:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            details: error.message || 'An unknown error occurred.',
        });
  }
}

exports.update_llpHomepage_heading = async(req,res)=>{
  try {
    const data = await LLP_HomePage.find({})
    let heading = data[0].heading;
    const {title1,title2,content} = req.body;
    if(title1){
      heading.title1 = title1;
    }
    if(title2){
      heading.title2 = title2;
    }
    if(content){
      heading.content = content;
    }
    if (req.files?.image?.[0]) {
      const key = await uploadToR2(req.files.image[0], 'llp/');
      heading.image = key
    }

    await LLP_HomePage.findByIdAndUpdate(data[0]._id, {heading}, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      success: true,
      message: "content added successfully!",
      data: data
    });

  } catch (error) {
    console.error('Error in Add_AboutUs controller:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            details: error.message || 'An unknown error occurred.',
        });
  }
}

exports.addORupdateFeatures  =async(req,res)=>{
  try {
      const { sectionTitle, content, featureId, featureUpdate, newFeature } = req.body;
    const files = req.files;

    const homepage = await LLP_HomePage.findOne();
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage data not found" });
    }

    // 1️⃣ Update section title or content
    if (sectionTitle) homepage.secondSection.sectionTitle = sectionTitle;
    if (content) homepage.secondSection.content = content;

    // 2️⃣ Update existing feature
    if (featureId && featureUpdate) {
      const feature = homepage.secondSection.features.find(
        (f) => f._id.toString() === featureId
      );
      if (!feature) {
        return res.status(404).json({ success: false, message: "Feature not found" });
      }

      // Upload new image if sent
      if (files?.image?.[0]) {
        const key = await uploadToR2(files.image[0], "llp/");
        feature.image = key;
      }

      if (files?.image2?.[0]) {
        const key2 = await uploadToR2(files.image2[0], "llp/");
        feature.image2 = key2;
      }

      // Update text fields
      feature.head = featureUpdate.head ?? feature.head;
      feature.title = featureUpdate.title ?? feature.title;
      feature.description = featureUpdate.description ?? feature.description;
    }

    // 3️⃣ Add new feature (with optional image)
    if (newFeature) {
      const newF = {
        image: "",
        image2: "",
        head: newFeature.head,
        title: newFeature.title,
        description: newFeature.description,
      };

      if (files?.image?.[0]) {
        const key = await uploadToR2(files.image[0], "llp/");
        newF.image = key;
      }

      if (files?.image2?.[0]) {
        const key2 = await uploadToR2(files.image2[0], "llp/");
        newF.image2 = key2;
      }

      homepage.secondSection.features.push(newF);
    }

    await homepage.save();

    return res.status(200).json({
      success: true,
      message: "Second section updated successfully",
      data: homepage.secondSection,
    });
  } catch (error) {
    console.error('Error in Add_AboutUs controller:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            details: error.message || 'An unknown error occurred.',
        });
  }
}

exports.addORupadteService = async(req,res)=>{
  try {
    const {
      sectionHead,
      serviceId,
      serviceUpdate,
      newService,
      listItemId,
      listItemUpdate,
      newListItem,
    } = req.body;

    const files = req.files;
    const homepage = await LLP_HomePage.findOne();
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    // 1️⃣ Update head
    if (sectionHead) {
      homepage.serviceSection.head = sectionHead;
    }

    // 2️⃣ Update service by ID
    if (serviceId && serviceUpdate) {
      const targetService = homepage.serviceSection.service.find(
        (s) => s._id.toString() === serviceId
      );
      if (!targetService) {
        return res.status(404).json({ success: false, message: "Service not found" });
      }

      if (files?.image?.[0]) {
        const imgKey = await uploadToR2(files.image[0], "services/");
        targetService.image = imgKey;
      }

      targetService.title = serviceUpdate.title ?? targetService.title;
      targetService.description = serviceUpdate.description ?? targetService.description;
      targetService.advObject1 = serviceUpdate.advObject1 ?? targetService.advObject1;
      targetService.advObject2 = serviceUpdate.advObject2 ?? targetService.advObject2;
      targetService.advObject3 = serviceUpdate.advObject3 ?? targetService.advObject3;
    }

    // 3️⃣ Add a new service block
    if (newService) {
      const newS = {
        image: "",
        title: newService.title,
        description: newService.description,
        advObject1: newService.advObject1,
        advObject2: newService.advObject2,
        advObject3: newService.advObject3,
        list: [],
      };

      if (files?.image?.[0]) {
        const key = await uploadToR2(files.image[0], "services/");
        newS.image = key;
      }

      homepage.serviceSection.service.push(newS);
    }

    // 4️⃣ Update an existing list item inside a service
    if (serviceId && listItemId && listItemUpdate) {
      const targetService = homepage.serviceSection.service.find(
        (s) => s._id.toString() === serviceId
      );
      if (!targetService) {
        return res.status(404).json({ success: false, message: "Service not found for list update" });
      }

      const listItem = targetService.list.find((item) => item._id.toString() === listItemId);
      if (!listItem) {
        return res.status(404).json({ success: false, message: "List item not found" });
      }

      if (files?.listImage?.[0]) {
        const key = await uploadToR2(files.listImage[0], "services/");
        listItem.image = key;
      }

      listItem.content = listItemUpdate.content ?? listItem.content;
    }

    // 5️⃣ Add a new list item
    if (serviceId && newListItem) {
      const targetService = homepage.serviceSection.service.find(
        (s) => s._id.toString() === serviceId
      );
      if (!targetService) {
        return res.status(404).json({ success: false, message: "Service not found for new list" });
      }
      
      const newList = {
        image: "",
        content: newListItem.content,
      };

      if (files?.listImage?.[0]) {
        const key = await uploadToR2(files.listImage[0], "services/");
        newList.image = key;
      }

      targetService.list.push(newList);
    }

    await homepage.save();

    return res.status(200).json({
      success: true,
      message: "Service section updated successfully",
      data: homepage.serviceSection,
    });
  } catch (error) {
    console.error('Error in Add_AboutUs controller:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            details: error.message || 'An unknown error occurred.',
        });
  }
}

exports.addORupdateTestimonials = async(req,res)=>{
  try {
    const {
      testimonialId,
      testimonialUpdate,
      newTestimonial,
      head,
      subhead,
      content,
    } = req.body;

    const files = req.files;

    const page = await LLP_HomePage.findOne();
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    // Ensure testimonial block exists
    if (!page.testimonial) {
      page.testimonial = { titles: [] };
    }
    if (!Array.isArray(page.testimonial.titles)) {
      page.testimonial.titles = [];
    }

    // ✅ 1. Update testimonial section's text or background
    if (head) page.testimonial.head = head;
    if (subhead) page.testimonial.subhead = subhead;
    if (content) page.testimonial.content = content;

    if (files?.bgImage?.[0]) {
      const bgKey = await uploadToR2(files.bgImage[0], 'testimonials/');
      page.testimonial.bgImage = bgKey;
    }

    // ✅ 2. Update existing testimonial
    if (testimonialId && testimonialUpdate) {
      const t = page.testimonial.titles.find((item) => item._id.toString() === testimonialId);
      if (!t) {
        return res.status(404).json({ success: false, message: 'Testimonial not found' });
      }

      if (files?.image?.[0]) {
        const key = await uploadToR2(files.image[0], 'testimonials/');
        t.image = key;
      }

      t.head = testimonialUpdate.head ?? t.head;
      t.subhead = testimonialUpdate.subhead ?? t.subhead;
      t.review = testimonialUpdate.review ?? t.review;
      t.date = testimonialUpdate.date ?? t.date;
    }

    // ✅ 3. Add new testimonial
    if (newTestimonial) {
      const newT = {
        image: '',
        head: newTestimonial.head,
        subhead: newTestimonial.subhead,
        review: newTestimonial.review,
        date: newTestimonial.date,
      };

      if (files?.image?.[0]) {
        const key = await uploadToR2(files.image[0], 'testimonials/');
        newT.image = key;
      }

      page.testimonial.titles.push(newT);
    }

    await page.save();

    res.status(200).json({
      success: true,
      message: 'Testimonial section updated successfully',
      data: page.testimonial,
    });
  } catch (error) {
    console.error('Error in Add_AboutUs controller:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            details: error.message || 'An unknown error occurred.',
        });
  }
}

exports.get_LLpHomepage = async(req,res)=>{
  try {
    let getData = await LLP_HomePage.find();
    getData[0].heading.image = await generateSignedUrl(getData[0].heading.image)
    const home = getData[0];

// Only process secondSection.features
if (Array.isArray(home.secondSection?.features)) {
  for (let feature of home.secondSection.features) {
    if (feature.image) {
      feature.image = await generateSignedUrl(feature.image);
    }
    if (feature.image2) {
      feature.image2 = await generateSignedUrl(feature.image2);
    }
  }
}

  home.testimonial.bgImage = await generateSignedUrl(home.testimonial.bgImage)
  if (Array.isArray(home.testimonial?.titles)) {
  for (let feature of home.testimonial.titles) {
    if (feature.image) {
      feature.image = await generateSignedUrl(feature.image);
    }
  }
}

if (Array.isArray(home.serviceSection?.service)) {
  for (let service of home.serviceSection.service) {
    if (service.image) {
      service.image = await generateSignedUrl(service.image);
    }

    if (Array.isArray(service.list)) {
      for (let item of service.list) {
        if (item.image) {
          item.image = await generateSignedUrl(item.image);
        }
      }
    }
  }
}


    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
}

exports.createLLpService = async(req,res)=>{
  try {
    const body = req.body;
    const data = await llp_service.create({
      hedaings : body.headings,
      offer : body.offer,
      service : body.service
    });
    res.status(201).json({
      success: true,
      message: "content added successfully!",
      data: data
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
}
exports.getLLPService = async(req,res)=>{
  try {
    const data = await llp_service.find();
    return res.status(200).send(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
}



exports.createLLPEvents = async(req,res)=>{
  try {
    const body = req.body
    const data = await llp_Events.create({
      awaits : body.awaits,
      hero : body.hero,
      pastEvents : body.pastEvents,
      upcomingEvent : body.upcomingEvent
    });
    res.status(201).json({
      success: true,
      message: "content added successfully!",
      data: data
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
}


exports.updateEventsPage = async (req, res) => {
  try {
    const {
      hero,
      awaits,
      upcomingEvent,
      newCard,
      newTag,
      newTimeline,
      tagId,
      tagTitle,
      cardId,
      cardTitle,
      cardContent,
      cardIcon,
      timelineId,
      timelineTitle,
    } = req.body;
    const files = req.files;

    const page = await llp_Events.findOne();
    if (!page) return res.status(404).json({ success: false, message: "Events page not found" });

    // 1️⃣ Hero Section
    if (hero) {
      page.hero.company = hero.company ?? page.hero.company;
      page.hero.title = hero.title ?? page.hero.title;
      page.hero.subtitle = hero.subtitle ?? page.hero.subtitle;
      page.hero.location = hero.location ?? page.hero.location;
      page.hero.date = hero.date ?? page.hero.date;
      page.hero.buttonText = hero.buttonText ?? page.hero.buttonText;

      if (files?.heroImage?.[0]) {
        const key = await uploadToR2(files.heroImage[0], "events/");
        page.hero.image = key;
      }
    }

    // 1️⃣.a Update Hero Tag (flat structure)
    if (tagId) {
      const tag = page.hero.tags.find(t => t._id.toString() === tagId);
      if (!tag) return res.status(404).json({ success: false, message: "Tag not found" });

      if (tagTitle) tag.title = tagTitle;
      if (files?.tagImage?.[0]) {
        const key = await uploadToR2(files.tagImage[0], "events/");
        tag.image = key;
      }
    }

    // 1️⃣.b Add Hero Tag
    if (newTag) {
      const tag = { title: newTag.title, image: "" };
      if (files?.newTagImage?.[0]) {
        const key = await uploadToR2(files.newTagImage[0], "events/");
        tag.image = key;
      }
      page.hero.tags.push(tag);
    }

    // 2️⃣ Awaits Section
    if (awaits) {
      page.awaits.heading = awaits.heading ?? page.awaits.heading;
      page.awaits.description = awaits.description ?? page.awaits.description;
    }

    // 2️⃣.a Update Card
    if (cardId) {
      const card = page.awaits.cards.find(c => c._id.toString() === cardId);
      if (!card) return res.status(404).json({ success: false, message: "Card not found" });

      if (cardTitle) card.title = cardTitle;
      if (cardContent) card.content = cardContent;
      if (files?.cardIcon?.[0]){
        const key = await uploadToR2(files.cardIcon[0], "events/");
        card.icon = key
      };

      if (files?.cardImage?.[0]) {
        const key = await uploadToR2(files.cardImage[0], "events/");
        card.image = key;
      }
    }

    // 2️⃣.b Add Card
    if (newCard) {
      const card = {
        title: newCard.title,
        content: newCard.content,
        icon: newCard.icon,
        image: ""
      };
      if (files?.newCardImage?.[0]) {
        const key = await uploadToR2(files.newCardImage[0], "events/");
        card.image = key;
      }
      page.awaits.cards.push(card);
    }

    // 3️⃣ Upcoming Event Update
    if (upcomingEvent) {
      page.upcomingEvent.heading = upcomingEvent.heading ?? page.upcomingEvent.heading;
      page.upcomingEvent.location = upcomingEvent.location ?? page.upcomingEvent.location;

      if (files?.upcomingImage?.[0]) {
        const key = await uploadToR2(files.upcomingImage[0], "events/");
        page.upcomingEvent.image = key;
      }
    }

    // 3️⃣.a Update Timeline
    if (timelineId) {
      const entry = page.upcomingEvent.timeline.find(t => t._id.toString() === timelineId);
      if (!entry) return res.status(404).json({ success: false, message: "Timeline entry not found" });

      if (timelineTitle) entry.title = timelineTitle;
      if (files?.timelineImage?.[0]) {
        const key = await uploadToR2(files.timelineImage[0], "events/");
        entry.image = key;
      }
    }

    // 3️⃣.b Add Timeline
    if (newTimeline) {
      const item = {
        title: newTimeline.title,
        image: ""
      };
      if (files?.newTimelineImage?.[0]) {
        const key = await uploadToR2(files.newTimelineImage[0], "events/");
        item.image = key;
      }
      page.upcomingEvent.timeline.push(item);
    }

    // 4️⃣ Past Events
    // 4️⃣ Past Events
if (req.body.pastEventId) {
  // Update existing past event
  const past = page.pastEvents.find(e => e._id.toString() === req.body.pastEventId);
  if (!past) {
    return res.status(404).json({ success: false, message: "Past event not found" });
  }
  past.title = req.body.pastEventTitle ?? past.title;
  past.subtitle = req.body.pastEventSubtitle ?? past.subtitle;
  past.description = req.body.pastEventDescription ?? past.description;
}

if (req.body.newPastEvent) {
  // Add new past event
  const newPastEvent = req.body.newPastEvent; // should be an object with title, subtitle, description
  if (newPastEvent.title && newPastEvent.subtitle && newPastEvent.description) {
    page.pastEvents.push({
      title: newPastEvent.title,
      subtitle: newPastEvent.subtitle,
      description: newPastEvent.description
    });
  }
}


    await page.save();
    return res.status(200).json({
      success: true,
      message: "Events page updated successfully",
      data: page
    });

  } catch (error) {
    console.error("Error updating Events Page:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", details: error.message });
  }
};


exports.getLLPEvnets = async(req,res)=>{
  try {
    const data = await llp_Events.find();
    let home = data[0];
    if (home.hero?.image) {
  home.hero.image = await generateSignedUrl(home.hero.image);
}
if (Array.isArray(home.hero?.tags)) {
  for (let tag of home.hero.tags) {
    if (tag.image) {
      tag.image = await generateSignedUrl(tag.image);
    }
  }
}

// 🎯 Awaits Section
if (Array.isArray(home.awaits?.cards)) {
  for (let card of home.awaits.cards) {
    if (card.image) {
      card.image = await generateSignedUrl(card.image);
    }
    if (card.icon) {
      card.icon = await generateSignedUrl(card.icon);
    }
  }
}

// 🎯 Upcoming Event Section
if (home.upcomingEvent?.image) {
  home.upcomingEvent.image = await generateSignedUrl(home.upcomingEvent.image);
}
if (Array.isArray(home.upcomingEvent?.timeline)) {
  for (let item of home.upcomingEvent.timeline) {
    if (item.image) {
      item.image = await generateSignedUrl(item.image);
    }
  }
}
    return res.status(200).send(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
}

exports.createLLPAbout = async(req,res)=>{
  try {
    const body = req.body
    const data = await llp_About.create({
      approachPoints : body.approachPoints,
      description : body.description,
      heading : body.heading,
      image :  body.image,
      philosophyContent : body.philosophyContent,
      philosophyTitle : body.philosophyTitle,
      strategyContent : body.strategyContent,
      strategyTitle : body.strategyTitle,
      whyUsCards  : body.whyUsCards,
      whyUsTitle : body.whyUsTitle
    });
    res.status(201).json({
      success: true,
      message: "content added successfully!",
      data: data
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
}


exports.updateLLPAbout= async(req,res)=>{
  try {
  const {
    heading,
    imageFile, // Assuming image uploaded as file
    description,
    philosophyTitle,
    philosophyContent,
    strategyTitle,
    strategyContent,
    approachPoints,
    whyUsTitle,
    whyUsCardsAdd,
    cardId,             // separate id for update
    title,              // new title for update
    content     // Array of cards to add
  } = req.body;

  const files = req.files;

  const home = await llp_About.findOne();
  if (!home) return res.status(404).json({ success: false, message: "Homepage data not found" });

  // Update scalar fields
  if (heading) home.heading = heading;
  if (description) home.description = description; // expect array of strings
  if (philosophyTitle) home.philosophyTitle = philosophyTitle;
  if (philosophyContent) home.philosophyContent = philosophyContent;
  if (strategyTitle) home.strategyTitle = strategyTitle;
  if (strategyContent) home.strategyContent = strategyContent; // expect array
  if (approachPoints) home.approachPoints = approachPoints; // expect array of strings
  if (whyUsTitle) home.whyUsTitle = whyUsTitle;

  // Update image if new image file provided
  if (files?.imageFile?.[0]) {
    const key = await uploadToR2(files.imageFile[0], "homepage/");
    home.image = key;
  }

  if (cardId) {
    const card = home.whyUsCards.id(cardId);
    if (card) {
      if (title !== undefined) card.title = title;
      if (content !== undefined) card.content = content;

      if (files?.icon?.[0]) {
        const key = await uploadToR2(files.icon[0], "service/");
        card.icon = key;
      }
    }
  }

  // Add new cards (if any)
  if (Array.isArray(whyUsCardsAdd)) {
    for (let i = 0; i < whyUsCardsAdd.length; i++) {
      const newCard = whyUsCardsAdd[i];
      const iconKey = files?.newIcon?.[i] ? await uploadToR2(files.newIcon[i], "service/") : null;

      home.whyUsCards.push({
        title: newCard.title,
        content: newCard.content,
        icon: iconKey
      });
    }
  }

  await home.save();

  res.status(200).json({
    success: true,
    message: "Homepage data updated successfully",
    data: home
  });

} catch (error) {
  console.error("Error updating homepage:", error);
  res.status(500).json({ success: false, message: "Internal server error", error: error.message });
}
}

exports.getLLPAbout = async(req,res)=>{
  try {
    const data = await llp_About.find();
if (data.length > 0) {
  const home = data[0]; // or loop if multiple

  // Generate signed URL for main image
  if (home.image) {
    home.image = await generateSignedUrl(home.image);
  }

  // Generate signed URL for each whyUsCard icon
  if (Array.isArray(home.whyUsCards)) {
    for (const card of home.whyUsCards) {
      if (card.icon) {
        card.icon = await generateSignedUrl(card.icon);
      }
    }
  }
  
  return res.status(200).json(home);
} else {
  return res.status(404).json({ success: false, message: "No data found" });
}
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
}
// exports.add_llp_homepage = async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.data); // data is a JSON string
//     const basepath = process.env.BASE_PATH 

//     // Joi Schema with list added for coreFeatures
//     const schema = Joi.object({
//       advObject1: Joi.string().allow('', null),
//       advObject2: Joi.string().allow('', null),
//       advObject3: Joi.string().allow('', null),
//       title: Joi.string().required(),
//       content: Joi.string().required(),
//       image: Joi.string().optional(),

//       featuresSection: Joi.object({
//         sectionTitle: Joi.string().required(),
//         sectionContent: Joi.string().required(),
//         content: Joi.string().required(),
//         head: Joi.string().required(),
//         secionsubContent: Joi.string().allow('', null),
//         features: Joi.array().items(
//           Joi.object({
//             head: Joi.string().required(),
//             title: Joi.string().required(),
//             description: Joi.string().required(),
//             image: Joi.string().optional(),
//             image2: Joi.string().optional(),
//           })
//         ).required()
//       }).required(),

//       coreFeaturesSection: Joi.object({
//         sectionTitle: Joi.string().required(),
//         sectionContent: Joi.string().required(),
//         content: Joi.string().required(),
//         head: Joi.string().required(),
//         secionsubContent: Joi.string().allow('', null),
//         coreFeatures: Joi.array().items(
//           Joi.object({
//             title: Joi.string().required(),
//             description: Joi.string().required(),
//             image: Joi.string().optional(),
//             advObject1: Joi.string().allow('', null),
//             advObject2: Joi.string().allow('', null),
//             advObject3: Joi.string().allow('', null),
//             list: Joi.array().items(Joi.string()).optional(),   // Added list field validation
//           })
//         ).required()
//       }).required()
//     });

//     const { error, value } = schema.validate(data, { abortEarly: false });

//     if (error) {
//       return res.status(400).json({
//         error: 'Validation Error',
//         details: error.details.map(d => d.message),
//       });
//     }

//     const files = req.files;

//     // Attach images to featuresSection.features
//     if (files?.featureImages) {
//       value.featuresSection.features.forEach((item, i) => {
//         const file = files.featureImages[i];
//         item.image = file ? `${basepath}/uploads/${file.filename}` : item.image || '';
//       });
//     }

//     // Attach image2 to featuresSection.features
//     if (files?.featureImage2) {
//       value.featuresSection.features.forEach((item, i) => {
//         const file2 = files.featureImage2[i];
//         item.image2 = file2 ? `${basepath}/uploads/${file2.filename}` : item.image2 || '';
//       });
//     }

//     // Attach images to coreFeaturesSection.coreFeatures
//     if (files?.coreFeatureImages) {
//       value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
//         const file = files.coreFeatureImages[i];
//         item.image = file ? `${basepath}/uploads/${file.filename}` : item.image || '';
//       });
//     }

//     // Attach main image
//     if (files?.mainImage && files.mainImage[0]) {
//       value.image = `${basepath}/uploads/${files.mainImage[0].filename}`;
//     }

//     // Save document
//     const created = await LLP_HomePage.create(value);

//     return res.status(201).json({
//       message: 'LLP Homepage created successfully',
//       data: created,
//     });

//   } catch (err) {
//     console.error('Error:', err);
//     return res.status(500).json({ error: 'Internal Server Error', details: err.message });
//   }
// };


// const LLP_HomePage = require('../models/LLP_HomePage');
// const Joi = require('joi');

// exports.add_llp_homepage = async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.data);
//     const basepath = process.env.BASE_PATH;

//     // ✅ Joi Schema with testimonial
//     const schema = Joi.object({
//       advObject1: Joi.string().allow('', null),
//       advObject2: Joi.string().allow('', null),
//       advObject3: Joi.string().allow('', null),
//       title: Joi.string().required(),
//       content: Joi.string().required(),
//       image: Joi.string().optional(),

//       featuresSection: Joi.object({
//         sectionTitle: Joi.string().required(),
//         sectionContent: Joi.string().required(),
//         content: Joi.string().required(),
//         head: Joi.string().required(),
//         secionsubContent: Joi.string().allow('', null),
//         features: Joi.array().items(
//           Joi.object({
//             head: Joi.string().required(),
//             title: Joi.string().required(),
//             description: Joi.string().required(),
//             image: Joi.string().optional(),
//             image2: Joi.string().optional(),
//           })
//         ).required()
//       }).required(),

//       coreFeaturesSection: Joi.object({
//         sectionTitle: Joi.string().required(),
//         sectionContent: Joi.string().required(),
//         content: Joi.string().required(),
//         head: Joi.string().required(),
//         secionsubContent: Joi.string().allow('', null),
//         coreFeatures: Joi.array().items(
//           Joi.object({
//             title: Joi.string().required(),
//             description: Joi.string().required(),
//             image: Joi.string().optional(),
//             advObject1: Joi.string().allow('', null),
//             advObject2: Joi.string().allow('', null),
//             advObject3: Joi.string().allow('', null),
//             list: Joi.array().items(
//               Joi.object({
//                 content: Joi.string().required(),
//                 image: Joi.string().optional()
//               })
//             ).optional()
//           })
//         ).required()
//       }).required(),

//       testimonial: Joi.object({
//         head: Joi.string().required(),
//         subhead: Joi.string().required(),
//         bgImage: Joi.string().optional(),
//         content: Joi.string().allow('', null),
//         titles: Joi.array().items(
//           Joi.object({
//             head: Joi.string().required(),
//             subhead: Joi.string().required(),
//             review: Joi.number().required(),
//             date: Joi.date().required(),
//             icons: Joi.string().required(),
//             image: Joi.string().optional()
//           })
//         ).required()
//       }).required()
//     });

//     const { error, value } = schema.validate(data, { abortEarly: false });

//     if (error) {
//       return res.status(400).json({
//         error: 'Validation Error',
//         details: error.details.map(d => d.message),
//       });
//     }

//     const files = req.files;

//     // ✅ featuresSection.images
//     if (files?.featureImages) {
//       value.featuresSection.features.forEach((item, i) => {
//         const file = files.featureImages[i];
//         item.image = file ? `${basepath}/uploads/${file.filename}` : item.image || '';
//       });
//     }

//     if (files?.featureImage2) {
//       value.featuresSection.features.forEach((item, i) => {
//         const file2 = files.featureImage2[i];
//         item.image2 = file2 ? `${basepath}/uploads/${file2.filename}` : item.image2 || '';
//       });
//     }

//     // ✅ coreFeaturesSection.images
//     if (files?.coreFeatureImages) {
//       value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
//         const file = files.coreFeatureImages[i];
//         item.image = file ? `${basepath}/uploads/${file.filename}` : item.image || '';
//       });
//     }

//     // ✅ coreFeature.list images
//     value.coreFeaturesSection.coreFeatures.forEach((coreFeature, i) => {
//       if (coreFeature.list && files?.[`coreFeatureListImages_${i}`]) {
//         coreFeature.list.forEach((listItem, j) => {
//           const listFile = files[`coreFeatureListImages_${i}`][j];
//           listItem.image = listFile ? `${basepath}/uploads/${listFile.filename}` : listItem.image || '';
//         });
//       }
//     });

//     // ✅ mainImage
//     if (files?.mainImage && files.mainImage[0]) {
//       value.image = `${basepath}/uploads/${files.mainImage[0].filename}`;
//     }

//     // ✅ testimonial.bgImage
//     if (files?.testimonialBgImage && files.testimonialBgImage[0]) {
//       value.testimonial.bgImage = `${basepath}/uploads/${files.testimonialBgImage[0].filename}`;
//     }

//     // ✅ testimonial.titles images
//     if (value.testimonial?.titles) {
//       value.testimonial.titles.forEach((titleObj, index) => {
//         const file = files[`testimonialTitleImages_${index}`]?.[0];
//         titleObj.image = file ? `${basepath}/uploads/${file.filename}` : titleObj.image || '';
//       });
//     }

//     // ✅ save document
//     const created = await LLP_HomePage.create(value);

//     return res.status(201).json({
//       message: 'LLP Homepage created successfully',
//       data: created,
//     });

//   } catch (err) {
//     console.error('Error:', err);
//     return res.status(500).json({ error: 'Internal Server Error', details: err.message });
//   }
// };


// exports.add_llp_homepage = async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.data);
//     const basepath = process.env.R2_PUBLIC_URL;

//     // ✅ Joi Schema with testimonial
//     const schema = Joi.object({
//       advObject1: Joi.string().allow('', null),
//       advObject2: Joi.string().allow('', null),
//       advObject3: Joi.string().allow('', null),
//       title: Joi.string().required(),
//       content: Joi.string().required(),
//       image: Joi.string().optional(),

//       featuresSection: Joi.object({
//         sectionTitle: Joi.string().required(),
//         sectionContent: Joi.string().required(),
//         content: Joi.string().required(),
//         head: Joi.string().required(),
//         secionsubContent: Joi.string().allow('', null),
//         features: Joi.array().items(
//           Joi.object({
//             head: Joi.string().required(),
//             title: Joi.string().required(),
//             description: Joi.string().required(),
//             image: Joi.string().optional(),
//             image2: Joi.string().optional(),
//           })
//         ).required()
//       }).required(),

//       coreFeaturesSection: Joi.object({
//         sectionTitle: Joi.string().required(),
//         sectionContent: Joi.string().required(),
//         content: Joi.string().required(),
//         head: Joi.string().required(),
//         secionsubContent: Joi.string().allow('', null),
//         coreFeatures: Joi.array().items(
//           Joi.object({
//             title: Joi.string().required(),
//             description: Joi.string().required(),
//             image: Joi.string().optional(),
//             advObject1: Joi.string().allow('', null),
//             advObject2: Joi.string().allow('', null),
//             advObject3: Joi.string().allow('', null),
//             list: Joi.array().items(
//               Joi.object({
//                 content: Joi.string().required(),
//                 image: Joi.string().optional()
//               })
//             ).optional()
//           })
//         ).required()
//       }).required(),

//       testimonial: Joi.object({
//         head: Joi.string().required(),
//         subhead: Joi.string().required(),
//         bgImage: Joi.string().optional(),
//         content: Joi.string().allow('', null),
//         titles: Joi.array().items(
//           Joi.object({
//             head: Joi.string().required(),
//             subhead: Joi.string().required(),
//             review: Joi.number().required(),
//             date: Joi.date().required(),
//             icons: Joi.string().required(),
//             image: Joi.string().optional()
//           })
//         ).required()
//       }).required()
//     });

//     const { error, value } = schema.validate(data, { abortEarly: false });
//     if (error) {
//       return res.status(400).json({
//         error: 'Validation Error',
//         details: error.details.map(d => d.message),
//       });
//     }

//     const files = req.files;
//     const uploadToR2 = require("../utils/cloudFlare/uploadToR2");

//     // Upload featureImages and image2
//     if (files?.featureImages) {
//       for (let i = 0; i < value.featuresSection.features.length; i++) {
//         const item = value.featuresSection.features[i];
//         const file = files.featureImages[i];
//         item.image = file ? await uploadToR2(file) : item.image || '';
//       }
//     }

//     if (files?.featureImage2) {
//       for (let i = 0; i < value.featuresSection.features.length; i++) {
//         const item = value.featuresSection.features[i];
//         const file2 = files.featureImage2[i];
//         item.image2 = file2 ? await uploadToR2(file2) : item.image2 || '';
//       }
//     }

//     // Upload coreFeatureImages
//     if (files?.coreFeatureImages) {
//       for (let i = 0; i < value.coreFeaturesSection.coreFeatures.length; i++) {
//         const item = value.coreFeaturesSection.coreFeatures[i];
//         const file = files.coreFeatureImages[i];
//         item.image = file ? await uploadToR2(file) : item.image || '';
//       }
//     }

//     // Upload coreFeature.list images
//     for (let i = 0; i < value.coreFeaturesSection.coreFeatures.length; i++) {
//       const coreFeature = value.coreFeaturesSection.coreFeatures[i];
//       if (coreFeature.list && files?.[`coreFeatureListImages_${i}`]) {
//         for (let j = 0; j < coreFeature.list.length; j++) {
//           const listItem = coreFeature.list[j];
//           const listFile = files[`coreFeatureListImages_${i}`][j];
//           listItem.image = listFile ? await uploadToR2(listFile) : listItem.image || '';
//         }
//       }
//     }

//     // Upload mainImage
//     if (files?.mainImage?.[0]) {
//       value.image = await uploadToR2(files.mainImage[0]);
//     }

//     // Upload testimonial.bgImage
//     if (files?.testimonialBgImage?.[0]) {
//       value.testimonial.bgImage = await uploadToR2(files.testimonialBgImage[0]);
//     }

//     // Upload testimonial title images
//     for (let i = 0; i < value.testimonial.titles.length; i++) {
//       const titleObj = value.testimonial.titles[i];
//       const file = files[`testimonialTitleImages_${i}`]?.[0];
//       titleObj.image = file ? await uploadToR2(file) : titleObj.image || '';
//     }

//     // Save to DB
//     const created = await LLP_HomePage.create(value);

//     return res.status(201).json({
//       message: 'LLP Homepage created successfully',
//       data: created,
//     });

//   } catch (err) {
//     console.error('Error:', err);
//     return res.status(500).json({ error: 'Internal Server Error', details: err.message });
//   }
// };




// exports.add_llp_homepage = async (req, res) => {
//   console.log('--- Incoming Request Body and Files ---');
//     console.log('req.body:', req.body);
//     console.log('req.files:', req.files);
//     console.log('-------------------------------------');
//     return
//     try {
//         const data = JSON.parse(req.body.data);
//         const basepath = process.env.R2_PUBLIC_URL; // Ensure R2_PUBLIC_URL is defined

//         // ✅ Joi Schema with testimonial
//         const schema = Joi.object({
//             advObject1: Joi.string().allow('', null),
//             advObject2: Joi.string().allow('', null),
//             advObject3: Joi.string().allow('', null),
//             title: Joi.string().required(),
//             content: Joi.string().required(),
//             image: Joi.string().optional(), // This is for mainImage, will be populated by file upload

//             featuresSection: Joi.object({
//                 sectionTitle: Joi.string().required(),
//                 sectionContent: Joi.string().required(),
//                 content: Joi.string().required(),
//                 head: Joi.string().required(),
//                 secionsubContent: Joi.string().allow('', null),
//                 features: Joi.array().items(
//                     Joi.object({
//                         head: Joi.string().required(),
//                         title: Joi.string().required(),
//                         description: Joi.string().required(),
//                         image: Joi.string().optional(), // Will be populated by featureImages
//                         image2: Joi.string().optional(), // Will be populated by featureImage2
//                     })
//                 ).required()
//             }).required(),

//             coreFeaturesSection: Joi.object({
//                 sectionTitle: Joi.string().required(),
//                 sectionContent: Joi.string().required(),
//                 content: Joi.string().required(),
//                 head: Joi.string().required(),
//                 secionsubContent: Joi.string().allow('', null),
//                 coreFeatures: Joi.array().items(
//                     Joi.object({
//                         title: Joi.string().required(),
//                         description: Joi.string().required(),
//                         image: Joi.string().optional(), // Will be populated by coreFeatureImages
//                         advObject1: Joi.string().allow('', null),
//                         advObject2: Joi.string().allow('', null),
//                         advObject3: Joi.string().allow('', null),
//                         list: Joi.array().items(
//                             Joi.object({
//                                 content: Joi.string().required(),
//                                 image: Joi.string().optional() // Will be populated by listImages
//                             })
//                         ).optional() // coreFeature.list itself is optional
//                     })
//                 ).required()
//             }).required(),

//             testimonial: Joi.object({
//                 head: Joi.string().required(),
//                 subhead: Joi.string().required(),
//                 bgImage: Joi.string().optional(), // Will be populated by testimonialBgImage
//                 content: Joi.string().allow('', null),
//                 titles: Joi.array().items(
//                     Joi.object({
//                         head: Joi.string().required(),
//                         subhead: Joi.string().required(),
//                         review: Joi.number().required(),
//                         date: Joi.date().required(),
//                         icons: Joi.string().required(),
//                         image: Joi.string().optional() // Will be populated by testimonialTitleImages
//                     })
//                 ).required()
//             }).required()
//         });

//         const { error, value } = schema.validate(data, { abortEarly: false });
//         if (error) {
//             console.error('Validation Error Details:', error.details);
//             return res.status(400).json({
//                 error: 'Validation Error',
//                 details: error.details.map(d => d.message),
//             });
//         }

//         const files = req.files; // Multer populates req.files

//         // Assuming uploadToR2 is a function that takes a file object and returns a URL
//         const uploadToR2 = require("../utils/cloudFlare/uploadToR2"); // Ensure this path is correct

//         // Upload mainImage
//         if (files?.mainImage?.[0]) {
//             value.image = await uploadToR2(files.mainImage[0]);
//         } else {
//             value.image = value.image || ''; // Keep existing or set to empty string
//         }

//         // Upload testimonial.bgImage
//         if (files?.testimonialBgImage?.[0]) {
//             value.testimonial.bgImage = await uploadToR2(files.testimonialBgImage[0]);
//         } else {
//             value.testimonial.bgImage = value.testimonial.bgImage || ''; // Keep existing or set to empty string
//         }

//         // Upload featureImages
//         if (files?.featureImages) {
//             for (let i = 0; i < value.featuresSection.features.length; i++) {
//                 const item = value.featuresSection.features[i];
//                 const file = files.featureImages[i]; // Correctly access from the single array
//                 item.image = file ? await uploadToR2(file) : (item.image || '');
//             }
//         }

//         // Upload featureImage2
//         if (files?.featureImage2) {
//             for (let i = 0; i < value.featuresSection.features.length; i++) {
//                 const item = value.featuresSection.features[i];
//                 const file2 = files.featureImage2[i]; // Correctly access from the single array
//                 item.image2 = file2 ? await uploadToR2(file2) : (item.image2 || '');
//             }
//         }

//         // Upload coreFeatureImages
//         if (files?.coreFeatureImages) {
//             for (let i = 0; i < value.coreFeaturesSection.coreFeatures.length; i++) {
//                 const item = value.coreFeaturesSection.coreFeatures[i];
//                 const file = files.coreFeatureImages[i]; // Correctly access from the single array
//                 item.image = file ? await uploadToR2(file) : (item.image || '');
//             }
//         }

//         // Upload coreFeature.list images
//         // This requires managing a single index for the flattened files.listImages array
//         if (files?.listImages && value.coreFeaturesSection.coreFeatures) {
//             let listImageIndex = 0;
//             for (let i = 0; i < value.coreFeaturesSection.coreFeatures.length; i++) {
//                 const coreFeature = value.coreFeaturesSection.coreFeatures[i];
//                 if (coreFeature.list) {
//                     for (let j = 0; j < coreFeature.list.length; j++) {
//                         const listItem = coreFeature.list[j];
//                         const listFile = files.listImages[listImageIndex]; // Correctly access from the single flattened array
//                         listItem.image = listFile ? await uploadToR2(listFile) : (listItem.image || '');
//                         listImageIndex++;
//                     }
//                 }
//             }
//         }

//         // Upload testimonial title images
//         if (files?.testimonialTitleImages) {
//             for (let i = 0; i < value.testimonial.titles.length; i++) {
//                 const titleObj = value.testimonial.titles[i];
//                 const file = files.testimonialTitleImages[i]; // Correctly access from the single array
//                 titleObj.image = file ? await uploadToR2(file) : (titleObj.image || '');
//             }
//         }

//         // Save to DB
//         // Make sure LLP_HomePage is correctly imported and connected to your database
//         // const LLP_HomePage = require('../models/LLP_HomePage'); // Example import
//         const created = await LLP_HomePage.create(value);

//         return res.status(201).json({
//             message: 'LLP Homepage created successfully',
//             data: created,
//         });

//     } catch (err) {
//         console.error('Error in add_llp_homepage:', err); // Log the full error for debugging
//         if (err instanceof SyntaxError && err.message.includes('JSON.parse')) {
//             return res.status(400).json({ error: 'Bad Request', details: 'Invalid JSON format in the "data" field.' });
//         }
//         return res.status(500).json({ error: 'Internal Server Error', details: err.message });
//     }
// };