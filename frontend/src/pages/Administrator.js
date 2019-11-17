/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
// import Icon from '@material-ui/core/Icon';

import NavbarLeft from '../components/NavbarLeft';
import UserAndNotificationNav from '../components/UserAndNotificationNav';
import { ListItems } from '../components/ListItems';

// eslint-disable-next-line react/prefer-stateless-function
class Administrator extends Component {
  render() {
    const navItems = ['Hợp tác xã', 'Quản lý Hợp tác xã', 'Thuốc BVTV', 'Phân bón'];
    return (
      <div id="wrapper">
        <NavbarLeft navItems={navItems} />
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <UserAndNotificationNav />
            {/* Function */}
            <div className="modal fade" role="dialog" tabIndex={-1} id="modal-delete-items">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Xóa dữ liệu thuốc BVTV</h4>
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
                    <h4 className="modal-title">Thêm mới thuốc BVTV</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body modal-add-body">
                    <div className="form-group">
                      <label htmlFor="ten-thuong-pham">
                        Tên thương phẩm
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
                            Lorem issum&nbsp;Lorem issum&nbsp;Lorem issum&nbsp;Lorem issu
                            m&nbsp;Lorem issum&nbsp;Lorem issum&nbsp;Lorem issum&nbsp;
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Hoạt chất</p>
                        </div>
                        <div className="col-8">
                          <p>
                            Lorem issumLorem issumLorem issum&nbsp;Lorem i
                            ssumLorem issum&nbsp;Lorem issum&nbsp;Lorem issum&nbsp;Lorem issum
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
                  <div className="modal-footer"><button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button></div>
                </div>
              </div>
            </div>
            <div className="modal fade" role="dialog" tabIndex={-1} id="modal-modify">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Chỉnh sửa thông tin thuốc BVTV</h4>
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
                          <input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" style={{ padding: 0 }} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Hoạt chất</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" readOnly style={{ padding: 0 }} /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Tên loại thuốc</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Nhóm thuốc</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Danh mục thuốc</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Nhóm độc</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Liều lượng</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Cách sử dụng</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Thời gian cách ly</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Khả năng hỗn hợp</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Đặc điểm chung</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Tổ chức xin đăng ký</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Nhãn thuốc</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum" /></div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <p>Công ty phân phối</p>
                        </div>
                        <div className="col-8"><input className="form-control-plaintext p-0" type="text" defaultValue="Lorem issum Lorem issumLorem issum Lorem issum" readOnly /></div>
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

            {/* End of function */}
            <div className="container-fluid">
              <div className="card shadow">
                <div className="card-header py-3">
                  <p className="text-primary m-0 font-weight-bold">Danh sách thuốc bảo vệ thực vật</p>
                  <div className="mt-3 d-flex flex-row justify-content-around">
                    <a className="btn btn-success btn-icon-split btn-sm" role="button" data-toggle="modal" data-target="#modal-add" href="/">
                      <span className="text-white-50 icon"><i className="fas fa-plus" /></span>
                      <span className="text-white text">Thêm mới dữ liệu</span>
                    </a>
                    <a className="btn btn-danger btn-icon-split" role="button" data-toggle="modal" data-target="#modal-delete-items" href="/">
                      <span className="text-white-50 icon">
                        { /*  <Icon className="fas fa-trash" /> */}
                      </span>
                      <span className="text-white text">Xóa dữ liệu</span>
                    </a>
                  </div>
                </div>
                <ListItems />
              </div>
            </div>
          </div>
          <footer className="bg-white sticky-footer">
            <div className="container my-auto">
              <div className="text-center my-auto copyright"><span>Copyright © HTX 4.0 2019</span></div>
            </div>
          </footer>
        </div>
        <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a>
      </div>
    );
  }
}

export default Administrator;
