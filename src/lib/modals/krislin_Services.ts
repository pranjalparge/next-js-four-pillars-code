

const mongoose = require('mongoose');

const { Schema } = mongoose;

const New_servicesSchema = new Schema(
    // {
    //     info: { type: String, required: true },
    //     info_head: { type: String, required: true },
    //     image:{type:Object}


    // },
    {
       name : {type : String},
       description :  {type : String},
       image : {type : String},
       points : [
        {
            heading : {type : String},
            description : {type : String},
            points : [
                {
                    heading : {type : String}
                }
            ]
        }
       ],
       summary : {type : String}
    },
    {
        timestamps: true,
    }
);

const AboutUs = mongoose.model('Krislin_New_Services',New_servicesSchema);

module.exports = AboutUs;
