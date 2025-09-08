
const express = require("express");
const asyncMiddleware = require("../middleware/async");
const TimeLine = require("../models/4pii_timeline");  // Import the TimeLine model




const BASE_PATH = "https://4pillarsinfotechindia.com/api";
const basepath = process.env.BASE_PATH;


module.exports.Add_4pii = async (req, res) => {
  try {
    const { title, year, description, subDescription, companyDescription, status, clientName, achievements } = req.body;

    // Ensure that required fields are present
    if (!title || !year || !description) {
      return res.status(400).json({ success: false, message: "Title, Year, and Description are required!" });
    }

    // Check if an image file is uploaded
    let imageUrl = null;
    if (req.file) {
      // Get the full URL path for the uploaded image
      imageUrl = `${basepath}/uploads/${req.file.filename}`; // Construct the full image URL
    }

    // Collect modules from req.body
    let modules = [];
    const headFields = req.body['module[]head']; // Array of all module heads
    const subheadFields = req.body['module[]subhead']; // Array of all module subheads

    // Check if the arrays for head and subhead are provided
    if (headFields && subheadFields) {
      if (headFields.length === subheadFields.length) {
        // Loop through and push each module with head and subhead
        for (let i = 0; i < headFields.length; i++) {
          modules.push({
            head: headFields[i],
            subhead: subheadFields[i],
          });
        }
      } else {
        return res.status(400).json({ success: false, message: "The number of heads does not match the number of subheads." });
      }
    } else {
      return res.status(400).json({ success: false, message: "Missing head or subhead values." });
    }

    // Create the TimeLine data
    const data = new TimeLine({
      title,
      year,
      description,
      subDescription,
      companyDescription,
      module: modules, // Store the modules array
      status,
      clientName,
      achievements,
      image: imageUrl, // Store the full image URL
    });

    // Save the TimeLine data to the database
    const savedTimeLine = await data.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "TimeLine created successfully",
      data: savedTimeLine,
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating TimeLine:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating the TimeLine",
    });
  }
};



module.exports.get_4pii_Data = asyncMiddleware(async (req, res) => {
    try {
      let getData = await TimeLine.find();
  
      // getData = getData[0];
  
      // res.status(200).json({result:getData[getData.length-1]})
      return res.status(200).send(getData);
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Internal server error");
    }
  });




// Set your base path

module.exports.Update_4pii = async (req, res) => {
  try {
    const { id } = req.params;  // ID of the TimeLine document to update

    console.log(id , "ss");
    
    const { 
      title, year, description, subDescription, companyDescription, 
      status, clientName, achievements, replaceModules ,link
    } = req.body;

    // Check if an image file is uploaded
    let imageUrl = null;
    if (req.file) {
      imageUrl = `${BASE_PATH}/uploads/${req.file.filename}`;
    }

    // Collect modules from req.body
    let modules = [];
    const headFields = req.body['module[]head'];
    const subheadFields = req.body['module[]subhead'];

    // Process module fields
    if (headFields && subheadFields) {
      if (Array.isArray(headFields) && Array.isArray(subheadFields)) {
        if (headFields.length !== subheadFields.length) {
          return res.status(400).json({ success: false, message: "Number of heads and subheads do not match." });
        }
        for (let i = 0; i < headFields.length; i++) {
          modules.push({
            head: headFields[i],
            subhead: subheadFields[i],
          });
        }
      } else if (typeof headFields === 'string' && typeof subheadFields === 'string') {
        // Handle single module entry
        modules.push({
          head: headFields,
          subhead: subheadFields,
        });
      }
    }

    // Prepare the update object
    const updateData = {};
    if (title) updateData.title = title;
    if (year) updateData.year = year;
    if (description) updateData.description = description;
    if (subDescription) updateData.subDescription = subDescription;
    if (companyDescription) updateData.companyDescription = companyDescription;
    if (status) updateData.status = status;
    if (clientName) updateData.clientName = clientName;
    if (achievements) updateData.achievements = achievements;
    if (imageUrl) updateData.image = imageUrl;
    if (link) updateData.link = link;

    // Handling module updates
    if (modules.length > 0) {
      if (replaceModules === 'true') {
        // Completely replace existing modules
        updateData.module = modules;
      } else {
        // Append new modules to the existing array
        const existingTimeline = await TimeLine.findById(id);
        if (!existingTimeline) {
          return res.status(404).json({ success: false, message: "TimeLine not found" });
        }
        updateData.module = [...existingTimeline.module, ...modules];
      }
    }

    // Find the document by ID and update it
    const updatedTimeLine = await TimeLine.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTimeLine) {
      return res.status(404).json({ success: false, message: "TimeLine not found" });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "TimeLine updated successfully",
      data: updatedTimeLine,
    });

  } catch (error) {
    console.error("Error updating TimeLine:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating the TimeLine",
    });
  }
};


module.exports.DeleteTimelineOrModule = async (req, res) => {
  try {
    const { id, moduleId } = req.query;  // Getting ID and optional moduleId from query

    if (!id) {
      return res.status(400).json({ success: false, message: "TimeLine ID is required" });
    }

    if (moduleId) {
      // Case 1: Delete a specific module from the TimeLine
      const existingTimeline = await TimeLine.findById(id);
      if (!existingTimeline) {
        return res.status(404).json({ success: false, message: "TimeLine not found" });
      }

      // Filter out the module that matches the given moduleId
      const updatedModules = existingTimeline.module.filter(
        (mod) => mod._id.toString() !== moduleId
      );

      if (updatedModules.length === existingTimeline.module.length) {
        return res.status(404).json({ success: false, message: "Module not found" });
      }

      // Update the TimeLine with the filtered modules array
      existingTimeline.module = updatedModules;
      await existingTimeline.save();

      return res.status(200).json({
        success: true,
        message: "Module deleted successfully",
        data: existingTimeline
      });

    } else {
      // Case 2: Delete the entire TimeLine document
      const deletedTimeline = await TimeLine.findByIdAndDelete(id);
      if (!deletedTimeline) {
        return res.status(404).json({ success: false, message: "TimeLine not found" });
      }

      return res.status(200).json({
        success: true,
        message: "TimeLine deleted successfully",
        data: deletedTimeline
      });
    }
  } catch (error) {
    console.error("Error deleting TimeLine or Module:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting TimeLine or Module",
    });
  }
};
