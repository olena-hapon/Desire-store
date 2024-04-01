import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './SingleProductDetails.scss';
import { Product } from '../Types/Product';
import { current } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setModal } from '../redux/slices/filter';
import Modal from '../components/Modal/Modal';
import '../components/Modal/Modal.scss';
import SizeTable from '../images/sizeTable.jpg';
import { addToFavorites } from '../redux/slices/favorites';
import { addItems } from '../redux/slices/cartSlice';

type Props = {
  singleProduct: Product | undefined;
}

const SingleProductDetails:React.FC<Props> = ({ singleProduct }) => {
  console.log(singleProduct)
  const dispatch = useAppDispatch();
  let lo = useLocation().pathname;
  const { id } = useParams();
  const dispath = useAppDispatch();
  const { favoritesItem } = useAppSelector(state => state.favorites)
  const [side, setSide] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [selectValue, setSelectValue] = useState('Choose size');
  const [clickSelect, setClickSelect] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSizeInfoModal, setOpenSizeInfoModal] = useState(false);
  const [noAddSize, setNoAddSize] = useState(false);
  const length = !!singleProduct?.images.length ? singleProduct.images.length : 0;
  let selectRef = useRef<HTMLDivElement>(null);

  console.log(singleProduct?.category)

  let sizes = ['s', 'm', 'l', 'xl', 'xxl'];
  let womanSizesChest = {
    s: 86,
    m: 90,
    l: 94,
    xl: 98,
    xxl: 102,
  } 
  
  let WomanSizeWaist = {
    s: 70,
    m: 74,
    l: 78,
    xl: 82,
    xxl: 86
  }
  let manSizesChest = {
    s: 92,
    m: 96,
    l: 100,
    xl: 104,
    xxl: 108,
  } 
  
  let manSizeWaist = {
    s: 82,
    m: 88,
    l: 94,
    xl: 100,
    xxl: 106,
  }


  useEffect(() => {
    const closeSelect = (e) => {
      // if (modalRef.current !==null && !modalRef.current.contains(e.target)) {
      //   setOpenModal(false);
      //   dispath(setModal(false))
      //   console.log('select2')
      // }
      if (selectRef.current !== null && !selectRef.current.contains(e.target)) {
        setClickSelect(false)
        console.log('select')
      }
    }

  document.addEventListener('mousedown', closeSelect)
    return () => {
      document.removeEventListener('mousedown', closeSelect)
    }
  })

  const onClickBtnLeft = (event) => {
     setSide((event.currentTarget.dataset.side))
     setCurrentPhoto((current) => current === 0 ? length - 1  : current - 1)
     console.log(currentPhoto)
  };
  console.log(currentPhoto)

  const onClickBtnRight = (event) => {
    setSide((event.currentTarget.dataset.side))
    setCurrentPhoto((current) => current === length - 1 ? 0 : current + 1)
  };

  const onClickBtnPhoto = (ind) => {
    setCurrentPhoto(ind)
  };

  const onChangeSize = (size) => {
    if (size === selectValue) {
      setSelectValue('Choose size')
      setClickSelect(false)
    } else {
      setSelectValue(size);
      setClickSelect(false);
    }
  };

  const onAddToCard = (selectValue) => {
    if (['s','m','l','xl','xxl'].includes(selectValue)) {
      setOpenModal(true);
      setNoAddSize(false);
      dispath(setModal(true))
    } else {
      setNoAddSize(true);
      dispath(setModal(false))
    }
  }

  //--------Add to cart-------//
  const addTocard = (singleProduct) => {
    const item = {
      id: singleProduct?.id,
      title: singleProduct?.title,
      imageUrl: singleProduct?.images[0],
      discountPrice: singleProduct?.discountPrice,
      price: singleProduct?.price,
      color: singleProduct?.color,
      category: singleProduct?.category,
      subCategory: singleProduct?.subCategory,
      size: selectValue,
    }

    dispatch(addItems(item))
  }
  return (
    <div className='singleProductDetails'>
      <div className="singleProductDetails__left-side">
        <div className="gallery">
          <div className="gallery__thumbnails">
            <div className="gallery__thumbnails__container">
              <div className="gallery__thumbnails__wrapper">
                <ul>
                  {!!singleProduct && singleProduct.images.map((image, ind) => (
                    <li
                      key={ind}
                      className={currentPhoto === ind
                      ? "gallery__thumbnails__styled gallery__thumbnails__styled--active"
                      : "gallery__thumbnails__styled"
                    }>
                    <img
                      src={image}
                      alt="gallery"
                      className="gallery__thumbnails__img"
                      onClick={() => onClickBtnPhoto(ind)}
                    />
                  </li>
                  ))}
                  
                </ul>
              </div>
            </div>
          </div>

          <div className="gallery__mainPhoto">
            <div className="gallery__mainPhoto__wrapper">
              <button
                className={side === 'left'
                ?"gallery__btn gallery__btn--click gallery__btn--left"
                : "gallery__btn gallery__btn--left"
              }
                data-side="left"
                onClick={(event) => onClickBtnLeft(event)}
              >
                <svg className="" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" clipRule="evenodd" d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z" fill="pink"/>
              </svg>
              </button>
              <div className="gallery__mainPhoto__container">
                <div className="gallery__mainPhoto__swipe">
                  {!!singleProduct && singleProduct.images.map((image, ind) => (
                    <div
                      key={ind}
                      className={currentPhoto === ind ?
                        " gallery__mainPhoto__styled gallery__mainPhoto__styled--active"
                        : "gallery__mainPhoto__styled"
                      }
                    >
                      <img
                        src={image}
                        alt="galleryPhoto"
                        className="gallery__mainPhoto__img"
                      />
                    </div>
                  ))}
                </div>
                
              </div>
              <button
                 className={side === 'right'
                 ? "gallery__btn gallery__btn--click gallery__btn--right"
                 : "gallery__btn gallery__btn--right"
                  }
                data-side="right"
                onClick={(event) => onClickBtnRight(event)}
              >
                <svg className="" width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="pink"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="singleProductDetails__right-side">
        <div className="right-side right-side__wrapper">
          <div className="right-side__title">
            <h1>{singleProduct?.title}</h1>
          </div>
          <div className="right-side__price">
            <span className="right-side__price__discount">
              {singleProduct?.discountPrice}$
            </span>
            <span className="right-side__price__regular">
              {singleProduct?.price}$
            </span>
          </div>

          <div className="right-side__color">
            <p className="right-side__color__title">Choose colors:
              <span>{singleProduct?.color}</span>
            </p>
            <ul className="right-side__color__choose">
              {!!singleProduct && singleProduct?.colors.length > 1 ?(
                <>
                  <li
                    className={id === singleProduct.id ?"right-side__color__choose__item right-side__color__choose__item--active"
                    : "right-side__color__choose__item"
                  }
                  >
                  <Link
                    to={`/${singleProduct.category}/${singleProduct.subCategory}/${singleProduct.id}/${singleProduct.title.replaceAll(' ', '-')}`}>
                    <img src={singleProduct.images[0]} alt="" />
                  </Link>
                </li>
                <li
                  className={id === singleProduct.relatedProdId ?"right-side__color__choose__item right-side__color__choose__item--active"
                  : "right-side__color__choose__item"
                }
                >
                  <Link
                    to={`/${singleProduct.category}/${singleProduct.subCategory}/${singleProduct.relatedProdId}/${singleProduct.relatedProdTitle?.replaceAll(' ', '-')}`}>
                    <img src={singleProduct.img2} alt="" />
                  </Link>
                </li>
                </>
              ) : (
                <li
                className={id === singleProduct?.id ?"right-side__color__choose__item right-side__color__choose__item--active"
                : "right-side__color__choose__item"
              }
                >
                <Link to={`/${singleProduct?.category}/${singleProduct?.subCategory}/${singleProduct?.id}/${singleProduct?.title.replaceAll(' ', '-')}`}>
                  <img src={singleProduct?.images[0]} alt="" />
                </Link>
              </li>
              )
            }
            </ul>
          </div>

          <div className="right-side__sizes">
            <div
              className="right-side__sizes__sizeInfo"
              onClick={() => {setOpenSizeInfoModal(!openSizeInfoModal); dispatch(setModal(true))}}
            >
              {noAddSize && <div className='right-side__sizes__noAdd'>Choose sizes</div>}
              <div className="right-side__sizes__sizeInfo__wrapper">
                <button className="right-side__sizes__sizeInfo__trigger">Size quide</button>
              </div>
            </div>

            <div
              className="sizesDropdownMenu"
              ref={selectRef}
              >
              <div
                className={clickSelect ? 
                  "sizesDropdownMenu__select sizesDropdownMenu__select--click"
                  : "sizesDropdownMenu__select"
                }
                onClick={() => setClickSelect(!clickSelect)}
              >
                <span className="sizesDropdownMenu__select__size">
                  {selectValue}
                </span>
                <span className={clickSelect ?
                  "sizesDropdownMenu__select__trigger--click"
                  : "sizesDropdownMenu__select__trigger"
                  }>
                </span>
              </div>

            {clickSelect && 
              <div className="sizesDropdownMenu__listContainer">
                <ul className="sizesDropdownMenu__list">
                  {singleProduct?.aviable.map((el, ind) => (
                    <li
                      className={selectValue === el.size ?
                        "sizesDropdownMenu__list__item sizesDropdownMenu__list__item--select"
                        : "sizesDropdownMenu__list__item"
                      }
                      key={ind}
                      onClick={() => onChangeSize(el.size)}
                    >
                      <div className="sizesDropdownMenu__list__item__wrap">
                        <div className="sizesDropdownMenu__list__item__size">
                          {el.size}
                        </div>
                        <span style={{fontSize: 14, color: 'lightgray'}}>{`${el.quantity} items left`}</span>
                        <span className={selectValue === el.size ?
                          "sizesDropdownMenu__list__icon"
                          : ''
                        }></span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            }
          </div>
        </div>
        <div className="cartConfirmation">
          <div
            className="cartConfirmation__add"
            onClick={() => addTocard(singleProduct)}
          >
              <button
                className="cartConfirmation__Btn"
                onClick={() => onAddToCard(selectValue)}
              >
                Add to cart
                <span className="cartConfirmation__Btn__icon">
                <svg fill="pink" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
	                width="20px" height="20px" viewBox="0 0 902.86 902.86"
	              >
                  <g>
	                  <g>
		                  <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.           751V577.829z
			                M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
		                  <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			                c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.           743-108.744
			                c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			                C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			                c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.           432,209.46,716.897z
			                M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.           742,40.743-40.742
			                .162,694.432,619.162,716.897z"/>
	                  </g>
                  </g>
                </svg>
                </span>
              </button>
            </div>
            <div
              className="cartConfirmation__addToFav"
              onClick={() => dispatch(addToFavorites(singleProduct))}
            >
              <div className="cartConfirmation__heart">
                {singleProduct && favoritesItem.filter((fav) => fav.id === singleProduct.id).length > 0 ? (
                    <svg width="30px" height="30px" viewBox="0 -1 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Icon-Set-Filled"  transform="translate(-102.000000, -882.000000)" fill="pink">
                          <path d="M126,882 C122.667,882 119.982,883.842 117.969,886.235 C116.013,883.76 113.333,882 110,882 C105.306,882 102,886.036 102,890.438 C102,892.799 102.967,894.499 104.026,896.097 L116.459,911.003 C117.854,912.312 118.118,912.312 119.513,911.003 L131.974,896.097 C133.22,894.499 134,892.799 134,890.438 C134,886.036 130.694,882 126,882" id="heart-like" ></path>
                        </g>
                      </g>
                    </svg>
                    ) : (
                    <svg width="30" height="30" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1.5C3.43198 1.5 1.75 3.1846 1.75 5.26948C1.75 5.87495 1.84536 6.3373 2.04471 6.76477C2.24842 7.20158 2.58188 7.64752 3.12462 8.19027L3.13231 8.19795L9.99996 15.4754L16.8618 8.20297L16.8695 8.19527C17.5768 7.48797 18.25 6.37996 18.25 5.26948C18.25 3.1846 16.568 1.5 14.5 1.5C12.5433 1.5 11.2185 3.10404 10.7342 5.42282C10.6615 5.7708 10.3545 6.01996 9.99899 6.01948C9.64349 6.019 9.33717 5.76901 9.26543 5.42083C8.78205 3.07478 7.45981 1.5 5.5 1.5ZM0.25 5.26948C0.25 2.36228 2.59745 0 5.5 0C7.66613 0 9.1427 1.27962 10.0037 2.983C10.865 1.29128 12.3384 0 14.5 0C17.4025 0 19.75 2.36228 19.75 5.26948C19.75 6.92677 18.7928 8.39016 17.9381 9.24799L10 17.661L2.05617 9.24312C1.45035 8.63624 0.989303 8.05067 0.685274 7.39875C0.375578 6.73467 0.25 6.04768 0.25 5.26948Z" fill="pink"/>
                    </svg>
                    )
                }
              </div>
            </div>
          </div>

          <div className="right-side__inform">
            <div className="right-side__inform__wrap">
              <div className="right-side__inform__delivery"></div>
              <p>Free delivery by 100$</p>
            </div>
           
            <div className="right-side__inform__wrap">
              <div className="right-side__inform__return"></div>
              <p>30 days to return</p>
            </div>
        </div>
      </div>
      {/* {openModal && ( */}
        <Modal
          singleProduct={singleProduct}
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectValue={selectValue}
        >
          <div className="modal__body">
            <div className="modal__icon"></div>
            <h4 className="modal__title">Product added</h4>
            <div className="modal__body__wrapper">
              <img src={singleProduct?.images[0]} alt="" className="modal__img" />
                <div className="modal__desc">
                  <div className="modal__name">{singleProduct?.title}</div>
                  <div className="modal__price">{singleProduct?.discountPrice}$</div>
                  <div className="modal__size">Size {selectValue.toUpperCase()}</div>
                </div>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="modal__btn"
              onClick={() => {setOpenModal(!openModal); dispatch(setModal(false))}}
            >
              Continue Shopping
            </button>
            <Link
              className="modal__btn"
              to={'/cart'}>Procesed to payment
            </Link>
          </div>
        </Modal>

        <Modal
          singleProduct={singleProduct}
          openModal={openSizeInfoModal}
          setOpenModal={setOpenSizeInfoModal}
          selectValue={selectValue}
        >
          <div className='size-table'>
            <div className='size-table__container'>
              <div className="size-table__woman">
                <h3 className="size-table__title">Size guide for woman</h3>
                  <div className="size-table__wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th className='size-table__first'><span>Size</span></th>
                            {sizes.map((size, ind) => (
                          <th key={ind}className='size-table__th'><span>{size}</span></th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='size-table__colored'>
                          <td className='size-table__first'><span>chest</span></td>
                          {sizes.map((size, ind) => (
                            <td key={ind} className='size-table__td'><span>{womanSizesChest[size]}</span></td>
                          ))}
                        </tr>
                        <tr>
                          <td className='size-table__first'><span>Waist</span></td>
                            {sizes.map((size, ind) => (
                          <td key={ind} className='size-table__td'>{WomanSizeWaist[size]}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="size-table__man">
                  <h3 className="size-table__title">Size guide for man</h3>
                  <div className="size-table__wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th className='size-table__first'><span>Size</span></th>
                          {sizes.map((size, ind) => (
                            <th key={ind}className='size-table__th'><span>{size}</span></th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='size-table__colored'>
                        <td className='size-table__first'><span>chest</span></td>
                          {sizes.map((size, ind) => (
                            <td key={ind} className='size-table__td'><span>{manSizesChest[size]}</span></td>
                          ))}
                      </tr>
                      <tr>
                        <td className='size-table__first'><span>Waist</span></td>
                          {sizes.map((size, ind) => (
                            <td key={ind}className='size-table__td'>{manSizeWaist[size]}</td>
                          ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <img src={SizeTable} alt="" className="size-table__img" />
          </div>
        </Modal>
     
      {/* )} */}

      {/* {openModal && <div className="modal">
        <div className="modal__styled" ref={modalRef}>
          <div className="modal__content">
            <div className="modal__header">
              <button
                className="modal__close"
                onClick={() => {setOpenModal(!openModal); dispath(setModal(false))}}
              >

              </button>
            </div>
            <div className="modal__body">
              <div className="modal__icon"></div>
              <h4 className="modal__title">Product added</h4>
              <div className="modal__body__wrapper">
                <img src={singleProduct?.images[0]} alt="" className="modal__img" />
                <div className="modal__desc">
                  <div className="modal__name">{singleProduct?.title}</div>
                  <div className="modal__price">{singleProduct?.discountPrice}$</div>
                  <div className="modal__size">Size {selectValue.toUpperCase()}</div>
                </div>
              </div>
            </div>

            <div className="modal__buttons">
              <button
                className="modal__btn"
                onClick={() => {setOpenModal(!openModal); dispath(setModal(false))}}
              >
                Continue Shopping
              </button>
              <Link
                className="modal__btn"
                to={'/'}>Procesed to payment
              </Link>
            </div>
          </div>
        </div>
       </div>
      } */}
    </div>
  </div>
  )
}

export default SingleProductDetails