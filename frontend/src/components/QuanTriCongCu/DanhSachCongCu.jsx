import React from 'react';

function QuanTriCongCu({ onViewProduct, onClickProduct }) {
  return (
    <div>
      <div className="container">
        <div className="row" style={{ marginBottom: '16px' }}>
          <div className="col-3" style={{ maxWidth: '100px' }}><img src="assets/img/binhxichthuoc.jpeg" width="84px" height="84px" alt="dụng cụ" /></div>
          <div className="col-9" style={{ maxWidth: '50%' }}>
            <button
              type="button"
              className="link-button"
              onClick={onClickProduct}
            >
              <h5 className="text-truncate" style={{ marginBottom: 0, fontWeight: 700 }}>Bình xịch thuốc cho nông nghiệp công nghệ cao</h5>
            </button>
            <p style={{ marginBottom: 0 }}>Số lượng: 50</p>
            <p style={{ marginBottom: 0 }}>Còn trong kho: 20</p>
            <button
              type="button"
              className="link-button"
              onClick={onViewProduct}
            >
              Chi tiết mượn trả
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuanTriCongCu;
