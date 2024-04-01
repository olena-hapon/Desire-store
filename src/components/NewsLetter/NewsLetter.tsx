import React from 'react';
import './NewsLetter.scss';

const NewsLetter = () => {
  return (
    <section className='newsLetter'>
      <div className="newsLetter__wrapper">
        <h3 className="newsLetter__title">
          SUBSCRIBE TO OUR NEWSLETTER AND RECEIVE A 15% DISCOUNT ON YOUR ONLINE ORDER.
        </h3>
        <p className="newsLetter__text">
          Get special discounts and early access to special offers, <br /> new collections and current trends.
        </p>
        <form className='newsLetter__form'>
          <div className="newsLetter__form__wrapper">
            <div className="newsLetter__form__field">
              <input type="text" className="newsLetter__form__input" placeholder='E-mail'/>
            </div>
            <button className="newsLetter__form__btn">
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewsLetter