import mongoose from "mongoose"; // Database conncetion MongoDb


export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "HOSPITAL",        
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) =>{
        console.log(`Some error occured while connecting to database: ${err}`);
    });
};
const validDepartments = [
    "Pediatrics", "Orthopedics", "Cardiology", 
    "Neurology", "Oncology", "Radiology",
    "Physical Therapy", "ENT"
  ];
  
  export const getDoctorsByDepartment = async (req, res) => {
    const { department } = req.params;
    
    // Case-insensitive check
    if (!validDepartments.some(dept => 
      dept.toLowerCase() === department.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid department specified'
      });
    }
  
    try {
      const doctors = await Doctor.find({ 
        doctorDepartment: { $regex: new RegExp(department, 'i') } 
      });
      res.json({ success: true, doctors });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
  };