import React, {useEffect, useState} from 'react';
import Sort from '../Sort/Sort';
import { Product } from '../../Types/Product';
import Card from '../Card/Card';
import './ProductsList.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useLocation } from 'react-router-dom';
import { addToFavorites } from '../../redux/slices/favorites';
import NoProducts from '../NoProducts/NoProducts';

type Props = {
  products: Product[];
}

const ProductsList:React.FC<Props> = ({ products }) => {
const [limits, setLimits] = useState(8);
const pathName = useLocation().pathname;
const dispatch = useAppDispatch();
const { favoritesItem } = useAppSelector(state => state.favorites);

  const loadMore = () => {
     setLimits(limits + 4)
  }

  useEffect(() => {
    setLimits(8)
  }, [pathName])

  useEffect(() => {

  },)

  const sliceProducts = products && products.slice(0, limits)
  return (
    <div className="productsList">
      <Sort />
      <div className={products.length <= 0 ? "productsList__wrapper--none" : "productsList__wrapper"}>
        {sliceProducts.length > 0 ? (
          sliceProducts.map((prod) => (
            <div className="productsList__card" key={prod.id}>
              <Card product={prod} />
              <div
                className="favorites"
                onClick={() => dispatch(addToFavorites(prod))}
              >
                { favoritesItem.filter((fav) => fav.id === prod.id).length > 0 ? (
                  <svg width="30px" height="30px" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1.5C3.43198 1.5 1.75 3.1846 1.75 5.26948C1.75 5.87495 1.84536 6.3373 2.04471 6.76477C2.24842 7.20158 2.58188 7.64752 3.12462 8.19027L3.13231 8.19795L9.99996 15.4754L16.8618 8.20297L16.8695 8.19527C17.5768 7.48797 18.25 6.37996 18.25 5.26948C18.25 3.1846 16.568 1.5 14.5 1.5C12.5433 1.5 11.2185 3.10404 10.7342 5.42282C10.6615 5.7708 10.3545 6.01996 9.99899 6.01948C9.64349 6.019 9.33717 5.76901 9.26543 5.42083C8.78205 3.07478 7.45981 1.5 5.5 1.5ZM0.25 5.26948C0.25 2.36228 2.59745 0 5.5 0C7.66613 0 9.1427 1.27962 10.0037 2.983C10.865 1.29128 12.3384 0 14.5 0C17.4025 0 19.75 2.36228 19.75 5.26948C19.75 6.92677 18.7928 8.39016 17.9381 9.24799L10 17.661L2.05617 9.24312C1.45035 8.63624 0.989303 8.05067 0.685274 7.39875C0.375578 6.73467 0.25 6.04768 0.25 5.26948Z" fill="rgb(250, 176, 188)"/>
                  </svg>
                  ) : (
                  <svg width="30" height="30" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1.5C3.43198 1.5 1.75 3.1846 1.75 5.26948C1.75 5.87495 1.84536 6.3373 2.04471 6.76477C2.24842 7.20158 2.58188 7.64752 3.12462 8.19027L3.13231 8.19795L9.99996 15.4754L16.8618 8.20297L16.8695 8.19527C17.5768 7.48797 18.25 6.37996 18.25 5.26948C18.25 3.1846 16.568 1.5 14.5 1.5C12.5433 1.5 11.2185 3.10404 10.7342 5.42282C10.6615 5.7708 10.3545 6.01996 9.99899 6.01948C9.64349 6.019 9.33717 5.76901 9.26543 5.42083C8.78205 3.07478 7.45981 1.5 5.5 1.5ZM0.25 5.26948C0.25 2.36228 2.59745 0 5.5 0C7.66613 0 9.1427 1.27962 10.0037 2.983C10.865 1.29128 12.3384 0 14.5 0C17.4025 0 19.75 2.36228 19.75 5.26948C19.75 6.92677 18.7928 8.39016 17.9381 9.24799L10 17.661L2.05617 9.24312C1.45035 8.63624 0.989303 8.05067 0.685274 7.39875C0.375578 6.73467 0.25 6.04768 0.25 5.26948Z" fill="#fff"/>
                  </svg>
                )}
              </div>
            </div>
            ))) 
              : (
                <NoProducts />
              )
        }
      </div>

      {
        products.length > 0 && (
          <button
            className='productsList__button'
            onClick={() => loadMore()}
            disabled={limits > sliceProducts.length}
          >
            {(products.length) > limits ? 'Show more' : 'all products'}
          </button>
        )
      }
    </div>
  )
}

export default ProductsList