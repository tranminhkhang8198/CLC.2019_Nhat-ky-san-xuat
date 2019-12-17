/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  render() {
    if (localStorage.getItem('user') === null) {
      // console.log('Profile');
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Home page</h3>
      </div>
    );
  }
}

export default Home;
