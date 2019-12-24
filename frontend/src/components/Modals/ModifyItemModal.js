import React from 'react';

function ModifyItemModal() {
  return (
    <div className="modal fade" role="dialog" tabIndex={-1} id="modal-modify-1">
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
  );
}

export default ModifyItemModal;
