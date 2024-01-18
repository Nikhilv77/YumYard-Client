import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFilteredSides } from '../Actions/SidesActions';

const FilterForSides = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <div style={{fontFamily: "'Autour One', system-ui", maxWidth:'1050px'}} className="container mt-4">
      <div className="row justify-content-center shadow-lg p-2 mb-4 bg-white rounded">
        <div className="col-md-3 col-sm-12 mt-2">
          <input
           style={{  fontFamily: "'EB Garamond', serif",fontSize : '1.2rem'}}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search here"
            className="search-input form-control"
          />
        </div>
        <div className="col-md-3 col-sm-12 mt-2">
          <select
          style={{  fontFamily: "'EB Garamond', serif",fontSize : '1.2rem'}}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="search-input form-control"
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>
        <div className="col-md-3 col-sm-12 mt-1">
          <button
          style={{  fontFamily: "'EB Garamond', serif",fontSize : '1.2rem'}}
            onClick={() => dispatch(getFilteredSides(searchValue, category))}
            className="btn btn-primary btn-block"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterForSides;
