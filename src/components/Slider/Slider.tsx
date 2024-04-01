import React, { useEffect, useState } from 'react';
import './Slider.scss';
import slider2 from "../../images/Slider/slider-2.2.jpg";
import slider from "../../images/Slider/slider-1.1.jpg";
import slider3 from "../../images/Slider/slider-3.3.jpg";
import arrowLeft from "../../images/Slider/Arrow_left.svg";
import arrowRight from "../../images/Slider/Arrow_right.svg";
import video from '../../video/video-2.mp4';
import { Link } from 'react-router-dom';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [hidePadding, setHidePadding] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [
    {image: slider, id: 0, type: 'img', link: 'sales -50%'},
    {image: slider2, id: 1, type: 'img' ,link: 'new'},
    {image: slider3, id: 2,type: 'img', link: 'woman'},
    {Image: video, id: 3, type: 'video', link: ''},
  ]

  const slideLeft = () => {
    setCurrentSlide((prev) => prev === 0 ? 3 : prev - 1 )
  };

  const slideRight = () => {
    setCurrentSlide((prev) => prev === 3 ? 0 : prev + 1)
  };

 useEffect(() => {
    if (!autoPlay) return;
    const slideInterval = setInterval(slideRight, 5000);
    return () => clearInterval(slideInterval);
 }, [autoPlay]);

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
    slideRight();
  }

  if (diff < -5) {
    slideLeft();
  }

  setTouchPosition(null);
};

  // useEffect(() => {
  //   const removePaddind = () => {
  //     if (window.scrollY > 0) {
  //       setHidePadding(true);
  //     } else {
  //       setHidePadding(false);
  //     }
  //   }

  //   window.addEventListener('scroll', removePaddind);
  //     return () => {
  //       window.removeEventListener('scroll', removePaddind)
  //     }
  // }, [])

  return (
    <div className="slider app__section">
      <div
        className="slider__container"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        onTouchStart={event => handleTouchStart(event)}
        onTouchMove={event => moveTouch(event)}
      >
        <div className="slider__images-container" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
          {images.map((image) => (
            image.type === 'img' ? (
            <Link to={image.link.split(' ')[0]} className='slider__link' key={image.id}>
              <img
                src={image.image}
                alt="slider-img"
                className='slider__image'
              />
              <div className="slider__links">
                <div className='slider__links--to'>{image.link}</div>
                <div className='slider__links--check'>Check now</div>
              </div>
            </Link>
            ) :(
            <Link to='woman'className='slider__link' key={image.id}>
              <video src={video} autoPlay muted loop className='slider__image'>
                </video>
            </Link>
            )
          ))}
        </div>
        <div className="slider__buttons">
          <button
            className='slider__button slider__button--left'
            onClick={slideLeft}
          >
            <img
              src={arrowLeft}
              alt="arrowLeft"
              className='arrow'
            />
          </button>

          <button
            className='slider__button slider__button--right'
            onClick={slideRight}
          >
            <img src={arrowRight} alt="arrowRight" className='arrow'
          />
          </button>
        </div>

        <div className="slider__pagination">
          {images.map((image) => (
            <button
              key={image.id}
              className={
                image.id === currentSlide
                ? 'pagination-dot pagination-dot--active'
                 : 'pagination-dot'
              }
              onClick={() => setCurrentSlide(image.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider