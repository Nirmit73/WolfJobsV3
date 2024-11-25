// const mongoose = require('mongoose');

// const coverLetterSchema = new mongoose.Schema({
//   applicantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User' // References the User model
//   },
//   fileName: {
//     type: String,
//     required: true
//   },
//   fileData: {
//     type: Buffer,
//     required: true
//   },
//   contentType: {
//     type: String,
//     required: true,
//     default: 'application/pdf'
//   },
//   uploadedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);

// module.exports = CoverLetter;


const mongoose = require('mongoose');

const coverLetterSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // References the User model
  },
  fileName: {
    type: String,
    required: true,
  },
  fileData: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    default: 'application/pdf',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);

module.exports = CoverLetter;
