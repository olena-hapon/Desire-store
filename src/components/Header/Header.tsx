import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Search from '../Search/Search';
import help from '../../images/help-circle.svg';
import favorites from '../../images/favorites.svg';
import account from '../../images/outline-account.svg';
import cart from '../../images/outline-cart.svg';
import heart from '../../images/icons8-heart-48-corral.png';
import womanNew from '../../images/woman__new.jpg';
import manNew from '../../images/man__new.jpg';
import { fetchCategory } from '../../redux/slices/category';
import { setCategory, setSubCategory, setIsNew, setSales, setToogleMenuMobile } from '../../redux/slices/filter';
import MiniCart from '../MiniCart/MiniCart';
import MenuMobile from '../MenuMobile/MenuMobile';
import Skeleton from '../Skeleton/Skeleton';
import UserAccountMini from '../UserAccauntMini/UserAccountMini';


const Header = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const dispatch = useAppDispatch();
  const menuSearch = useAppSelector(state => state.filters.menuSearch);
  const { category } = useAppSelector(state => state.category);
  const status = useAppSelector(state => state.category.status);
  const showForm = useAppSelector(state => state.user.showForm);
  const favoritesItem = useAppSelector(state => state.favorites.favoritesItem);
  const { items } = useAppSelector(state => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const user = useAppSelector(state => state.user.user);
  const title = '';

  useEffect(() => {
    dispatch(fetchCategory());
  }, [])
 

  const onClickCat = (ev) => {
    dispatch(setCategory(ev))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(''))
    dispatch(setSales(''))
  }

  const onClickSubCat = (el1, el2) => {
    dispatch(setCategory(el1))
    dispatch(setSubCategory(el2))
    dispatch(setIsNew(''))
    dispatch(setSales(''))
  }

  const onClickNewWomans = (el) => {
    dispatch(setCategory(el))
    dispatch(setSubCategory(''))
    dispatch(setSales(''))
    dispatch(setIsNew(true))
  }

  const onClickNewMans = (el) => {
    dispatch(setCategory(el))
    dispatch(setSubCategory(''))
    dispatch(setSales(''))
    dispatch(setIsNew(true))
  }

  const onClickNew = () => {
    dispatch(setCategory(''))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(true))
    dispatch(setSales(''))

  }

  const onClickSales = () => {
    dispatch(setCategory(''))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(''))
    dispatch(setSales(50))
  }

 useEffect(() => {
  let maxScroll = 150;
  let lastScroll = 0;

  const fixedHeader = () => {
    if (window.scrollY <= maxScroll) {
      setHideHeader(false);
      // lastScroll = window.scrollY;
      // console.log("first" + window.scrollY)
    } else if (window.scrollY < lastScroll) {
      setHideHeader(false);
      lastScroll = window.scrollY;
      // console.log("second" + window.scrollY)
    } else if (window.scrollY > lastScroll) {
      setHideHeader(true);
      lastScroll = window.scrollY;
      // console.log("third" + window.scrollY)
    } else {
      setHideHeader(false);
      // console.log("else" + window.scrollY)
    }
  }

  window.addEventListener('scroll', fixedHeader);
    return () => {
      window.removeEventListener('scroll', fixedHeader)
  }
 }, [])

  return (
    <header className={hideHeader ? "header__remove header" : "header"}>
      <div className="header__sticky">
        <div className="header__wrapper">
          <div className="header__top">
            <div className="header__help">
              <Link className='header__link' to='/'>
                <img
                  src={help}
                  className='icon'
                  alt="header-help"
                />
                <span className="text">Help</span>
              </Link>
            </div>

            <div className="header__top__right">
            <Link className='header__link' to='/favorites'>
                <img
                  src={favorites}
                  className='icon'
                  alt="header-help"
                />
                <span className="text">Favorites</span>
                {favoritesItem.length > 0 ? (
                  <span>({favoritesItem.length})</span>
                ) : (
                  ''
                )}
              </Link>

              <Link className='header__link header__link__account' to='account'>
                <img
                  src={account}
                  className='icon'
                  alt="header-help"
                />
                <span className="text">Account</span>
                <div className="header__miniCart">
                  <UserAccountMini />
                </div>
              </Link>
              <Link className='header__link header__link__cart' to='/cart'>
                <img
                  src={cart}
                  className='icon'
                  alt="header-help"
                />
                <span className="text">Cart</span>
                {totalCount > 0 ? (
                  <span>({totalCount})</span>
                ) : (
                  ''
                )}
                <div className='header__miniCart'>
                  {items.length > 0 ? (
                     <MiniCart products={items}/>
                  ) : (
                    ''
                  )}
                </div>
              </Link>
            </div>
          </div>

          <Link
            className='logo'
            to='/'
          >
            <div>DeSire</div>
            {/* <span><img src={heart} alt="heart" style={{height: 30,width: 30}}/></span> */}
          </Link>

          <div className={!!menuSearch ? "header__bottom__spBt" : "header__bottom"}>
            {status === 'loading' ? (
              <Skeleton type='topHeader'/>
            ) : (
              <div className="header__bottom__left-side">
              <div className="open-menu">
                <button
                  className="open-menu__button"
                  onClick={() => {setOpenMenuMobile(!openMenuMobile); dispatch(setToogleMenuMobile(true))}}
                />
              </div>

              <MenuMobile
                openMenuMobile={openMenuMobile}
                setOpenMenuMobile={setOpenMenuMobile}
              />

              <nav className={!!menuSearch ? "nav--hidden" : "nav"}>
                <ul className='nav__list'>
                  {!!category && (
                    category.map((item) => (
                      <li className='nav__item' key={item.id}>
                        <NavLink
                          to={item.title}
                          className={({isActive}) => classNames('nav__link', {
                            'nav__link--active': isActive
                          })}
                          onClick={() => (onClickCat(item.title))}
                        >
                        {item.title}
                        </NavLink>
                        <div className="nav__subcategories">
                          <ul className="submenu__list">
                            {item.id === 1 ? (
                              item.subcat.map((subcat) => (
                                <li className='submenu__item' key={subcat.id}>
                                  <Link
                                    to={`${item.title}/${subcat.name}`}
                                    className="submenu__link"
                                    onClick={() => (onClickSubCat(item.title, subcat.name))}
                                  >
                                    {subcat.name}
                                  </Link>
                                </li>
                              ))
                            ) : (
                              item.subcat.map(subcat => (
                                <li className='submenu__item' key={subcat.id}>
                                  <Link
                                    to={`${item.title}/${subcat.name}`}
                                    className="submenu__link"
                                    onClick={() => (onClickSubCat(item.title, subcat.name))}
                                  >
                                    {subcat.name}
                                  </Link>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </li>
                    ))
                  )}

                  <li className='nav__item'>
                    <NavLink
                      to='new'
                      className={({isActive}) => classNames('nav__link', {
                        'nav__link--active': isActive
                      })}
                      onClick={() => onClickNew()}
                    >
                      new
                    </NavLink>
                    <div className="nav__subcategories">
                      <ul className="new__list">
                        <li className="new__list__item">
                          <Link
                            to='/new/woman'
                            className='new__list__link'
                            onClick={() => (onClickNewWomans('woman'))}
                          >
                            <img src={womanNew} alt="" />
                          </Link>
                          <span>woman</span>
                        </li>
                       
                        <li className='new__list__item'>
                          <Link
                            to='/new/mans'
                            className='new__list__link'
                            onClick={() => onClickNewMans('mans')}
                          >
                            <img src={manNew} alt="" />
                          </Link>
                          <span>mans</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                  
                  <li className='nav__item'>
                    <NavLink
                      to='sales'
                      className={({isActive}) => classNames('nav__link', {
                      'nav__link--active': isActive
                    })}
                    onClick={() => onClickSales()}
                    >
                      sales -50%
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            )}
            

            <Search />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header