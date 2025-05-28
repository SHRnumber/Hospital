/* eslint-disable no-unused-vars */
import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState("");

    const departmentsArray = [
      "Pediatrics",
      "Orthopedics",
      "Cardiology",
      "Neurology",
      "Oncology",
      "Radiology",
      "Physical Therapy",
      "ENT",
];

   const navigateTo = useNavigate()

   const [doctors, setDoctors] = useState([]);
   useEffect(() =>{
    const fetchDoctors = async() =>{
      const {data} =await axios.get("http://localhost:5000/api/v1/user/doctors",
        {withCredentials: true}
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
   }, []);

   const handleAppointment = async (e) => {
    e.preventDefault();
  
    if (
      !firstName || !lastName || !email || !phone || !nic ||
      !dob || !gender || !appointmentDate || !department ||
      !doctorFirstName || !doctorLastName || !address
    ) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
  
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: Boolean(hasVisited),
          address,
        },
        {
          withCredentials: true, // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is included
          },
        }
      );
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      console.error("Appointment Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  

  return <>
   <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <p>Please Fill Form For Appointment</p>
        
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input 
               type='date'
               placeholder='Appointment Date'
               value={appointmentDate}
               onChange={(e) => setAppointmentDate(e.target.value)} 
               />
          </div>
        <div>
          <select value={department} onChange={(e)=> {
            setDepartment(e.target.value);
            setDoctorFirstName("");
            setDoctorLastName("");
          }}>
            {
              departmentsArray.map((depart, index)=>{
                return(
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })
            }
          </select>
          <select value={`${doctorFirstName} ${doctorLastName}`}
          onChange={(e) => {
            const selectedDoctor = doctors.find(
              (doctor) => `${doctor.firstName} ${doctor.lastName}` === e.target.value
            );
          
            if (selectedDoctor) {
              setDoctorFirstName(selectedDoctor.firstName);
              setDoctorLastName(selectedDoctor.lastName);
            }
          }}
          disabled={!department}
          >
            <option value="">Select Doctor</option>
            {
              doctors.filter(doctor=> doctor.doctorDepartment === department).map((doctor, index)=>{
                return(

                  <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                         {doctor.firstName} {doctor.lastName}
                  </option>
                )
              })
            }
          </select>
        </div>
        <textarea 
        rows="10" 
        value={address} 
        onChange={(e)=> setAddress(e.target.value)} 
        placeholder='Address'/>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have You Visited Before</p>
           <input type='checkbox' checked={hasVisited} onChange={(e)=> setHasVisited(e.target.value) } style={{flex: "none", width: "25px"}} />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">GET APPOINTMENT</button>
          </div>
        </form>
      </div>
    </>
  
    
  
};

export default AppointmentForm
