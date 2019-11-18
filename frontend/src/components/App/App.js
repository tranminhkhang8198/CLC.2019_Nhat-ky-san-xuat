import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RRNavLink,
} from 'react-router-dom';

import { NavLink, NavItem, Nav } from 'reactstrap';

import './App.css';
import Administrator from '../../pages/Administrator';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Quantriphanbon from '../../pages/Quantriphanbon';
import Quantrihtx from '../../pages/Quantrihtx';
import Quantriquanlyhtx from '../../pages/Quantriquanlyhtx';


function App() {
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

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <div />
          </Route>
          <Route exact path="/admin">
            <Administrator />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/quantriphanbon">
            <Quantriphanbon />
          </Route>
          <Route exact path="/quantrihtx">
            <Quantrihtx />
          </Route>
          <Route exact path="/quantriquanlyhtx">
            <Quantriquanlyhtx />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
