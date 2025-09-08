const {Schema,model} = require("mongoose")
const mongoose = require("mongoose")

const subnavbarSchema = new mongoose.Schema([
    {
        refNav : {
            type : String,
            required : true
        },
        subNavname : {
            type : String,
            require : true,
        },
        idRef : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "headers"
        },
        subRoutes : [
            {
                type : String
            }
        ]
    }
])

const subNavModel = mongoose.model("subNavbar",subnavbarSchema)

module.exports = {
    subNavModel
}