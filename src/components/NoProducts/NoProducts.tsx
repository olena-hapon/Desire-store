import React from 'react';
import './NoProducts.scss';
import { deleteColors, deleteSizes, setSort } from '../../redux/slices/filter';
import { setSearch } from '../../redux/slices/search';
import { useAppDispatch } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';

const NoProducts = () => {
  const dispatch = useAppDispatch();
  const [searChParams, setSearchParams] = useSearchParams();

  const deleteFilters = () => {
    dispatch(deleteColors());
    dispatch(deleteSizes());
    dispatch(setSort(''));
    dispatch(setSearch(''));
    setSearchParams();
  }
  return (
    <div className='noProducts'>
      <div className="noProducts__img"></div>
      <div className="noProducts__text">
      {`There are no products matching the criteria. Select other options or `}
        <div
          className="noProducts__filter"
          onClick={() => deleteFilters()}
        >
          clear filters
        </div>
      </div>
    </div>
  )
}

export default NoProducts