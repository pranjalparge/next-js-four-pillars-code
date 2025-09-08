const mongoose = require("mongoose")

const contactHeaderSchema = new mongoose.Schema({
    contact: {
        no: { type: String, required: true },
        button: { type: String, required: true },
        content: { type: String, required: true },
        refId : {type : mongoose.Schema.Types.ObjectId, required : true}
       }
})

const contactHeaderModel = mongoose.model("conatct",contactHeaderSchema)

module.exports = {
    contactHeaderModel
}