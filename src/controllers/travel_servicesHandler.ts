const travelService = require("../models/travel_service")


exports.createTravelService = async (req, res) => {
  try {
    const newService = new travelService(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Error creating travel service", error: err });
  }
};

// Get all travel services
exports.getAllTravelServices = async (req, res) => {
  try {
    const services = await travelService.find({});
    res.status(200).json(services);
  } catch (err) {
    console.error("Get All Error:", err);
    res.status(500).json({ message: "Error fetching travel services", error: err });
  }
};

// Get one travel service by id
exports.getTravelServiceById = async (req, res) => {
  try {
    const service = await travelService.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (err) {
    console.error("Get By Id Error:", err);
    res.status(500).json({ message: "Error fetching travel service", error: err });
  }
};

// Update a travel service by id
exports.updateTravelService = async (req, res) => {
  try {
    const updatedService = await travelService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(updatedService);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Error updating travel service", error: err });
  }
};