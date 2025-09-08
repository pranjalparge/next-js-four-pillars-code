const mongoose = require("mongoose");

const floatingImageItemSchema = new mongoose.Schema({
  image: {
    type: Object,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  button: {
    type: String,
  },
});

const secondObjectSchema = new mongoose.Schema({
  image: {
    type: Object,
    required: true,
  },
  floatimage: {
    type: Object,
    required: true,
  },
  blueCard: {
    type: String,
    required: true,
  },
  logo1: {
    type: String,
    required: true,
  },
  logo2: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true, // Make this required if the head is mandatory
  },
  subhead: {
    type: String,
    required: true,
  },
  butten1: {
    type: String,
    required: true,
  },
  butten2: {
    type: String,
    required: true,
  },
  butten3: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: false, // Optional if content can be empty
  },
});

const thirdObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },
  bgImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  titles: [
    {
      head: { type: String, required: true },
      subhead: { type: String, required: true },
      image: { type: Object },
    },
  ],
});

const fourthObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: false,
  },
  titles: [
    {
      head: { type: String, required: true },
      titleHead: { type: String, required: true },
      subhead: { type: String, required: true },
      image: { type: String },
      button: { type: String, require: true },
      serviceimage1: { type: String },
      serviceimage2: { type: String },
      subHeading: { type: String },
      heading: { type: String },
      content: { type: String },

      models: {
        title: { type: String },
        heading: [
          {
            title: { type: String },
            content: { type: String },
          },
        ],
      },
      keyFeatures: [
        {
          head: { type: String },
          subhead: { type: String },
          id : {type : mongoose.Schema.Types.ObjectId,ref : "fifthExtraData"}
        },
      ],
      benefits: [
        {
          head: { type: String },
          subhead: { type: String },
        },
      ],
      whyChoose4Pillars: [
        {
          head: { type: String },
          subhead: { type: String },
        },
      ],
      vision: { type: String },

      advantages: [
        {
          title: { type: String },
        },
      ],
      summary: { type: String },
    },
  ],
});

const fipthObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },
  bgdottedImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  titles: [
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
            subhead : {type : String}
          }
        ],
        whyChoose99Ideas : [
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
        Vision : {type : String}
      },
  ],
});

const sixObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },
  bgImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  titles: [
    {
      head: { type: String, required: true },
      subhead: { type: String, required: true },
      review: { type: Number, required: true },
      date: { type: Date, required: true },
      icons: { type: String, required: true },
      image: { type: String },
    },
  ],
});

const sevenObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: false,
  },
  titles: [
    {
      head: { type: String, required: true },
      subhead: { type: String, required: true },
      image: { type: String },
    },
  ],
});

const eightObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },
  bgImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  titles: [
    {
      head: { type: String, required: true },
      subhead: { type: String, required: true },
      image: { type: Object },
    },
  ],
});

const nineObjectSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: false,
  },
  titles: [
    {
      head: { type: String, required: true },
      subhead: { type: String, required: true },
      image: { type: Object },
    },
  ],
});

const FloatingImage = mongoose.model("FloatingImage", floatingImageItemSchema);

// module.exports = FloatingImage;

const homePageSchema = new mongoose.Schema([
  {
    floatingImage: [floatingImageItemSchema],
    secondObject: secondObjectSchema,
    thirdObject: thirdObjectSchema,
    fourthObject: fourthObjectSchema,
    fipthObject: fipthObjectSchema,
    sixObject: sixObjectSchema,
    sevenObject: sevenObjectSchema,
    eightObject: eightObjectSchema,
    nineobject: nineObjectSchema,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    buttonsContent: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    subContent: [
      {
        type: Object,
      },
    ],
  },
]);

const homePageModel = mongoose.model("homePageData", homePageSchema);

module.exports = {
  homePageModel,
};
