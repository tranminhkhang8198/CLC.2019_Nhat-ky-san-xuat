/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let exp = 0;
      try {
        exp = decode(localStorage.getItem('user')).exp;
      } catch (e) {
        exp = 0;
      }
      return (exp > Date.now() / 1000)
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />
);

export default PrivateRoute;
