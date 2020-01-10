import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Link to='/'>
            <Button type='primary'>Back Home</Button>
          </Link>
        }
      />
    </>
  );
}
