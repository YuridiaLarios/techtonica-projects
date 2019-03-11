import React, { Component } from 'react';

// const SingleEventDiv = ({item}) => (
//   <div className="col s4">
//     <div className="card cardStyle">
//       <div className="card-content">
//         <p><span className="bold-pink">Id#</span> {item.id}</p>
//         <p><span className="bold-pink">Name:</span> {item.name}</p> 
//       </div>
//     </div>
//   </div>
// );


class SingleEventDiv extends Component {
  constructor(props) {
    super(props); // props ia an object that has events in it now
    this.state = {
      error: false
    };
  }


  render(){
    return (
      <div className="col s4">
      <div className="card cardStyle">
        <div className="card-content">
          <p><span className="bold-pink">Id#</span> {this.props.item.id}</p>
          {console.log(this.props.id)}
          <p><span className="bold-pink">Name:</span> {this.props.item.name}</p> 
          {console.log(this.props.name)}
        </div>
      </div>
    </div>
    );
  }
}

export default SingleEventDiv;
