import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorsByDepartment = () => {
  const { department } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/user/doctors/department/${department}`,
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to load doctors");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [department]);

  if (loading) return <div className="loading">Loading doctors...</div>;

  return (
    <div className="doctors-container">
      <h1>{department} Department Doctors</h1>
      <div className="doctors-grid">
        {doctors.length > 0 ? (
          doctors.map(doctor => (
            <div key={doctor._id} className="doctor-card">
              <img
                src={doctor.imageUrl || "/default-doctor.jpg"}
                alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
              />
              <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
              <p>Specialization: {doctor.specialization}</p>
            
            </div>
          ))
        ) : (
          <p>No doctors found in this department</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsByDepartment;