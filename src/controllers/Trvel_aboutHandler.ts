const {TavelAboutUs} = require("../models/tarvelAbout")
const basepath = process.env.BASE_PATH




exports.update_TravelAbout = async (req, res) => {
  try {
      let data = await TavelAboutUs.find()
      let vissionSection  = data[0].visionSection
      let missionSection = data[0].missionSection
      if(Array.isArray(req.files.vissionSectionImage) && req.files.vissionSectionImage[0]){
        vissionSection.image = `${basepath}/uploads/${req.files.vissionSectionImage[0].filename}`
      }
      if(Array.isArray(req.files.missionSectionImage) && req.files.missionSectionImage[0]){
        missionSection.image = `${basepath}/uploads/${req.files.missionSectionImage[0].filename}`
      }
      let whyChooseUs = req.body.whyChooseUs?req.body.whyChooseUs:data[0].whyChooseUs
      let services = req.body.services?req.body.services:data[0].services
      if(Array.isArray(req.files.whychooseUsImage) && req.files.whychooseUsImage[0]){
        if(req.body.whychooseUsId){
          let event = whyChooseUs.find(e=>e._id==req.body.whychooseUsId)
          event.image = `${basepath}/uploads/${req.files.whychooseUsImage[0].filename}`
          whyChooseUs = whyChooseUs.map(e=>e._id==req.whychooseUsId?event:e)
        }
      }
      if(Array.isArray(req.files.serviceImage) && req.files.serviceImage[0]){
        if(req.body.serviceId){
          let event = services.find(e=>e._id==req.body.serviceId)
          event.image = `${basepath}/uploads/${req.files.serviceImage[0].filename}`
          services = services.map(e=>e._id==req.body.serviceId?event:e)
        }
      }
      // if(serviceID)
    const updatedPage = await TavelAboutUs.findByIdAndUpdate(
      req.body.id, // Assuming you send the ID of the page to update
      {
        aboutHead: req.body.aboutHead?req.body.aboutHead:data[0].aboutHead,
        aboutContent: req.body.aboutContent?req.body.aboutContent:data[0].aboutContent,
        vissionHead: req.body.vissionHead?req.body.vissionHead:data[0].vissionHead,
        vissionContent: req.body.vissionContent?req.body.vissionContent:data[0].vissionContent,
        missionHead: req.body.missionHead?req.body.missionHead:data[0].missionHead,
        misssionContent: req.body.misssionContent?req.body.misssionContent:data[0].misssionContent,
        whychoosHead: req.body.whychoosHead?req.body.whychoosHead:data[0].whychoosHead,
        whychooseContent: req.body.whychooseContent?req.body.whychooseContent:data[0].whychooseContent,
        services: services,
        whyChooseUs: whyChooseUs,
        visionSection: {
          heading: req.body.visionSection?req.body.visionSection.heading:vissionSection.heading,
          content: req.body.visionSection?req.body.visionSection.heading:vissionSection.content,
          image: Array.isArray(req.files.vissionSectionImage) && req.files.vissionSectionImage[0]?vissionSection.image:data[0].visionSection.image
        },
        missionSection: {
          heading: req.body.missionSection?req.body.missionSection.heading:missionSection.heading,
          content: req.body.missionSection?req.body.missionSection.content:missionSection.content,
          image:Array.isArray(req.files.missionSectionImage) && req.files.missionSectionImage[0]? missionSection.image:data[0].missionSection.image
        }
      },
      { new: true }
    );

    res.status(200).json(updatedPage);
  } catch (err) {
    res.status(500).json({ message: "Error updating about page", error: err });
    console.log(err)
  }
};


exports.Add_krislin = async (req, res) => {
  try {
    const {
      aboutHead,
      aboutContent,
      vissionHead,
      vissionContent,
      missionHead,
      misssionContent,      // keep typo to match schema
      whychoosHead,
      whychooseContent
    } = req.body;

    // Extract services array manually
    const services = req.body.services || [];
    let index = 0;
    while (req.body[`services[${index}].title`]) {
      const imageFile = req.files?.find(file => file.fieldname === `services[${index}].image`);
      services.push({
        title: req.body[`services[${index}].title`],
        content: req.body[`services[${index}].content`] || "",
        image: imageFile ? `${basepath}/uploads/${imageFile.filename.replace(/\\/g, '/')}` : null
      });
      index++;
    }

    // Extract whyChooseUs array manually
    const whyChooseUs = req.body.whyChooseUs || [];
    index = 0;
    while (req.body[`whyChooseUs[${index}].heading`]) {
      const imageFile = req.files?.find(file => file.fieldname === `whyChooseUs[${index}].image`);
      whyChooseUs.push({
        heading: req.body[`whyChooseUs[${index}].heading`] || "",
        content: req.body[`whyChooseUs[${index}].content`] || "",
        image: imageFile ? `${basepath}/uploads/${imageFile.filename.replace(/\\/g, '/')}` : null
      });
      index++;
    }

    // Build the document as per schema with exact keys (including typo)
    const newAboutPage = new TavelAboutUs({
      aboutHead,
      aboutContent,
      vissionHead,
      vissionContent,
      missionHead,
      misssionContent,    // keep typo
      whychoosHead,
      whychooseContent,
      services,
      whyChooseUs,
      visionSection: {
        heading: req.body.visionSection?.heading || "",
        content: req.body.visionSection?.content || "",
        image: req.files?.find(file => file.fieldname === 'visionSection.image') ? 
          `${basepath}/uploads/${req.files.find(file => file.fieldname === 'visionSection.image').filename.replace(/\\/g, '/')}` 
          : null
      },
      missionSection: {
        heading: req.body.missionSection?.heading || "",
        content: req.body.missionSection?.content || "",
        image: req.files?.find(file => file.fieldname === 'missionSection.image') ? 
          `${basepath}/uploads/${req.files.find(file => file.fieldname === 'missionSection.image').filename.replace(/\\/g, '/')}` 
          : null
      }
    });

    const savedPage = await newAboutPage.save();
    res.status(200).json(savedPage);

  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ message: "Error creating about page", error: err });
  }
};


exports.get_krislin_Data = async (req, res) => {
  try {
    const aboutPage = await TavelAboutUs.find();
    res.status(200).json(aboutPage);
  } catch (err) {
    res.status(500).json({ message: "Error fetching about page data", error: err });
  }
};