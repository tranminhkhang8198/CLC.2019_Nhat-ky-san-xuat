import React from 'react';

function thongTinCongCu() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6" style={{ minWidth: '150px' }}><img src="/assets/img/binhxichthuoc.jpeg" style={{ width: 'inherit', height: 'inherit' }} alt="hinh" /></div>
          <div className="col-6">
            <h3 className="text-center">Bình xịch thuốc chon nông nghiệp công nghệ cao</h3>
            <hr />
            <div className="fluid-container">
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-4"><span>Nhà sản xuất</span></div>
                <div className="text-success col-8"><span>Công ty TNHH Khuyến nông ấp 8</span></div>
              </div>
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-4"><span>Bảo hành</span></div>
                <div className="col-8"><span className="text-success">12 tháng&nbsp;</span></div>
              </div>
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-4"><span>Xuất xứ</span></div>
                <div className="col-8"><span className="text-success">Việt Nam&nbsp;</span></div>
              </div>
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-4"><span>Giá</span></div>
                <div className="col-8"><span className="text-success"><strong>1.100.000 ₫</strong></span></div>
              </div>
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-4"><span>Mô tả</span></div>
                <div className="col-8">
                  <ul className="text-info">
                    <li>Cần 3 béc Kim loại</li>
                    <li>Cần xịt có khớp nối bằng đồng thau</li>
                    <li>Bình ắc quy bền, chất lượng</li>
                  </ul>
                </div>
              </div>
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-4"><span>Thông số kĩ thuật</span></div>
                <div className="col-8">
                  <ul className="text-info">
                    <li>Nguồn Ắc quy:&nbsp;12V/8AH</li>
                    <li>Dung tích:&nbsp;20L</li>
                    <li>Trọng lượng: 6 kg</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default thongTinCongCu;
