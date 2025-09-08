import mongoose,{Model, Models, models,Schema,Document} from "mongoose"




const floatingImageItemSchema : Schema = new mongoose.Schema({
  image: {
    type: Object, 
  },
  head: {
    type: String, 
  },
  subhead: {
    type: String, 
  },
  content: {
    type: String,
  },
  button :{
    type: String,

  }
});



const secondObjectSchema : Schema  = new mongoose.Schema({
    image: {
      type: Object,
    },
    floatimage:{
        type: Object,

    },
    blueCard : {
      type : String,
    },
    logo1 : {
      type :String,
    },
    logo2 : {
      type : String,
    },
    head: {
      type: String,
    },
    subhead:{
        type: String,

    },
    butten1:{
        type: String,

    },
    butten2:{
        type: String,

    },
    butten3:{
        type: String,
    },

    content: {
      type: String,
    },
  });



  
const thirdObjectSchema : Schema  = new mongoose.Schema({

    head: {
      type: String,
    },
    subhead:{
        type: String,

    },
    bgImage : {
      type : String,
    },
    content: {
      type: String,
    },
    titles:[
        {
            head: { type: String},
            subhead: { type: String},
            image:{type:Object}    
        }
    ]
  });


  const fourthObjectSchema : Schema  = new mongoose.Schema({

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
              id : {type : mongoose.Schema.Types.ObjectId,ref : "fifthExtraData"},
              color : {type : String},
            }
          ]
        }
    ]
  });

  const fipthObjectSchema : Schema  = new mongoose.Schema({

    head: {
      type: String,
    },
    subhead:{
        type: String,

    },
    bgdottedImage : {
      type : String,
    },
    content: {
      type: String,
    },
    titles:[
      {
        head: { type: String},
        titleHead : { type: String},
        subhead: { type: String},
        image:{type:Object},
        button : {type : String},
        serviceimage1 : {type : String},
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
            id : {type : mongoose.Schema.Types.ObjectId,ref : "fifthExtraData"},
            color : {type : String}
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
        number : {type : String},
        technologies : [
          {
            title : {type : String},
            subhead : {type : String},
            id : {type:mongoose.Schema.Types.ObjectId}
          }
        ]
      },
    ]
  });

  const fifthExtraDataSchema : Schema  = new mongoose.Schema({
    head: { type: String},
        titleHead : { type: String},
        subhead: { type: String},
        image:{type:String},
        button : {type : String},
        serviceimage1 : {type : String},
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
            subhead : {type : String}
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
        links : [
          {
            head : {type : String},
            reqdirectUrl : {type : String}
          }
        ]
  })

  const sixObjectSchema : Schema  = new mongoose.Schema({

    head: {
      type: String,
    },
    subhead:{
        type: String,

    },
    bgImage : {
      type : String,
    },
    content: {
      type: String, 
    },
    titles:[
        {
            head: { type: String},
            subhead: { type: String},
            review : {type :Number},
            date : {type : Date},
            icons : {type : String},
            image:{type:String}    
        }
    ]
  });

  
  const sevenObjectSchema : Schema  = new mongoose.Schema({

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
            subhead: { type: String},
            image:{type:String}    
        }
    ]
  });

  
  const eightObjectSchema : Schema  = new mongoose.Schema(
    {
      title : {type : String},
      count : {type : String},
      image : {type : String},
    }
  );

  
  const nineObjectSchema : Schema  = new mongoose.Schema({

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
            head: { type: String },
            subhead: { type: String},
            image:{type:Object}    
        }
    ]
  });


  const fiftthObjectSchema : Schema  = new mongoose.Schema({
    number : { type: String },
    image1 : { type: String },
    image2 : { type: String },
    heading : { type: String },
    content : { type: String },
    keyFeatures : [
      {
        head : { type: String },
        subhead : { type: String }
      }
    ],
    benefits : [
      {
        head : { type: String },
        subhead : { type: String }
      }
    ],
    application : [
        {
          head : { type: String },
          subhead : { type: String }
        } 
    ],
    whychose4Pillars : { type: String },
    transform : {
      head : { type: String },
      subhead : { type: String }
    }
  }) 

// const FloatingImage = mongoose.model("FloatingImage", floatingImageItemSchema);

// module.exports = FloatingImage;


const homePageSchema : Schema  = new mongoose.Schema(
    {

        floatingImage: [floatingImageItemSchema], 
        secondObject : secondObjectSchema,
        thirdObject: thirdObjectSchema,
        fourthObject: fourthObjectSchema,
        fipthObject: fipthObjectSchema,
        sixObject :sixObjectSchema,
        sevenObject :sevenObjectSchema,
        eightObject :[eightObjectSchema],
        nineobject :nineObjectSchema,
        title : {
            type  :String,
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
        subContent : [
            {
                type : Object
            }
        ]
    }
)

interface ongoingObject extends Document{
  title : string,
  content : string,
  image : string,
}



const ongoingSchema : Schema<ongoingObject>  = new mongoose.Schema({
    title : {type : String},
    content : {type : String},
    image : {type : String},
})


const extraImagePdfSchema : Schema  = new mongoose.Schema({
  image : {type : String, required : true}
})

const homePageModel = models["4piiHomePageData"] || mongoose.model("4piiHomePageData",homePageSchema)
const fifthModel = models.fifthobj|| mongoose.model("fifthobj",fiftthObjectSchema)
const fifthExtradataModel =models.fifthExtraData ||  mongoose.model("fifthExtraData",fifthExtraDataSchema)
const extraImage = models.extraImage || mongoose.model("extraImage",extraImagePdfSchema)
const ongoing :Model<ongoingObject> = models.ongoing as mongoose.Model<ongoingObject>|| mongoose.model<ongoingObject>("ongoing",ongoingSchema)

export {
    homePageModel,
    fifthModel,
    fifthExtradataModel,
    extraImage,
    ongoing
}

