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
      error: null,
      refresh: false,
      pageNum: 1,
      dataPerpage: 10,
      totalPages: 1,
    };

    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const plantProtectionData = await this.getData();

    this.setState({
      data: plantProtectionData.data,
      totalPages: plantProtectionData.totalPages,
    });
  }

  async componentDidUpdate() {
    const { refresh } = this.state;
    if (refresh) {
      const plantProtectionData = await this.getData();
      this.updateDataWhenRendered(plantProtectionData);
    }
  }

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line class-methods-use-this
  getToken() {
    const token = localStorage.getItem('itemName');
    return token;
  }

  async getData() {
    const { pageNum, dataPerpage } = this.state;
    const { data } = await axios({
      method: 'GET',
      url: `http://localhost:3001/api/plant-protection-products?pageNumber=${pageNum}&nPerPage=${dataPerpage}`,
    });
    return data;
  }

  async updateDataWhenRendered(updatedData) {
    await this.setState({
      refresh: false,
      data: updatedData.data,
      totalPages: updatedData.totalPages,
    });
    return updatedData;
  }

  render() {
    const { data, totalPages, error } = this.state;
    if (error) {
      const a = (
        <div>
          Error:
          {error.message}
        </div>
      );
      return a;
    }
    return (
      <div className="container-fluid">
        <DeleteItemsModal type="plantProductProtection" data={data} parentComponent={this} />
        <AddItemModal type="plantProductProtection" />
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
          <ListItems data={data} totalPages={totalPages} parentComponent={this} />
        </div>
      </div>
    );
  }
}

export default QuanTriThuocBVTV;
