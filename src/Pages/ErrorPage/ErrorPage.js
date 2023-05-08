import React from 'react';
import img from '../../assets/images/errorPage.svg';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className='w-100'>
          <img src={img} alt='404' style={{height:"90vh"}} className='img-fluid'></img>
          <div>
          <Link to="/" className="btn btn-large text-dark" style={{ backgroundColor:"var(--secondaryColor)"}}>Go To Home</Link>
          </div>
        </div>
    );
};

export default ErrorPage;