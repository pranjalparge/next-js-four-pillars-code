const mongoose = require("mongoose")

const footerSchema = new mongoose.Schema([
    {
        title : {
            type : String,
            required : true
        },
        items : [
            {
                type : String
            }
        ]
    }
])

const FooterModel = mongoose.model("footer",footerSchema)

module.exports = {
    FooterModel
}