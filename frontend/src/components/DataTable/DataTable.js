/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
import React, { Component } from 'react';

import ViewItemModal from '../Modals/ViewItemModal';

export class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      Items: [],
    };
  }

  render() {
    return (
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 text-nowrap">
            <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
              <label>
                HIển thị&nbsp;
                <select className="form-control form-control-sm custom-select custom-select-sm">
                  <option value={10} selected>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                &nbsp;
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-md-right dataTables_filter" id="dataTable_filter">
              <label>
                <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Tìm thuốc BVTV theo tên" />
              </label>
            </div>
          </div>
        </div>
        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
          <table className="table dataTable my-0" id="dataTable">
            <thead>
              <tr>
                <th>Tên thương phẩm</th>
                <th>Tên hoạt chất</th>
                <th>Loại thuốc</th>
                <th>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              <ViewItemModal />
              <tr>
                <td>Airi Satou</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">Hành động&nbsp;</button>
                    <div className="dropdown-menu" role="menu" style={{ overflow: 'hidden', padding: 0 }}>
                      <a
                        className="dropdown-item text-white bg-info"
                        href="/"
                        role="presentation"
                        data-toggle="modal"
                        data-target="#modal-view-1"
                        style={{ cursor: 'pointer' }}
                      >
                      Xem thông tin
                      </a>
                      <a
                        className="dropdown-item text-white bg-warning"
                        href="/"
                        role="presentation"
                        data-toggle="modal"
                        data-target="#modal-modify-1"
                        style={{ cursor: 'pointer' }}
                      >
                        Chỉnh sửa
                      </a>
                      <a
                        className="dropdown-item text-white bg-danger"
                        href="/"
                        role="presentation"
                        data-toggle="modal"
                        data-target="#modal-delete-item-1"
                        style={{ cursor: 'pointer' }}
                      >
                        Xóa hàng này
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Angelica Ramos</td>
                <td>Chief Executive Officer(CEO)</td>
                <td>London</td>
                <td />
              </tr>
              <tr>
                <td>Ashton Cox</td>
                <td>Junior Technical Author</td>
                <td>San Francisco</td>
                <td><br /></td>
              </tr>
              <tr>
                <td>Bradley Greer</td>
                <td>Software Engineer</td>
                <td>London</td>
                <td><br /></td>
              </tr>
              <tr>
                <td>Brenden Wagner</td>
                <td>Software Engineer</td>
                <td>San Francisco</td>
                <td><br /></td>
              </tr>
              <tr>
                <td>Brielle Williamson</td>
                <td>Integration Specialist</td>
                <td>New York</td>
                <td><br /></td>
              </tr>
              <tr>
                <td>
                  Bruno Nash
                  <br />
                </td>
                <td>Software Engineer</td>
                <td>London</td>
                <td><br /></td>
              </tr>
              <tr>
                <td>Caesar Vance</td>
                <td>Pre-Sales Support</td>
                <td>New York</td>
                <td><br /></td>
              </tr>
              <tr>
                <td>Cara Stevens</td>
                <td>Sales Assistant</td>
                <td>New York</td>
                <td><br /></td>
              </tr>
              <tr>
                <td>Cedric Kelly</td>
                <td>Senior JavaScript Developer</td>
                <td>Edinburgh</td>
                <td><br /></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Tên thương phẩm</strong></td>
                <td><strong>Tên hoạt chất</strong></td>
                <td><strong>Loại thuốc</strong></td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="row">
          <div className="col-md-6 align-self-center">
            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Hiển thị 1 - 10/27 dữ liệu</p>
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
      </div>
    );
  }
}

export default { ListItems };
