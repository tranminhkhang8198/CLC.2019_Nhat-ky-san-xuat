/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {
  BrowserRouter as Route,
  Switch,
  Router,
  NavLink as RRNavLink,
} from 'react-router-dom';

import { Nav, NavItem, NavLink } from 'reactstrap';

import Administrator from '../../pages/Administrator';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';

function NavbarLeft() {
  return (
    <Router>
      <Nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
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
            <NavItem>
              <NavLink to="/administrator" tag={RRNavLink}>Danh sách phân bón</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login" tag={RRNavLink}>Danh sách HTX</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile" tag={RRNavLink}>Danh sách quản lý HTX</NavLink>
            </NavItem>
          </div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/administrator">
              <Administrator />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Nav>
    </Router>
  );
}

export default NavbarLeft;
