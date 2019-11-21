/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable-next-line */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RRNavLink,
} from 'react-router-dom';

import { Nav, NavItem, NavLink } from 'reactstrap';

import Login from '../../pages/Login';
import Administrator from '../../pages/Administrator';
import Profile from '../../pages/Profile';

function LeftNavbar({ navItems }) {
  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            <span>HTX 4.0</span>
          </div>
        </a>
        <div className="text-center d-none d-md-inline" />
        <div className="d-flex flex-column">
          <Router>
            <Nav>
              {navItems.map(({ pageName, route }, index) => (
                <NavItem key={`${index + 3}`}>
                  <NavLink to={route} tag={RRNavLink}>{pageName}</NavLink>
                </NavItem>
              ))}
            </Nav>

            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/admin">
                <Administrator />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </nav>
  );
}

export default LeftNavbar;
