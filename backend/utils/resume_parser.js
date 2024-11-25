// utils/resume_parser.js

const pdfParse = require('pdf-parse');

async function extractTextFromResumeBuffer(fileBuffer) {
  try {
    console.log('Extracting text from resume buffer');
    const data = await pdfParse(fileBuffer);
    console.log('Extracted resume text:', data.text);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from resume buffer:', error);
    throw error;
  }
}

module.exports = { extractTextFromResumeBuffer };
