const mongoose = require("mongoose")

const blogListSchema = new mongoose.Schema({
    blogs : [
        {
            image : {
                type : String,
                required : true
            },
            information : [
                {
                    heading : {type : String},
                    icons : {type : String } 
                }
            ],
            heading : {
                type : String,
                required : true
            },
            content : {
                type : String
            },
            button : {
                type : String,
                required : true
            }
        }
    ],
    Categories : [
        {
            type : String,
            required : true
        },
    ],
    RecentPosts1 : [
        {
            image : {type : String},
            date : {type : String},
            icon : {type : String},
            content : {type : String}
        }
    ],
    RecentPosts2 : [
        {
            image : {type :  String}
        }
    ],
    PopularTags : [
        {
            button : {type : String}
        }
    ],
    box : {
        companyLogoImage : {type : String},
        heading : {type : String},
        content : {type : String},
        button : {type : String}
    }
})

const blogListModel = mongoose.model("blogListModel",blogListSchema)

module.exports = {
    blogListModel
}


