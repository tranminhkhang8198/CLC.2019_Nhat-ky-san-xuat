import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RRNavLink,
} from 'react-router-dom';

import { NavLink, NavItem, Nav } from 'reactstrap';

import TopNavbar from '../components/Navbars/TopNavbar/TopNavbar';
import Footer from '../components/Footer/Footer';

import QuanTriThuocBVTV from '../pages/QuanTriThuocBVTV';
import QuanTriPhanBon from '../pages/QuanTriPhanBon';
import QuanTriHTX from '../pages/QuanTriHTX';
import QuanTriNhanSuHTX from '../pages/QuanTriNhanSuHTX';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

function App() {
  // const navItems = [
  //   { pageName: 'Admin panel', route: '/admin' },
  //   { pageName: 'Login', route: '/login' },
  //   { pageName: 'Home', route: '/' },
  // ];

  const renderNavItem = (Component) => (
    <div id="wrapper">
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <TopNavbar />
          {Component}
        </div>
        <Footer />
      </div>
      <a className="border rounded d-inline scroll-to-top" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </div>
  );

  return (
    <Router>
      <div>
        <Nav>
          <NavItem>
            <NavLink to="/" tag={RRNavLink}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/quantrithuocbvtv" tag={RRNavLink}>Quản trị thuốc BVTV</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/quantriphanbon" tag={RRNavLink}>Quản trị phân bón</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/quantrihtx" tag={RRNavLink}>Quản trị HTX</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/quantriquanlyhtx" tag={RRNavLink}>Quản trị nhân sự HTX</NavLink>
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
          <Route exact path="/quantrithuocbvtv">
            {renderNavItem(<QuanTriThuocBVTV />)}
          </Route>
          <Route exact path="/quantriphanbon">
            {renderNavItem(<QuanTriPhanBon />)}
          </Route>
          <Route exact path="/quantrihtx">
            {renderNavItem(<QuanTriHTX />)}
          </Route>
          <Route exact path="/quantriquanlyhtx">
            {renderNavItem(<QuanTriNhanSuHTX />)}
          </Route>
          <Route exact path="/profile">
            {renderNavItem(<Profile />)}
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
