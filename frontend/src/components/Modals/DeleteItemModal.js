/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import * as httpStatus from 'http-status';

function DeleteItemModal({ type, parentComponent, selectedItem }) {
  function getToken() {
    const token = localStorage.getItem('itemName');
    return token;
  }

  function renderTypeTitle(typeData) {
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

  function getApiURLByType(typeData) {
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

  async function callApiToDelete(apiUrl) {
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

  async function deleteItemBaseOnId(itemToDelete) {
    const apiUrl = `${getApiURLByType(type)}?_id=${itemToDelete._id}`;
    const result = await callApiToDelete(apiUrl);
    return result;
  }

  async function handleDeleteResult(result) {
    if (result == null) {
      return;
    }
    if (result.status === httpStatus.NOT_FOUND) {
      // alert(results[i].data.errorMessage);
      alert('Xóa thất bại');
      return;
    }
    alert('Xóa thành công');
    parentComponent.setState(() => ({
      refresh: true,
    }));
  }

  async function deleteHandler(e, item) {
    e.preventDefault();
    const result = await deleteItemBaseOnId(item);
    handleDeleteResult(result);
  }

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
              {renderTypeTitle(type)}
              với tên là:
              <strong>
                {` ${selectedItem !== null ? selectedItem.name : ''}`}
              </strong>
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
            <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={(e) => deleteHandler(e, selectedItem)}>Xác nhận xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModal;
