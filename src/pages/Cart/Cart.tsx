import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setModal } from '../../redux/slices/filter';
import './Cart.scss';
import carIcon from '../../images/delivery-truck.svg';
import prodImg from '../../images/beige-winter-jacket-lores-03.png';
import cartMark from '../../images/cartMark.svg';
import visa from '../../images/Payments__img/visa-mastercard.svg';
import googlePay from '../../images/Payments__img/google.png';
import applepay from '../../images/Payments__img/apple-pay-2.png';
import curierMethod from '../../images/Payments__img/couriermethodcod.svg';
import truck from '../../images/delivery-truck.svg';
import safe from '../../images/safe.svg';
import minus from '../../images/Minus.svg';
import plus from '../../images/Plus.svg';
import returnIcon from '../../images/icon-return.svg';
import { addToFavorites } from '../../redux/slices/favorites';
import { decraseItem, deleteItems, increaseItem } from '../../redux/slices/cartSlice';
import EmptyCart from '../../components/EmptyCart/EmptyCart';

const Cart = () => {
  let lo = useLocation().pathname;
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);
  const totalPrice = useAppSelector(state => state.cart.totalPrice);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  
  useEffect(() => {
    if (lo === '/cart') {
      dispatch(setModal(false))
    }
  },)

  return (
    <div className='cart'>
      {items.length > 0 ? (
        <div className="cart__grid">
        <div className="cart__content">
        <h1 className="cart__title">
          <span className="cart__title__text">Cart</span>
          <span className="cart__title__quantity">{totalCount} QTY</span>
        </h1>
        <div className="cart__delivery">
          <img src={carIcon} alt="" className="cart__delivery__img" />
          <p className="cart__delivery__info">
            Free delivery by 100$
          </p>
        </div>
        
        {items.map((item, ind) => (
          <div key={ind}className="cart__products">
          <div className="cart__products__grid">
            <div className="cart__products__photoWrap">
              <Link
                to={`../${item.category}/${item.subCategory}/${item.id}/${item.title.replaceAll(' ', '-')}`} className="cart__products__photoWrap__link"
              >
                <img src={item.imageUrl} alt="" className="cart__products__photoWrap__img" />
              </Link>
            </div>

            <div
              className="cart__products__heart"
              onClick={() => dispatch(addToFavorites(item))}
            >
              <div className="cart__products__heart__icon">
                <svg width="25" height="25" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1.5C3.43198 1.5 1.75 3.1846 1.75 5.26948C1.75 5.87495 1.84536 6.3373 2.04471 6.76477C2.24842 7.20158 2.58188 7.64752 3.12462 8.19027L3.13231 8.19795L9.99996 15.4754L16.8618 8.20297L16.8695 8.19527C17.5768 7.48797 18.25 6.37996 18.25 5.26948C18.25 3.1846 16.568 1.5 14.5 1.5C12.5433 1.5 11.2185 3.10404 10.7342 5.42282C10.6615 5.7708 10.3545 6.01996 9.99899 6.01948C9.64349 6.019 9.33717 5.76901 9.26543 5.42083C8.78205 3.07478 7.45981 1.5 5.5 1.5ZM0.25 5.26948C0.25 2.36228 2.59745 0 5.5 0C7.66613 0 9.1427 1.27962 10.0037 2.983C10.865 1.29128 12.3384 0 14.5 0C17.4025 0 19.75 2.36228 19.75 5.26948C19.75 6.92677 18.7928 8.39016 17.9381 9.24799L10 17.661L2.05617 9.24312C1.45035 8.63624 0.989303 8.05067 0.685274 7.39875C0.375578 6.73467 0.25 6.04768 0.25 5.26948Z" fill="pink"/>
                </svg>
              </div>
              <span className="cart__products__heart__text">Add to favorites</span>
            </div>
             
            <button
              className="cart__products__remove"
              onClick={() => dispatch(deleteItems(item))}
            >
              <span className="cart__products__remove__icon"></span>
              <span>Delete</span>
            </button>

            <div className="cart__products__headline">
              <Link
                to={`../${item.category}/${item.subCategory}/${item.id}/${item.title.replaceAll(' ', '-')}`}
                className="cart__products__headline__link"
              >
                {item.title}
              </Link>
            </div>
            
            <div className="cart__products__options">
              <div className="cart__products__color">Color: {item.color}</div>
              <div className="cart__products__size">Size: {item.size}</div>
            </div>
            

            <div className="cart__products__price">
              <div className="cart__products__fullPrice">{item.discountPrice}$</div>
              <div className="cart__products__discountPrice">{item.price}$</div>
            </div>
            
            <div className="cart__products__aviable">Aviable</div>
            
            <div className="cart__products__quantity">
              <span className="cart__products__quantity__title">Quantity</span>
              <div className="cart__products__quantity__buttons">
                <button
                  disabled={item.count === 1}
                  onClick={() => dispatch(decraseItem(item))}
                  className="cart__products__quantity__btn"
                >
                  <img src={minus} alt="" />
                </button>
                <span className="cart__products__quantity__text">{item.count}</span>
                <button
                  className="cart__products__quantity__btn"
                  onClick={() => dispatch(increaseItem(item))}
                >
                  <img src={plus} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        ))}

        <div className="cart__someText">
          <div className='cart__someText__icon'>
            <img src={cartMark} alt="cartMark" />
          </div>
          <span>Do not delay with the purchase, adding items to the cart does not mean their reservation.</span>
        </div>

        <div className="cart__paymentMethods">
          <div className="cart__paymentMethods__title">Payment methods</div>
          <ul className="cart__paymentMethods__list">
            <li className="cart__paymentMethods__item">
              <img src={visa} alt="" className="cart__paymentMethods__img" />
            </li>
            <li className="cart__paymentMethods__item">
              <img src={googlePay} alt="" className="cart__paymentMethods__img" />
            </li>
            <li className="cart__paymentMethods__item">
              <img src={applepay} alt="" className="cart__paymentMethods__img" />
            </li>
            <li className="cart__paymentMethods__item">
              <img src={curierMethod} alt="" className="cart__paymentMethods__img" />
            </li>
          </ul>
        </div>
      </div>
      <div className="cart__sideBar">
        <div className="cart__sideBar__wrapper">

          <div className="cart__sideBar__summary">
            <div className="cart__sideBar__summary__row">
              <div className="cart__sideBar__summary__text">Products price</div>
              <div className="cart_-sideBar__summary__price">{totalPrice} $</div>
            </div>
            <div
              className="cart__sideBar__summary__row cart__sideBar__summary__row--line"
            >
              <div className="cart__sideBar__summary__text">Delivery</div>
              <div className="cart_-sideBar__summary__price">From $ 0</div>
            </div>
            <div className="cart__sideBar__summary__row">
              <div className="cart__sideBar__summary__text cart__sideBar__summary__text--total">Total</div>
              <div className="cart__sideBar__summary__price cart__sideBar__summary__price--total">{totalPrice} $</div>
            </div>
          </div>
          
          <div className="cart__sideBar__checkout">
            <button className="cart__sideBar__checkout__btn">Go to checkout</button>
          </div>

          <form action="" className="cart__sideBar__coupon">
            <div className="cart__sideBar__coupon__wrap">
              <label htmlFor="">
                Add coupon
                <input type="text" />
              </label>
            </div>
            <button className="cart__sideBar__coupon__add">
              Add
            </button>
          </form>

          <ul className="cart__sideBar__list">
            <li className="cart__sideBar__list__item">
              <img src={truck} alt="truck" />
              <p className="cart__sideBar__list__text">Free delivery on purchases products over 100$ delivery cost</p>
            </li>
            <li className="cart__sideBar__list__item">
              <img src={returnIcon} alt="returnIcon" />
              <p className="cart__sideBar__list__text">Free return up to 30 days</p>
            </li>
            <li className="cart__sideBar__list__item">
              <img src={safe} alt="safeShoping" />
              <p className="cart__sideBar__list__text">Safe shopping in Desire</p>
            </li>
          </ul>
        </div>
      </div>
      </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  )
}

export default Cart