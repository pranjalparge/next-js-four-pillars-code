const mongoose = require("mongoose");

const { Schema } = mongoose;

//  all data in array form

const JobAddSchema = new Schema({
  Job_Add: [
    {
      title: { type: String },
      Company_name: { type: String },
      location: { type: String },
      Experiance: { type: String },
      salary: { type: String },
      skills: { type: String },
      description: { type: [String] },
      postedDate: { type: String },
      expireDate: { type: String },
    },
  ],

  createdAt: {
    type: String,
  },
});
module.exports = mongoose.model("LLc_Job_Add", JobAddSchema);

// const mongoose = require('mongoose');

// module.exports = ExEmployee;

// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const JobAddSchema = new Schema(
//     {
//         title: { type: String, required: true },
//         Company_name: { type: String, required: true },
//         location: { type: String, required: true },
//         Experiance: { type: String, required: true },
//         salary: { type: String, required: true },
//         Skills: { type: String, required: true },
//         description: { type: [String], required: true },
//         postedDate: { type: Date, required: true },
//         expireDate: { type: Date, required: true },
//     },
//     {
//         timestamps: true,
//     }
// );

// const Job = mongoose.model('Job_Add', JobAddSchema);

// module.exports = Job;

// router.route('/add').post((req, res) => {
//     // eslint-disable-next-line camelcase
//     const Job_Add = req.body;
//     const newjobadd = new JobAdd({
//         // eslint-disable-next-line camelcase
//         Job_Add,
//     });
//     newjobadd
//         .save()
//         .then(() => res.json({ success: true, data: newjobadd, message: 'added successful!' }))
//         .catch((err) => res.status(400).json(`Error: ${err}`));
// });

// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const JobAddSchema = new Schema(
//     {
//         title: { type: String, required: true },
//         Company_name: { type: String, required: true },
//         location: { type: String, required: true },
//         Experiance: { type: String, required: true },
//         salary: { type: String, required: true },
//         Skills: { type: String, required: true },
//         description: { type: [String], required: true },
//         postedDate: { type: Date, required: true },
//         expireDate: { type: Date, required: true },
//     },
//     {
//         timestamps: true,
//     }
// );

// const Job = mongoose.model('Job_Add', JobAddSchema);

// module.exports = Job;
