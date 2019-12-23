import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RRNavLink,
} from 'react-router-dom';

import { NavLink, NavItem, Nav } from 'reactstrap';
import Home from '../pages/Home';
import TopNavbar from '../components/Navbars/TopNavbar/TopNavbar';
import Footer from '../components/Footer/Footer';

// Protected Route
import PrivateRoute from '../auth/PrivateRoute';

import QuanTriThuocBVTV from '../pages/QuanTriThuocBVTV';
import QuanTriPhanBon from '../pages/QTriPhanBon';
import QuanTriHTX from '../pages/QTriHTX';
import QuanTriNhanSuHTX from '../pages/QuanTriNhanSuHTX';
import QuanTriSuKienHTX from '../pages/QuanTriSuKienHTX';
import QuanTriGiongLua from '../pages/QuanTriGiongLua';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import LeftNavbar from '../components/Navbars/LeftNavbar';

function App() {
  const navItems = [
    { pageName: 'Quản trị thuốc BVTV', route: '/quantrithuocbvtv' },
    { pageName: 'Quản trị phân bón', route: '/quantriphanbon' },
    { pageName: 'Quản trị giống lúa', route: '/quantrigionglua' },
    { pageName: 'Quản trị HTX', route: '/quantrihtx' },
    { pageName: 'Quản trị nhân sự HTX', route: '/quantriquanlyhtx' },
    { pageName: 'Quản trị sự kiện HTX', route: '/quantrisukienhtx' },
    { pageName: 'Profile', route: '/profile' },
  ];

  const renderNavItem = (Component) => (
    <div id="wrapper">
      <LeftNavbar navItems={navItems} />
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
            <NavLink to="/quantrigionglua" tag={RRNavLink}>Quản trị giống lúa</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/quantrihtx" tag={RRNavLink}>Quản trị HTX</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/quantriquanlyhtx" tag={RRNavLink}>Quản trị nhân sự HTX</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/quantrisukienhtx" tag={RRNavLink}>Quản trị sự kiện HTX</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile" tag={RRNavLink}>Profile</NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink to="/login" tag={RRNavLink}>Login</NavLink>
          </NavItem> */}
        </Nav>

        <Switch>
          <PrivateRoute exact path="/" component={() => renderNavItem(<Home />)} />
          <PrivateRoute exact path="/quantrithuocbvtv" component={() => renderNavItem(<QuanTriThuocBVTV />)} />
          <PrivateRoute exact path="/quantriphanbon" component={() => renderNavItem(<QuanTriPhanBon />)} />
          <PrivateRoute exact path="/quantrigionglua" component={() => renderNavItem(<QuanTriGiongLua />)} />
          <PrivateRoute exact path="/quantrihtx" component={() => renderNavItem(<QuanTriHTX />)} />
          <PrivateRoute exact path="/quantriquanlyhtx" component={() => renderNavItem(<QuanTriNhanSuHTX />)} />
          <PrivateRoute exact path="/quantrisukienhtx" component={() => renderNavItem(<QuanTriSuKienHTX />)} />
          <PrivateRoute exact path="/profile" component={() => renderNavItem(<Profile />)} />
          <Route exact path="/login" component={Login} />
          {/* not found */}
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
