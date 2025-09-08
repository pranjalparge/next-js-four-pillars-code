const mongoose = require("mongoose")

const careerNewfrontendSchema = new mongoose.Schema({
    firstObject : {
        image : {type : String , required : true},
        heading : {type : String , required : true},
        button : {type : String , required : true}
    },
    secondObject : [
        {
        image : {type : String , required : true},
        heading : {type : String , required : true},
        date : {type : String , required : true},
        candidates : {
            icon : {type : String , required : true},
            no : {type : Number , required : true}
        },
        qualities : {
            experience : {type : String , required : true},
            time : {type : String , required : true},
            salery : {type : String , required : true},
            position : {type : String , required : true},
            location : {type : String},
        },
        threeDot : {
            icon : {type : String},
            innerContent : [
                {
                    icon : {type : String},
                    title : {type : String }
                }
            ]
        }
    }
    ]
})

const careerNewfrontemdModel = mongoose.model("careerNewfrontend",careerNewfrontendSchema)

module.exports = {
    careerNewfrontemdModel
}