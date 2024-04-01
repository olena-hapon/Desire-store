import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import instagramIcon from '../../images/icons-instagram.svg';
import facebookIcon from '../../images/icons-facebook.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__blocks">

          <nav className="block">
            <h3 className="block__title">Customer service</h3>
              <ul className="block__list">
                <li className="block__item">
                  <Link to='/' className="block__link">Faq</Link>
                </li>
                <li className="block__item">
                  <Link to='/' className="block__link">Return/Exchange/Complaints</Link>
                </li>
                <li className="block__item">
                  <Link to='/' className="block__link">Delivery cost and time</Link>
                </li>
                <li className="block__item">
                  <Link to='/' className="block__link">Contact</Link>
                </li>
              </ul>
          </nav>

          <nav className="block">
            <h3 className="block__title">Information</h3>
              <ul className="block__list">
                <li className="block__item">
                  <Link to='/' className="block__link">Current promotion</Link>
                </li>
                <li className="block__item">
                  <Link to='/' className="block__link">Term and conditions</Link>
                </li>
                <li className="block__item">
                  <Link to='/' className="block__link">About us</Link>
                </li>
                <li className="block__item">
                  <Link to='/' className="block__link">Contact form information obligation</Link>
                </li>
              </ul>
          </nav>

          <nav className="block">
            <h3 className="block__title">Contact form information obligation</h3>
            <ul className="block__list">
              <li className="block__item">
                <Link to='/' className="block__link">Email us: desire.eu </Link>
              </li>

              <h3 className="block__title block__title--social">DeSire Universe</h3>
              <div className="block__socials">
                <li className="block__item">
                  <Link to='/' className="block__link">
                    <img className='block__social' src={facebookIcon} alt="social" />
                  </Link>
                </li>
                <li className="block__item">
                  <Link to='/' className="block__link">
                    <img className='block__social' src={instagramIcon} alt="social" />
                  </Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer