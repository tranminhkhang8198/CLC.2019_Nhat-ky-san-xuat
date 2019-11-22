/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { ListItems } from '../components/DataTable/DataTable';
import DeleteItemsModal from '../components/Modals/DeleteItemsModal';
import AddItemModal from '../components/Modals/AddItemModal';

function Quantrihtx() {
  return (
    <div className="container-fluid">
      <DeleteItemsModal />
      <AddItemModal />
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 font-weight-bold">Danh sách quản lý hợp tác xã</p>
          <div className="mt-3 d-flex flex-row justify-content-around">
            <a href="/" className="btn btn-success btn-icon-split" role="button" data-toggle="modal" data-target="#modal-add">
              <span className="text-white-50 icon">
                <i className="fas fa-plus" />
              </span>
              <span className="text-white text">Thêm mới dữ liệu</span>
            </a>
            <a href="/" className="btn btn-danger btn-icon-split" role="button" data-toggle="modal" data-target="#modal-delete-items">
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

export default Quantrihtx;
