import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.scss';
import banner from '../../images/biege__coat.png';

const Banner = () => {
  return (
    <div className='banner app__section'>
      <div className="banner__wrapper">
        <div className="banner__left">
          <h2 className="banner__title">Spring sale <br />for -50%</h2>
          <p className="banner__text">Dresses, jackets, sweaters, jeans... </p>
          <Link to='sales'>
            <button className="banner__button">
              check now
            </button>
          </Link>
        </div>
        <div className="banner__right">
          <Link to='sales'>
            <div className="banner__right__wrapper">
              <img src={banner} alt="" className="banner__img" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Banner