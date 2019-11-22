/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import { ListItems } from '../components/DataTable/DataTable';

// eslint-disable-next-line react/prefer-stateless-function
class Administrator extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="card shadow">
          <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">Danh sách thuốc bảo vệ thực vật</p>
            <div className="mt-3 d-flex flex-row justify-content-around">
              <a className="btn btn-success btn-icon-split" role="button" data-toggle="modal" data-target="#modal-add" href="/">
                <span className="text-white-50 icon">
                  <i className="fas fa-plus" />
                </span>
                <span className="text-white text">Thêm mới dữ liệu</span>
              </a>
              <a className="btn btn-danger btn-icon-split" role="button" data-toggle="modal" data-target="#modal-delete-items" href="/">
                <span className="text-white-50 icon">
                  <i className="fas fa-trash" />
                </span>
                <span className="text-white text">Xóa dữ liệu</span>
              </a>
            </div>
          </div>
          <ListItems />
        </div>
      </div>
    );
  }
}

export default Administrator;
