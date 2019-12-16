/* eslint class-methods-use-this: [
  "error",
  { "exceptMethods":
    ["renderTypeTitle", "renderItemsToDelete"]
  }
] */
/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import uuidv4 from 'uuid';

class DeleteItemsModal extends Component {
  constructor(props) {
    super();

    this.state = {
      type: props.type,
      data: props.data,
    };

    this.renderTypeTitle = this.renderTypeTitle.bind(this);
    this.renderItemsToDelete = this.renderItemsToDelete.bind(this);
    this.updateDataWhenRendered = this.updateDataWhenRendered.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data.length !== prevProps.data.length) {
      this.updateDataWhenRendered(data);
    }
  }

  async updateDataWhenRendered(updatedData) {
    await this.setState({
      data: updatedData,
    });
    return updatedData;
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
    return items.map((item) => (
      <div className="form-check" key={uuidv4()}>
        <label className="form-check-label" htmlFor={`delete-${item._id}`}>
          <input className="form-check-input" id={`delete-${item._id}`} type="checkbox" />
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
            <div className="modal-body">
              <p>Chọn tên các dữ liệu bạn muốn xóa</p>
              {this.renderItemsToDelete(data)}
            </div>
            <div className="modal-footer">
              <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
              <button className="btn btn-primary" type="button">Xác nhận xóa</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteItemsModal;
