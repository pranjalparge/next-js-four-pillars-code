const mongoose = require("mongoose")

const homepageImageSchema = new mongoose.Schema([
    {
        imagePath : {
            type : String,
            required : true
        },
        idRef : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
        }
    }
])

const homepageIamgeModel = mongoose.model("homepageImagePath",homepageImageSchema)

module.exports = {
    homepageIamgeModel
}