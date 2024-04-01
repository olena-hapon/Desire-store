import React from 'react';
import { Link } from 'react-router-dom';
import './BannerPhoto.scss';
import newPhoto from '../../images/Slider/slider-1.1.jpg';
import newPhoto2 from '../../images/Slider/slider-2.2.jpg';
 
const BannerPhoto = () => {
  return (
    <div className='bannerPhoto app__section--banner'>
      <div className="bannerPhoto__wrapper">
        <div className="bannerPhoto__photo bannerPhoto__photo--left">
          <Link to='/woman'className="banner__photo__link">
            <img src={newPhoto} alt="" className="bannerPhoto__img" />
          </Link>
          <Link to="/woman">
            <div className="bannerPhoto__bye">
              <span className='bannerPhoto__text'>bye online</span>
              <svg className="bannerPhoto__arrow" width="22" height="20" viewBox="0 0 16 17" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.1893 9.5877L1 9.5877V8.0877L12.1893 8.0877L7.46967 3.36803L8.53033 2.30737L14.5303 8.30737L15.0607 8.8377L14.5303 9.36803L8.53033 15.368L7.46967 14.3074L12.1893 9.5877Z" fill="white"/>
              </svg>
            </div>
          </Link>
        </div>

        <div className="bannerPhoto__photo">
          <Link to='/woman'className="banner__photo__link">
            <img src={newPhoto2} alt="" className="bannerPhoto__img" />
          </Link>
          <Link to="/woman">
            <div className="bannerPhoto__bye">
              <span className='bannerPhoto__text'>bye online</span>
              <svg className="bannerPhoto__arrow" width="22" height="20" viewBox="0 0 16 17" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.1893 9.5877L1 9.5877V8.0877L12.1893 8.0877L7.46967 3.36803L8.53033 2.30737L14.5303 8.30737L15.0607 8.8377L14.5303 9.36803L8.53033 15.368L7.46967 14.3074L12.1893 9.5877Z" fill="white"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BannerPhoto