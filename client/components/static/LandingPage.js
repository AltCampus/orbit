import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className='banner-container'>
        <h1 className='banner-heading'>ORBIT</h1>
        <p className='banner-description'>
          AltCampus' apllication process management system
        </p>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
