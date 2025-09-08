const mongoose = require("mongoose")

const internsghipSchema = new mongoose.Schema({
    heading : {type : String},
    content : {type : String},
    titles : [
        {
            image : {type : String},
            heading : {type : String},
            content : {type : String},
            learnings : [
                {
                    title : {type : String}
                }
            ]
        }
    ]
})

const internshipModel = mongoose.model("SaaS_internship",internsghipSchema)

module.exports = {
    internshipModel
}