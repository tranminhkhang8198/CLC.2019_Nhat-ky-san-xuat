import React from 'react';
import LichSuMuonTra from './LichSuMuonTra';
import MuonTraCongCu from './MuonTraCongCu';

function CongTacMuonTra() {
  return (
    <div>
      <div>
        <ul
          className="nav nav-tabs text-nowrap flex-nowrap"
          style={{ overflowX: 'auto', overflowY: 'hidden' }}
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              role="tab"
              data-toggle="tab"
              href="#tab-1"
            >
              <i className="far fa-pause-circle" style={{ marginRight: '6px' }} />
              Theo dõi mượn trả
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" role="tab" data-toggle="tab" href="#tab-2">
              <i className="far fa-check-circle" style={{ marginRight: '6px' }} />
              Lịch sử mượn trả
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" role="tabpanel" id="tab-1">
            <MuonTraCongCu />
          </div>
          <div className="tab-pane" role="tabpanel" id="tab-2">
            {/* Start watched */}
            <LichSuMuonTra />
            {/* end watched */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CongTacMuonTra;
