const mongoose = require("mongoose")

const internsDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
      },
      position: {
        type: String
      },
      skills: [
        {
          index: {
            type: Number,
          },
          skill: {
            type: String,
          },
        },
      ],
      experience: {
        type: String,
      },
      education: {
        type: String,
      },
      description: {
        type: String,
      },
      imagePath: {
        type: String,
      },
      mail: {
        type: String,
      },
      roleDescription: {
        type: String,
      },
      emp_id : {
        type : String
      },
      link : {type : String}
})

const internsDataModel = mongoose.model("internsdata",internsDataSchema)

module.exports = {
    internsDataModel
}