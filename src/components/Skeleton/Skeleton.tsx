import React from 'react';
import './Skeleton.scss';

export default function Skeleton({ type }) {

  const TopHeaderSkeleton = () => (
    <div className="topHeaderSk">
      <div className="topHeaderSk__img"></div>
      <div className="topHeaderSk__img"></div>
      <div className="topHeaderSk__img"></div>
      <div className="topHeaderSk__img"></div>
    </div>
  )
  
  const ProductsWrap = () => (
    <div className="productsWrap products app__section">
      <div className="products__sideLeft">
        <div className="products__sideLeft__item"></div>
        <div className="products__sideLeft__item"></div>
        <div className="products__sideLeft__item"></div>
        <div className="products__sideLeft__item"></div>
      </div>
      <div className="products__right">
        <div className="products__top">
          <div className="products__top__wrap">
            <div className="products__top__item products__top__item--item1"></div>
            <div className="products__top__item products__top__item--item2"></div>
            <div className="products__top__item products__top__item--item3"></div>
          </div>
          <div className="products__top__text">Loading...</div>
        </div>
        <div className="products__right__images">
          <div className="products__right__img"></div>
          <div className="products__right__img"></div>
          <div className="products__right__img"></div>
          <div className="products__right__img"></div>
          <div className="products__right__img"></div>
          <div className="products__right__img"></div>
          <div className="products__right__img"></div>
          <div className="products__right__img"></div>
      </div>
    </div>
  </div>
)
  if (type === 'topHeader') return <TopHeaderSkeleton />
  if (type === 'prodWrap') return <ProductsWrap />
}

