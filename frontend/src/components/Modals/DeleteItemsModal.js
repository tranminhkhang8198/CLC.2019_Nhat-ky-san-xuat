import React from 'react';


function DeleteItemsModal() {
  return (
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
              <label className="form-check-label" htmlFor="del-name1">
                <input className="form-check-input" id="del-name1" type="checkbox" />
                Airi Satou
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="del-name2">
                <input className="form-check-input" id="del-name2" type="checkbox" />
                Angelica Ramos
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="del-name3">
                <input className="form-check-input" id="del-name3" type="checkbox" />
                Ashton Cox
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="del-name4">
                <input className="form-check-input" id="del-name4" type="checkbox" />
                Bradley Greer
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="del-name5">
                <input className="form-check-input" id="del-name5" type="checkbox" />
                Brenden Wagner
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="del-name6">
                <input className="form-check-input" id="del-name6" type="checkbox" />
                Brielle Williamson
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="del-name7">
                <input className="form-check-input" id="del-name7" type="checkbox" />
                Bruno Nash
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="del-name8">
                <input className="form-check-input" id="del-name8" type="checkbox" />
                Caesar Vance
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
            <button className="btn btn-primary" type="button">Xác nhận xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemsModal;
