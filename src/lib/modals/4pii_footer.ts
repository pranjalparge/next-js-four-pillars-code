const mongoose = require('mongoose');

const { Schema } = mongoose;

const Footer_PageSchema = new Schema(
    {
            Address_line_1:{type: String },
            Address_line_2: { type: String},
            state:{type:String},
            pincode:{type:String},
            phone:{type:String},
            email:{type:String}

        

    },
    {
        timestamps: true,
    }
);

const Footer_Page = mongoose.model('4PII_FooterPage',Footer_PageSchema);

module.exports = Footer_Page ;

