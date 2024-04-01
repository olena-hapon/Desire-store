import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
// import { fetchCategory } from '../../redux/slices/category';
import { Category } from '../../redux/slices/category';
import './Filters.scss';
import classNames from 'classnames';
import { setCategory, setSubCategory, setIsNew, setSales } from '../../redux/slices/filter';


type Props = {
  links: Category[];
}

const Filters:React.FC<Props> = ({ links }) => {
  const [fixed, setFixed] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const pathName = location.split('/').slice(1);
  const categoryName = pathName[0];
  // const dispatch = useAppDispatch();
  const { subCategory } = useAppSelector(state => state.filters);
  // const title = 'woman';
  
  // useEffect(() => {
  //   dispatch(fetchCategory({title}));
  // }, [dispatch])

  const onClickCategory = (ev) => {
    dispatch(setCategory(ev))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(''))
    dispatch(setSales(''))
  }

  const onClickSubCategory = (el1, el2) => {
    dispatch(setCategory(el1))
    dispatch(setSubCategory(el2))
    dispatch(setIsNew(''))
    dispatch(setSales(''))
  }

  const onClickNewWoman = (el) => {
    dispatch(setCategory(el))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(true))
    dispatch(setSales(''))
  }
  const onClickNewMan = (el) => {
    dispatch(setCategory(el))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(true))
    dispatch(setSales(''))
  }
  const onClickSalesWoman = (el) => {
    dispatch(setCategory(el))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(''))
    dispatch(setSales(50))
  }
  const onClickSalesMan = (el) => {
    dispatch(setCategory(el))
    dispatch(setSubCategory(''))
    dispatch(setSales(50))
    dispatch(setIsNew(''))
  }



  useEffect(() => {
    let maxScroll = 163;
    let scroll = 0;

    const toggleFixed = () => {
      if (window.scrollY <= maxScroll) {
        setFixed(false)
  
        // console.log(`1 ${scroll}`)

      } else if (scroll > window.scrollY) {
        scroll = window.scrollY
        setFixed(false)

        console.log(`2 ${scroll} ${maxScroll}`)
      } else if (window.scrollY > maxScroll) {
        setFixed(true);
        scroll = window.scrollY
        // console.log(`3 ${scroll}` )
      } else {
        setFixed(false)
        // console.log(`4 ${scroll}` )
      }
    }
  
  window.addEventListener('scroll', toggleFixed);
    return () => {
      window.removeEventListener('scroll', toggleFixed)
    }
  }, [])


  return (
    <div className='filters'>
      <div className={fixed ? "filters__fixed" : "filters__wrapper"}>
        {!!links && links.map((item) => (
          <li key={item.id}>
            <NavLink
              to={`../${item.title}`}
              className={({isActive}) =>
              classNames('filters__title',
              {'filters__title--active': isActive
              })}
              onClick={() => (onClickCategory(item.title))}
            >
              {item.title}
            </NavLink>
            <ul className='filters__list'>
              {item.subcat.map((el) => (
                <li className='filters__item' key={el.id}>
                  <Link
                    to={`../${item.title}/${el.name}`}
                    className={el.name === subCategory ? 'filters__link' : ''}
                    onClick={() => (onClickSubCategory(item.title, el.name))}
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {categoryName === 'new' &&
          <ul className='filters__list'>
            <li>
              <NavLink to='../new/woman'
              className={({isActive}) =>
              classNames('filters__title',
              {'filters__title--active': isActive
              })}
              onClick={() => (onClickNewWoman('woman'))}
              >
                woman
              </NavLink>
            </li>
            <li className='filters__title'>
              <NavLink to='../new/mans'
              className={({isActive}) =>
              classNames('filters__title',
              {'filters__title--active': isActive
              })}
              onClick={() => (onClickNewMan('mans'))}
              >
                mans
              </NavLink>
            </li>
          </ul>
        }

        {categoryName === 'sales' &&
          <ul className='filters__list'>
            <li>
              <NavLink to='../sales/woman'
              className={({isActive}) =>
              classNames('filters__title',
              {'filters__title--active': isActive
              })}
              onClick={() => (onClickSalesWoman('woman'))}
              >
                woman
              </NavLink>
            </li>
            <li className='filters__title'>
              <NavLink to='../sales/mans'
              className={({isActive}) =>
              classNames('filters__title',
              {'filters__title--active': isActive
              })}
              onClick={() => (onClickSalesMan('mans'))}
              >
                mans
              </NavLink>
            </li>
          </ul>
        }
      </div>
    </div>
  )
}

export default Filters
