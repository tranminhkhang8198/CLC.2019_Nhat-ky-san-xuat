/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';

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
    let ApiURL = '';
    switch (dataType) {
      case 'fertilizer':
        ApiURL = 'http://localhost:3001/api/fertilizers';
        break;
      case 'plantProductProtection':
        ApiURL = '';
        break;
      default:
        ApiURL = '';
        break;
    }
    return ApiURL;
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
            type: 'text',
            name: 'name',
            value: 'Tên thương phẩm',
            placeholder: 'Nhập vào tên thương phẩm',
            required: true,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            type: 'text',
            name: 'activeIngredient',
            value: 'Tên hoạt chất',
            placeholder: 'Nhập vào tên hoạt chất',
            required: false,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            type: 'text',
            name: 'content',
            value: 'Hàm lượng',
            placeholder: 'Nhập hàm lượng của thuốc',
            required: false,
            notes: [
              'Ví dụ: 50g/1 liều',
            ],
          },
          {
            type: 'text',
            name: 'plantProtectionProductGroup',
            value: 'Tên nhóm thuốc',
            placeholder: 'Nhập vào tên nhóm thuốc',
            required: false,
            notes: [],
          },
          {
            type: 'number',
            name: 'ghs',
            value: 'Nhóm độc ghs',
            placeholder: 'Nhập vào nhóm độc GHS',
            required: true,
            notes: [],
          },
          {
            type: 'number',
            name: 'who',
            value: 'Nhóm độc who',
            placeholder: 'Nhập vào nhóm độc WHO',
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

  const apiUrl = getApiURLByType(type);
  const inputFieldRefs = [];

  async function getData(api, bodyFormData) {
    const data = await axios({
      method: 'post',
      url: api,
      data: bodyFormData,
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

  const labelTitles = getLabelTitlesByType(type);

  function clearAllInputField() {
    for (let i = 0; i < labelTitles.length; i += 1) {
      const { name } = labelTitles[i];
      inputFieldRefs[name].value = '';
    }
  }

  function hanldeResponseFromServer(result) {
    if (result.status === 404) {
      alert(result.data.errorMessage);
    }
    if (result.status === 200) {
      switch (type) {
        case 'fertilizer':
          alert(`Thêm phân bón ${result.data.name} thành công`);
          clearAllInputField();
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

  function RegistrationInfoInputModal() {
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add-registration-info">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Thêm thông tin nơi mua thương phẩm
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body modal-add-body">
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-registration-unit" className="w-100">
                  Nhập vào tên cửa hàng
                  <input
                    type="text"
                    name="add-registration-unit"
                    id="add-registration-unit"
                    className="form-control item"
                    placeholder="Nhập vào tên cửa hàng"
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-registration-add" className="w-100">
                  Địa chỉ cửa hàng
                  <input
                    type="text"
                    name="add-registration-add"
                    id="add-registration-add"
                    className="form-control item"
                    placeholder="Nhập vào địa chỉ cửa hàng"
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="manufacturer" className="w-100">
                  Nhà sản xuất
                  <input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    className="form-control item"
                    placeholder="Nhà sản xuất"
                  />
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function createNewItemEventHandler(e) {
    e.preventDefault();
    const api = apiUrl;
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
    console.log(labelTitles.length);
    for (let i = 0; i < labelTitles.length; i += 1) {
      const { name } = labelTitles[i];
      const { required } = labelTitles[i];
      const userInputValue = inputFieldRefs[name].value;
      const { value } = labelTitles[i];
      if (!validateUserInput(required, userInputValue, value)) {
        return;
      }
      data[name] = userInputValue;
    }
    const result = await getData(api, data);
    console.log(result.status);
    console.log(result.data.errorMessage);
    hanldeResponseFromServer(result);
  }

  function renderLabels(labelsData) {
    return labelsData.map((item) => (
      <div className="form-group" key={uuidv4()}>
        <label htmlFor={item.name} className="w-100">
          {item.value}
          {item.required === true && renderRequiredFields()}
          <input
            type={item.type}
            name={`add-${item.name}`}
            id={item.value}
            className="form-control item"
            placeholder={item.placeholder}
            ref={(element) => { inputFieldRefs[item.name] = element; }}
          />
          {item.notes.length > 0 && renderNotesFields(item.notes)}
        </label>
      </div>
    ));
  }

  return (
    <React.Fragment key="hey">
      <RegistrationInfoInputModal />
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
              <button
                className="btn btn-info"
                type="button"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#modal-add-registration-info"
              >
                Tiếp theo
              </button>
              <button className="btn btn-primary" type="button" onClick={createNewItemEventHandler}>Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddItemModal;
