const mongoose = require("mongoose")

const llpRegidterSchema = new mongoose.Schema({
    fullname : {type : String},
    email : {type : String},
    address : {type : String},
    city : {type : String},
    event : {type : String,enum : [
        "cloud_computing",
        "cofounder_success",
        "data_science_bootcamp"
    ]}
})

module.exports.llpRegistermodel = mongoose.model("llpRegister", llpRegidterSchema)