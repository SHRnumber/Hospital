import mongoose from "mongoose"; //ADD NEW ADMIN
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
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
    password:{
        type: String,
        minLength: [8, "Password Must Contain At Least 8 Character!"],
        required: true,
        select: false,
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment:{
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,

    });
};

export const User = mongoose.model("User", userSchema);