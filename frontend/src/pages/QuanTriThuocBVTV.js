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
      searchError: '',
      refresh: false,
      pageNum: 1,
      dataPerpage: 10,
      activePage: 1,
      totalProducts: 0,
    };

    this.getData = this.getData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchDataByName = this.searchDataByName.bind(this);
  }

  async componentDidMount() {
    const { data, totalProducts } = await this.getData();

    this.setState({
      data,
      totalProducts,
    });
  }

  async componentDidUpdate() {
    const { refresh } = this.state;
    if (refresh) {
      const { data, totalProducts } = await this.getData();
      this.updateDataWhenRendered(data, totalProducts);
    }
  }

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line class-methods-use-this
  getToken() {
    const token = localStorage.getItem('itemName');
    return token;
  }

  async getData() {
    try {
      const { pageNum, dataPerpage } = this.state;
      const response = await axios({
        method: 'GET',
        url: `/api/plant-protection-products?${pageNum}&nPerPage=${dataPerpage}`,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return {
      data: [],
      totalProducts: 0,
    };
  }

  async handlePageChange(pageNumber) {
    const { dataPerpage } = this.state;
    const response = await axios.get(`/api/plant-protection-products?${pageNumber}&nPerPage=${dataPerpage}`);
    if (response.status === 200) {
      const { data, totalProducts } = response.data;
      this.setState(() => ({
        data,
        totalProducts,
        activePage: pageNumber,
      }));
    }
  }


  // eslint-disable-next-line class-methods-use-this
  async searchDataByName(name = '') {
    try {
      const token = localStorage.getItem('user');
      const response = await axios.get(`/api/plant-protection-products/query?name=${name}`, {
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        this.setState(() => ({ data: [response.data], searchError: '' }));
      }
    } catch (error) {
      this.setState(() => ({ searchError: 'Không tìm thấy sản phẩm' }));
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
      data,
      activePage,
      searchError,
      totalProducts,
      dataPerpage,
      error,
    } = this.state;
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
        <DeleteItemsModal type="plantProtectionProduct" data={data} parentComponent={this} />
        <AddItemModal type="plantProtectionProduct" parentComponent={this} />
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

export default QuanTriThuocBVTV;
