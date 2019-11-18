/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import avatar5 from '../image/avatar5.jpeg';
import NavbarLeft from '../components/NavbarLeft';
import UserAndNotificationNav from '../components/UserAndNotificationNav';

function Quantriphanbon() {
  const navItems = ['Hợp tác xã', 'Quản lý Hợp tác xã', 'Thuốc BVTV', 'Phân bón'];
  return (
    <div id="wrapper">
      <NavbarLeft navItems={navItems} type="Profile" />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <UserAndNotificationNav />
          <div className="modal fade" role="dialog" tabIndex={-1} id="modal-delete-items">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Xóa dữ liệu phân bón</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Chọn tên các dữ liệu bạn muốn xóa</p>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Airi Satou</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Angelica Ramos</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Ashton Cox</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Bradley Greer</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Brenden Wagner</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Brielle Williamson</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Bruno Nash</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="formCheck-1" />
                    <label className="form-check-label" htmlFor="formCheck-1">Caesar Vance</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
                  <button className="btn btn-primary" type="button">Xác nhận xóa</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Thêm mới phân bón</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body modal-add-body">
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">
                      Tên phân bón
                      <span style={{ color: 'rgb(249,15,15)' }}>
                        &nbsp;*
                      </span>
                    </label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên thương phẩm" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Tên hoạt chất</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Tên loại thuốc</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên loại thuốc" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Tên nhóm thuốc</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên nhóm thuốc" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Danh mục thuốc</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên danh mục thuốc" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Dạng thuốc</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên dạng thuốc" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Đối tượng phòng trừ</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên các đối tượng" />
                    <small>Ví dụ: Rầy nâu 1,Rầy nâu 2,Rầy nâu 3</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Tác động của thuốc</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tác động của thuốc" />
                    <small>Ví dụ: Bảo vệ cây trồng,Giết sâu bọ</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Nhóm độc</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào nhóm độc" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Liều lượng sử dụng</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào liều lượng sử dụng của thuốc" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Cách sử dụng</label>
                    <textarea className="form-control item" rows={5} placeholder="Mô tả chi tiết cách dùng của thuốc" defaultValue="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Thời gian cách ly</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào thời gian cách ly sau khi sử dụng thuốc" />
                    <small>Ví dụ: 1 ngày</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Khả năng hỗn hợp</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào khả năng hỗn hợp" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Đặc điểm chung</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào đặc điểm chung" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Tổ chức xin đăng ký</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên tổ chức" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Nhãn thuốc</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên nhãn thuốc" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten-thuong-pham">Công ty phân phối</label>
                    <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên công ty phân phối" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
                  <button className="btn btn-primary" type="button">Xác nhận</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" role="dialog" tabIndex={-1} id="modal-view">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Thông tin thuốc BVTV</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body modal-add-body">
                  <div className="container" style={{ padding: 0 }}>
                    <div className="row">
                      <div className="col-4">
                        <p>Tên thương phẩm</p>
                      </div>
                      <div className="col-8">
                        <p>
                          Lorem issum&nbsp;
                          Lorem issum&nbsp;
                          Lorem issum&nbsp;
                          Lorem issum&nbsp;
                          Lorem issum&nbsp;
                          Lorem issum&nbsp;
                          Lorem issum&nbsp;
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Hoạt chất</p>
                      </div>
                      <div className="col-8">
                        <p>
                          Lorem issumLorem issumLorem issum&nbsp;
                          Lorem issumLorem issum&nbsp;
                          Lorem issum&nbsp;
                          Lorem issum&nbsp;
                          Lorem issum
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Tên loại thuốc</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Nhóm thuốc</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Danh mục thuốc</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Nhóm độc</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Liều lượng</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Cách sử dụng</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Thời gian cách ly</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Khả năng hỗn hợp</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Đặc điểm chung</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Tổ chức xin đăng ký</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Nhãn thuốc</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Công ty phân phối</p>
                      </div>
                      <div className="col-8">
                        <p>Lorem issum</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" role="dialog" tabIndex={-1} id="modal-modify">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Chỉnh sửa thông tin phân bón</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body modal-add-body">
                  <div className="container" style={{ padding: 0 }}>
                    <div className="row">
                      <div className="col-4">
                        <p>Tên phân bón</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" style={{ /* padding: 0 */ }} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Hoạt chất</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" readOnly style={{ /* padding: 0 */ }} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Tên loại thuốc</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Nhóm thuốc</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Danh mục thuốc</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Nhóm độc</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Liều lượng</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Cách sử dụng</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Thời gian cách ly</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Khả năng hỗn hợp</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Đặc điểm chung</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Tổ chức xin đăng ký</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Nhãn thuốc</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p>Công ty phân phối</p>
                      </div>
                      <div className="col-8">
                        <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum Lorem issumLorem issum Lorem issum" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
                  <button className="btn btn-primary" type="button">Lưu thay đổi</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" role="dialog" tabIndex={-1} id="modal-delete-item">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Xóa dữ liệu</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Hành động này không thể hoàn tác,
                      bạn chắc chắn muốn xóa thuốc bảo vệ thực vật với tên là: lorem issum
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
                  <button className="btn btn-primary" type="button">Xác nhận xóa</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-primary m-0 font-weight-bold">Danh sách phân bón</p>
                <div className="mt-3 d-flex flex-row justify-content-around">
                  <a href="/" className="btn btn-success btn-icon-split" role="button" data-toggle="modal" data-target="#modal-add">
                    <span className="text-white-50 icon">
                      <i className="fas fa-plus" />
                    </span>
                    <span className="text-white text">
                      Thêm mới dữ liệu
                    </span>
                  </a>
                  <a href="/" className="btn btn-danger btn-icon-split" role="button" data-toggle="modal" data-target="#modal-delete-items">
                    <span className="text-white-50 icon">
                      <i className="fas fa-trash" />
                    </span>
                    <span className="text-white text">Xóa dữ liệu</span>
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 text-nowrap">
                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
                      <label>
                        HIển thị
                        &nbsp;
                        <select className="form-control form-control-sm custom-select custom-select-sm">
                          <option value={10} selected>
                            10
                          </option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                        &nbsp;
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-md-right dataTables_filter" id="dataTable_filter">
                      <label>
                        <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Tìm phân bón theo tên" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                  <table className="table dataTable my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>Tên phân bón</th>
                        <th>Lorem issum</th>
                        <th>Lorem issum</th>
                        <th>
                          &nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Airi Satou</td>
                        <td>Accountant</td>
                        <td>Tokyo</td>
                        <td>
                          <div className="dropdown">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">Hành động&nbsp;</button>
                            <div className="dropdown-menu" role="menu" style={{ overflow: 'hidden', padding: 0 }}>
                              <a className="dropdown-item text-white bg-info" href="/" role="presentation" data-toggle="modal" data-target="#modal-view" style={{ cursor: 'pointer' }}>Xem thông tin</a>
                              <a className="dropdown-item text-white bg-warning" href="/" role="presentation" data-toggle="modal" data-target="#modal-modify" style={{ cursor: 'pointer' }}>Chỉnh sửa</a>
                              <a className="dropdown-item text-white bg-danger" href="/" role="presentation" data-toggle="modal" data-target="#modal-delete-item" style={{ cursor: 'pointer' }}>Xóa hàng này</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Angelica Ramos</td>
                        <td>Chief Executive Officer(CEO)</td>
                        <td>London</td>
                        <td />
                      </tr>
                      <tr>
                        <td>Ashton Cox</td>
                        <td>Junior Technical Author</td>
                        <td>San Francisco</td>
                        <td><br /></td>
                      </tr>
                      <tr>
                        <td>Bradley Greer</td>
                        <td>Software Engineer</td>
                        <td>London</td>
                        <td><br /></td>
                      </tr>
                      <tr>
                        <td>Brenden Wagner</td>
                        <td>Software Engineer</td>
                        <td>San Francisco</td>
                        <td><br /></td>
                      </tr>
                      <tr>
                        <td>Brielle Williamson</td>
                        <td>Integration Specialist</td>
                        <td>New York</td>
                        <td>
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Bruno Nash
                          <br />
                        </td>
                        <td>Software Engineer</td>
                        <td>London</td>
                        <td><br /></td>
                      </tr>
                      <tr>
                        <td>Caesar Vance</td>
                        <td>Pre-Sales Support</td>
                        <td>New York</td>
                        <td><br /></td>
                      </tr>
                      <tr>
                        <td>Cara Stevens</td>
                        <td>Sales Assistant</td>
                        <td>New York</td>
                        <td><br /></td>
                      </tr>
                      <tr>
                        <td>Cedric Kelly</td>
                        <td>Senior JavaScript Developer</td>
                        <td>Edinburgh</td>
                        <td><br /></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td><strong>Tên phân bón</strong></td>
                        <td><strong>Tên hoạt chất</strong></td>
                        <td><strong>Loại thuốc</strong></td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="row">
                  <div className="col-md-6 align-self-center">
                    <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Hiển thị 1 - 10/27 dữ liệu</p>
                  </div>
                  <div className="col-md-6">
                    <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                      <ul className="pagination">
                        <li className="page-item disabled">
                          <a className="page-link" href="/" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="/">1</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">2</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">3</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/" aria-label="Next">
                            <span aria-hidden="true">»</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-white sticky-footer">
          <div className="container my-auto">
            <div className="text-center my-auto copyright">
              <span>Copyright © HTX 4.0 2019</span>
            </div>
          </div>
        </footer>
      </div>
      <a className="border rounded d-inline scroll-to-top" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </div>
  );
}

export default Quantriphanbon;
