// In models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  doctorDepartment: { type: String, required: true },
  specialization: { type: String },
  
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);