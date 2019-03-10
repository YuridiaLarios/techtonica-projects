import React from 'react';


const SingleAllEvents = ({item}) => (
  <div className="col s4">
    <div className="card cardStyle">
      <div className="card-content">
        <p><span className="bold-pink">Id#</span> {item.id}</p>
        <p><span className="bold-pink">Name:</span> {item.name}</p>

      </div>
    </div>
  </div>
);

export default SingleAllEvents;
