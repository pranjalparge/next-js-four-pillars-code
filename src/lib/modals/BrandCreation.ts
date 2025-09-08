const mongoose = require("mongoose")

const BrandCreationSchema = new mongoose.Schema(
    // {
    //     headerSection : {
    //         heading : {type : String},
    //         subheading : {type : String},
    //         header : {type : String},
    //         subheader : {type : String},
    //         content : {type : String},
    //         image : {type : String},
    //     },
    //     middleSection : {
    //         heading : {type : String},
    //         subheading : {type : String},
    //         image1 : {type : String},
    //         image2 : {type : String},
    //         title : [
    //             {
    //                 heading : {type : String},
    //                 content : {type : String},
    //                 image : {type : String},
    //             }
    //         ]
    //     },
    //     lastSection : {
    //         heading : {type : String},
    //         content : {type : String},
    //         image : {type : String},
    //     }
    // }
    {
        image : {type : String},
        heading :{type : String},
        content : {type : String},
        subheading1 : {type : String},
        subcontent1 : {type : String},
        subheading2 : {type : String},
        ratings : [
            {
                heading : {type : String},
                content : {type : String},
                rating : {type : Number}
            }
        ],
        subheading3:{type : String},
        subcontent3 : {type : String},
        urlContent : {type : String},
        redirectUrl : {type : String},
        headingColor : {type : String},
        subheadingColor : {type : String}
    }
)

const BrandCreationModel = mongoose.model("BrandCreation",BrandCreationSchema)

module.exports = {
    BrandCreationModel
}