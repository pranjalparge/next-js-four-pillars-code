const asyncMiddleware = require("../middleware/async");
const Team = require("../models/Team");
const basepath = process.env.BASE_PATH
// const basepath = "https://pw73zddd-4071.inc1.devtunnels.ms/api"
const {
  getTeamData,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../services/Team");

module.exports.getTeamData = asyncMiddleware(async (req, res) => {
  try {
    const { timeline } = req.body;
    if (!timeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }
    const team = await getTeamData(timeline);
    res.status(200).json(team);
  } catch (error) {
    console.log("getTeamDataError: ", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.getTeamWithSkill = async(req,res)=>{
  try {
    const {timeline,skill} = req.body
    if(skill){
      const data  = await Team.aggregate([
      {
        $match : {timeline : timeline}
      },
    {
    $match: {
      skills: { $elemMatch: { skill: skill } }
    }
    }
    ])
    return res.status(200).send(data)
    }else{
      const data  = await Team.aggregate([
      {
        $match : {timeline : timeline}
      }
    // {
    // $match: {
    //   skills: { $elemMatch: { skill: skill } }
    // }
    // }
    ])
    return res.status(200).send(data)
    }
  } catch (error) {
    console.log("getTeamDataError: ", error);
    res.status(500).send("Internal server error");
  }
}

module.exports.createTeamMember = asyncMiddleware(async (req, res) => {
  try {
    if(req.file){
      const updateTeamMEaber = await Team.findByIdAndUpdate(req.body.id,{imagePath : `${basepath}/uploads/${req.file?.filename}`},{new : true})
      if(!updateTeamMEaber) return res.status(500).json({message : "Error while uploading"})
      return res.status(200).json({message : "image uploading success"})
    }
    const { teamMemberData } = req.body;
    const response = await createTeamMember(teamMemberData);
    return res.status(201).json(response);
  } catch (error) {
    console.error("createTeamMemberError:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.updateTeamMember = asyncMiddleware(async (req, res) => {
  try {
    const { teamMemberData } = req.body;
    const response = await updateTeamMember(teamMemberData);
    res.status(200).json(response);
  } catch (error) {
    console.error("updateTeamMemberError:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.deleteTeamMember = asyncMiddleware(async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ message: "Id not found" });
    }
    await deleteTeamMember(id);
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("deleteTeamMemberError:", error);
    res.status(500).send("Internal server error");
  }
});
