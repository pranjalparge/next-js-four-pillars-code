const mongoose = require("mongoose")

// const about_NewfrontendFormdatSchema = new mongoose.Schema({
//     name : {type : String,required : true},
//     email : {type : String , required : true},
//     subject : {type : String,required : true},
//     message : {type : String,required : true}
// })

// const about_NewfrontendFormdataModel = mongoose.model("about_NewfrontendFormdata",about_NewfrontendFormdatSchema)

// module.exports = {
//     about_NewfrontendFormdataModel
// }




// Define the schema once
const about_NewfrontendFormdatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    phone : {type : Number,required : true}
});

// Create multiple models with different collection names
const about_NewfrontendFormdataModel = mongoose.model("fpii_contact", about_NewfrontendFormdatSchema);
const llc_contact = mongoose.model("llc_contact", about_NewfrontendFormdatSchema);
const llp_contact = mongoose.model("llp_contact", about_NewfrontendFormdatSchema);
const saas_contact = mongoose.model("saas_contact", about_NewfrontendFormdatSchema);

// Export all models
module.exports = {
    about_NewfrontendFormdataModel,
    llc_contact,
   llp_contact,
   saas_contact
};
