const mongoose = require("mongoose")

const headerSchema = new mongoose.Schema({
    titles: [
        {
            title: { type: String, required: true },
            icons: { type: String, required: true },   
        // subNav: {
        // type: Array,
        // default: []
        // },
        subNav: [
            {
                label: { type: String, required: true },
               
                subNav: [
                    {
                        label: { type: String, required: true },
                        path: { type: String }                   
                    }
                ]
            }
        ]
        }
    ],
    contact: {
        Contact_no: { type: String, required: true },
        content: { type: String, required: true },
        button: { type: String, required: true }
    },
    
})

const NavModel = mongoose.model("header",headerSchema)

module.exports = {
    NavModel
}