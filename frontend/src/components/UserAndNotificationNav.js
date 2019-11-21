/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
import React from 'react';
import avatar5 from '../image/avatar5.jpeg';

function UserAndNotificationNav() {
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
            <li className="nav-item dropdown d-sm-none no-arrow">
              <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="/">
                <i className="fas fa-search" />
              </a>
              <div className="dropdown-menu dropdown-menu-right p-3 animated--grow-in" role="menu" aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto navbar-search w-100">
                  <div className="input-group">
                    <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                    <div className="input-group-append">
                      <button className="btn btn-primary py-0" type="button">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1" role="presentation">
              <div className="nav-item dropdown no-arrow">
                <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="/">
                  <span className="badge badge-danger badge-counter">3+</span>
                  <i className="fas fa-bell fa-fw" />
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in" role="menu">
                  <h6 className="dropdown-header">trung tâm thông báo</h6>
                  <a className="d-flex align-items-center dropdown-item" href="/">
                    <div className="mr-3">
                      <div className="bg-primary icon-circle">
                        <i className="fas fa-file-alt text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">12 tháng 12, 2019</span>
                      <p>Chức năng xem lịch sử quản lý đã được thêm vào hệ thống, dùng thử ngay.</p>
                    </div>
                  </a>
                  <a className="d-flex align-items-center dropdown-item" href="/">
                    <div className="mr-3">
                      <div className="bg-success icon-circle"><i className="fas fa-clipboard-check text-white" /></div>
                    </div>
                    <div>
                      <span className="small text-gray-500">7 tháng 12, 2019</span>
                      <p>Quá trình sao lưu toàn bộ dữ liệu về máy đã thành công.</p>
                    </div>
                  </a>
                  <a className="d-flex align-items-center dropdown-item" href="/">
                    <div className="mr-3">
                      <div className="bg-warning icon-circle"><i className="fas fa-exclamation-triangle text-white" /></div>
                    </div>
                    <div>
                      <span className="small text-gray-500">2 tháng 12, 2019</span>
                      <p>Có một yêu cầu tạo mới Hợp tác xã cần được xác thực.</p>
                    </div>
                  </a>
                  <a className="text-center dropdown-item small text-gray-500" href="/">Hiển thị tất cả thông báo</a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1" role="presentation">
              <div className="shadow dropdown-list dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown" />
            </li>
            <div className="d-none d-sm-block topbar-divider" />
            <li className="nav-item dropdown no-arrow" role="presentation">
              <div className="nav-item dropdown no-arrow">
                <a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="/">
                  <span className="d-none d-lg-inline mr-2 text-gray-600 small">Nguyễn Văn A</span>
                  <img alt="img" className="border rounded-circle img-profile" src={avatar5} />
                </a>
                <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in" role="menu">
                  <a className="dropdown-item" role="presentation" href="/">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                    &nbsp;Thông tin
                  </a>
                  <a className="dropdown-item" role="presentation" href="/">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                    Lịch sử hoạt động
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" role="presentation" href="/">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    &nbsp;Đăng xuất
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default UserAndNotificationNav;
