import React from 'react';

function DeleteItemModal() {
  return (
    <div className="modal fade" role="dialog" tabIndex={-1} id="modal-delete-item-1">
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
  );
}

export default DeleteItemModal;
