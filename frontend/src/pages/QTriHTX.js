/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import axios from 'axios';

import { ListItems } from '../components/DataTable/QTriHTXDataTable';
import DeleteItemsModal from '../components/Modals/DeleteItemsModal';
import AddItemModal from '../components/Modals/AddItemModal';

class QuanTriHTX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: [],
      refresh: false,
      pageNum: 1,
      dataPerpage: 10,
      totalProducts: 0,
    };

    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    // const { data, totalProducts } = await this.getData();
    const data = await this.getData();
    const totalProducts = null;
    console.log(data);
    this.setState({
      data,
      totalProducts,
    });
  }

  async componentDidUpdate() {
    const { refresh } = this.state;
    if (refresh) {
      // const { data, totalProducts } = await this.getData();
      const data = await this.getData();
      const totalProducts = null;
      this.updateDataWhenRendered(data, totalProducts);
    }
  }

  async getData() {
    try {
      const { pageNum, dataPerpage } = this.state;
      const token = localStorage.getItem('user');
      const response = await axios({
        method: 'GET',
        url: `http://localhost:3001/api/cooperatives?pageNumber=${pageNum}&resultNumber=${dataPerpage}`,
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.log('error');
      return null;
    }
  }

  async updateDataWhenRendered(updatedData, totalProducts) {
    this.setState({
      refresh: false,
      data: updatedData,
      totalProducts,
    });
    return updatedData;
  }

  render() {
    const { error, data } = this.state;
    if (error) {
      const a = (
        <div>
          Error:
          {error.statusText}
        </div>
      );
      return a;
    }
    return (
      <div className="container-fluid">
        <DeleteItemsModal type="cooperative" data={data} parentComponent={this} />
        <AddItemModal type="cooperative" />
        <div className="card shadow">
          <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">Danh sách hợp tác xã</p>
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
          <ListItems data={data} parentComponent={this} />
        </div>
      </div>
    );
  }
}

export default QuanTriHTX;
