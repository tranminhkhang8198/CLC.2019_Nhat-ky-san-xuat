/* eslint-disable no-console */
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
      pageNum: 0,
      activePage: 1,
      dataPerpage: 10,
      searchError: '',
      totalProducts: 52,
    };

    this.getData = this.getData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchDataByName = this.searchDataByName.bind(this);
  }

  async componentDidMount() {
    // const { data, totalProducts } = await this.getData();
    const { data, totalProducts } = await this.getData();
    console.log(data);
    this.setState({
      data,
      totalProducts,
    });
  }

  async componentDidUpdate() {
    const { refresh } = this.state;
    console.log('updating...');
    if (refresh) {
      const { data, totalProducts } = await this.getData();
      // const data = await this.getData();
      // const totalProducts = null;
      this.updateDataWhenRendered(data, totalProducts);
    }
  }

  async getData() {
    try {
      const { pageNum, dataPerpage } = this.state;
      const token = localStorage.getItem('user');
      const [response, totalCooperativesResponse] = await Promise.all([
        axios({
          method: 'GET',
          url: `http://localhost:3001/api/cooperatives/search?pageNumber=${pageNum}&resultNumber=${dataPerpage}`,
          headers: { Authorization: token },
        }),
        axios({
          method: 'GET',
          url: 'http://localhost:3001/api/cooperatives/count',
          headers: { Authorization: token },
        }),
      ]);
      if (response.status === 200 && totalCooperativesResponse.status === 200) {
        const { data } = response;
        const { total: totalProducts } = totalCooperativesResponse.data;
        return {
          data,
          totalProducts,
        };
      }
    } catch (error) {
      console.log(error);
    }
    return {
      data: [],
      totalProducts: 0,
    };
  }

  async searchDataByName(name = '') {
    try {
      const token = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3001/api/cooperatives/search?pageNumber=0&resultNumber=1&name=${name}`, {
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        const { data } = response;
        if (data.length !== 0) {
          this.setState(() => ({ data, searchError: '' }));
        } else {
          this.setState(() => ({ searchError: 'Không tìm thấy sản phẩm' }));
        }
      }
    } catch (error) {
      this.setState(() => ({ searchError: 'Không tìm thấy sản phẩm' }));
    }
  }

  async handlePageChange(pageNumber) {
    const { dataPerpage } = this.state;
    console.log('call me');
    const [response, totalCooperativesResponse] = await Promise.all([
      axios.get(`http://localhost:3001/api/cooperatives?pageNumber=${pageNumber}&resultNumber=${dataPerpage}`),
      axios.get('http://localhost:3001/api/cooperatives/count'),
    ]);

    if (response.status === 200 && totalCooperativesResponse.status === 200) {
      const { data } = response;
      console.log(data);
      const { total: totalProducts } = totalCooperativesResponse.data;
      this.setState(() => ({
        data,
        totalProducts: totalProducts || 52,
        activePage: pageNumber,
      }));
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
    const {
      error,
      data,
      activePage,
      searchError,
      totalProducts,
      dataPerpage,
    } = this.state;
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
            <div className="text-center text-danger">{searchError}</div>
          </div>
          <ListItems
            data={data}
            activePage={activePage}
            handlePageChange={this.handlePageChange}
            parentComponent={this}
            totalProducts={totalProducts}
            dataPerpage={dataPerpage}
          />
        </div>
      </div>
    );
  }
}

export default QuanTriHTX;
