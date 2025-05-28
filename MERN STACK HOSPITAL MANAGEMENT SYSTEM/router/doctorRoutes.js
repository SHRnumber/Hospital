const express = require('express');
const router = express.Router();
const { 
  getDoctorsByDepartment,
  applyDoctorController 
} = require('../controllers/doctorController');

// GET doctors by department (e.g., /api/v1/user/doctors/department/ENT)
router.get('/department/:department', getDoctorsByDepartment);

// POST apply as doctor (if needed)
router.post('/apply', applyDoctorController);

module.exports = router;