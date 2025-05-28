import mongoose from "mongoose"; //Appointment Form
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Character!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Character!"]
    },
    email:{
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail, // Use validator.isEmail for email validation
            message: "Please Provide A Valid Email!" // Error message
        }
    },
    phone:{
        type: String,
        required: true,
        minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
    },
    nic:{
        type: String,
        required: true,
        minLength: [13, "NIC Must Contain Exact 13 Digits!"],
        maxLength: [13, "NIC Must Contain Exact 13 Digits!"],
    },
    dob:{
        type: Date,
        required: [true,"DOB is required"],
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointment_date:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address:{
            type: String,
            required: true,
    },
     status:{
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
     },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
