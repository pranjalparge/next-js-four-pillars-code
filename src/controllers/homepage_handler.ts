// const {NavModel} = require("../models/homePage_header")
// const {homePageModel} = require("../models/homePage_contents")
// const {FooterModel} = require("../models/homePage_footer")
// const {homepageIamgeModel} = require("../models/homepage_Images")
// const {buttonModel} = require("../models/homePage_buttons")
// const {subNavModel} = require("../models/homepage_subNavbar")
// const {subRoutesModel} = require("../models/homepage_subRoutes")
// const {subHomeContentModel} = require("../models/homePage_subContents")
// const {stylingModel} = require("../models/homePage_styling")
// const fs = require("fs")
// const basepath = process.env.BASE_PATH

// async function handleGetData(req,res) {
//     // console.log(req)
//     const NavbarItems = await NavModel.find({})
//     const homePageContent = await homePageModel.find({})
//     const FooterItems = await FooterModel.find({})
//     const imagePaths = await homepageIamgeModel.find({})
//     const buttons = await buttonModel.find({})
//     const subNav = await subNavModel.find({})
//     const subRoutes = await subRoutesModel.find({})
//     const subContent = await subHomeContentModel.find({})
//     const styling = await stylingModel.find({})
//     // return res.json({NavbarItems,FooterItems,subNav,subRoutes})
//     let sty = []
//     styling.forEach((style) => {
//         const rules = Object.entries(style.styles)
//           .map(([property, value]) => `${property}: ${value};`)
//           .join(' ');
//         let css = ''
//         css += `${style.selector}: { ${rules} }`;
//         sty.push(css)
//       });
//     return res.json({NavbarItems,homePageContent,subContent,FooterItems,imagePaths,buttons,subNav,subRoutes,sty})
// }

// async function handleCreateNewData(req,res) {
//     const body = req.body
//     // if(body.navItems){
//     //     await NavModel.create({
//     //         navItems : body.navItems,
//     //         subNav : []
//     //     })
//     // }
//     // if(body.navItems){
//     //     await NavModel.create({
//     //         titles : body.navItems.titles,
//     //         // icons : body.navItems.icon,
//     //         contact :body.navItems.contact,
//     //         // subNav : []
//     //     })
//     // }

//     // async function handleCreateNewData(req, res) {
//     //     try {
//             const { navItems } = req.body;
    
//             if (!navItems) {
//                 return res.status(400).json({ message: "navItems is required" });
//             }
    
//             const newNav = new NavModel({
//                 titles: navItems.titles,
//                 contact: navItems.contact,
//             });
    
//             const savedNav = await newNav.save();
//             console.log("Data saved:", savedNav);
    
//             res.status(200).json({ message: "Data saved successfully", data: savedNav });
//     //     } catch (err) {
//     //         console.error("Error while saving data:", err);
//     //         res.status(500).json({ message: "Failed to save data", error: err.message });
//     //     }
//     // }
    
//     if(body.subNavbar){
//         if(body.subNavbar._id){
//             const navbar = await NavModel.findById(body.subNavbar._id)
//             await subNavModel.create({
//                 refNav : navbar.navItems,
//                 subNavname : body.subNavbar.name,
//                 idRef : navbar._id,
//                 subRoutes : []
//             })
//             const subNav = await subNavModel.find({idRef : body.subNavbar._id})
//             let arr = []
//             subNav.map((nav)=>(
//                 arr.push(nav.subNavname)
//             ))
//             await NavModel.findByIdAndUpdate(body.subNavbar._id,{subNav : arr})
//         }
//     }
//     if(body.subRoute){
//         if(body.subRoute._id){
//             const subNav = await subNavModel.findById(body.subRoute._id)
//             await subRoutesModel.create({
//                 refSubNav : subNav.subNavname,
//                 subRoutesName : body.subRoute.name,
//                 idRef : subNav._id
//             })
//             const subRoutes = await subRoutesModel.find({idRef : body.subRoute._id})
//             let arr = []
//             subRoutes.map((route)=>(
//                 arr.push(route.subRoutesName)
//             ))
//             await subNavModel.findByIdAndUpdate(body.subRoute._id,{subRoutes : arr})
//         }
//     }
//     if(body.footerItems){
//         await FooterModel .create({
//             title : body.footerItems.title,
//             items : body.footerItems.items
//         })
//     }
//     if(body.homeContent){
//         await homePageModel.create({
//             title : body.homeContent.title,
//             content : body.homeContent.content,
//             buttonsContent : [],
//             images : [],
//             subContent : []
//         })
//     }
//     if(body.subHomeContent){
//         if(body.subHomeContent._id){
//             await subHomeContentModel.create({
//                 title : body.subHomeContent.title,
//                 content : body.subHomeContent.content,
//                 buttonsContent : [],
//                 images : [],
//                 idRef : body.subHomeContent._id
//             })
//             const subcontent = await subHomeContentModel.find({idRef : body.subHomeContent._id})
//             let arr = []
//             subcontent.map((sub)=>(
//                 arr.push(sub)
//             ))
//             await homePageModel.findByIdAndUpdate(body.subHomeContent._id,{subContent : arr})
//         }
//     }
//     if(body.id){
//         const user1 = await homePageModel.findById(body.id)
//         const user2 = await subHomeContentModel.findById(body.id)
//         if(user1){
//             if(req.files){
//                 let arr = user1.images
//                 req.files.map(async (image)=>(
//                     await homepageIamgeModel.create({
//                         imagePath : `${basepath}/uploads/${image.filename}`,
//                         idRef : body.id
//                     })
//                 ))
//                 req.files.map((image)=>(
//                     arr.push(`${basepath}/uploads/${image.filename}`)
//                 ))
//                 await homePageModel.findByIdAndUpdate(body.id,{images : arr})
//             }
//         }
//         else if(user2){
//             if(req.files){
//                 let arr = user2.images
//                 req.files.map(async (image)=>(
//                     await homepageIamgeModel.create({
//                         imagePath : `${basepath}/uploads/${image.filename}`,
//                         idRef : body.id
//                     })
//                 ))
//                 req.files.map((image)=>(
//                     arr.push(`${basepath}/uploads/${image.filename}`)
//                 ))
//                 await subHomeContentModel.findByIdAndUpdate(body.id,{images : arr})
//                 const subh = await subHomeContentModel.findById(body.id)
//                 const refId = subh.idRef
//                 const subCont = await subHomeContentModel.find({idRef : refId})
//                 let arr2 = []
//                 subCont.map((sub)=>(
//                     arr2.push(sub)
//                 ))
//                 await homePageModel.findByIdAndUpdate(refId,{subContent : arr2})
//             }
//         }
//     }
//     if(body.buttons){
//         if(body.buttons._id){
//             const user1 = await homePageModel.findById(body.buttons._id)
//             const user2 = await subHomeContentModel.findById(body.buttons._id)
//             if(user1){
//                 const homeCont = await homePageModel.findById(body.buttons._id)
//                 await buttonModel.create({
//                     RefTitle : homeCont.title,
//                     buttonName : body.buttons.name,
//                     idRef : body.buttons._id
//                 })
//                 let arr = []
//                 const buttonsCont = await buttonModel.find({idRef : body.buttons._id})
//                 buttonsCont.map((button)=>(
//                     arr.push(button.buttonName)
//                 ))
//                 await homePageModel.findByIdAndUpdate(body.buttons._id,{buttonsContent: arr})
//             }
//             if(user2){
//                 const homeCont = user2
//                 await buttonModel.create({
//                     RefTitle : homeCont.title,
//                     buttonName : body.buttons.name,
//                     idRef : body.buttons._id
//                 })
//                 let arr = []
//                 const buttonsCont = await buttonModel.find({idRef : body.buttons._id})
//                 buttonsCont.map((button)=>(
//                 arr.push(button.buttonName)
//                 ))
//                 await subHomeContentModel.findByIdAndUpdate(body.buttons._id,{buttonsContent: arr})
//                 const subh = await subHomeContentModel.findById(body.buttons._id)
//                 const refId = subh.idRef
//                 const subCont = await subHomeContentModel.find({idRef : refId})
//                 let arr2 = []
//                 subCont.map((sub)=>(
//                     arr2.push(sub)
//                 ))
//                 await homePageModel.findByIdAndUpdate(refId,{subContent : arr2})
//             }
//         }
//     }
//     if(body.style){
//         if(body.style._id){
//             const user1 = await homePageModel.findById(body.style._id)
//             const user2 = await subHomeContentModel.findById(body.style._id)
//             if(user1){
//                 await stylingModel.create({
//                     selector : body.style.selector,
//                     styles : body.style.styles,
//                     refId : body.style._id,
//                     refTitle : user1.title
//                 })
//             }
//             if(user2){
//                 await stylingModel.create({
//                     selector : body.style.selector,
//                     styles : body.style.styles,
//                     refId : body.style._id,
//                     refTitle : user2.title
//                 })
//             }
//         }
//     }
//     // res.end("success")
    
// }

// async function handleUpdateUser(req,res) {
//     const body = req.body
//     if(body.navItems){
//         const itemName = body.navItems.navItems
//         await NavModel.findByIdAndUpdate(body.navItems._id,{navItems : itemName})
//     }
//     if(body.subNavbar){
//         if(body.subNavbar._id){
//             await subNavModel.findByIdAndUpdate(body.subNavbar._id,{subNavname : body.subNavbar.name})
//             const subNav = await subNavModel.findById(body.subNavbar._id)
//             const nid = subNav.idRef
//             const subNavbars = await subNavModel.find({idRef : nid})
//             let arr = []
//             subNavbars.map((nav)=>(
//                 arr.push(nav.subNavname)
//             ))
//             await NavModel.findByIdAndUpdate(nid,{subNav : arr})
//         }
//     }
//     if(body.subRoute){
//         if(body.subRoute._id){
//             await subRoutesModel.findByIdAndUpdate(body.subRoute._id,{subRoutesName : body.subRoute.name})
//             const subRt = await subRoutesModel.findById(body.subRoute._id)
//             const sunid = subRt.idRef
//             const subRoute = await subRoutesModel.find({idRef : sunid})
//             let arr = []
//             subRoute.map((route)=>(
//                 arr.push(route.subRoutesName)
//             ))
//             await subNavModel.findByIdAndUpdate(sunid,{subRoutes : arr})
//         }
//     }
//     if(body.footerItems){
//         if(body.footerItems.title){
//             await FooterModel.findByIdAndUpdate(body.footerItems._id,{title : body.footerItems.title})
//         }
//         if(body.footerItems.items){
//             const p = body.footerItems.items
//             const footer = await FooterModel.findById(body.footerItems._id)
//             const q = footer.items
//             for(let i=0;i<p.length;i++){
//                 if(!q.includes(p[i])){
//                     q.push(p[i])
//                 }
//             }
//             await FooterModel.findByIdAndUpdate(body.footerItems._id,{items : q})
//         }
//     }
//     if(body.homeContent){
//         if(body.homeContent.title){
//             await homePageModel.findByIdAndUpdate(body.homeContent._id,{title : body.homeContent.title})
//         }
//     }
//     if(body.buttons){
//         if(body.buttons._id){
//             await buttonModel.findByIdAndUpdate(body.buttons._id,{buttonName : body.buttons.name})
//             const button = await buttonModel.findById(body.buttons._id)
//             const bid = button.idRef
//             const buttoncont = await buttonModel.find({idRef : bid})
//             let arr = []
//             buttoncont.map((butt)=>(
//                 arr.push(butt.buttonName)
//             ))
//             await homePageModel.findByIdAndUpdate(bid,{buttonsContent : arr})
//         }
//     }
//     if(body.id){
//         if(req.file){
//             await homepageIamgeModel.findByIdAndUpdate(body.id,{imagePath : `${basepath}/uploads/${req.filename.filename}`})
//             const image = await homepageIamgeModel.findById(body.id)
//             const iid = image.idRef
//             const images = await homepageIamgeModel.find({idRef : iid})
//             let arr = []
//             images.map((img)=>(
//                 arr.push(img.imagePath)
//             ))
//             await homePageModel.findByIdAndUpdate(iid,{images : arr})
//         }
//     }
    
//     res.end("success")
// }

// async function handleDeleteData(req,res) {
//     const body = req.body
//     if(body.navItems){
//         if(body.navItems._id){
//             const subNavbar = await subNavModel.find({idRef : body.navItems._id})
//             const subnid = subNavbar[0]._id
//             await NavModel.findByIdAndDelete(body.navItems._id)
//             await subNavModel.deleteMany({idRef : body.navItems._id})
//             await subRoutesModel.deleteMany({idRef : subnid})
//         }
//     }
//     if(body.subNavbar){
//         if(body.subNavbar._id){
//             const subnav = await subNavModel.findById(body.subNavbar._id)
//             const refId = subnav.idRef
//             await subNavModel.findByIdAndDelete(body.subNavbar._id)
//             await subRoutesModel.deleteMany({idRef : body.subNavbar._id})
//             let arr = []
//             const subNav = await subNavModel.find({idRef : refId})
//             subNav.map((nav)=>(
//                 arr.push(nav.subNavname)
//             ))
//             await NavModel.findByIdAndUpdate(refId,{subNav : arr})
//         }
//     }
//     if(body.subRoute){
//         if(body.subRoute._id){
//             const subRt = await subRoutesModel.findById(body.subRoute._id)
//             const refid = subRt.idRef
//             await subRoutesModel.findByIdAndDelete(body.subRoute._id)
//             let arr = []
//             const subRoute = await subRoutesModel.find({idRef : refid})
//             subRoute.map((route)=>(
//                 arr.push(route.subRoutesName)
//             ))
//             await subNavModel.findByIdAndUpdate(refid,{subRoutes : arr})
//         }
//     }
//     if(body.footerItems){
//         if(body.footerItems.items){
//             const p = body.footerItems.items
//             const footer = await FooterModel.findById(body.footerItems._id)
//             const q = footer.items
//             let arr = []
//             for(let i=0;i<q.length;i++){
//                 if(!p.includes(q[i])){
//                     arr.push(q[i])
//                 }
//             }
//             await FooterModel.findByIdAndUpdate(body.footerItems._id,{items : arr})
//         }else{
//             await FooterModel.findByIdAndDelete(body.footerItems._id)
//         }
//     }
//     if(body.homeContent){
//         if(body.homeContent._id){
//             await homePageModel.findByIdAndDelete(body.homeContent._id)
//             await homepageIamgeModel.deleteMany({idRef : body.homeContent._id})
//             await buttonModel.deleteMany({idRef : body.homeContent._id})
//         }
//     }
//     if(body.buttons){
//         if(body.buttons._id){
//             const button = await buttonModel.findById(body.buttons._id)
//             await buttonModel.findByIdAndDelete(body.buttons._id)
//             const bid = button.idRef
//             const buttCont = await buttonModel.find({idRef : bid})
//             let arr = []
//             buttCont.map((butt)=>(
//                 arr.push(butt.buttonName)
//             ))
//             await homePageModel.findByIdAndUpdate(bid,{buttonsContent : arr})
//         }
//     }
//     if(body.id){
//         const image = await homepageIamgeModel.findById(body.id)
//         await homepageIamgeModel.findByIdAndDelete(body.id)
//         const iid = image.idRef
//         const images = await homepageIamgeModel.find({idRef : iid})
//         let arr = []
//         images.map((img)=>(
//             arr.push(img.imagePath)
//         ))
//         await homePageModel.findByIdAndUpdate(iid,{images : arr})
//     }
//     res.end("success")
// }

// module.exports={
//     handleGetData,
//     handleCreateNewData,
//     handleUpdateUser,
//     handleDeleteData
// }






const express = require("express");
const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const {NavModel} = require("../models/homePage_header")
const {homePageModel} = require("../models/homePage_contents")
const FooterModel = require("../models/LLC_Footer")
const {homepageIamgeModel} = require("../models/homepage_Images")
const {buttonModel} = require("../models/homePage_buttons")
const {subNavModel} = require("../models/homepage_subNavbar")
const {subRoutesModel} = require("../models/homepage_subRoutes")
const {subHomeContentModel} = require("../models/homePage_subContents")
const {stylingModel} = require("../models/homePage_styling")
const fs = require("fs")
const basepath = process.env.BASE_PATH;
// const basepath = "https://pw73zddd-4071.inc1.devtunnels.ms/api"

const LLP_HomePage = require('../models/LLP_Home'); // adjust path as needed
const Joi = require('joi');


// for 4PIII About Data

module.exports.handleCreateNewData = async (req, res) => {

        try {
            const body = req.body;
    
            if (body.navItems) {
                const newNav = await NavModel.create({
                    titles: body.navItems.titles,
                    contact: body.navItems.contact,
                });
            }

            if(req.files){
                if(body.homeContentId && body.floatImageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let floatImage = data.floatingImage
                    let fltImg = floatImage.filter((obj)=>(
                        obj._id == body.floatImageId
                    ))
                    fltImg[0].image.url = `${basepath}/uploads/${req.files[0].filename}`
                    floatImage = floatImage.map((obj)=>(
                        obj._id == body.floatImageId ? fltImg[0] : obj
                    ))
                    console.log(floatImage)
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{floatingImage : floatImage})
                }
                if(body.homeContentId && body.secondObjectImageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    const scndObj = data.secondObject
                    scndObj.image.url = `${basepath}/uploads/${req.files[0].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
                }
                if(body.homeContentId && body.secondObjectFloatimageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    const scndObj = data.secondObject
                    scndObj.floatimage.url = `${basepath}/uploads/${req.files[0].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
                }
                if(body.homeContentId && body.secondObjectBluecardId){
                    const data = await homePageModel.findById(body.homeContentId)
                    const scndObj = data.secondObject
                    scndObj.blueCard = `${basepath}/uploads/${req.files[0].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
                }
                if(body.homeContentId && body.secondObjectLogoId){
                    const data = await homePageModel.findById(body.homeContentId)
                    const scndObj = data.secondObject
                    scndObj.logo1 = `${basepath}/uploads/${req.files[0].filename}`
                    scndObj.logo2 = `${basepath}/uploads/${req.files[1].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
                }
                if(body.homeContentId && body.thirdObjectBgimageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    const thrdObj = data.thirdObject
                    thrdObj.bgImage = `${basepath}/uploads/${req.files[0].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{thirdObject : thrdObj})
                }
                if(body.homeContentId && body.thirdObjectId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let thrdObj = data.thirdObject
                    let title = thrdObj.titles
                    let ttle = title.filter((obj)=>(
                        obj._id == body.titleId 
                    ))
                    ttle[0].image.url = `${basepath}/uploads/${req.files[0].filename}`
                    title = title.map((obj)=>(
                        obj._id == body.titleId ? ttle[0] : obj
                    ))
                    thrdObj.titles = title
                    // console.log(thrdObj)
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{thirdObject : thrdObj})
                }
                if(body.homeContentId && body.fourthObjectId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let thrdObj = data.fourthObject
                    let title = thrdObj.titles
                    let ttle = title.filter((obj)=>(
                        obj._id == body.titleId 
                    ))
                    ttle[0].image = `${basepath}/uploads/${req.files[0].filename}`
                    title = title.map((obj)=>(
                        obj._id == body.titleId ? ttle[0] : obj
                    ))
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{fourthObject : thrdObj})
                }
                if(body.homeContentId && body.fourthObjectServiceImageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let thrdObj = data.fourthObject
                    let title = thrdObj.titles
                    let ttle = title.filter((obj)=>(
                        obj._id == body.titleId 
                    ))
                    ttle[0].serviceimage1 = `${basepath}/uploads/${req.files[0].filename}`
                    ttle[0].serviceimage2 = `${basepath}/uploads/${req.files[1].filename}`
                    title = title.map((obj)=>(
                        obj._id == body.titleId ? ttle[0] : obj
                    ))
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{fourthObject : thrdObj})
                }
                if(body.homeContentId && body.fipthObjectBgimageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    const fifthObj = data.fipthObject
                    fifthObj.bgdottedImage =  `${basepath}/uploads/${req.files[0].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{fipthObject : fifthObj})
                }
                if(body.homeContentId && body.fipthObjectId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let thrdObj = data.fipthObject
                    let title = thrdObj.titles
                    let ttle = title.filter((obj)=>(
                        obj._id == body.titleId 
                    ))
                    ttle[0].image.url = `${basepath}/uploads/${req.files[0].filename}`
                    title = title.map((obj)=>(
                        obj._id == body.titleId ? ttle[0] : obj
                    ))
                    thrdObj.titles = title
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{fipthObject : thrdObj})
                }
                if(body.homeContentId && body.fipthObjectServiceImageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let thrdObj = data.fipthObject
                    let title = thrdObj.titles
                    let ttle = title.filter((obj)=>(
                        obj._id == body.titleId
                    ))
                    ttle[0].serviceimage1 = `${basepath}/uploads/${req.files[0].filename}`
                    title = title.map((obj)=>(
                        obj._id == body.titleId ? ttle[0] : obj
                    ))
                    thrdObj.titles = title
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{fipthObject : thrdObj})
                }
                if(body.homeContentId && body.sevenObjectId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let thrdObj = data.sevenObject
                    let title = thrdObj.titles
                    let ttle = title.filter((obj)=>(
                        obj._id == body.titleId 
                    ))
                    ttle[0].image = `${basepath}/uploads/${req.files[0].filename}`
                    title = title.map((obj)=>(
                        obj._id == body.titleId ? ttle[0] : obj
                    ))
                    thrdObj.titles = title
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{sevenObject : thrdObj})
                }
                if(body.homeContentId && body.sixObjectbgImageId){
                    const data = await homePageModel.findById(body.homeContentId)
                    const sxthObj = data.sixObject
                    sxthObj.bgImage =  `${basepath}/uploads/${req.files[0].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{sixObject : sxthObj})
                }
                if(body.homeContentId && body.sixObjectTitleId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let sxthObj = data.sixObject
                    let title = sxthObj.titles
                    let ttle = title.filter((obj)=>(
                        obj._id == body.sixObjectTitleId 
                    ))
                    ttle[0].image = `${basepath}/uploads/${req.files[0].filename}`
                    title = title.map((obj)=>(
                        obj._id == body.sixObjectTitleId ? ttle[0] : obj
                    ))
                    sxthObj.titles = title
                    // console.log(sxthObj.titles)
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{sixObject : sxthObj})
                }
                if(body.homeContentId && body.eightObjectId){
                    const data = await homePageModel.findById(body.homeContentId)
                    let sxthObj = data.eightObject
                    sxthObj.bgImage = `${basepath}/uploads/${req.files[0].filename}`
                    await homePageModel.findByIdAndUpdate(body.homeContentId,{eightObject : sxthObj})
                }

            }

            if(body.homeContent){
                const homedata = await homePageModel.create({
                    floatingImage: body.homeContent.floatingImage,
                    secondObject: body.homeContent.secondObject,
                    thirdObject: body.homeContent.thirdObject,
                    fourthObject: body.homeContent.fourthObject,
                    fipthObject: body.homeContent.fipthObject,
                    sixObject: body.homeContent.sixObject,
                    sevenObject: body.homeContent.sevenObject,
                    eightObject: body.homeContent.eightObject,
                    nineobject: body.homeContent.nineobject,
                    title: body.homeContent.title,
                    content: body.homeContent.content,
                    buttonsContent: body.buttonsContent,
                    images: body.homeContent.images,
                    subContent: body.homeContent.subContent,
                })
                // const data = await homePageModel.findById(body.homeContent.id)
                // let frthObj= data.fourthObject
                // frthObj.titles = body.homeContent.titles
                // await homePageModel.findByIdAndUpdate(body.homeContent.id,{fourthObject : frthObj})
            }



            // if(body.footerItems){
            //     await FooterModel .create({
            //         title : body.footerItems.title,
            //         items : body.footerItems.items
            //     })}
    
            res.status(200).json({ message: "Data saved successfully" });
        } catch (err) {
            console.error("Error saving data:", err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    }
    
module.exports.handleUpdateData = async(req,res)=>{
    try {
        const body = req.body
        if(body.homeContent){
            if(body.homeContent.floatingImage){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{floatingImage : body.homeContent.floatingImage})
            }
            if(body.homeContent.secondObject){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{secondObject : body.homeContent.secondObject})
            }
            if(body.homeContent.thirdObject){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{thirdObject : body.homeContent.thirdObject})
            }
            if(body.homeContent.thirdObjectTitle){
                const data = await homePageModel.findById(body.homeContent.id)
                const thrdObj = data.thirdObject
                thrdObj.titles = body.homeContent.thirdObjectTitle
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{thirdObject : thrdObj})
            }
            if(body.homeContent.fourthObject){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{fourthObject : body.homeContent.fourthObject})
            }
            if(body.homeContent.fourthObjectTitle){
                const data = await homePageModel.findById(body.homeContent.id)
                const thrdObj = data.fourthObject
                thrdObj.titles = body.homeContent.fourthObjectTitle
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{fourthObject : thrdObj})
            }
            if(body.homeContent.fipthObject){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{fipthObject : body.homeContent.fipthObject})
            }
            if(body.homeContent.fipthObjectTitle){
                const data = await homePageModel.findById(body.homeContent.id)
                const thrdObj = data.fipthObject
                thrdObj.titles = body.homeContent.fipthObjectTitle
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{fipthObject : thrdObj})
            }
            if(body.homeContent.sixObject){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{sixObject : body.homeContent.sixObject})
            }
            if(body.homeContent.sixObjectTitle){
                const data = await homePageModel.findById(body.homeContent.id)
                const thrdObj = data.sixObject
                thrdObj.titles = body.homeContent.titles
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{sixObject : thrdObj})
            }
            if(body.homeContent.sevenObject){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{sevenObject : body.homeContent.sevenObject})
            }
            if(body.homeContent.sevenObjectTitle){
                const data = await homePageModel.findById(body.homeContent.id)
                const thrdObj = data.sevenObject
                thrdObj.titles = body.homeContent.sevenObjectTitle
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{sevenObject : thrdObj})
            }
            if(body.homeContent.eightObject){
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{eightObject : body.homeContent.eightObject})
            }
            if(body.homeContent.eightObjectTitle){
                const data = await homePageModel.findById(body.homeContent.id)
                const thrdObj = data.eightObject
                thrdObj.titles = body.homeContent.eightObjectTitle
                await homePageModel.findByIdAndUpdate(body.homeContent.id,{eightObject : thrdObj})
            }
        }

        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Error saving data:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

module.exports. handleGetData = asyncMiddleware(async (req, res) => {
  // const  lang = req.query.lang
  try {
    // const NavbarItems = await NavModel.find({})
    const homePageContent = await homePageModel.find({})
    // const FooterItems = await FooterModel.find({})
    // const imagePaths = await homepageIamgeModel.find({})
    // const buttons = await buttonModel.find({})
    // const subNav = await subNavModel.find({})
    // const subRoutes = await subRoutesModel.find({})
    // const subContent = await subHomeContentModel.find({})
    // const styling = await stylingModel.find({})
    // return res.json({NavbarItems,FooterItems,subNav,subRoutes})
    // let sty = []
    // styling.forEach((style) => {
    //     const rules = Object.entries(style.styles)
    //       .map(([property, value]) => `${property}: ${value};`)
    //       .join(' ');
    //     let css = ''
    //     css += `${style.selector}: { ${rules} }`;
    //     sty.push(css)
    //   });
    return res.status(200).json({homePageContent})
    // let getData = await NavModel.find();
    // return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});


module.exports.handleDeletedata = async(req,res)=>{
    try {
        const body = req.body

        if(body.homeContent){
            if(body.homeContent._id){
                await homePageModel.findByIdAndDelete(body.homeContent._id)
            }
        }
        if(body.floatingImage){
            if(body.floatingImage.id && body.floatingImage.homeContentId){
                const data = await homePageModel.findById(body.floatingImage.homeContentId)
                let floatImage = data.floatingImage
                floatImage = floatImage.filter((img)=>(
                    img._id != body.floatingImage.id
                ))
                await homePageModel.findByIdAndUpdate(body.floatingImage.homeContentId,{floatingImage : floatImage})
            }
        }

        if(body.secondObject){
            if(body.secondObject.id && body.secondObject.homeContentId){
                const data = await homePageModel.findById(body.secondObject.homeContentId)
                const secObj = data.secondObject
                secObj = secObj.filter((obj)=>{
                    obj._id != body.secondObject.id
                })
                await homePageModel.findByIdAndUpdate(body.secondObject.id,{secondObject : secObj})
            }
        }

        if(body.thirdObject){
            if(body.thirdObject.titleId && body.thirdObject.homeContentId){
                const data = await homePageModel.findById(body.thirdObject.homeContentId)
                let thrdObj = data.thirdObject
                let object = thrdObj.filter((obj)=>(
                    obj._id ==  body.thirdObject.thirdObjectId
                ))
                let title = object[0].titles
                title = title.filter((obj)=>(
                    obj._id != body.thirdObject.titleId
                ))
                object[0].titles = title
                thrdObj = thrdObj.map((obj)=>(
                    obj._id==body.thirdObject.thirdObjectId ? object[0] : obj
                ))
                // res.send(thrdObj)
                await homePageModel.findByIdAndUpdate(body.thirdObject.homeContentId,{thirdObject : thrdObj})
            }else if(body.thirdObject.id && body.thirdObject.homeContentId){
                const data = await homePageModel.findById(body.thirdObject.homeContentId)
                const thrdObj = data.thirdObject
                thrdObj = thrdObj.filter((obj)=>{
                    obj._id != body.thirdObject.id
                })
                await homePageModel.findByIdAndUpdate(body.thirdObject.homeContentId,{thirdObject : thrdObj})
            }
        }

        if(body.fourthObject){
            if(body.fourthObject.titleId && body.fourthObject.homeContentId){
                const data = await homePageModel.findById(body.fourthObject.homeContentId)
                let frthObj = data.fourthObject
                let object = frthObj.filter((obj)=>(
                    obj._id ==  body.fourthObject.fourthObjectId
                ))
                let title = object[0].titles
                title = title.filter((obj)=>(
                    obj._id != body.fourthObject.titleId
                ))
                object[0].titles = title
                frthObj = frthObj.map((obj)=>(
                    obj._id==body.fourthObject.fourthObjectId ? object[0] : obj
                ))
                // res.send(frthObj)
                await homePageModel.findByIdAndUpdate(body.fourthObject.homeContentId,{fourthObject : frthObj})
            }else if(body.fourthObject.id && body.fourthObject.homeContentId){
                const data = await homePageModel.findById(body.fourthObject.homeContentId)
                const frthObj = data.fourthObject
                frthObj = frthObj.filter((obj)=>{
                    obj._id != body.fourthObject.id
                })
                await homePageModel.findByIdAndUpdate(body.fourthObject.homeContentId,{fourthObject : frthObj})
            }
        }
        if(body.fipthObject){
            if(body.fipthObject.titleId && body.fipthObject.homeContentId){
                const data = await homePageModel.findById(body.fipthObject.homeContentId)
                let fifthObj = data.fipthObject
                let object = fifthObj.filter((obj)=>(
                    obj._id ==  body.fipthObject.fipthObjectId
                ))
                let title = object[0].titles
                title = title.filter((obj)=>(
                    obj._id != body.fipthObject.titleId
                ))
                object[0].titles = title
                fifthObj = fifthObj.map((obj)=>(
                    obj._id==body.fipthObject.fipthObjectId ? object[0] : obj
                ))
                // res.send(fifthObj)
                await homePageModel.findByIdAndUpdate(body.thirdObject.homeContentId,{fipthObject : fifthObj})
            }else if(body.fipthObject.id && body.fipthObject.homeContentId){
                const data = await homePageModel.findById(body.fipthObject.homeContentId)
                const fifthObj = data.fipthObject
                fifthObj = fifthObj.filter((obj)=>{
                    obj._id != body.fipthObject.id
                })
                await homePageModel.findByIdAndUpdate(body.fipthObject.homeContentId,{fipthObject : fifthObj})
            }
        }

        if(body.sixObject){
            if(body.sixObject.titleId && body.sixObject.homeContentId){
                const data = await homePageModel.findById(body.sixObject.homeContentId)
                let sxthObj = data.sixObject
                let object = sxthObj.filter((obj)=>(
                    obj._id ==  body.sixObject.sixObjectId
                ))
                let title = object[0].titles
                title = title.filter((obj)=>(
                    obj._id != body.sixObject.titleId
                ))
                object[0].titles = title
                sxthObj = sxthObj.map((obj)=>(
                    obj._id==body.sixObject.sixObjectId ? object[0] : obj
                ))
                // res.send(sxthObj)
                await homePageModel.findByIdAndUpdate(body.sixObject.homeContentId,{sixObject : sxthObj})
            }else if(body.sixObject.id && body.sixObject.homeContentId){
                const data = await homePageModel.findById(body.sixObject.homeContentId)
                const sxthObj = data.sixObject
                sxthObj = sxthObj.filter((obj)=>{
                    obj._id != body.sixObject.id
                })
                await homePageModel.findByIdAndUpdate(body.sixObject.homeContentId,{sixObject : sxthObj})
            }
        }

        if(body.sevenObject){
            if(body.sevenObject.titleId && body.sevenObject.homeContentId){
                const data = await homePageModel.findById(body.sevenObject.homeContentId)
                let svnthObj = data.sevenObject
                let object = svnthObj.filter((obj)=>(
                    obj._id ==  body.sevenObject.sevenObjectId
                ))
                let title = object[0].titles
                title = title.filter((obj)=>(
                    obj._id != body.sevenObject.titleId
                ))
                object[0].titles = title
                svnthObj = svnthObj.map((obj)=>(
                    obj._id==body.sevenObject.sevenObjectId ? object[0] : obj
                ))
                // res.send(svnthObj)
                await homePageModel.findByIdAndUpdate(body.sevenObject.homeContentId,{sevenObject : svnthObj})
            }else if(body.sevenObject.id && body.sevenObject.homeContentId){
                const data = await homePageModel.findById(body.sevenObject.homeContentId)
                const svnthObj = data.sevenObject
                svnthObj = svnthObj.filter((obj)=>{
                    obj._id != body.sevenObject.id
                })
                await homePageModel.findByIdAndUpdate(body.sevenObject.homeContentId,{sevenObject : svnthObj})
            }
        }
        
        if(body.eightObject){
            if(body.eightObject.titleId && body.eightObject.homeContentId){
                const data = await homePageModel.findById(body.eightObject.homeContentId)
                let eghObj = data.eightObject
                let object = eghObj.filter((obj)=>(
                    obj._id ==  body.eightObject.eightObjectId
                ))
                let title = object[0].titles
                title = title.filter((obj)=>(
                    obj._id != body.eightObject.titleId
                ))
                object[0].titles = title
                eghObj = eghObj.map((obj)=>(
                    obj._id==body.eightObject.eightObjectId ? object[0] : obj
                ))
                // res.send(eghObj)
                await homePageModel.findByIdAndUpdate(body.eightObject.homeContentId,{eightObject : eghObj})
            }else if(body.eightObject.id && body.eightObject.homeContentId){
                const data = await homePageModel.findById(body.eightObject.homeContentId)
                const eghObj = data.eightObject
                eghObj = eghObj.filter((obj)=>{
                    obj._id != body.eightObject.id
                })
                await homePageModel.findByIdAndUpdate(body.eightObject.homeContentId,{eightObject : eghObj})
            }
        }

        if(body.nineobject){
            if(body.nineobject.titleId && body.nineobject.homeContentId){
                const data = await homePageModel.findById(body.nineobject.homeContentId)
                let ninObj = data.nineobject
                let object = ninObj.filter((obj)=>(
                    obj._id ==  body.nineobject.nineobjectId
                ))
                let title = object[0].titles
                title = title.filter((obj)=>(
                    obj._id != body.nineobject.titleId
                ))
                object[0].titles = title
                ninObj = ninObj.map((obj)=>(
                    obj._id==body.nineobject.nineobjectId ? object[0] : obj
                ))
                // res.send(thrdObj)
                await homePageModel.findByIdAndUpdate(body.nineobject.homeContentId,{nineobject : ninObj})
            }else if(body.nineobject.id && body.nineobject.homeContentId){
                const data = await homePageModel.findById(body.nineobject.homeContentId)
                const ninObj = data.thirdObject
                ninObj = ninObj.filter((obj)=>{
                    obj._id != body.nineobject.id
                })
                await homePageModel.findByIdAndUpdate(body.nineobject.homeContentId,{nineobject : ninObj})
            }
        }

    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}






exports.add_llp_homepage = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data); // data is a JSON string

    // Joi Schema with list added for coreFeatures
    const schema = Joi.object({
      advObject1: Joi.string().allow('', null),
      advObject2: Joi.string().allow('', null),
      advObject3: Joi.string().allow('', null),
      title: Joi.string().required(),
      content: Joi.string().required(),
      image: Joi.string().optional(),

      featuresSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        content: Joi.string().required(),
        head: Joi.string().required(),
        secionsubContent: Joi.string().allow('', null),
        features: Joi.array().items(
          Joi.object({
            head: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional(),
            image2: Joi.string().optional(),
          })
        ).required()
      }).required(),

      coreFeaturesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        content: Joi.string().required(),
        head: Joi.string().required(),
        secionsubContent: Joi.string().allow('', null),
        coreFeatures: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional(),
            advObject1: Joi.string().allow('', null),
            advObject2: Joi.string().allow('', null),
            advObject3: Joi.string().allow('', null),
            list: Joi.array().items(Joi.string()).optional(),   // Added list field validation
          })
        ).required()
      }).required()
    });

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => d.message),
      });
    }

    const files = req.files;

    // Attach images to featuresSection.features
    if (files?.featureImages) {
      value.featuresSection.features.forEach((item, i) => {
        const file = files.featureImages[i];
        item.image = file ? `${basepath}/uploads/${file.filename}` : item.image || '';
      });
    }

    // Attach image2 to featuresSection.features
    if (files?.featureImage2) {
      value.featuresSection.features.forEach((item, i) => {
        const file2 = files.featureImage2[i];
        item.image2 = file2 ? `${basepath}/uploads/${file2.filename}` : item.image2 || '';
      });
    }

    // Attach images to coreFeaturesSection.coreFeatures
    if (files?.coreFeatureImages) {
      value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
        const file = files.coreFeatureImages[i];
        item.image = file ? `${basepath}/uploads/${file.filename}` : item.image || '';
      });
    }

    // Attach main image
    if (files?.mainImage && files.mainImage[0]) {
      value.image = `${basepath}/uploads/${files.mainImage[0].filename}`;
    }

    // Save document
    const created = await LLP_HomePage.create(value);

    return res.status(201).json({
      message: 'LLP Homepage created successfully',
      data: created,
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};



















