const mongoose = require("mongoose")

const sevicesNewfrontendSchema = new mongoose.Schema({
    firstObject : {
        heading : {type : String,required : true},
        button : {type : String,required : true},
        image : {type : String , required : true}
    },
    secondObject : [
        {
            image : {type : String,required : true},
            heading : {type : String , require : true},
            content : {type : String , required : true}
        }
    ],
    thirdObjet : {
        image : {type : String, required : true},
        subHeading : {type :String , required : true},
        heading : {type :String , required : true},
        content : {type :String , required : true},
        models : [
            {
                title : {type : String , required : true}
            }
        ]
    }
})

const servicesNewfrontendModel = mongoose.model("servicesNewfrontend",sevicesNewfrontendSchema)

module.exports = {
    servicesNewfrontendModel
}