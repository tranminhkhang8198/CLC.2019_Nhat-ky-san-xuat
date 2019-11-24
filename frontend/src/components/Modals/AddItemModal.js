import React from 'react';

function AddItemModal() {
  return (
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
              <label htmlFor="ten-thuong-pham" className="w-100">
                Tên thương phẩm
                <span style={{ color: 'rgb(249,15,15)' }}>
                  &nbsp;*
                </span>
                <input type="text" id="ten-thuong-pham" className="form-control item" placeholder="Nhập vào tên thương phẩm" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="ten-hoat-chat" className="w-100">
                Tên hoạt chất
                <input type="text" id="ten-hoat-chat" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="ten-loai-thuoc" className="w-100">
                Tên loại thuốc
                <input type="text" id="ten-loai-thuoc" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="ten-nhom-thuoc" className="w-100">
                Tên nhóm thuốc
                <input type="text" id="ten-nhom-thuoc" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="danh-muc-thuoc" className="w-100">
                Danh mục thuốc
                <input type="text" id="danh-muc-thuoc" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="dang-thuoc" className="w-100">
                Dạng thuốc
                <input type="text" id="dang-thuoc" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="doi-tuong-phong-tru" className="w-100">
                Đối tượng phòng trừ
                <input type="text" id="doi-tuong-phong-tru" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
              <small>Ví dụ: Rầy nâu 1,Rầy nâu 2,Rầy nâu 3</small>
            </div>
            <div className="form-group">
              <label htmlFor="tac-dong-cua-thuoc" className="w-100">
                Tác động của thuốc
                <input type="text" id="tac-dong-cua-thuoc" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
              <small>Ví dụ: Bảo vệ cây trồng,Giết sâu bọ</small>
            </div>
            <div className="form-group">
              <label htmlFor="nhom-doc" className="w-100">
                Nhóm độc
                <input type="text" id="nhom-doc" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="lieu-luong" className="w-100">
                Liều lượng sử dụng
                <input type="text" id="lieu-luong" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="cach-su-dung" className="w-100">
                Cách sử dụng
                <textarea id="cach-su-dung" className="form-control item" rows={5} placeholder="Mô tả chi tiết cách dùng của thuốc" defaultValue="" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="thoi-gian-cach-ly" className="w-100">
                Thời gian cách ly
                <input type="text" id="thoi-gian-cach-ly" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
              <small>Ví dụ: 1 ngày</small>
            </div>
            <div className="form-group">
              <label htmlFor="kha-nang-hon-hop" className="w-100">
                Khả năng hỗn hợp
                <input type="text" id="kha-nang-hon-hop" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="dac-diem-chung" className="w-100">
                Đặc điểm chung
                <input type="text" id="dac-diem-chung" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="to-chuc-dang-ky" className="w-100">
                Tổ chức xin đăng ký
                <input type="text" id="to-chuc-dang-ky" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="nhan-thuoc" className="w-100">
                Nhãn thuốc
                <input type="text" id="nhan-thuoc" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="cong-ty-phan-phoi" className="w-100">
                Công ty phân phối
                <input type="text" id="cong-ty-phan-phoi" className="form-control item" placeholder="Nhập vào tên hoạt chất" />
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
            <button className="btn btn-primary" type="button">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
