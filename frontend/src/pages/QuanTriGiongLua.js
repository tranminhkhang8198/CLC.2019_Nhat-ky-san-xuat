/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import axios from 'axios';

import { ListItems } from '../components/DataTable/QuanTriGiongLuaDataTable';
import DeleteItemsModal from '../components/Modals/DeleteItemsModal';
import AddItemModal from '../components/Modals/AddItemModal';

class QuanTriGiongLua extends Component {
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
    const seeds = await this.getData();
    this.setState({
      data: seeds,
      refresh: false,
    });
  }


  async componentDidUpdate(prevProps, prevState) {
    const { refresh } = this.state;
    if (refresh) {
      const seeds = await this.getData();
      this.updateDataWhenRendered(seeds);
    }
  }

  async getData() {
    const { pageNum, dataPerpage } = this.state;
    const { data } = await axios({
      method: 'GET',
      // url: `http://localhost:3001/api/fertilizers?pageNumber=${pageNum}&nPerPage=${dataPerpage}`,
      url: '',
    });
    return data;
  }

  async updateDataWhenRendered(updatedData) {
    await this.setState({
      refresh: false,
      data: updatedData,
    });
    return updatedData;
  }

  render() {
    const { error, data } = this.state;
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
        <DeleteItemsModal type="seed" data={data} parentComponent={this} />
        <AddItemModal type="seed" />
        <div className="card shadow">
          <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">Danh sách giống lúa</p>
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

export default QuanTriGiongLua;
