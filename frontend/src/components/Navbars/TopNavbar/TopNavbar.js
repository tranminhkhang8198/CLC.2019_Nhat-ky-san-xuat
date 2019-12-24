import React from 'react';

import Notification from './Notification';
import UserIcon from './UserIcon';

function TopNavbar() {
  return (
    <div>
      <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div className="container-fluid">
          <button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button">
            <i className="fas fa-bars" />
          </button>
          <form className="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <div className="input-group-append" />
            </div>
          </form>
          <ul className="nav navbar-nav flex-nowrap ml-auto">
            <Notification />
            <UserIcon />
            <li className="nav-item dropdown no-arrow mx-1" role="presentation">
              <div className="shadow dropdown-list dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown" />
            </li>
            <div className="d-none d-sm-block topbar-divider" />
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default TopNavbar;
