import React from 'react';

const SingleSideAddEvent = ({item}) => (
  <div>
  <div className="divider"></div>
  <h1>Post New Event</h1>
  <div className="card cardStyle">
    <div className="card-content">
      <p><span className="bold-aqua">Id#</span> {item.id}</p>
      <p><span className="bold-aqua">Name:</span> {item.name}</p>
    </div>
  </div>
</div>
);

export default SingleSideAddEvent;
