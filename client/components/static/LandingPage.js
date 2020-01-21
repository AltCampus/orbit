import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className='banner-container'>
        <h1 className='banner-heading' style={{ color: "#30ba67" }}>GALAXY</h1>
        <p className='banner-description' style={{ color: "#20386a" }}>
          AltCampus' Application Management System
        </p>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
