const mongoose = require("mongoose")

const stylingSchema = new mongoose.Schema([
    {   
        selector: { 
            type: String, 
            required: true 
        },
        styles: { 
            type: Object, 
            required: true 
        },
        refId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        refTitle : {
            type : String,
            required :true
        }
    }
])

const stylingModel = mongoose.model("homePage_styling",stylingSchema)

module.exports ={
    stylingModel
}