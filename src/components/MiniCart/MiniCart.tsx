import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MiniCart.scss';
import { AddtoCart } from '../../Types/AddtoCart';
import { useAppSelector } from '../../redux/store';

type Props = {
  products: AddtoCart[];
}

const MiniCart:React.FC<Props> = ({ products}) => {
  const [transf, setTransf] = useState(0);
  const [opas, setOpas] = useState(0);

  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const totalPrice = useAppSelector(state => state.cart.totalPrice);

  const onClickBtn =() => {
    navigate('/cart')
  }

  // useEffect(() => {
  //   const scrollBar = () => {
  //     if (!!listRef.current && listRef.current.translate) {
  //       console.log(listRef.current.scrollHeight)
  //       setTransf(0)
  //       setOpas(1)
  //     }
    
  //   }
  
  //   window.addEventListener('scroll', scrollBar);
  //     return () => {
  //       window.removeEventListener('scroll', scrollBar)
  //   }
  //   scrollBar()
  // },[])

  /////------------------------------------//////

  // const handleMouseDown = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (listRef.current) setInitialScrollTop(listRef.current.scrollTop);
  //   setIsDragging(false);
  //   setTransf(0);
  //   setOpas(0);
  //   console.log('go in down')
  // }

  // const handleMouseUp = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //     setIsDragging(true);
  //     console.log('go in up')
    
  // }

  // const handleMouseMove = (e) => {
     
  //   if (isDragging && listRef.current) {
  //     const {
  //       scrollHeight: contentScrollHeight,
  //       offsetHeight: contentOffsetHight,
  //     } = listRef.current;

  //     const deltaY = 
  //       (e.clientY - scrollStartPosition) * (contentOffsetHight / 20);
  //       const newScrollTop = Math.min(
  //         initialScrollTop + deltaY,
  //         contentScrollHeight - contentOffsetHight
  //       );

  //       listRef.current.scrollTop = newScrollTop

  //       setTransf(50);
  //       setOpas(1);
  //       console.log('go in move')
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('mousemove', handleMouseMove);
  //   document.addEventListener('mouseup', handleMouseUp);
  //   document.addEventListener('mouseleave', handleMouseUp);

  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //     document.removeEventListener('mousemove', handleMouseUp);
  //     document.removeEventListener('mousemove', handleMouseUp);
  //   }
  // })

  const handleWheel = (e) => {
    if (! listRef.current ||! trackRef.current) {
      return;
    }

      const { scrollTop: contentTop, scrollHeight: contentHeight } = listRef.current;
      const { clientHeight: trackHeight } = trackRef.current;
      let newTop = (+contentTop / +contentHeight) * trackHeight;
      console.log(newTop)
      newTop = Math.min(newTop, trackHeight - 190);

      setTransf(newTop);
      setOpas(1)
      setTimeout(() => {
        setOpas(0)
      }, 500)
  }

  return (
    <div className='minicart'>
      <h3 className='minicart__title'>Cart</h3>
      <div className="minicart__list">
        <div className="minicart__list__container"
          ref={listRef}
          onWheel={(event) => handleWheel(event)}
        >
          
          
          {products.map((prod, ind) => (
            <div key={ind} className="minicart__item">
              <div className="minicart__img">
                <img src={prod.imageUrl} alt="imgCart" />
              </div>
              <div className="minicart__details">
                <p className="minicart__name">{prod.title}</p>
                <p className="minicart__size">Size: {prod.size}</p>
                <p className="minicart__color">Color: {prod.color}</p>
              </div>
              <div className="minicart__price">
                <div className="minicart__price__fullPrice">{prod.price}</div>
                <div className="minicart__price__discountPrice">{prod.discountPrice}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="minicart__scroll"
          ref={trackRef}
          style={{
            position: 'absolute',
            width: `6px`,
            right: `2px`,
            bottom: `0`,
            top: `0`,
            transition: 'opasity 200ms',
            borderRadius: `3px`,
            visibility: 'visible',
            opacity: `${opas}`,
          }}
        >
          <div
            className={products.length <= 2 ?"minicart__scroll__mini" : ''}
            style={{
              borderRadius: `3px`,
              backgroundColor: `pink`,
              height: `190px`,
              transform: `translateY(${transf}px)`
            }}
          ></div>
        </div>
      </div>
      <div className="minicart__footer">
        <div className="minicart__footer__shipping">
          <span>Delivery</span>
          <span>from 0 $</span>
        </div>
        <div className="minicart__footer__total">
          <span>Total price</span>
          <span>{totalPrice} $</span>
        </div>
        <div className="minicart__footer__taxInfo">Including VAT</div>
        
          <button
            className="minicart__footer__btn"
            onClick={() => onClickBtn()}
          >
            See cart
          </button>
      </div>
    </div>
  )
}

export default MiniCart