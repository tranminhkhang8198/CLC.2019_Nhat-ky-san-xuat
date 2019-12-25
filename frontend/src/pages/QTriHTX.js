import React, { Component } from 'react';
import axios from 'axios';

import { ListItems } from '../components/DataTable/QTriHTXDataTable';
import DeleteItemsModal from '../components/Modals/DeleteItemsModal';
import AddItemModal from '../components/Modals/AddItemModal';

class QuanTriHTX extends Component {
  // const navItems = ['Hợp tác xã', 'Quản lý Hợp tác xã', 'Thuốc BVTV', 'Phân bón'];
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: [],
      refresh: false,
      pageNum: 1,
      dataPerpage: 10,
    };

    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const cooperatives = await this.getData();
    this.setState({
      data: cooperatives.data.data,
      error: cooperatives.error,
    });
  }

  // async componentDidMount() {
  //   const cooperatives = await this.getData();
  //   this.setState({
  //     data: cooperatives,
  //     refresh: false,
  //   });
  // }


  async componentDidUpdate() {
    const { refresh } = this.state;
    if (refresh) {
      const cooperatives = await this.getData();
      this.updateDataWhenRendered(cooperatives);
    }
  }

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line class-methods-use-this
  getToken() {
    const token = localStorage.getItem('itemName');
    return token;
  }

  // async getData() {
  //   const { pageNum, dataPerpage } = this.state;
  //   const data = await axios({
  //     method: 'GET',
  //     url: `http://localhost:3001/api/cooperatives?pageNumber=${pageNum}&resultNumber=${dataPerpage}`,
  //   });
  //   return data;
  // }

  async getData() {
    const { pageNum, dataPerpage } = this.state;
    const response = [];
    response.data = await axios({
      method: 'GET',
      url: `http://localhost:3001/api/cooperatives?pageNumber=${pageNum}&resultNumber=${dataPerpage}`,
    }).catch((error) => {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data.errorMessage);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
      }
      response.error = error.response;
    });
    return response;
  }

  async updateDataWhenRendered(updatedData) {
    await this.setState({
      data: updatedData.data.data,
      error: updatedData.error,
      refresh: false,
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
