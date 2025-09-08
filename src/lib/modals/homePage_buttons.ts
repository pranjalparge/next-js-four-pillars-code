const mongoose = require("mongoose")

const buttonSchema = new mongoose.Schema([
    {
        RefTitle : {
            type : String
        },
        buttonName : {
            type : String,
        },
        idRef : {
            type : mongoose.Schema.Types.ObjectId,
        },
    }
])

const buttonModel = mongoose.model("homePageButtons",buttonSchema)

module.exports = {
    buttonModel
}