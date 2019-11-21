import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RRNavLink,
} from 'react-router-dom';

import { NavLink, NavItem, Nav } from 'reactstrap';

import TopNavbar from '../Navbars/TopNavbar/TopNavbar';
import LeftNavbar from '../Navbars/LeftNavbar';
import Footer from '../Footer/Footer';

import Administrator from '../../pages/Administrator';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';

function App() {
  const navItems = [
    { pageName: 'Admin panel', route: '/admin' },
    { pageName: 'Login', route: '/login' },
    { pageName: 'Home', route: '/' },
  ];
  return (
    <Router>
      <div>
        <Nav>
          <NavItem>
            <NavLink to="/" tag={RRNavLink}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin" tag={RRNavLink}>Admin Panel</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile" tag={RRNavLink}>Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login" tag={RRNavLink}>Login</NavLink>
          </NavItem>
        </Nav>

        <Switch>
          <Route exact path="/">
            <div>
              <h1>hello scsss</h1>
              <h2>hello h2</h2>
            </div>
          </Route>
          <Route exact path="/admin">
            <div id="wrapper">
              <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                  <TopNavbar />
                  <Administrator />
                </div>
                <Footer />
              </div>
              <a className="border rounded d-inline scroll-to-top" href="#page-top">
                <i className="fas fa-angle-up" />
              </a>
            </div>
          </Route>
          <Route exact path="/profile">
            <div id="wrapper">
              <LeftNavbar navItems={navItems} />
              <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                  <TopNavbar />
                  <Profile />
                </div>
                <Footer />
              </div>
              <a className="border rounded d-inline scroll-to-top" href="#page-top">
                <i className="fas fa-angle-up" />
              </a>
            </div>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
