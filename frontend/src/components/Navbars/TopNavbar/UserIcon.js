import React from 'react';

import avatar5 from '../../../image/avatar5.jpeg';

function UserIcon() {
  return (
    <li className="nav-item dropdown no-arrow" role="presentation">
      <div className="nav-item dropdown no-arrow">
        <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="/">
          <span className="d-none d-lg-inline mr-2 text-gray-600 small">Nguyễn Văn A</span>
          <img alt="img" className="border rounded-circle img-profile" src={avatar5} />
        </a>
        <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in" role="menu">
          <span className="dropdown-item mr-2 text-gray-600 medium d-lg-none">Nguyễn Văn A</span>
          <a className="dropdown-item" href="/">
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
            &nbsp;Thông tin
          </a>
          <a className="dropdown-item" href="/">
            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
              Lịch sử hoạt động
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="/">
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
            &nbsp;Đăng xuất
          </a>
        </div>
      </div>
    </li>
  );
}

export default UserIcon;
