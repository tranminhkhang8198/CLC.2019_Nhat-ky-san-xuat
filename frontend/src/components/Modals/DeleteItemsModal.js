/* eslint-disable no-alert */
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
import React, { Component } from 'react';
import uuidv4 from 'uuid';
import axios from 'axios';
import httpStatus from 'http-status';

class DeleteItemsModal extends Component {
  constructor(props) {
    super();

    this.state = {
      type: props.type,
      data: props.data,
      parrent: props.parentComponent,
      checkboxRefs: [],
    };

    this.renderTypeTitle = this.renderTypeTitle.bind(this);
    this.renderItemsToDelete = this.renderItemsToDelete.bind(this);
    this.updateDataWhenRendered = this.updateDataWhenRendered.bind(this);
    this.deleteListOfItemsEventHandler = this.deleteListOfItemsEventHandler.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deSelectAll = this.deSelectAll.bind(this);
  }

  componentDidUpdate(prevProps) {
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
      case 'seed':
        apiUrl = '';
        break;
      case 'cooperative':
        apiUrl = 'http://localhost:3001/api/cooperatives';
        break;
      default:
        apiUrl = '';
        break;
    }
    return apiUrl;
  }

  async updateDataWhenRendered(updatedData) {
    // console.log('event 2');
    this.setState({
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
    return result;
  }

  async deleteItemBaseOnItemName(itemToDelete) {
    const apiUrl = `${this.getApiURLByType(this.type)}?name=${itemToDelete.name}`;
    const result = await this.callApiToDelete(apiUrl);
    return result;
  }

  handleDeleteResult(results, parrent) {
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
    parrent.setState(() => ({
      refresh: true,
    }));
  }

  async deleteListOfItemsEventHandler(e) {
    e.preventDefault();
    const { parrent, data, checkboxRefs } = this.state;
    const results = [];
    for (let i = 0; i < data.length; i += 1) {
      const { _id } = data[i];
      const isChecked = checkboxRefs[_id].checked;
      if (isChecked) {
        results.push(this.deleteItemBaseOnId(data[i]));
      }
    }
    await Promise.all(results);
    this.handleDeleteResult(results, parrent);
  }

  selectAll() {
    const { data, checkboxRefs } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      const { _id } = data[i];
      checkboxRefs[_id].checked = true;
    }

    checkboxRefs['deselect-all'].checked = false;
  }

  deSelectAll() {
    const { data, checkboxRefs } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      const { _id } = data[i];
      checkboxRefs[_id].checked = false;
    }

    checkboxRefs['select-all'].checked = false;
  }

  renderTypeTitle(typeData) {
    let typeTitle = '';
    switch (typeData) {
      case 'fertilizer':
        typeTitle = ' phân bón';
        break;
      case 'plantProtectionProduct':
        typeTitle = ' thuốc bảo vệ thực vật';
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

  renderItemsToDelete(items) {
    const { checkboxRefs } = this.state;
    if (!Array.isArray(items)) {
      return null;
    }
    if (!items.length) {
      return null;
    }
    return items.map((item) => (
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
    const { data, type, checkboxRefs } = this.state;
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
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div className="mt-2">
                <div className="form-check" key={uuidv4()}>
                  <label className="form-check-label" htmlFor="select-all" onClick={() => this.selectAll()}>
                    <input
                      className="form-check-input"
                      id="select-all"
                      type="checkbox"
                      ref={(element) => { checkboxRefs['select-all'] = element; }}
                    />
                    Chọn tất cả
                  </label>
                </div>
                <div className="form-check" key={uuidv4()}>
                  <label className="form-check-label" htmlFor="deselect-all" onClick={() => this.deSelectAll()}>
                    <input
                      className="form-check-input"
                      id="deselect-all"
                      type="checkbox"
                      ref={(element) => { checkboxRefs['deselect-all'] = element; }}
                    />
                    Bỏ chọn tất cả
                  </label>
                </div>
              </div>
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
