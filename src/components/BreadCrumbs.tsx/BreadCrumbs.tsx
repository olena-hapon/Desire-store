import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';

const BreadCrumbs = () => {
  const location = useLocation().pathname;
  const pathName = location.split('/').slice(1);
  pathName.splice(2, 1);
  let items: string[] = [];

   
    const breadCrunmbs = (item) => {
      if (item === 'woman' || item === 'mans' || item === 'new' || item === 'sales') {
        items.push(item);

        if ((item === 'woman' || item === 'mans') && (items.includes('new') || items.includes('sales'))) {

          return `./../../../${item}`;
        }

        } else if (item !== 'woman' && item !== 'mans' || item !== 'new' || item !== 'sales') {

          return `./../../../${item}`;
        }

      return `./../../../../${item}`
    }

  return (
    <div className='breadCrumbs'>
      <span className="breadCrumbs__home">
        <Link to='/' className="breadCrumbs__home--link">
          DeSire
        </Link>
      </span>
      {pathName && pathName.map((item, ind) => (
        <span className="breadCrumbs__name" key={ind}>
          <Link
            to={(breadCrunmbs(item))}
            className="breadCrumbs__link"
          >
            {item.replaceAll('-', ' ')}
          </Link>
        </span>
      ))}
    </div>
  )
}

export default BreadCrumbs