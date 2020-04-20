/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
import React from 'react';

function Notification() {
  return (
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
  );
}

export default Notification;
