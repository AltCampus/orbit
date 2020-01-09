import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function Header() {
  return (
    <>
      <header>
        <div className='header__container'>
          <div>
            <h1>AltCampus</h1>
          </div>
          <nav>
            <Link to='/login'>
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
