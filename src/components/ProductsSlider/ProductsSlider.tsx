/* eslint-disable no-param-reassign */
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import './ProductsSlider.scss';
import Card from '../Card/Card';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/products';
import { Link } from 'react-router-dom';
import { Product } from '../../Types/Product';
import { addToFavorites } from '../../redux/slices/favorites';
import { current } from '@reduxjs/toolkit';

type Props = {
  products: Product[],
  title: string
}

const ProductsSlider:React.FC<Props> = ({ products, title }) => {
//  const dispatch = useAppDispatch();
//  const { products } = useAppSelector(state => state.products);
//  const [scroll, setScroll] = useState(0);
//  const [sliderWidth, setSliderWidth] = useState(0);
//  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);

const TRANSITION_DURATION = 300;

const [offset, setOffset] = useState(1);
const [width, setWidth] = useState(0);
const [newProducts, setNewProducts] = useState<Product[]>();
const [clonesCount, setClonesCount ] = useState({head: 0, tail: 0})
const [transition, setTransition] = useState(TRANSITION_DURATION);
const [id, setId] = useState('')
const [ isInFavorite, setIsInFavorite ] = useState(false);
const [touchPosition, setTouchPosition] = useState<number | null>(null);
const dispatch = useAppDispatch();
const { favoritesItem } = useAppSelector(state => state.favorites);

let card = createRef<HTMLLIElement>();
const gap = 15;

useEffect(() => {
  if (products.length > 1) {
    setNewProducts([ products[products.length - 1], ...products, products[0] ])

    setClonesCount({head: 1, tail: 1})
  }

}, [products])


useEffect(() => {
  if (card.current) {
    let cardWidth = card.current.offsetWidth;
    setWidth(cardWidth);
    setOffset( -(clonesCount.head) * width - gap)
  }
}, [width, clonesCount])

useEffect(() => {
  if (transition === 0 ) {
    setTimeout(() => {
      setTransition(TRANSITION_DURATION)
    }, TRANSITION_DURATION)
  }
}, [transition])

useEffect(() => {
  const resizeHandler = () => {
    if (card.current) {
      let cardWidth = card.current.offsetWidth;
      setWidth(cardWidth);
      setOffset( -(clonesCount.head) * width - gap)
    }
    console.log('resize', card)
  }
// resizeHandler()
  window.addEventListener('resize', resizeHandler);

  return () => {window.removeEventListener('resize', resizeHandler)};
}, [card, width, clonesCount])

useEffect(() => {
  if (offset === 0 && newProducts) {
    console.log(offset)
    setTimeout(() => {
      setTransition(0);
      setOffset(-(width * (products?.length - 1 - clonesCount.tail) + (gap * (products.length - 2)) +1))
    }, TRANSITION_DURATION)
    return
  }
  if (newProducts && offset === -(width * (products?.length - 1 - clonesCount.tail) + (gap * (products.length - 2)))) {
    console.log(width, offset)
    setTimeout(() => {
      setTransition(0);
      setOffset(-(clonesCount.head * width +7))
    }, TRANSITION_DURATION)
    
  }
}, [offset, width, clonesCount, newProducts, products])
 
  const handleLeftClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + width + gap;
      return Math.min(newOffset, 0);
    });
  };

  const handleRightClick = () => {
    setOffset((currentOffset) => {
      const newOffset = (currentOffset - width) - (gap);
      const maxOffset = -(width * (products.length - 2) + (gap * (products.length -2)));
      return Math.max(newOffset, maxOffset)
    })
  }

  const handleTouchStart = (event:React.TouchEvent) => {
    const firstTouch = event.touches[0].clientX;
  
    setTouchPosition(firstTouch);
  };
  
  const moveTouch = (event:React.TouchEvent) => {
    if (touchPosition === null) {
      return;
    }
  
    const currentTouch = event.touches[0].clientX;
    const diff = touchPosition - currentTouch;
  
    if (diff > 5) {
      handleRightClick();
    }
  
    if (diff < -5) {
      handleLeftClick();
    }
  
    setTouchPosition(null);
  };

  return (
    <section className='productsSlider app__section'>
      <div className="productsSlider__wrapper">
        <h3 className="section-title">{title}</h3>
        
        <ul className="carousel"
          style={{
            transitionDuration: `${transition}ms`,
            transform: `translateX(${offset}px)`
          }}
          onTouchStart={event => handleTouchStart(event)}
          onTouchMove={event => moveTouch(event)}
        >
          {!!newProducts && (
            newProducts.map((product, index) => (
            <li className="carousel__item" ref={card} key={index}>
              {/* <Link to={`${product.category}/${product.id}/${product.title}`}className="corousele__item__link"> */}
                <Card product={product} key={product.id}/>
              {/* </Link> */}
              <div
                  className="favorites"
                  onClick={() => dispatch(addToFavorites(product))}
                >
                  { favoritesItem.filter((fav) => fav.id === product.id).length > 0 ? (
                    <svg width="30px" height="30px" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1.5C3.43198 1.5 1.75 3.1846 1.75 5.26948C1.75 5.87495 1.84536 6.3373 2.04471 6.76477C2.24842 7.20158 2.58188 7.64752 3.12462 8.19027L3.13231 8.19795L9.99996 15.4754L16.8618 8.20297L16.8695 8.19527C17.5768 7.48797 18.25 6.37996 18.25 5.26948C18.25 3.1846 16.568 1.5 14.5 1.5C12.5433 1.5 11.2185 3.10404 10.7342 5.42282C10.6615 5.7708 10.3545 6.01996 9.99899 6.01948C9.64349 6.019 9.33717 5.76901 9.26543 5.42083C8.78205 3.07478 7.45981 1.5 5.5 1.5ZM0.25 5.26948C0.25 2.36228 2.59745 0 5.5 0C7.66613 0 9.1427 1.27962 10.0037 2.983C10.865 1.29128 12.3384 0 14.5 0C17.4025 0 19.75 2.36228 19.75 5.26948C19.75 6.92677 18.7928 8.39016 17.9381 9.24799L10 17.661L2.05617 9.24312C1.45035 8.63624 0.989303 8.05067 0.685274 7.39875C0.375578 6.73467 0.25 6.04768 0.25 5.26948Z" fill="rgb(250, 176, 188)"/>
                  </svg>
                  ) : (
                    <svg width="30" height="30" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1.5C3.43198 1.5 1.75 3.1846 1.75 5.26948C1.75 5.87495 1.84536 6.3373 2.04471 6.76477C2.24842 7.20158 2.58188 7.64752 3.12462 8.19027L3.13231 8.19795L9.99996 15.4754L16.8618 8.20297L16.8695 8.19527C17.5768 7.48797 18.25 6.37996 18.25 5.26948C18.25 3.1846 16.568 1.5 14.5 1.5C12.5433 1.5 11.2185 3.10404 10.7342 5.42282C10.6615 5.7708 10.3545 6.01996 9.99899 6.01948C9.64349 6.019 9.33717 5.76901 9.26543 5.42083C8.78205 3.07478 7.45981 1.5 5.5 1.5ZM0.25 5.26948C0.25 2.36228 2.59745 0 5.5 0C7.66613 0 9.1427 1.27962 10.0037 2.983C10.865 1.29128 12.3384 0 14.5 0C17.4025 0 19.75 2.36228 19.75 5.26948C19.75 6.92677 18.7928 8.39016 17.9381 9.24799L10 17.661L2.05617 9.24312C1.45035 8.63624 0.989303 8.05067 0.685274 7.39875C0.375578 6.73467 0.25 6.04768 0.25 5.26948Z" fill="#fff"/>
                  </svg>
                )}
              </div>
            </li>
          )))}
        </ul>
        <div className="carousel__nav">
          <button className="carousel__nav__btn carousel__nav__btn--prev" onClick={handleLeftClick}>
            <svg className="carousel__nav-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="#fff"/>
          </svg>
          </button>
          <button className="carousel__nav__btn carousel__nav__btn--next" onClick={handleRightClick}>
            <svg className="carousel__nav-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="#fff"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSlider;