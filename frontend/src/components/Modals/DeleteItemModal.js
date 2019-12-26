/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import axios from 'axios';
import * as httpStatus from 'http-status';

class DeleteItemModal extends Component {
  constructor(props) {
    super(props);
    this.typeNames = {
      fertilizerTitle: 'fertilizer',
      plantProtectionProductTitle: 'plantProductProtection',
    };
    this.state = {
      type: props.type,
      parentComponent: props.parentComponent,
      selectedItem: props.selectedItem,
      serverDomain: 'http://localhost:3001',
    };
  }

  // eslint-disable-next-line no-unused-vars
  getToken() {
    const token = localStorage.getItem('itemName');
    return token;
  }

  getApiURLByType(typeData) {
    let apiUrl = '';
    switch (typeData) {
      case 'fertilizer':
        apiUrl = 'fertilizers';
        break;
      case 'plantProductProtection':
        apiUrl = 'plant-protection-products';
        break;
      case 'seed':
        apiUrl = '';
        break;
      case 'cooperative':
        apiUrl = 'cooperatives';
        break;
      default:
        apiUrl = '';
        break;
    }
    return apiUrl;
  }

  async callApiToDelete(apiUrl) {
    const data = await axios({
      method: 'delete',
      url: apiUrl,
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
      return error.response;
    });
    return data;
  }

  async deleteItemBaseOnId(itemToDelete) {
    const { serverDomain, type } = this.state;
    const apiUrl = `${serverDomain}/api/${this.getApiURLByType(type)}?_id=${itemToDelete._id}`;
    const result = await this.callApiToDelete(apiUrl);
    return result;
  }

  async handleDeleteResult(result, parent) {
    if (result == null) {
      return;
    }
    if (result.status === httpStatus.OK) {
      alert('Xóa thành công');
      parent.setState(() => ({
        refresh: true,
      }));
      return;
    }
    alert('Xóa thất bại');
  }

  async deleteHandler(e, item) {
    e.preventDefault();
    const { parentComponent } = this.state;
    const result = await this.deleteItemBaseOnId(item);
    this.handleDeleteResult(result, parentComponent);
  }

  renderTypeTitle(typeData) {
    let typeTitle = '';
    switch (typeData) {
      case 'fertilizer':
        typeTitle = ' phân bón ';
        break;
      case 'plantProductProtection':
        typeTitle = ' thuốc bảo vệ thực vật ';
        break;
      case 'seed':
        typeTitle = ' giống lúa ';
        break;
      case 'cooperative':
        typeTitle = ' hợp tác xã ';
        break;
      default:
        typeTitle = '';
        break;
    }
    return typeTitle;
  }

  renderItemContent(itemData) {
    if (!itemData) {
      return null;
    }
    return itemData.name;
  }


  renderDeleteModal() {
    const { selectedItem, type } = this.state;
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-delete-item-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Xóa dữ liệu</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Hành động này không thể hoàn tác,
                bạn chắc chắn muốn xóa
                {this.renderTypeTitle(type)}
                với tên là:
                <strong>
                  {` ${this.renderItemContent(selectedItem)}`}
                </strong>
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
              <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={(e) => this.deleteHandler(e, selectedItem)}>Xác nhận xóa</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderDeleteModal()}
      </>
    );
  }
}

export default DeleteItemModal;
