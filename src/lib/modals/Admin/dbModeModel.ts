const mongoose = require("mongoose")

const dbModeSchema = new mongoose.Schema({
    mode : {
        type : Number,
        required : true,
        enum : [1,0]
    }
})

const dbMode = mongoose.model("dbMode",dbModeSchema)

module.exports = {
    dbMode
}