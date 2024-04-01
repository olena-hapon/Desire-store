import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { setModal } from '../../redux/slices/filter';
import { Product } from '../../Types/Product';
import '../SizeGuide/SizeGuide.scss';

type Props = {
  singleProduct?: Product;
  openModal: boolean;
  setOpenModal: (boolean) => void;
  selectValue?: string,
  // openSizeInfoModal: boolean,
  // setOpenSizeInfoModal: (boolean) => void;
  children;
}

const Modal:React.FC<Props> = ({
  singleProduct,
  openModal,
  setOpenModal,
  selectValue,
  children,
}) => {

  let modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const closeSelect = (e) => {
      if (modalRef.current !==null && !modalRef.current.contains(e.target)) {
        // setOpenSizeInfo(false)
        dispatch(setModal(false))
        setOpenModal(false);
        console.log('select2')
        console.log(openModal)
      }
    }
    console.log(openModal)
  document.addEventListener('mousedown', closeSelect)
    return () => {
      document.removeEventListener('mousedown', closeSelect)
    }
  }, [openModal])

  return (
    <div className={openModal ? "modal modal__active" : "modal"}>
      <div className={openModal ? "modal__styled modal__styled__active" : "modal__styled"} ref={modalRef}>
        <div className= "modal__content">
          <div className="modal__header">
            <button
              className="modal__close"
              onClick={() => {setOpenModal(!openModal); dispatch(setModal(false))}}
            >
            </button>
          </div>
          {singleProduct && (
          <>
            {children}
            {/* <div className="modal__body">
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
            </div> */}
          </>
        )}

        {/* {openSizeInfo && (
          <div>
            {size.map(el => (
              el.sizes?.map(el2 => (
                <>
                <div className={el2 === el2[0] ? "el1" : "el2"}>{el2}</div>
                </>
              ))
            ))}
            {size.map(el => (
              el.chest?.map(el2 => (
                <div className={el2 === el2[0] ? "el1" : "el2"}>{el2}</div>
              ))
            ))}
          </div>
        )} */}
      </div>
    </div>
  </div>
)}

export default Modal