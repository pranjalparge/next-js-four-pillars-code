const mongoose = require("mongoose")

const LlcOurserviceSchema = new mongoose.Schema({
    head: {
        type: String,
        required: true, 
      },
      subhead:{
          type: String,
          required: true,
  
      },
      
      content: {
        type: String,
        required: false, 
      },
      titles:[
          {
              head: { type: String, required: true },
              subhead: { type: String, required: true },
              image:{type:Object},
              button : {type : String,require : true},
              serviceimage1 : {type : String,required : true},
              serviceimage2 : {type : String,required : true},
              subHeading : {type :String , required : true},
              heading : {type :String , required : true},
              content : {type :String , required : true},
              models : [
                {
                    title : {type : String , required : true}
                }
            ]
        }
    ]
    
})

const LlcOurservicesModel = mongoose.model("llcOurserviceModel",LlcOurserviceSchema)

module.exports = {
    LlcOurservicesModel
}