import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs.tsx/BreadCrumbs';
import SingleProductDetails from '../../SingleProductDetails/SingleProductDetails';
import './SingleProductPage.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchSingleProduct } from '../../redux/slices/singleProduct';
import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../Types/Product';
import './SingleProductPage.scss';
import { setFromSearch } from '../../redux/slices/filter';
import { fetchProducts } from '../../redux/slices/products';

const SingleProductPage = () => {
  // const [filterProducts, setFilterProducts] = useState<Product[]>([])
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { subCategory, category, isNew, isSales, page, filterColors, filterSizes, sort } = useAppSelector(state => state.filters)
  const singleProduct = useAppSelector(state => state.singleProduct.product);
  const products = useAppSelector(state => state.products.products);
  const { searchValue } = useAppSelector(state => state.search);

  console.log(singleProduct);

  //-----fetch products----////
  const location = useLocation().pathname;
  const pathName = location.split('/').slice(1);
  const categoryName = pathName[0];
  const subcatName = pathName[1];
  const [searChParams, setSearchParams] = useSearchParams();
  const price = searChParams.get('price' || '');
  const colors = searChParams.getAll('color' || '');
  const sizes = searChParams.getAll('size' || '');
  const isFetch = useRef(false);

  useEffect(() => {
    if (location) {
      if (categoryName === 'new') {
        dispatch(setFromSearch({
          category: subcatName ? subcatName : '',
          subCategory: '',
          filterSizes: sizes,
          filterColors: colors,
          isNew: true,
          isSales: '',
          sort: price,
        }))
      }
      if (categoryName === 'sales') {
        dispatch(setFromSearch({
          category: subcatName ? subcatName : '',
          subCategory: '',
          filterSizes: sizes,
          filterColors: colors,
          isNew: '',
          isSales: 50,
          sort: price,
        }))
      }

      if (categoryName !== 'new' && categoryName !== 'sales') {
        dispatch(setFromSearch({
          category: categoryName,
          subCategory: subcatName === undefined ? '' : subcatName,
          filterSizes: sizes,
          filterColors: colors,
          isNew: '',
          isSales: '',
          sort: price,
        }))
      }
    
      dispatch(fetchProducts({ category, subCategory, isNew, isSales, page, sort, searchValue }))
      isFetch.current = true;
      console.log('go in fetch')
    }
  }, [isFetch.current])


  // useEffect(() => {
  //   const filterProducts = products.filter(item => item.category === category && item.subCategory === subCategory);
  //   setFilterProducts(filterProducts)
  //   isFetch.current = true;
  // }, [id])

console.log(isFetch.current)
  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
  }, [dispatch, id])

  return (
    <div className='singleProductPage app__section'>
      <div className="singleProductPage__wrapper">
        <BreadCrumbs />
        <SingleProductDetails singleProduct={singleProduct} />
        <ProductsSlider products={products} title='recommended' />
      </div>
    </div>
  )
}

export default SingleProductPage
