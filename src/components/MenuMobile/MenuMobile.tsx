import React, { useState } from 'react';
import './MenuMobile.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { setToogleMenuMobile } from '../../redux/slices/filter';
import classNames from 'classnames';
import facebook from '../../images/icons-facebook.svg';
import instagram from '../../images/icons-instagram.svg';
import viber from '../../images/icons8-viber.svg';
import whatsaap from '../../images/icons8-whatsapp.svg';
import help from '../../images/help-circle.svg';
import account from '../../images/outline-account.svg';

type Props = {
  openMenuMobile: boolean;
  setOpenMenuMobile: (arg0:boolean)=>void;
}

const MenuMobile:React.FC<Props> = ({ openMenuMobile, setOpenMenuMobile}) => {
  const dispatch = useAppDispatch();
  const [activeLink, setActiveLink] = useState<number>(0);
  const [toogleLink, setToogleLink] = useState(false);
  console.log(toogleLink, activeLink);

  const category = [
    {
      "id": 1,
      "title": "woman",
      "subcat": [
        {
          "name": "dresses",
          "id": 3
        },
        {
          "name": "jackets",
          "id": 4
        },
        {
          "name": "jeans",
          "id": 5
        },
        {
          "name": "sweaters",
          "id": 6
        },
        {
          "name": "shirts",
          "id": 7
        }
      ]
    },
    {
      "id": 2,
      "title": "mans",
      "subcat": [
        {
          "name": "jackets",
          "id": 8
        },
        {
          "name": "jeans",
          "id": 9
        },
        {
          "name": "sweaters",
          "id": 10
        },
        {
          "name": "shirts",
          "id": 11
        }
      ]
    },
    {
      "id": 3,
      "title": "new",
      "subcat": [
        {
          "name": "mans",
          "id": 12
        },
        {
          "name": "woman",
          "id": 13
        }
      ]
    },
    {
      "id": 4,
      "title": "sales",
      "subcat": [
        {
          "name": "man",
          "id": 14
        },
        {
          "name": "woman",
          "id": 15
        }
      ]
    }
  ]

  const onClickMenuMobLink = (id) => {
    setActiveLink(+id);
    setToogleLink(!toogleLink)
  }

  const onClickLink = (event) => {
    event.preventDefault();
  };

  return (
    <div className={!!openMenuMobile ? 'menuMobile menuMobile__active' : 'menuMobile'}>
      <div className="menuMobile__top">
        <span className="menuMobile__logo">DeSire</span>
        <button
          className='menuMobile__btn'
          onClick={() => {setOpenMenuMobile(!openMenuMobile); dispatch(setToogleMenuMobile(false))}}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" fill="#4e4d4d"/>
          </svg>
        </button>
      </div>

      <div className="menuMobile__content">
        <ul className="menuMobile__list">
          {category.map(cat => (
            <li
              key={cat.id}
              className="menuMobile__item"
              onClick={() => onClickMenuMobLink(cat.id)}
            >
            <Link
              to={cat.title}
              onClick={(event) => onClickLink(event)}
              className={!!toogleLink && activeLink === cat.id ? 'menuMobile__link active' : "menuMobile__link"
              }
            >{cat.title}
            </Link>
            <ul className={activeLink === cat.id && !!toogleLink ?
              "menuMobile__subMenu menuMobile__subMenu--active"
              : "menuMobile__subMenu"}
            >
              {!!cat.subcat && cat.subcat.map(sub => (
                <li
                  key={sub.id}className="menuMobile__subMenu__item"
                  onClick={() => {setOpenMenuMobile(!openMenuMobile); dispatch(setToogleMenuMobile(false))}}
                >
                <Link to={`${cat.title}/${sub.name}`} className="menuMobile__subMenu__link">{sub.name}</Link>
              </li>
              ))}
            </ul>
          </li>
          ))}
        </ul>
      </div>
      
      <div className="menuMobile__help">
        <div className="menuMobile__help__list">
          <Link to="/" className='menuMobile__help__link'>
            <div className="menuMobile__help__img">
              <img src={help} alt="" />
            </div>
            <span>Help</span>
          </Link>
          <Link to="/" className='menuMobile__help__link'>
            <div className="menuMobile__help__img">
              <img src={account} alt="" />
            </div>
            <span>Account</span>
          </Link>
        </div>
      </div>
      <div className="menuMobile__footer">
        <div className="menuMobile__footer__title">We are in social</div>
          <div className="menuMobile__footer__list">
            <Link to="/"className="menuMobile__footer__link">
              <img src={facebook} alt="" className="menuMobile__footer__img" />
            </Link>
            <Link to="/"className="menuMobile__footer__link">
              <img src={instagram} alt="" className="menuMobile__footer__img" />
            </Link>
            <Link to="/"className="menuMobile__footer__link">
              <img src={whatsaap} alt="" className="menuMobile__footer__img" />
            </Link>
            <Link to="/"className="menuMobile__footer__link">
              <img src={viber} alt="" className="menuMobile__footer__img" />
            </Link>
          </div>
      </div>
    </div>
  )
}

export default MenuMobile