import React from 'react';

const SingleSide = ({item}) => (
  <div>
    <div className="divider"></div>
    <h1>Event By ID</h1>
    <div className="card cardStyle">
      <div className="card-content">
        <p><span className="bold-aqua">Id#</span> {item.id}</p>
        <p><span className="bold-aqua">Name:</span> {item.name}</p>
      </div>
    </div>
  </div>
);

export default SingleSide;
