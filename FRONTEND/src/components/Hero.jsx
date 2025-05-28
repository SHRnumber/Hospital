/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Hero = ({ title, imageUrl }) => {
  return (
    <div className='hero container'>
      <div className='banner'>
        <h1>HOSPITAL</h1>
        <p>
          The Hospital Medical Institute Frontend is a modern web interface designed for seamless patient interaction, appointment scheduling, and healthcare management.
           Built using React, React Router, and Tailwind CSS, it provides a user-friendly experience for both patients and administrators. The system features a Hero section for an engaging landing page, an About Us page for hospital details, an Appointment booking system, and a secure login/register module.
            It integrates with a backend API to manage user authentication, doctor availability, and patient records.
        </p>
      </div>
      <div className='banner'>
      <img src={imageUrl} alt="hero" className='animated-image'/>
      <span>
        <img src="/Vector.png" alt="vector" />
      </span>
      </div>

    </div>
  );
};

export default Hero;
