/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

function NavbarLeft(props) {
  const { type, navItems } = props;
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
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar" />
        {type === 'Profile' && (
          <div className="text-center d-none d-md-inline">
            <button className="btn rounded-circle border-0" id="sidebarToggle" type="button" />
          </div>
        )}
        <div className="text-center d-none d-md-inline" />
        <div className="d-flex flex-column">
          {navItems.length !== 0 && navItems.map((value, index) => <a key={`${index + 3}`} className="text-white mb-2" href="/">{value}</a>)}
        </div>
      </div>
    </nav>
  );
}

export default NavbarLeft;
