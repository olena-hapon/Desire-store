import React, { useCallback, useEffect, useState, useRef, createRef, useMemo } from 'react';
import './searchDropdown.scss';
import searchIcon from '../../images/Search.svg';
import crossIcon from '../../images/Cross.svg';
import notFoundProd from '../../images/icon-notProducts.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Card from '../Card/Card';
import '../../components/ProductsSlider/ProductsSlider.scss';
import { deleteColors, deleteSizes, setColors, setSizes, setSort, setToogleNenuSearch } from '../../redux/slices/filter';
import { useParams, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { setSearch } from '../../redux/slices/search';
import { fetchProducts } from '../../redux/slices/products';
import ProductsList from '../ProductsList/ProductsList';
import { setCategory, setSubCategory, setIsNew, setSales } from '../../redux/slices/filter';
import { getFiltersByColors } from '../../pages/ProductsContainer/ProductsContainer';
import { Product } from '../../Types/Product';

type Props = {
  clickInput: boolean;
  setClickInput: (arg0:boolean)=>void;
}

const SearchDropdown:React.FC<Props> = ({ clickInput, setClickInput}) => {
  const prodArray = ['dress', 'sweater', 'jeans', 'jacket', 'shirt'];
  const [inputValue, setInputValue] = useState('');
  const [filterProd, setFilterProd] = useState<Product[]>([]);
  const [cardWidth, setCardWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searChParams, setSearchParams] = useSearchParams();
  const menuMainRef = useRef<HTMLDivElement>(null);

//--------dispatch-------/////
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const { subCategory, category, isNew, isSales, page, sort, filterColors, filterSizes } = useAppSelector(state => state.filters);
  const { searchValue } = useAppSelector(state => state.search);

  const refUpdate = useRef(false);
  let cardRef = createRef<HTMLLIElement>();
  let cardGap;
  console.log(cardWidth)

  //----cardWidth----////
  useEffect(() => {
    if (cardRef.current) {
      let cardWidth = cardRef.current.offsetWidth;
      cardGap = 15;
      setCardWidth(cardWidth + cardGap);
    }
  }, [cardWidth])

  useEffect(() => {
    const resizeHandler = () => {
      if (cardRef.current) {
        let cardWidthResize = cardRef.current.offsetWidth;
        setCardWidth(cardWidthResize);
      }
      console.log('resize', cardRef)
    }
  // resizeHandler()
    window.addEventListener('resize', resizeHandler);
  
    return () => {window.removeEventListener('resize', resizeHandler)};
  }, [cardRef, cardWidth])

  const leftClickSlider = () => {
    setCurrentIndex((prev) => prev === 0 ? products.length - 1 : prev - 1)
    console.log({currentIndex})
  }

  const rightClickSlider = () => {
    setCurrentIndex((prev) => prev === products.length - 2 ? 0 : prev + 1)
  }

  // useEffect(() => {
  //   // dispatch(deleteColors());
  //   // dispatch(deleteSizes());
  //   // dispatch(setSort({name:'', sortBy: 'discountPrice', order: ''}));
  //   dispatch(setSearch(''))
  // },[location])

  useEffect(() => {
    dispatch(setCategory(''))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(''))
    dispatch(setSales(''))
    setSearchParams('')
    refUpdate.current = true;
  }, [])

  useEffect(() => {
      dispatch(fetchProducts({ category, subCategory, isNew, isSales, page, sort, searchValue }))
  }, [dispatch, searchValue, sort])

  useEffect(() => {
    let filtered = getFiltersByColors(products, filterColors, filterSizes);

    setFilterProd(filtered)
  }, [products, filterColors, filterSizes, sort])

  console.log(sort.order)

  const filterBySearch = useCallback(() => {
    if (!!searchValue) {
      let filterBySearch = filterProd.filter(prod => prod.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      console.log(filterBySearch)
      return setFilterProd(filterBySearch);
    };
  }, [searchValue])

  const updateSearchValue = useCallback(
    debounce((str:string) => {
      const params = new URLSearchParams(searChParams);
      if (str === null ) {
        params.delete('search')
        return
      } else {
        params.set('search', str);
        setSearchParams(params);
        dispatch(setSearch(str))
        console.log('go in searchDROP')
    }
    }, 1000),
    [],
  );

  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value)
  };
  
  const onClearSearch = () => {
    dispatch(setSearch(''));
    setInputValue('');
    setSearchParams('');
    dispatch(deleteColors());
    dispatch(deleteSizes());
  };

  useEffect(() => {
    const handlerMenu = (e) => {
      if (menuMainRef.current !== null && !menuMainRef.current.contains(e.target)) {
        setClickInput(false);
        dispatch(setToogleNenuSearch(false));
        dispatch(setSearch(''));
        setInputValue('');
        console.log('go in searchDropdown')
        const params = new URLSearchParams(searChParams);
        
          params.delete('search');
          setSearchParams(params);
        
      }
    }

    document.addEventListener('mousedown', handlerMenu)

    return () => {
      document.removeEventListener("mousedown", handlerMenu)
    }
  },[])

  return (
    <div className={(products.length > 0 && inputValue) ? "searchDropdown searchDropdown__hidden" : "searchDropdown"}>
      <div
        className={!!inputValue && products.length <= 0 ?
        "searchDropdown__main searchDropdown__main--noProducts"
        :  (products.length > 0 && inputValue) ?
          "searchDropdown__main searchDropdown__main--hidden"
          : "searchDropdown__main"
        }
        ref={menuMainRef}
      >
        <div className="searchDropdown__input__top">
          <div className="searchDropdown__input">
            <span className="searchDropdown__input__icon">
              <img src={searchIcon} alt="search" />
            </span>
            <input
              type="text"
              placeholder='Search'
              value={inputValue}
              className="searchDropdown__input__field"
              onChange={onChangeInput}
            />
            {inputValue && (
              <span
                className="searchDropdown__input__icon"
                onClick={() => onClearSearch()}
              >
                <img src={crossIcon} alt="crossIcon" />
              </span>
              )}
          </div>
          {(!inputValue) ? (
            <span className="searchDropdown__input__quantity--hidden"></span>
          ) : (
            <span className="searchDropdown__input__quantity">{products.length} products</span>
          )}
          
        </div>

        <div className="searchDropdown__contentWrapper">
          <div className={products.length > 0 && !!inputValue ?
          "searchDropdown__content searchDropdown__content__fullSize"
          : "searchDropdown__content"
        }>
            
              <div className={!!inputValue && filterProd.length > 0 ? "searchDropdown__list" : "searchDropdown__list--hidden"}>
                <ProductsList products={filterProd}/>
              </div>
            
            {filterProd.length <= 0 && !!inputValue && (
              <div className={"searchDropdown__notFound"}>
                <div className="searchDropdown__notFound__img">
                  <img src={notFoundProd} alt="" />
                </div>
                <div className="searchDropdown__notFound__content">
                  <p className="searchDropdown__notfound__text">Not found results for:</p>
                  <p className="searchDropdown__notfound__text">'{inputValue}'</p>
                </div>
              </div>
            )}
            
            {(products.length > 0 && !inputValue) && (
              <>
              <div className="searchDropdown__leftSide">
              <div>Most populate</div>
              <div className="searchDropdown__chip__wrap">
                {prodArray.map((prod, ind) => (
                  <div
                    className="searchDropdown__chip" 
                    key={ind}
                    onClick={() => {dispatch(setSearch(prod)); setInputValue(prod)}}
                  >
                    <button>{prod}</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="searchDropdown__rightSide">
              <div className="searchDropdown__rightSide__wrap">
                <span>More view</span>
                <ul
                  className="searchDropdown__rightSide__slider"
                  style={{transform: `translateX(-${currentIndex * cardWidth}px)`}}
                >
                  {products.map(prod => (
                    <li
                      ref={cardRef}
                      className="searchDropdown__rightSide__slider__item" 
                      key={prod.id}
                      onClick={() => {setClickInput(!clickInput); dispatch(setToogleNenuSearch(false))}}
                    >
                      <Card product={prod} clickInput={clickInput}/>
                    </li>
                  ))}
                </ul>
                <div className="carousel__nav">
                  <button
                    className="carousel__nav__btn carousel__nav__btn--prev"
                    onClick={() => leftClickSlider()}
                  >
                    <svg className="carousel__nav-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="#fff"/>
                    </svg>
                  </button>
                  <button
                    className="carousel__nav__btn carousel__nav__btn--next"
                    onClick={() => rightClickSlider()}
                  >
                    <svg className="carousel__nav-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="#fff"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default SearchDropdown