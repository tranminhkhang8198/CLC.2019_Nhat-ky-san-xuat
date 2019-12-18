/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import httpStatus from 'http-status';

function AddItemModal({ type }) {
  function renderTypeTitle(typeData) {
    let typeTitle = '';
    switch (typeData) {
      case 'fertilizer':
        typeTitle = ' phân bón';
        break;
      case 'plantProductProtection':
        typeTitle = ' thuốc bảo vệ thực vật';
        break;
      default:
        typeTitle = ' dữ liệu';
        break;
    }
    return typeTitle;
  }

  function getApiURLByType(dataType) {
    let apiUrl = '';
    switch (dataType) {
      case 'fertilizer':
        apiUrl = 'http://localhost:3001/api/fertilizers';
        break;
      case 'plantProductProtection':
        apiUrl = '';
        break;
      default:
        apiUrl = '';
        break;
    }
    return apiUrl;
  }

  function getLabelTitlesByType(dataType) {
    let labelTitles = [];
    switch (dataType) {
      case 'fertilizer':
        labelTitles = [
          {
            name: 'name',
            value: 'Tên phân bón',
            required: true,
            notes: [],
          },
          {
            name: 'type',
            value: 'Loại phân bón',
            required: true,
            notes: [],
          },
          {
            name: 'ingredient',
            value: 'Thành phần',
            required: false,
            notes: [
              'Tên các thành phần phải cách nhau bằng dấu ;',
              'Ví dụ: Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%;...',
            ],
          },
          {
            name: 'ministry',
            value: 'Bộ',
            required: false,
            notes: [],
          },
          {
            name: 'province',
            value: 'Tỉnh',
            required: false,
            notes: [],
          },
          {
            name: 'lawDocument',
            value: 'Căn cứ, tiêu chuẩn, quy định',
            required: false,
            notes: [],
          },
          {
            name: 'enterprise',
            value: 'Nơi sản xuất',
            required: false,
            notes: [],
          },
          {
            name: 'isoCertOrganization',
            value: 'Tổ chức chứng nhận hợp quy',
            required: false,
            notes: [],
          },
          {
            name: 'manufactureAndImport',
            value: 'Nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
        ];
        break;
      case 'plantProductProtection':
        labelTitles = [
          {
            name: 'add-ten-thuong-pham',
            value: 'Tên thương phẩm',
            required: true,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            name: 'add-ten-hoat-chat',
            value: 'Tên hoạt chất',
            required: false,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            name: 'add-ten-loai-thuoc',
            value: 'Tên loại thuốc',
            required: false,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            name: 'add-ten-nhom-thuoc',
            value: 'Tên nhóm thuốc',
            required: false,
            notes: [],
          },
          {
            name: 'add-danh-muc-thuoc',
            value: 'Danh mục thuốc',
            required: true,
            notes: [],
          },
        ];
        break;
      default:
        labelTitles = [];
        break;
    }
    return labelTitles;
  }

  function renderRequiredFields() {
    return (
      <span style={{ color: 'rgb(249,15,15)' }}>
        &nbsp;*
      </span>
    );
  }

  function renderNotesFields(notes) {
    return notes.map((item) => (
      <small className="form-text text-muted" key={uuidv4()}>
        {item}
      </small>
    ));
  }

  async function callApiToCreateNewItem(api, bodyFormData) {
    try {
      const data = await axios({
        method: 'post',
        url: api,
        data: bodyFormData,
      });
      return data;
    } catch (error) {
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
    }
  }

  const inputFieldRefs = [];
  function clearAllInputField(titles) {
    for (let i = 0; i < titles.length; i += 1) {
      const { name } = titles[i];
      inputFieldRefs[name].value = '';
    }
  }

  function hanldeResponseFromServer(result, dataType, titles) {
    if (result.status === httpStatus.NOT_FOUND) {
      alert(result.data.errorMessage);
    }
    if (result.status === httpStatus.OK) {
      switch (dataType) {
        case 'fertilizer':
          alert(`Thêm phân bón ${result.data.name} thành công`);
          clearAllInputField(titles);
          break;
        case 'plantProductProtection':
          alert('Thêm thuốc bảo vệ thực vật mới thành công');
          break;
        default:
      }
    }
  }

  function validateUserInput(isRequired, userInputValue, inputFieldName) {
    // eslint-disable-next-line no-useless-escape
    const simpleRegex = /[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?]/;
    if (isRequired && userInputValue.length === 0) {
      // eslint-disable-next-line prefer-template
      alert('Trường ' + inputFieldName + ' không được để trống');
      return false;
    }
    if (simpleRegex.test(userInputValue)) {
      // eslint-disable-next-line prefer-template
      alert('Dữ liệu trường ' + inputFieldName + ' không hợp lệ');
      return false;
    }
    return true;
  }

  async function createNewItemEventHandler(e, createItemHanlderParametersList) {
    e.preventDefault();
    const {
      titles,
      api,
      dataType,
      fieldRefs,
    } = createItemHanlderParametersList;
    // const fake_data = {
    //   ministry: 'Công thương',
    //   province: 'Bà Rịa - Vũng Tàu',
    //   enterprise: 'Công ty TNHH Sản xuất NGÔI SAO VÀNG',
    //   type: 'Phân vô cơ',
    //   name: 'Phân bón XYZ',
    //   ingredient: '',
    //   lawDocument: '',
    //   isoCertOrganization: '',
    //   manufactureAndImport: '',
    // };
    const data = {};
    console.log(titles.length);
    for (let i = 0; i < titles.length; i += 1) {
      const { name } = titles[i];
      const { required } = titles[i];
      const userInputValue = fieldRefs[name].value;
      const { value } = titles[i];
      if (!validateUserInput(required, userInputValue, value)) {
        return;
      }
      data[name] = userInputValue;
    }
    const result = await callApiToCreateNewItem(api, data);
    console.log(result.status);
    console.log(result.data.errorMessage);
    hanldeResponseFromServer(result, dataType, titles);
  }


  function renderLabels(labelsData) {
    return labelsData.map((item) => (
      <div className="form-group" key={uuidv4()}>
        <label htmlFor={item.name} className="w-100">
          {item.value}
          {item.required === true && renderRequiredFields()}
          <input
            type="text"
            name={item.name}
            id={item.value}
            className="form-control item"
            placeholder={item.value}
            ref={(element) => { inputFieldRefs[item.name] = element; }}
          />
          {item.notes.length > 0 && renderNotesFields(item.notes)}
        </label>
      </div>
    ));
  }


  const apiUrl = getApiURLByType(type);
  const labelTitles = getLabelTitlesByType(type);
  const createItemHanlderParameters = {
    titles: labelTitles,
    api: apiUrl,
    dataType: type,
    fieldRefs: inputFieldRefs,
  };

  return (
    <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              Thêm mới
              {renderTypeTitle(type)}
            </h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body modal-add-body">
            {renderLabels(labelTitles)}
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
            <button className="btn btn-primary" type="button" onClick={(e) => createNewItemEventHandler(e, createItemHanlderParameters)}>Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
