/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      (decode(localStorage.getItem('user')).exp > Date.now() / 1000)
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
);

export default PrivateRoute;
