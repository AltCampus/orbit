import React from 'react';
import { Row, Col, Button } from 'antd';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className='banner-container wrapper'>
        <Row>
          <Col span={15}>
            <img
              className='image-wrapper'
              src='https://i.ibb.co/crHbt2j/undraw-code-thinking-1jeh-2.png'
              alt='undraw-code-thinking-1jeh-2'
              border='0'
            />
          </Col>
          <Col span={7} className='content-container'>
            <div>
              <strong>Welcome</strong>
              <p>to Orbit</p>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
