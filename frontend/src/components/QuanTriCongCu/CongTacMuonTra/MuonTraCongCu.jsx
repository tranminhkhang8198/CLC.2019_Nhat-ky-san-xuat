import React from 'react';

function muonTraCongCu() {
  return (
    <div>
      <div className="container">
        <div className="row" style={{ marginBottom: '16px' }}>
          <div className="col-4 text-center" style={{ maxWidth: '25%' }}><img src="/assets/img/bacnongdan.jpeg" style={{ maxWidth: '100%', width: 'inherit' }} alt="hinh" /></div>
          <div className="col-6">
            <h4>Anh Tám</h4>
            <p style={{ marginBottom: 0 }}>Số lượng nhận: 3</p>
            <div className="d-inline-flex">
              <button className="btn btn-primary btn-danger" type="button" style={{ width: '90px', fontSize: '14px' }}>Trả lại</button>
              <div className="input-group">
                <div className="input-group-prepend" />
                <input className="form-control" type="text" style={{ marginLeft: '16px' }} defaultValue="Ghi chú hiện trạng khi trả" />
                <div className="input-group-append"><button className="btn btn-primary" type="button" style={{ fontSize: '12px' }}>Xong</button></div>
              </div>
            </div>
            <p>Ngày mượn: 2020/02/12&nbsp; &nbsp;|&nbsp; &nbsp; Ngày trả: 2020/02/20</p>
            <p style={{ maxWidth: '350px', marginBottom: 0 }}>Ghi chú: Anh Tám hẹn 8h ngày hôm sau trả</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '16px' }}>
          <div className="col-4 text-center" style={{ maxWidth: '25%' }}><img src="/assets/img/bacnongdan.jpeg" style={{ maxWidth: '100%', width: 'inherit' }} alt="hinh" /></div>
          <div className="col-6">
            <h4>Anh Tám</h4>
            <p style={{ marginBottom: 0 }}>Số lượng nhận: 3</p>
            <div className="d-inline-flex">
              <button className="btn btn-primary btn-danger" type="button" style={{ width: '90px', fontSize: '14px' }}>Trả lại</button>
              <div className="input-group">
                <div className="input-group-prepend" />
                <input className="form-control" type="text" style={{ marginLeft: '16px' }} defaultValue="Ghi chú hiện trạng khi trả" />
                <div className="input-group-append"><button className="btn btn-primary" type="button" style={{ fontSize: '12px' }}>Xong</button></div>
              </div>
            </div>
            <p>Ngày mượn: 2020/02/12&nbsp; &nbsp;|&nbsp; &nbsp; Ngày trả: 2020/02/20</p>
            <p style={{ maxWidth: '350px', marginBottom: 0 }}>Ghi chú: Anh Tám hẹn 8h ngày hôm sau trả</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default muonTraCongCu;
