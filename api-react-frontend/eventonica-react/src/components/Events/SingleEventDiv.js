import DeleteButton from './DeleteButton';

import React from 'react';


const SingleEventDiv = ({item}) => (
  <div className="col s4">
    <div className="card cardStyle">
      <div className="card-content">
        <p><span className="bold-pink">Id#</span> {item.id}</p>
        <p><span className="bold-pink">Name:</span> {item.name}</p>
        <DeleteButton />
      </div>
    </div>
  </div>
);

export default SingleEventDiv;
