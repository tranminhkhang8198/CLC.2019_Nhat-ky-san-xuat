import React, { Component } from 'react';
import axios from 'axios';

import { ListItems } from '../components/DataTable/QuanTriNhanSuHTXDataTable';
import DeleteItemsModal from '../components/Modals/DeleteItemsModal';
import AddItemModal from '../components/Modals/AddItemModal';

class QuanTriNhanSuHTX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: [],
      refresh: false,
      pageNum: 1,
      dataPerpage: 10,
      totalPages: 1,
    };

    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const cooperativeHR = await this.getData();
    this.setState({
      data: cooperativeHR.data,
      totalPages: cooperativeHR.totalPages,
    });
  }

  async componentDidUpdate() {
    const { refresh } = this.state;
    if (refresh) {
      const cooperativeHR = await this.getData();
      this.updateDataWhenRendered(cooperativeHR);
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
      url: `http://localhost:3001/api/abcd?pageNumber=${pageNum}&nPerPage=${dataPerpage}`,
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
    const { error, data, totalPages } = this.state;
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
          <ListItems data={data} totalPages={totalPages} />
        </div>
      </div>
    );
  }
}

export default QuanTriNhanSuHTX;
