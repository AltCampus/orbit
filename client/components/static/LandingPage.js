import React from 'react';
import { Link } from 'react-router-dom'; 

const LandingPage = () => {
  return (
    <div>
      <div>Hello World! I am Orbit.</div>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default LandingPage;