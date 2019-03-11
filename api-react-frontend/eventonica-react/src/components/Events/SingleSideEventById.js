import React from 'react';

const SingleSideEventById = ({item}) => (
  <div>
    <div className="divider"></div>
    <h1>Event By ID</h1>
    <div className="card cardStyleSideMenu">
      <div className="card-content">
        <p><span className="bold-aqua">Id#</span> {item.id}</p>
        <p><span className="bold-aqua">Name:</span> {item.name}</p>
      </div>
    </div>
  </div>
);

export default SingleSideEventById;
