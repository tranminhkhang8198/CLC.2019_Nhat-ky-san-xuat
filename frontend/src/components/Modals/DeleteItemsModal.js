/* eslint class-methods-use-this: [
  "error",
  { "exceptMethods":
    [
      "renderTypeTitle", "renderItemsToDelete", "getApiURLByType",
      "callApiToDelete", "handleDeleteResult", "getData",
      "getToken"
    ]
  }
] */
/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import uuidv4 from 'uuid';
import axios from 'axios';
import * as httpStatus from 'http-status';

class DeleteItemsModal extends Component {
  constructor(props) {
    super();

    this.state = {
      type: props.type,
      data: props.data,
      parrent: props.parentComponent,
      checkboxRefs: [],
    };
    console.log(props);

    this.renderTypeTitle = this.renderTypeTitle.bind(this);
    this.renderItemsToDelete = this.renderItemsToDelete.bind(this);
    this.updateDataWhenRendered = this.updateDataWhenRendered.bind(this);
    this.deleteListOfItemsEventHandler = this.deleteListOfItemsEventHandler.bind(this);
  }


  componentDidUpdate(prevProps) {
    // console.log('event');
    const { data } = this.props;
    if (data.length !== prevProps.data.length) {
      this.updateDataWhenRendered(data);
      return;
    }
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]._id !== prevProps.data[i]._id) {
        this.updateDataWhenRendered(data);
        return;
      }
    }
  }

  getToken() {
    const token = localStorage.getItem('itemName');
    return token;
  }

  getApiURLByType(typeData) {
    let apiUrl = '';
    switch (typeData) {
      case 'fertilizer':
        apiUrl = 'http://localhost:3001/api/fertilizers';
        break;
      case 'plantProductProtection':
        apiUrl = 'http://localhost:3001/api/plant-protection-products';
        break;
      default:
        apiUrl = '';
        break;
    }
    return apiUrl;
  }

  async updateDataWhenRendered(updatedData) {
    // console.log('event 2');
    await this.setState({
      data: updatedData,
    });
    return updatedData;
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
    const { type } = this.state;
    const apiUrl = `${this.getApiURLByType(type)}?_id=${itemToDelete._id}`;
    const result = await this.callApiToDelete(apiUrl);
    // console.log(apiUrl);
    // console.log(result);
    // console.log(result.status);
    return result;
  }

  async deleteItemBaseOnItemName(itemToDelete) {
    const apiUrl = `${this.getApiURLByType(this.type)}?name=${itemToDelete.name}`;
    const result = await this.callApiToDelete(apiUrl);
    return result;
  }

  handleDeleteResult(results) {
    if (results.length === 0) {
      return;
    }
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].status === httpStatus.NOT_FOUND) {
        alert(`Xóa thất bại: ${results[i].data.errorMessage}`);
        return;
      }
    }
    alert('Xóa thành công');
  }

  async deleteListOfItemsEventHandler(e) {
    e.preventDefault();
    const { parrent, data, checkboxRefs } = this.state;
    const results = [];
    for (let i = 0; i < data.length; i += 1) {
      const { _id } = data[i];
      const isChecked = checkboxRefs[_id].checked;
      if (isChecked) {
        // eslint-disable-next-line no-await-in-loop
        const result = await this.deleteItemBaseOnId(data[i]);
        results.push(result);
      }
    }
    parrent.setState(() => ({
      refresh: true,
    }));
    this.handleDeleteResult(results);
  }

  renderTypeTitle(typeData) {
    let typeTitle = '';
    switch (typeData) {
      case 'fertilizer':
        typeTitle = ' phân bón';
        break;
      case 'plantProductProtection':
        typeTitle = ' thuốc bảo vệ thực vật';
        break;
      default:
        typeTitle = '';
        break;
    }
    return typeTitle;
  }

  renderItemsToDelete(items) {
    const { checkboxRefs } = this.state;
    return items.data.map((item) => (
      <div className="form-check" key={uuidv4()}>
        <label className="form-check-label" htmlFor={`delete-${item._id}`}>
          <input
            className="form-check-input"
            id={`delete-${item._id}`}
            type="checkbox"
            ref={(element) => { checkboxRefs[item._id] = element; }}
          />
          {item.name}
        </label>
      </div>
    ));
  }

  render() {
    const { data, type } = this.state;
    // console.log(this.state);
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-delete-items">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Xóa dữ liệu
                {this.renderTypeTitle(type)}
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body modal-add-body">
              <p>Chọn tên các dữ liệu bạn muốn xóa</p>
              {this.renderItemsToDelete(data)}
            </div>
            <div className="modal-footer">
              <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
              <button className="btn btn-primary" type="button" onClick={this.deleteListOfItemsEventHandler}>Xác nhận xóa</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteItemsModal;
