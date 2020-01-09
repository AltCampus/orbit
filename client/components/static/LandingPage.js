import React from 'react';
import { Row, Col, Button } from 'antd';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className='banner-container'></div>
      <Footer />
    </>
  );
};

export default LandingPage;
