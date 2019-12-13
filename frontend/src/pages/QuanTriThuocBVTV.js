/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable-next-line react/prefer-stateless-function */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getData", "render"] }] */
import React, { Component } from 'react';
import axios from 'axios';

import { ListItems } from '../components/DataTable/QuanTriThuocBVTVDataTable';
import DeleteItemsModal from '../components/Modals/DeleteItemsModal';
import AddItemModal from '../components/Modals/AddItemModal';

class QuanTriThuocBVTV extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };

    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const plantProtectionData = await this.getData();

    this.setState({
      data: plantProtectionData,
    });
  }

  async getData() {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3001/api/plant-protection-products?pageNumber=9&nPerPage=20',
    });

    return data;
  }

  render() {
    const { data } = this.state;
    return (
      <div className="container-fluid">
        <DeleteItemsModal />
        <AddItemModal />
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
          <ListItems data={data} />
        </div>
      </div>
    );
  }
}

export default QuanTriThuocBVTV;
