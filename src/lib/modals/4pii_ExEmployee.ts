const mongoose = require('mongoose');

const { Schema } = mongoose;

//  all data in array form

const ExEmployeeSchema = new Schema({
    
            Emp_name: {
                type: String,
            },
            From: {
                type: Date,
            },
            To: {
                type: String,
            },
            Profile: {
                type: String,
            },
            review: {
                type: String,
            },
        
    createdAt: {
        type: String,
    },
});
module.exports = mongoose.model('4PII_Ex_Employee', ExEmployeeSchema);

// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const ExEmployeeSchema = new Schema(
//     {
//         Emp_Name: { type: String, required: true },
//         Duration: { type: String, required: true },
//         Profile: { type: String, required: true },
//         review: { type: String, required: true },
//     },
//     {
//         timestamps: true,
//     }
// );

// const ExEmployee = mongoose.model('Ex_Employee', ExEmployeeSchema);

// module.exports = ExEmployee;
