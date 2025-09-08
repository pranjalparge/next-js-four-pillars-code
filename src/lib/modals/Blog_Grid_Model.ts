const mongoose = require("mongoose")

const blogGridSchema = new mongoose.Schema({
    firstObject :[ {
        image : {
            type : String,
            required : true
        },
        heading : {
            type : String,
            required : true
        },
        button : {
            type : String,
            required : true
        }
    }],
    grids : [
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
            date : {
                type : String
            },
            heading : {
                type : String,
                required : true
            },
            button : {
                type : String,
                required : true
            }
        }
    ],
    Categories : [
        {
            heading : {type : String,required : true}
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

const blogGridModel = mongoose.model("blogGridModel",blogGridSchema)

module.exports = {
    blogGridModel
}