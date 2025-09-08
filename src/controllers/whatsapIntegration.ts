const WhatsAppIntegration = require('../models/whatsapIntegration');

const basePath = process.env.BASE_PATH; 
// exports.createWhatsAppIntegration = async (req, res) => {
//   try {
//     const data = JSON.parse(req.body.data); // frontend sends JSON string

//     const files = req.files;

//     // Map image URLs using base path
//     data.featuresSection.features.forEach((item, i) => {
//       const file = files.featureImages?.[i];
//       item.image = file ? `${basePath}/uploads/${file.filename}` : '';
//     });

//     data.coreFeaturesSection.coreFeatures.forEach((item, i) => {
//       const file = files.coreFeatureImages?.[i];
//       item.image = file ? `${basePath}/uploads/${file.filename}` : '';
//     });

//     data.useCasesSection.useCases.forEach((item, i) => {
//       const file = files.useCaseImages?.[i];
//       item.image = file ? `${basePath}/uploads/${file.filename}` : '';
//     });

//     const integration = new WhatsAppIntegration({
//       advObject1: data.advObject1,
//       advObject2: data.advObject2,
//       advObject3: data.advObject3,
//       title: data.title,
//       content: data.content,
//       featuresSection: data.featuresSection,
//       coreFeaturesSection: data.coreFeaturesSection,
//       useCasesSection: data.useCasesSection,
//     });

//     await integration.save();
//     res.status(201).json({ message: 'Created successfully', data: integration });

//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// GET all

const Joi = require('joi');


exports.createWhatsAppIntegration = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data); // JSON string from frontend

    // ✅ Inline Joi schema
    const { error, value } = Joi.object({
      advObject1: Joi.string().allow('', null),
      advObject2: Joi.string().allow('', null),
      advObject3: Joi.string().allow('', null),
      title: Joi.string().required(),
      content: Joi.string().required(),

      featuresSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        features: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional()
          })
        ).required()
      }).required(),

      coreFeaturesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        coreFeatures: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional()
          })
        ).required()
      }).required(),

      useCasesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        useCases: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            image: Joi.string().optional(),
            items: Joi.array().items(Joi.string().required()).required()
          })
        ).required()
      }).required()
    }).validate(data, { abortEarly: false });

    // ❌ Validation failed
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => d.message)
      });
    }

    // ✅ Attach file paths to validated value
    const files = req.files;

    value.featuresSection.features.forEach((item, i) => {
      const file = files.featureImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
      const file = files.coreFeatureImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    value.useCasesSection.useCases.forEach((item, i) => {
      const file = files.useCaseImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    // ✅ Save validated and processed data
    const integration = new WhatsAppIntegration(value);
    await integration.save();

    res.status(201).json({ message: 'Created successfully', data: integration });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllWhatsAppIntegrations = async (req, res) => {
    try {
      const integrations = await WhatsAppIntegration.find();
      res.status(200).json({ success: true, data: integrations });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
// DELETE
exports.deleteWhatsAppIntegration = async (req, res) => {
    try {
      const deleted = await WhatsAppIntegration.findByIdAndDelete(req.query.id);
      if (!deleted) return res.status(404).json({ message: 'Not found' });
  
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  
  exports.updateWhatsAppIntegration = async (req, res) => {
    try {
      const data = JSON.parse(req.body.data);
      const files = req.files;
      const id  = req.query.id;
  
      // Map new image URLs if available
      data.featuresSection.features.forEach((item, i) => {
        const file = files.featureImages?.[i];
        if (file) item.image = `${basePath}/uploads/${file.filename}`;
      });
  
      data.coreFeaturesSection.coreFeatures.forEach((item, i) => {
        const file = files.coreFeatureImages?.[i];
        if (file) item.image = `${basePath}/uploads/${file.filename}`;
      });
  
      data.useCasesSection.useCases.forEach((item, i) => {
        const file = files.useCaseImages?.[i];
        if (file) item.image = `${basePath}/uploads/${file.filename}`;
      });
  
      const updated = await WhatsAppIntegration.findByIdAndUpdate(id, {
        advObject1: data.advObject1,
        advObject2: data.advObject2,
        advObject3: data.advObject3,
        title: data.title,
        content: data.content,
        featuresSection: data.featuresSection,
        coreFeaturesSection: data.coreFeaturesSection,
        useCasesSection: data.useCasesSection,
      }, { new: true });
  
      if (!updated) return res.status(404).json({ message: 'Not found' });
  
      res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
  
