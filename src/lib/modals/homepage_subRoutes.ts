const mongoose = require("mongoose")

const subRoutesSchema = new mongoose.Schema([
    {
        refSubNav : {
            type : String,
            required : true
        },
        subRoutesName : {
            type : String,
            required : true
        },
        idRef : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            idRef : "subNavbars"
        }
    }
])

const subRoutesModel = mongoose.model("subRoutes",subRoutesSchema)

module.exports = {
    subRoutesModel
}