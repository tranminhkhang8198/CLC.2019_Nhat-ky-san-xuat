import React, { Component } from "react";
import image2 from "../image/logo.svg";
import avatar5 from "../image/avatar5.jpeg";

class Profile extends Component {
  render() {
    return (<div id="wrapper">
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
          <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink" /></div>
          <div className="sidebar-brand-text mx-3"><span>HTX 4.0</span></div>
        </a>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar" />
        <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button" /></div>
        <div className="d-flex flex-column"><a className="text-white mb-2" href="#">Danh sách thuốc BVTV</a><a className="text-white mb-2" href="#">Danh sách phân bón</a><a className="text-white mb-2" href="#">Danh sách HTX</a><a className="text-white mb-2" href="#">Danh sách quản lý&nbsp; HTX</a></div>
      </div>
    </nav>
    <div className="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
          <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars" /></button>
            <form className="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <div className="input-group-append" />
              </div>
            </form>
            <ul className="nav navbar-nav flex-nowrap ml-auto">
              <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#"><i className="fas fa-search" /></a>
                <div className="dropdown-menu dropdown-menu-right p-3 animated--grow-in" role="menu" aria-labelledby="searchDropdown">
                  <form className="form-inline mr-auto navbar-search w-100">
                    <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                      <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
                    </div>
                  </form>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1" role="presentation">
                <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#"><span className="badge badge-danger badge-counter">3+</span><i className="fas fa-bell fa-fw" /></a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-list dropdown-menu-right animated--grow-in" role="menu">
                    <h6 className="dropdown-header">alerts center</h6>
                    <a className="d-flex align-items-center dropdown-item" href="#">
                      <div className="mr-3">
                        <div className="bg-primary icon-circle"><i className="fas fa-file-alt text-white" /></div>
                      </div>
                      <div><span className="small text-gray-500">December 12, 2019</span>
                        <p>A new monthly report is ready to download!</p>
                      </div>
                    </a>
                    <a className="d-flex align-items-center dropdown-item" href="#">
                      <div className="mr-3">
                        <div className="bg-success icon-circle"><i className="fas fa-donate text-white" /></div>
                      </div>
                      <div><span className="small text-gray-500">December 7, 2019</span>
                        <p>$290.29 has been deposited into your account!</p>
                      </div>
                    </a>
                    <a className="d-flex align-items-center dropdown-item" href="#">
                      <div className="mr-3">
                        <div className="bg-warning icon-circle"><i className="fas fa-exclamation-triangle text-white" /></div>
                      </div>
                      <div><span className="small text-gray-500">December 2, 2019</span>
                        <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                      </div>
                    </a><a className="text-center dropdown-item small text-gray-500" href="#">Show All Alerts</a></div>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow mx-1" role="presentation">
                <div className="shadow dropdown-list dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown" />
              </li>
              <div className="d-none d-sm-block topbar-divider" />
              <li className="nav-item dropdown no-arrow" role="presentation">
                <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#"><span className="d-none d-lg-inline mr-2 text-gray-600 small">Nguyễn Văn A</span><img className="border rounded-circle img-profile" src={avatar5} /></a>
                  <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in" role="menu"><a className="dropdown-item" role="presentation" href="#"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Thông tin</a><a className="dropdown-item" role="presentation" href="#"><i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />Lịch sử hoạt động</a>
                    <div className="dropdown-divider" /><a className="dropdown-item" role="presentation" href="#"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Đăng xuất</a></div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          <h3 className="text-dark mb-4">Thông tin cá nhân</h3>
          <div className="row mb-3">
            <div className="col-lg-4">
              <div className="card mb-3">
                <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={image2} width={160} height={160} />
                  <div className="mb-3"><button className="btn btn-primary btn-sm" type="button">Thay đổi ảnh đại diện</button></div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row mb-3 d-none">
                <div className="col">
                  <div className="card text-white bg-primary shadow">
                    <div className="card-body">
                      <div className="row mb-2">
                        <div className="col">
                          <p className="m-0">Peformance</p>
                          <p className="m-0"><strong>65.2%</strong></p>
                        </div>
                        <div className="col-auto"><i className="fas fa-rocket fa-2x" /></div>
                      </div>
                      <p className="text-white-50 small m-0"><i className="fas fa-arrow-up" />&nbsp;5% since last month</p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card text-white bg-success shadow">
                    <div className="card-body">
                      <div className="row mb-2">
                        <div className="col">
                          <p className="m-0">Peformance</p>
                          <p className="m-0"><strong>65.2%</strong></p>
                        </div>
                        <div className="col-auto"><i className="fas fa-rocket fa-2x" /></div>
                      </div>
                      <p className="text-white-50 small m-0"><i className="fas fa-arrow-up" />&nbsp;5% since last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="card shadow mb-3">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 font-weight-bold">Chỉnh sửa thông tin cá nhân</p>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-row">
                          <div className="col">
                            <div className="form-group"><label htmlFor="username"><strong>Họ và tên</strong><br /></label><input className="form-control" type="text" placeholder="Nguyễn Văn A" name="username" /></div>
                          </div>
                          <div className="col">
                            <div className="form-group"><label htmlFor="phone"><strong>Số điện thoại</strong></label><input className="form-control" type="email" placeholder={1234567890} name="phone" /></div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col">
                            <div className="form-group"><label htmlFor="account"><strong>Tài khoản</strong></label><input className="form-control" type="text" placeholder="taikhoan123456" name="account" disabled readOnly /></div>
                          </div>
                          <div className="col">
                            <div className="form-group"><label htmlFor="pwd"><strong>Mật khẩu</strong></label><input className="form-control" type="text" placeholder="E2058gspg29@" name="pwd" required minLength={6} maxLength={128} /></div>
                          </div>
                        </div>
                        <div className="form-group"><button className="btn btn-primary btn-sm" type="submit">Lưu cài đặt</button></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow mb-5">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">Báo cáo lỗi</p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <form>
                    <div className="form-group"><label htmlFor="signature"><strong>Nội dung muốn báo cáo</strong><br /></label><textarea className="form-control" rows={4} name="feedback" placeholder="Để thuận tiện cho quá trình sửa lỗi, bạn nên gửi báo cáo giống với ví dụ sau: Phản hồi chậm - Khi tôi thay đổi nội dung người dùng hoặc thêm mới thì phải đợi khoảng 1 phút mới có phản hồi." defaultValue={""} /></div>
                    <div className="form-group"><button className="btn btn-primary btn-sm" type="submit">Gửi báo cáo</button></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-white sticky-footer">
        <div className="container my-auto">
          <div className="text-center my-auto copyright"><span>Copyright © HTX 4.0 2019</span></div>
        </div>
      </footer>
    </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a></div>);
  }
}

export default Profile;
