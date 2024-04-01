import React, { useEffect, useState } from 'react';
import './Card.scss';
import { Product } from '../../Types/Product';
import favorites from '../../images/favorites.svg';
import { Link, useLocation } from 'react-router-dom';
import { link } from 'fs';
import { useAppDispatch } from '../../redux/store';
import { setCategory, setSubCategory } from '../../redux/slices/filter';

type Props = {
  product: Product;
  clickInput?: boolean;
}

const Card:React.FC<Props> = ({ product, clickInput }) => {
  const dispatch = useAppDispatch();

  const location = useLocation().pathname;
  const pathName = location.split('/').slice(1);

  const getPathName = (prod) => {
    if (pathName[1] !== undefined && pathName.length < 3) {
      // console.log(1)
      return `./${prod.category}/../${prod.subCategory}/../${prod.id}/${prod.title.replaceAll(' ', '-')}`
    }  else if (!pathName[0]){
      // console.log(2)
      return `/${prod.category}/${prod.subCategory}/${prod.id}/${prod.title.replaceAll(' ', '-')}`
    } else if (pathName.length >= 3) {
      // console.log(3)
       return `../${prod.category}/${prod.subCategory}/${prod.id}/${prod.title.replaceAll(' ', '-')}`
    } else if (pathName[0] === 'new' || pathName[0] === 'sales') {
      return `./${prod.category}/${prod.id}/${prod.title.replaceAll(' ', '-')}`
    } else {
      // console.log(4)
      return `./../${prod.category}/${prod.subCategory}/${prod.id}/${prod.title.replaceAll(' ', '-')}`
    }
  }
  
  const onPressSubCat = (prod) => {
    dispatch(setCategory(prod.category));
    dispatch(setSubCategory(prod.subCategory));
  };

  return (
    <div className='card'>
      
      <Link
        to={(getPathName(product))}
        
        className="card__link"
        onClick={() => onPressSubCat(product)}
      >
        <div className={!clickInput ? "card__images" : "card__images card__images--300"}>
          <img src={product.images[0]} alt="card" className='card__img card__images--main'/>
          <img src={product.images[1]} alt="card" className="card__img card__images--second" />
          <div className="card__hover">
            <ul className="card__hover__list">
              {product.aviable.map((el, ind) => (
                <li key={ind}>{el.size}</li>
              ))}
            </ul>
          </div>
      </div>
      
      <div className="card__new">new</div>
      <h2 className='card__title'>{product.title}</h2>
      <div className="card__price-wrapper">
        <span className="card__price">{product.discountPrice}$</span>
        <span className="card__price card__price--disc">{product.price}$</span>
      </div>
      </Link>
    </div>
  )
}

export default Card;