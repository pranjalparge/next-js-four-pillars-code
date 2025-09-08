const mongoose = require("mongoose")

const subCotentScema = new mongoose.Schema({
    title : {
        type : String,
    },
    content : {
        type : String,
    },
    buttonsContent : [
        {
            type : String
        }
    ],
    images : [
        {
            type : String
        }
    ],
    idRef : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "homePageContents",
        required : true
    }
})

const subHomeContentModel = mongoose.model("homePage_subContent",subCotentScema)

module.exports ={
    subHomeContentModel
}