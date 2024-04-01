import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyCart.scss';

const EmptyCart = () => {
  return (
    <div className='emptyCart'>
      <h1 className="emptyCart__title">You cart is empty</h1>
        <div className="emptyCart__continue">
          <Link to='/'>
            Continue shopping
          </Link>
        </div>
        <div className="emptyCart__wrapList">
          <ul className="emptyCart__list">
            <li className="emptyCart__item">
              <Link to='../new'>new</Link>
            </li>
            <li className="emptyCart__item">
              <Link to='../woman'>woman</Link>
            </li>
            <li className="emptyCart__item">
              <Link to='../sales'>sales</Link>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default EmptyCart