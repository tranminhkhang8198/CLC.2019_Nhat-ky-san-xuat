import React from 'react';

function Paginator() {
  return (
    <div className="row">
      <div className="col-md-6 align-self-center">
        <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">
          Hiển thị 1 - 10/27 dữ liệu
        </p>
      </div>
      <div className="col-md-6">
        <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link" href="/" aria-label="Previous">
                &nbsp;
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
                &nbsp;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Paginator;
