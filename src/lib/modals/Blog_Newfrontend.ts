const mongoose = require("mongoose")

const blogNewfrontendSchema = new mongoose.Schema({
    firstObject : {
        heading : {type : String,required : true},
        button : {type : String,required : true},
        image : {type : String , required : true}
    },
    noOfBlogs : {
        title : {type : String,required : true},
        no : {type : Number, required : true}
    },
    blogs : [
        {
            image : {type : String,required : true},
            profileImage : {type : String,required : true},
            date : {type : String,required : true},
            condition : {type : String , required : true, enum : ["Draft","Published"],default : "Draft"},
            heading : {type : String , required : true},
            content : {type : String , required : true},
            inform : [
                {
                    icon : {type : String,required : true},
                    value : {type : String,required : true}
                }
            ],
            threeDot : {
                icon : {type : String,required : true},
                innerContent : [
                    {
                        icon : {type : String,required : true},
                        title : {type : String , required : true}
                    }
                ]
            }
        }
    ]
})

const blogNewfrontendModel = mongoose.model("blogNewfrontend",blogNewfrontendSchema)

module.exports = {
    blogNewfrontendModel
}