const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    head: {
        type: String,
      },
      subhead:{
          type: String,
  
      },
      content: {
        type: String,
      },
      titles:[
          {
            head: { type: String},
            titleHead : { type: String},
            subhead: { type: String},
            image:{type:String},
            button : {type : String},
            serviceimage1 : {type : String},
            serviceimage2 : {type : String},
            subHeading : {type :String},
            heading : {type :String},
            content : {type :String},
            models : {
              title : {type : String},
              heading : [
                {
                  title : {type : String},
                  content : {type : String}
                }
              ],
            },
            advantages : [
                {
                  title : {type : String}
                }
              ],
            summary : {type : String},
            keyFeatures : [
              {
                head : {type : String},
                subhead : {type : String},
                id : {type : mongoose.Schema.Types.ObjectId,ref:"fifthExtraData"}
              }
            ]
          }
      ]
})

const serviceModel = mongoose.model("saas_newservice",serviceSchema)


const saasProductSSchema = new mongoose.Schema({
          head: { type: String},
          titleHead : { type: String},
          subhead: { type: String},
          image:{type:String},
          button : {type : String},
          serviceImage1 : {type : String},
          subHeading : {type :String},
          heading : {type :String},
          content : {type :String},
          models : {
            title : {type : String},
            heading : [
              {
                title : {type : String},
                content : {type : String}
              }
            ],
          },
          advantages : [
              {
                title : {type : String}
              }
            ],
          summary : {type : String},
          keyFeatures : [
            {
              head : {type : String},
              subhead : {type : String},
              image : {type : String},
              color : {type : String},
              id : {type : mongoose.Schema.Types.ObjectId,ref : "fifthExtraData"}
            }
          ],
          whyChoose4Pillars : [
            {
              head : {type : String},
              subhead : {type : String}
            }
          ],
          benefits : [
            {
              head : {type : String},
              subhead : {type : String}
            }
          ],
          Vision : {type : String},
          number : {type : String}
})

const saasProductModel = mongoose.model("saasProduct",saasProductSSchema)

module.exports = {
    serviceModel,
    saasProductModel
}