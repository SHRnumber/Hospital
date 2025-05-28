/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt='aboutImg' />
      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>At Hospital Medical Institute, we are dedicated to providing top-quality healthcare with compassion and excellence. Our team of skilled doctors, nurses, and healthcare professionals work tirelessly to ensure the best medical care for our patients.

With state-of-the-art technology and a patient-first approach, we specialize in advanced medical treatments, emergency services, and preventive healthcare. Whether you need a routine check-up or specialized treatment, we are committed to serving you with excellence.

Your Health, Our Priority!</p>
<p> i. Specialized Departments – Cardiology, Neurology, Orthopedics, Pediatrics, and more.</p>
<p> ii. 24/7 Emergency Care – Immediate medical attention when you need it the most.
</p>
<p> iii. Modern Facilities – Advanced diagnostic labs, surgical units, and intensive care.
</p>
<p> iv. Expert Medical Staff – Dedicated professionals ensuring personalized and effective treatments.</p>
<p> v. Compassionate Patient Care – A healing environment that prioritizes your comfort and well-being</p>
      </div>
    </div>
  );
};

export default Biography
