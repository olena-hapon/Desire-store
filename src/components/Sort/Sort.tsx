import React, { useEffect, useRef, useState } from 'react';
import './Sort.scss';
import OpenMenu from '../../images/openMenu.svg';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setColors, deleteColors, setSizes, deleteSizes, setSort } from '../../redux/slices/filter';

const Sort = () => {
   //------ redux filter -------//
  const dispatch = useAppDispatch();
  const filterColors = useAppSelector((state) => state.filters.filterColors);
  const filterSizes = useAppSelector((state) => state.filters.filterSizes);
  const sort = useAppSelector((state) => state.filters.sort)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let loc = useLocation().pathname;

  const listPrice = [
    { name: "Price descending", sortBy: "discountPrice", order: 'desc' },
    { name: "Price ascending", sortBy: "discountPrice", order: 'asc' }
  ];
  const listColors = ['pink', 'white', 'black', 'fuchsia', 'beige', 'blue', 'yellow', 'lime', 'brown', 'grey'];
  const listSize = ['s', 'm', 'l', 'xl', 'xxl'];


  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenColors, setIsOpenColors] = useState(false);
  const [isOpenSizes, setIsOpenSizes] = useState(false);
  const [isOpenMenuFilter, setIsOpenMenuFilter] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  let menuRef = useRef<HTMLDivElement>(null);
  let menuRefColors = useRef<HTMLDivElement>(null);
  let menuRefSizes = useRef<HTMLDivElement>(null);
  let menuMobileRef = useRef<HTMLDivElement>(null);

   //------ searchParams -------//
  const [searChParams, setSearchParams] = useSearchParams();
  const price = searChParams.get('price' || '');
  const colors = searChParams.getAll('color' || '');
  const sizes = searChParams.getAll('size' || '');

 
  let [priceList, setPriceList] = useState('');
  let [colorsList, setColorsList] = useState<string[]>([]);
  let [sizesList, setSizesList] = useState<string[]>([]);

  // useEffect(() => {
  //   dispatch(deleteColors());
  //   console.log(colors)
  //   setColorsList([]);
  //   dispatch(deleteSizes());
  //   setIsChecked(true);
  //   dispatch(setSort({name:'', sortBy: 'discountPrice', order: ''}));
  // },[loc])

  //-----setParams----///
  const handleChangePrice = (item, item2) => {
    const params = new URLSearchParams(searChParams);
    if (item === '') {
      params.delete('price')
      return
    } else {
      params.set('price', item);
      setSearchParams(params);
      // setIsOpenPrice(false);
      console.log(item2)
      dispatch(setSort(item2))
    }
  }

  const handleChangeColor = (item) => {
    const params = new URLSearchParams(searChParams);
    if (item === null) {
      params.delete('color')
    }
    const newColors = colors?.includes(item)
      ? colors.filter(color => color !== item)
      : [...colors, item];

    params.delete('color');
    newColors.forEach(color => params.append('color', color));
    setSearchParams(params);
    console.log(params)

      dispatch(setColors(item));
  }

  const handleChangeSizes = (item) => {
    const params = new URLSearchParams(searChParams);
    if (item === null) {
      params.delete('size')
    }
    const newSizes = sizes.includes(item)
      ? sizes.filter(size => size !== item)
      : [...sizes, item]

    params.delete('size');
    newSizes.forEach(size => params.append('size', size));
    setSearchParams(params);

      dispatch(setSizes(item));
  }
  
  const deleteFilters = () => {
    dispatch(deleteColors());
    dispatch(deleteSizes());
    dispatch(setSort({
      name: '',
      sortBy: 'discountPrice',
      order: '',
    }));
    setSearchParams('')
    setIsOpenMenuFilter(false)
  }
//----- onChange input ----//

  // const addToPriceList = (item) => {
  //   setPriceList(item);
  // };


  // const addColors = (item ) => {
  //   if (colors.includes(item)) {
  //     const params = new URLSearchParams(searChParams);
  //       if (item === null) {
  //         params.delete('color')
  //       }
  //       const newColors = colors?.includes(item)
  //       ? colors.filter(color => color !== item)
  //       : [...colors, item];

  //       params.delete('color');
  //       newColors.forEach(color => params.append('color', color));
  //       setSearchParams(params);
  //       } else {
  //        if (colorsList.includes(item)) {
  //         setColorsList((prev) => prev.filter(el => el !== item))
  //        } else {
  //         setColorsList((prev) => [...prev, item])
  //        }
  //   }
  // }

  // const addSizes = (item) => {
  //   if (sizes.includes(item)) {
  //     const params = new URLSearchParams(searChParams);
  //       if (item === null) {
  //         params.delete('size')
  //       }
  //       const newSizes = sizes?.includes(item)
  //       ? sizes.filter(size => size !== item)
  //       : [...sizes, item];

  //       params.delete('size');
  //       newSizes.forEach(size => params.append('size', size));
  //       setSearchParams(params);
  //       } else {
  //         if (sizesList.includes(item)) {
  //           setSizesList((prev) => prev.filter(el => el !== item))
  //          } else {
  //           setSizesList((prev) => [...prev, item])
  //          }
  //   }
  // }

//----- close menu with ref ----///

  useEffect(() => {
    const handlerMenu = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
        setIsOpenPrice(false);
      }

      if (menuRefSizes.current !== null && !menuRefSizes.current.contains(e.target)) {
        setIsOpenSizes(false);
      }

      if (menuRefColors.current !== null && !menuRefColors.current.contains(e.target)) {
        setIsOpenColors(false);
      }

      if (menuMobileRef.current !== null && !menuMobileRef.current.contains(e.target)) {
        setIsOpenMenuFilter(false)
      }
    }

    document.addEventListener('mousedown', handlerMenu)

    return () => {
      document.removeEventListener("mousedown", handlerMenu)
    }
  },)

//-----resize menuFilterMobile ----///
  useEffect(() => {
    const resizeObserver = new ResizeObserver(([{ target }]) => {
      const boudClientRect = target.getBoundingClientRect();

      if (boudClientRect.width > 714.475) {
        setIsOpenMenuFilter(false)
      }
    });

    if (menuMobileRef.current) {
      resizeObserver.observe(menuMobileRef.current)
    }
  }, [])
  
//----open MenuFilter-----////
  const toogleOpenMenuPrice = () => {
    setIsOpenPrice(!isOpenPrice)
  }

  const toogleOpenMenuColors = () => {
    setIsOpenColors(!isOpenColors)
  }

  const toogleOpenMenuSizes = () => {
    setIsOpenSizes(!isOpenSizes)
  }
  
  const checked = (obj) => {
    if (colorsList.includes(obj)) {
      setIsChecked(true)
    }
    if (colors.includes(obj)) {
      setIsChecked(true)
    }
  }

  return (
    <div
      ref={menuMobileRef}
      className={isOpenMenuFilter ? 'sort__menuMobile' : 'sort'}
    >
      <div className={isOpenMenuFilter ? "sort__wrapper__mobile sort__wrapper" : "sort__wrapper"}>
        {isOpenMenuFilter && (
          <button
            className="sort__mobile__close"
            onClick={() => setIsOpenMenuFilter(!isOpenMenuFilter)}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" fill="rgb(238, 109, 130)" />
            </svg>
          </button>
        )}
        {!isOpenMenuFilter && (<button
          className="sort__button"
          onClick={() => (setIsOpenMenuFilter(!isOpenMenuFilter))}
        >
          <div className="sort__button__dot"></div>
          Filters
        </button>
        )}
        <div
          className={isOpenMenuFilter ?
            "dropdownMenu__mobile"
            : "dropdownMenu"}
          ref={menuRef}
        >
          <button
            className={isOpenMenuFilter ?
              'dropdownMenu__btn dropdownMenu__btn--mobile '
              : 'dropdownMenu__btn'}
            onClick={() => (toogleOpenMenuPrice())}
          >
            Sort by
            {isOpenPrice ?
              <svg className="dropdownMenu__btn--down" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="pink" />
              </svg>
              : <svg className="dropdownMenu__btn--up" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="pink" />
              </svg>
            }
          </button>
          {isOpenPrice && (
            <ul className={isOpenMenuFilter ? 'dropdownMenu__list--mobile' : 'dropdownMenu__list'}>
              {listPrice.map((el, ind) => (
                <li className='dropdownMenu__item' key={ind}>
                  <div className='input__container'>
                    <label htmlFor={el.name} className='input__label'>
                      <input
                        type="radio"
                        name='sortBy'
                        id={el.name}
                        className='input'
                        checked={sort?.order === (el.order) || price?.includes(el.order)}
                        onChange={() => handleChangePrice(el.order, el)}
                      />
                      <span className='input__radioMock'></span>
                      {el.name}
                    </label>
                  </div>
                </li>
                
              ))}
              <div className="dropdownMenu__filterBtn">
                <button
                  className="dropdownMenu__filterBtn__text"
                  onClick={() => {setIsOpenPrice(!isOpenPrice); setIsOpenMenuFilter(!isOpenMenuFilter)}}
                >
                  Sort
                </button>
              </div>
            </ul>
          )}
        </div>

        <div
          className={isOpenMenuFilter ?
            "dropdownMenu__mobile"
            : "dropdownMenu"}
          ref={menuRefColors}
        >
          <button
            className={isOpenMenuFilter ?
              'dropdownMenu__btn dropdownMenu__btn--mobile'
              : 'dropdownMenu__btn'}
            onClick={() => (toogleOpenMenuColors())}
          >
            Colors
            {isOpenColors ?
              <svg className="dropdownMenu__btn--down" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="pink" />
              </svg>
              : <svg className="dropdownMenu__btn--up" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="pink" />
              </svg>
            }
          </button>
          {isOpenColors && (
            <ul className={isOpenMenuFilter ? 'dropdownMenu__list--mobile' : 'dropdownMenu__list'}>
              {listColors.map((el) => (
                <li className='dropdownMenu__item'>
                  <label
                    className={(filterColors.includes(el)) || colors.includes(el) ? 'input__checkbox-label input__checkbox-label--color' : 'input__checkbox-label'}>
                    <span
                      className='input__checkboxColor'
                      style={{ backgroundColor: el }}
                    ></span>
                    <input
                      type="checkbox"
                      name='sortByColors'
                      id={el}
                      className={filterColors.includes(el) || colors.includes(el)? 'input__checkbox input__checkbox--checked' : 'input__checkbox'}
                      value={el}
                      checked={filterColors.includes(el) || colors.includes(el)}
                      onChange={() => handleChangeColor(el)}
                    />
                    {el}
                  </label>
                </li>
              ))}
              <div className="dropdownMenu__filterBtn">
                <button
                  className="dropdownMenu__filterBtn__text"
                  onClick={() => {setIsOpenColors(!isOpenColors); setIsOpenMenuFilter(!isOpenMenuFilter)}}
                >
                  Filter
                </button>
              </div>
            </ul>
          )}
        </div>

        <div
          className={isOpenMenuFilter ?
            "dropdownMenu__mobile"
            : "dropdownMenu"}
          ref={menuRefSizes}
        >
          <button
            className={isOpenMenuFilter ?
              'dropdownMenu__btn dropdownMenu__btn--mobile '
              : 'dropdownMenu__btn'}
            onClick={() => (toogleOpenMenuSizes())}
          >
            Sizes
            {isOpenSizes ?
              <svg className="dropdownMenu__btn--down" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="pink" />
              </svg>
              : <svg className="dropdownMenu__btn--up" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="pink" />
              </svg>
            }
          </button>
          {isOpenSizes && (
            <ul className={isOpenMenuFilter ? 'dropdownMenu__list--mobile' : 'dropdownMenu__list'}>
              {listSize.map((el) => (
                <li className='dropdownMenu__item'>
                  <label htmlFor={el} className='input__label'>
                    <input
                      type="checkbox"
                      name='sortBySizes'
                      id={el}
                      className='input__checkbox--sizes'
                      value={el}
                      onChange={() => handleChangeSizes(el)}
                      checked={filterSizes.includes(el) || sizes.includes(el)}
                    />
                    <div className='input__checkbox__span'></div>
                    {el}
                  </label>
                </li>
              ))}
              <div className="dropdownMenu__filterBtn">
                <button
                  className="dropdownMenu__filterBtn__text"
                  onClick={() => {setIsOpenSizes(!isOpenSizes); setIsOpenMenuFilter(!isOpenMenuFilter)}}
                >
                  Filter
                </button>
              </div>
            </ul>
          )}
        </div>
        {(filterColors?.length > 0 || filterSizes.length > 0 || !!sort.name || price !== null || colors.length > 0 || sizes.length > 0) && (
          <div
            className={isOpenMenuFilter ? "dropdownMenu__mobile" : "dropdownMenu"}
            onClick={() => deleteFilters()}
            >
          <div className='dropdownMenu__deleteFilters'>Delete filters </div>
         </div>
        )}
      </div>
    </div>
  )
}

export default Sort