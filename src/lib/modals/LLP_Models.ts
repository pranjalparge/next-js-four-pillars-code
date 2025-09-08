const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    service : {
        heading : {type : String},
        titles : [
            {
                image : {type : String},
                heading : {type : String},
                content : {type : String}
            }
        ]
    }
})

const serviceModel = mongoose.model("LLP_Service",serviceSchema)

const aboutusSchema = new mongoose.Schema({
    about  : {
        heading : {type : String},
        titles : [
            {
                image : {type : String},
                heading : {type : String},
                content : {type : String}
            }
        ]
    }
})

const aboutusModel = mongoose.model("LLP_newabout",aboutusSchema)

module.exports = {
    serviceModel,
    aboutusModel
}