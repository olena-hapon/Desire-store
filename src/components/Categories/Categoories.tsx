import React from 'react';
import { Link } from 'react-router-dom';
import dresses from '../../images/Categories/dresses.png';
import jackets from '../../images/Categories/jacket.png';
import sweatersMan from '../../images/Categories/men__sweaters.png';
import sweatersWoman from '../../images/Categories/brown-oversize-sweater-kaylin-01.png'
import newCat from '../../images/Categories/woman__new.jpg';
import sales from '../../images/Categories/sweaters.png';
import './Categories.scss';
import { useAppDispatch } from '../../redux/store';
import { setCategory, setSubCategory, setIsNew, setSales } from '../../redux/slices/filter';


const Categoories = () => {
  const dispatch = useAppDispatch();

  const categories = [
    {link: 'woman/dresses', category:'woman', subCat: 'dresses',
    img: dresses, class: 'category category__dresses'
  },
    {link: 'woman/jackets', category:'woman', subCat: 'jackets',
    img: jackets, class: 'category category__jackets'
  },
    {link: 'woman/sweaters', category:'woman', subCat: 'sweaters',
    img: sweatersWoman, class: 'category category__sweaterWoman'
  },
    {link: 'mans/sweaters', category:'mans', subCat: 'sweaters',
    img: sweatersMan, class: 'category category__sweaterMan'
  },
    {link: 'new', category:'new', subCat: 'new',
    img: newCat, class: 'category category__new'
  },
    {link: 'sales', category:'sales', subCat: 'sales -50%',
    img: sales, class: 'category category__sales'
  }
]

const onClickLink = (catLink, subLink) => {
  if (catLink === 'new') {
    dispatch(setCategory(''))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(true))
    dispatch(setSales(''))
  }

  if (catLink === 'sales') {
    dispatch(setCategory(''))
    dispatch(setSubCategory(''))
    dispatch(setIsNew(''))
    dispatch(setSales(50))
  }

  if (catLink !== 'new' && catLink !== 'sales') {
    dispatch(setCategory(catLink))
    dispatch(setSubCategory(subLink))
    dispatch(setIsNew(''))
    dispatch(setSales(''))
  }
}
  return (
    <div className='categories app__section'>
      <div className="categories__wrapper">
        {categories.map((cat, ind) => (
          <Link
            key={ind}
            to={cat.link}
            className={cat.class}
            onClick={() => (onClickLink(cat.category, cat.subCat))}
          >
            <div className="category__wrapper">
              <img
                src={cat.img}
                alt="image"
                className="category__img"
              />
              <div className="category__title">{cat.subCat}</div>
              <button className="category__button">
                Check now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categoories;