import {homePageModel} from "../lib/modals/4pii_NewHompageContent"
// const basepath = process.env.BASE_PATH;
// const basepath = "https://pw73zddd-4072.inc1.devtunnels.ms/api"


// export  const createExtraImage = async(req,res)=>{
//     try {
//         const data = await extraImage.create({
//             image : `${basepath}/uploads/${req.file.filename}`
//         })
//         return res.status(200).json({
//             success : true,
//             data
//         })
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }




export  const handleGetData = async(): Promise<any> =>{
    try {
        const homePageContent = await homePageModel.find({})
        return {homePageContent,status : 200}
    } catch (error) {
        console.error("Error saving data:", error);
        return{error,status : 500}
    }
}

// export  const getExtraData = async(req,res)=>{
//     try {
//         const id = req.body.id
//         if(!id) return res.status(400).json({message : "id is required"})
//         const data = await fifthExtradataModel.findById(id)
//         if(!data) return res.status(500).json({message : "data not found"})
//         return res.status(200).send(data)
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const crateExtraData = async(req,res)=>{
//     try {
//         const body = req.body
//         const data = await fifthExtradataModel.create({
//             advantages : body.advantages,
//             benefits : body.benefits,
//             button : body.button,
//             content : body.content,
//             head : body.head,
//             heading : body.heading,
//             keyFeatures : body.keyFeatures,
//             models : body.models,
//             subhead : body.subhead,
//             subHeading : body.subHeading,
//             summary : body.summary,
//             titleHead : body.titleHead,
//             Vision : body.Vision,
//             whyChoose4Pillars : body.whyChoose4Pillars,
//             links : body.links
//         })
//         if(!data) return res.status(500).json({message : "error while uploading data"})
//         return res.status(200).json({message : "data created",data})
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const updateExtraData = async(req,res)=>{
//     try {
//         const body = req.body
//         if(!body.id) return res.status(400).json({message : "id is required"})
//         const obj = await fifthExtradataModel.findById(body.id)
//         const data = await fifthExtradataModel.findByIdAndUpdate(body.id,{
//             $set : {
//                 advantages:body.advantages?body.advantages:obj.advantages,
//                 benefits:body.benefits?body.benefits:obj.benefits,
//                 button : body.button?body.button:obj.button,
//                 content : body.content?body.content:obj.content,
//                 head : body.head?body.head:obj.head,
//                 heading : body.heading?body.heading:obj.heading,
//                 keyFeatures : body.keyFeatures?body.keyFeatures:obj.keyFeatures,
//                 models : body.models?body.models:obj.models,
//                 subhead : body.subhead?body.subhead:obj.subhead,
//                 subHeading : body.subHeading?body.subHeading:obj.subHeading,
//                 summary : body.summary?body.summary:obj.summary,
//                 titleHead : body.titleHead?body.titleHead:obj.titleHead,
//                 Vision : body.Vision?body.Vision:obj.Vision,
//                 whyChoose4Pillars : body.whyChoose4Pillars?body.whyChoose4Pillars:obj.whyChoose4Pillars,
//                 image : req.files && Array.isArray(req.files.image)?`${basepath}/uploads/${req.files.image[0].filename}`:obj.image==undefined?"":obj.image,
//                 serviceimage1 : req.files && Array.isArray(req.files.serviceimage1)?`${basepath}/uploads/${req.files.serviceimage1[0].filename}`:obj.serviceimage1==undefined?"":obj.serviceimage1
//             }
//         },{
//             new : true
//         })
//         if(!data) return res.status(500).json({message : "something went wrong while updating"})
//         return res.status(200).json({message : "data updated",data : data?data:""})
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const deleteExtraData = async(req,res)=>{
//     try {
//         const body = req.body
//         if(!body.id) return res.status(400).json({message : "id is required"})
//         await fifthExtradataModel.findByIdAndDelete(body.id)
//         return res.status(200).json({message : "data updated"})
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const getData = async(req,res)=>{
//     try {
//         const {number} = req.body
//         if(!number) return res.status(400).json({message : "number is required"})
//         const data = await fifthModel.find({number})
//         return res.status(200).json(data[0])
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const createData = async(req,res)=>{
//     try {
//         const body = req.body
//         if(req.files){
//             if(req.files.image1){
//                 await fifthModel.findByIdAndUpdate(body.id,{image1 : `${basepath}/uploads/${req.files.image1[0].filename}`})
//             }
//             if(req.files.image2){
//                 await fifthModel.findByIdAndUpdate(body.id,{image2 : `${basepath}/uploads/${req.files.image2[0].filename}`})
//             }
//         }else{
//             const data = await fifthModel.create({
//                 application : body.application,
//                 benefits : body.benefits,
//                 content : body.content,
//                 heading : body.heading,
//                 image1 : body.image1,
//                 image2 : body.image2,
//                 keyFeatures : body.keyFeatures,
//                 no : body.no,
//                 transform : body.transform,
//                 whycose4Pillars : body.whycose4Pillars,
//                 number : body.number
//             })
//             if(!data) return res.status(500).json({message : "something went wrong while updating"})
//         }
//         return res.status(200).json({message : "data saved"})
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const handleUpdateData = async(req,res)=>{
//     try {
//         const body = req.body
//         if(body.homeContent){
//             if(body.homeContent.floatingImage){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{floatingImage : body.homeContent.floatingImage})
//             }
//             if(body.homeContent.secondObject){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{secondObject : body.homeContent.secondObject})
//             }
//             if(body.homeContent.thirdObject){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{thirdObject : body.homeContent.thirdObject})
//             }
//             if(body.homeContent.thirdObjectTitle){
//                 const data = await homePageModel.findById(body.homeContent.id)
//                 const thrdObj = data.thirdObject
//                 thrdObj.titles = body.homeContent.thirdObjectTitle
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{thirdObject : thrdObj})
//             }
//             if(body.homeContent.fourthObject){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{fourthObject : body.homeContent.fourthObject})
//             }
//             if(body.homeContent.fourthObjectTitle){
//                 const data = await homePageModel.findById(body.homeContent.id)
//                 const thrdObj = data.fourthObject
//                 thrdObj.titles = body.homeContent.fourthObjectTitle
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{fourthObject : thrdObj})
//             }
//             if(body.homeContent.fipthObject){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{fipthObject : body.homeContent.fipthObject})
//             }
//             if(body.homeContent.fipthObjectTitle){
//                 const data = await homePageModel.findById(body.homeContent.id)
//                 const thrdObj = data.fipthObject
//                 thrdObj.titles = body.homeContent.fipthObjectTitle
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{fipthObject : thrdObj})
//             }
//             if(body.homeContent.sixObject){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{sixObject : body.homeContent.sixObject})
//             }
//             if(body.homeContent.sixObjectTitle){
//                 const data = await homePageModel.findById(body.homeContent.id)
//                 const thrdObj = data.sixObject
//                 thrdObj.titles = body.homeContent.titles
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{sixObject : thrdObj})
//             }
//             if(body.homeContent.sevenObject){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{sevenObject : body.homeContent.sevenObject})
//             }
//             if(body.homeContent.sevenObjectTitle){
//                 const data = await homePageModel.findById(body.homeContent.id)
//                 const thrdObj = data.sevenObject
//                 thrdObj.titles = body.homeContent.sevenObjectTitle
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{sevenObject : thrdObj})
//             }
//             if(body.homeContent.eightObject){
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{eightObject : body.homeContent.eightObject})
//             }
//             if(body.homeContent.eightObjectTitle){
//                 const data = await homePageModel.findById(body.homeContent.id)
//                 const thrdObj = data.eightObject
//                 thrdObj.titles = body.homeContent.eightObjectTitle
//                 await homePageModel.findByIdAndUpdate(body.homeContent.id,{eightObject : thrdObj})
//             }
//         }

//         res.status(200).json({ message: "Data saved successfully" });
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// }

// export  const handleCreateData = async(req,res)=>{
//     try {
//         const body = req.body

//         if(req.files){
//             if(body.homeContentId && body.floatImageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let floatImage = data.floatingImage
//                 let fltImg = floatImage.filter((obj)=>(
//                     obj._id == body.floatImageId
//                 ))
//                 fltImg[0].image.url = `${basepath}/uploads/${req.files[0].filename}`
//                 floatImage = floatImage.map((obj)=>(
//                     obj._id == body.floatImageId ? fltImg[0] : obj
//                 ))
//                 console.log(floatImage)
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{floatingImage : floatImage})
//             }
//             if(body.homeContentId && body.secondObjectImageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 const scndObj = data.secondObject
//                 scndObj.image.url = `${basepath}/uploads/${req.files[0].filename}`
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
//             }
//             if(body.homeContentId && body.secondObjectFloatimageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 const scndObj = data.secondObject
//                 scndObj.floatimage.url = `${basepath}/uploads/${req.files[0].filename}`
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
//             }
//             if(body.homeContentId && body.secondObjectBluecardId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 const scndObj = data.secondObject
//                 scndObj.blueCard = `${basepath}/uploads/${req.files[0].filename}`
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
//             }
//             if(body.homeContentId && body.secondObjectLogoId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 const scndObj = data.secondObject
//                 scndObj.logo1 = `${basepath}/uploads/${req.files[0].filename}`
//                 scndObj.logo2 = `${basepath}/uploads/${req.files[1].filename}`
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{secondObject : scndObj})
//             }
//             if(body.homeContentId && body.thirdObjectBgimageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 const thrdObj = data.thirdObject
//                 thrdObj.bgImage = `${basepath}/uploads/${req.files[0].filename}`
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{thirdObject : thrdObj})
//             }
//             if(body.homeContentId && body.thirdObjectId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let thrdObj = data.thirdObject
//                 let title = thrdObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.titleId 
//                 ))
//                 ttle[0].image.url = `${basepath}/uploads/${req.files[0].filename}`
//                 title = title.map((obj)=>(
//                     obj._id == body.titleId ? ttle[0] : obj
//                 ))
//                 thrdObj.titles = title
//                 // console.log(thrdObj)
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{thirdObject : thrdObj})
//             }
//             if(body.homeContentId && body.fourthObjectId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let thrdObj = data.fourthObject
//                 let title = thrdObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.titleId 
//                 ))
//                 ttle[0].image = `${basepath}/uploads/${req.files[0].filename}`
//                 title = title.map((obj)=>(
//                     obj._id == body.titleId ? ttle[0] : obj
//                 ))
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{fourthObject : thrdObj})
//             }
//             if(body.homeContentId && body.fourthObjectServiceImageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let thrdObj = data.fourthObject
//                 let title = thrdObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.titleId 
//                 ))
//                 ttle[0].serviceimage1 = `${basepath}/uploads/${req.files[0].filename}`
//                 ttle[0].serviceimage2 = `${basepath}/uploads/${req.files[1].filename}`
//                 title = title.map((obj)=>(
//                     obj._id == body.titleId ? ttle[0] : obj
//                 ))
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{fourthObject : thrdObj})
//             }
//             if(body.homeContentId && body.fipthObjectBgimageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 const fifthObj = data.fipthObject
//                 fifthObj.bgdottedImage =  `${basepath}/uploads/${req.files[0].filename}`
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{fipthObject : fifthObj})
//             }
//             if(body.homeContentId && body.fipthObjectId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let thrdObj = data.fipthObject
//                 let title = thrdObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.titleId 
//                 ))
//                 ttle[0].image.url = `${basepath}/uploads/${req.files[0].filename}`
//                 title = title.map((obj)=>(
//                     obj._id == body.titleId ? ttle[0] : obj
//                 ))
//                 thrdObj.titles = title
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{fipthObject : thrdObj})
//             }
//             if(body.homeContentId && body.fipthId && body.keyFeaturesId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let thrdObj = data.fipthObject
//                 let title = thrdObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.titleId 
//                 ))[0]
//                 let keyF = ttle.keyFeatures.filter(key=>key._id==body.keyFeaturesId)[0]
//                 keyF.image = `${basepath}/uploads/${req.files[0].filename}`
//                 ttle.keyFeatures = ttle.keyFeatures.map(key=>key._id==body.keyFeaturesId?keyF:key)
//                 title = title.map(tt=>tt._id ==body.titleId?ttle:tt)
//                 thrdObj.titles = title
//                 // console.log(thrdObj)
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{fipthObject : thrdObj})
//             }
//             if(body.homeContentId && body.fipthObjectServiceImageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let thrdObj = data.fipthObject
//                 let title = thrdObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.titleId
//                 ))
//                 ttle[0].serviceimage1 = `${basepath}/uploads/${req.files[0].filename}`
//                 title = title.map((obj)=>(
//                     obj._id == body.titleId ? ttle[0] : obj
//                 ))
//                 thrdObj.titles = title
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{fipthObject : thrdObj})
//             }
//             if(body.homeContentId && body.sevenObjectId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let thrdObj = data.sevenObject
//                 let title = thrdObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.titleId 
//                 ))
//                 ttle[0].image = `${basepath}/uploads/${req.files[0].filename}`
//                 title = title.map((obj)=>(
//                     obj._id == body.titleId ? ttle[0] : obj
//                 ))
//                 thrdObj.titles = title
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{sevenObject : thrdObj})
//             }
//             if(body.homeContentId && body.sixObjectbgImageId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 const sxthObj = data.sixObject
//                 sxthObj.bgImage =  `${basepath}/uploads/${req.files[0].filename}`
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{sixObject : sxthObj})
//             }
//             if(body.homeContentId && body.sixObjectTitleId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let sxthObj = data.sixObject
//                 let title = sxthObj.titles
//                 let ttle = title.filter((obj)=>(
//                     obj._id == body.sixObjectTitleId 
//                 ))
//                 ttle[0].image = `${basepath}/uploads/${req.files[0].filename}`
//                 title = title.map((obj)=>(
//                     obj._id == body.sixObjectTitleId ? ttle[0] : obj
//                 ))
//                 sxthObj.titles = title
//                 // console.log(sxthObj.titles)
//                 await homePageModel.findByIdAndUpdate(body.homeContentId,{sixObject : sxthObj})
//             }
//             if(body.homeContentId && body.eightObjectId){
//                 const data = await homePageModel.findById(body.homeContentId)
//                 let eightObj = data.eightObject
//                 let eghtObj = eightObj.filter((obj)=>(
//                     body.eightObjectId == obj._id 
//                 ))
//                 eghtObj[0].image = `${basepath}/uploads/${req.files[0].filename}`

//                 eightObj = eightObj.map((obj)=>(
//                     body.eightObjectId == obj._id ? eghtObj[0] : obj
//                 ))
//                 await homePageModel.findByIdAndUpdate(body.homeContentId , {eightObject : eightObj})
//             }
//         }
        
//         if(body.homeContent){
//             // const homedata = await homePageModel.create({
//             //     floatingImage: body.homeContent.floatingImage,
//             //     secondObject: body.homeContent.secondObject,
//             //     thirdObject: body.homeContent.thirdObject,
//             //     fourthObject: body.homeContent.fourthObject,
//             //     fipthObject: body.homeContent.fipthObject,
//             //     sixObject: body.homeContent.sixObject,
//             //     sevenObject: body.homeContent.sevenObject,
//             //     eightObject: body.homeContent.eightObject,
//             //     nineobject: body.homeContent.nineobject,
//             //     title: body.homeContent.title,
//             //     content: body.homeContent.content,
//             //     buttonsContent: body.buttonsContent,
//             //     images: body.homeContent.images,
//             //     subContent: body.homeContent.subContent,
//             // })
//             await homePageModel.create({
//                 fourthObject: body.homeContent.fourthObject,
//                 thirdObject : body.homeContent.thirdObject,
//                 secondObject : body.homeContent.secondObject,
//                 fipthObject : body.homeContent.fipthObject,
//                 eightObject : body.homeContent.eightObject
//             })
//             // const data = await homePageModel.findById(body.homeContent.id)
//             // let fthObj = data.fipthObject
//             // fthObj.titles = body.homeContent.titles
//             // await homePageModel.findByIdAndUpdate(body.homeContent.id,{fipthObject : fthObj})
//         }

//         res.status(200).json({ message: "Data saved successfully" });
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const ongoingCreate = async(req,res)=>{
//     try {
//         const {...body} = req.body
//         let data = await ongoing.create(body)
//         if(req.files?.image?.[0]){ 
//             data.image = `${basepath}/uploads/${req.files.image[0].filename}`
//             await data.save({validateBeforeSave : false})
//         }
//         res.status(200).json({ message: "Data saved successfully" });
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error });
//     }
// }

// export  const ongoingUpdate = async(req,res)=>{
//     try {
//         const {id,...body} = req.body
//         let data = await ongoing.findByIdAndUpdate(id,body)
//         if(req.files?.image?.[0]) data.image = `${basepath}/uploads/${req.files.image[0].filename}`
//         await data.save({validateBeforeSave : false})
//         res.status(200).json({ message: "Data saved successfully" });
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const ongoingDelete = async(req,res)=>{
//     try {
//         const {id} = req.body
//         let data = await ongoing.findByIdAndDelete(id)
//         res.status(200).json({ message: "Data saved successfully" });
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }

// export  const ongoingGet = async(req,res)=>{
//     try {
//         const data = await ongoing.find({})
//         return res.status(200).send(data)
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }