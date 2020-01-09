import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function Header() {
  return (
    <>
      <header>
        <div className='header__container'>
          <div className='logo__container'>
            <Link to='/'>
              <img
                className='image-wrapper'
                src='https://i.ibb.co/jhKgKgP/logo.png'
                alt='logo'
                border='0'
              />
            </Link>
          </div>
          <nav>
            <Link to='/login'>
              <Button type='primary'>Login</Button>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
