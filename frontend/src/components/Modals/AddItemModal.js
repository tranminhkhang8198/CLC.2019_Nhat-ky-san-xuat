/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import * as httpStatus from 'http-status';

function AddItemModal({ type }) {
  const [input, setInput] = useState({});

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

  function getLabelTitlesByType(dataType) {
    let labelTitles = [];
    switch (dataType) {
      case 'fertilizer':
        labelTitles = [
          {
            type: 'text',
            name: 'name',
            value: 'Tên phân bón',
            placeholder: 'Nhập vào tên phân bón',
            required: true,
            notes: [],
          },
          {
            type: 'text',
            name: 'type',
            value: 'Loại phân bón',
            placeholder: 'Nhập vào loại phân bón',
            required: true,
            notes: [],
          },
          {
            type: 'text',
            name: 'ingredient',
            value: 'Thành phần',
            placeholder: 'Nhập vào thành phần của phân bón',
            required: false,
            notes: [
              'Tên các thành phần phải cách nhau bằng dấu ;',
              'Ví dụ: Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%;...',
            ],
          },
          {
            type: 'text',
            name: 'ministry',
            value: 'Bộ',
            placeholder: 'Nhập vào tên Bộ cấp phép sử dụng phân bón',
            required: false,
            notes: [
              'Ví dụ: Công thương',
            ],
          },
          {
            type: 'text',
            name: 'province',
            value: 'Tỉnh',
            placeholder: 'Nhập vào tên tỉnh, thành nơi sản xuất phân bón',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'lawDocument',
            value: 'Căn cứ, tiêu chuẩn, quy định',
            placeholder: 'Nhập vào căn cứ, tiêu chuẩn, quy định',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'enterprise',
            value: 'Nơi sản xuất',
            placeholder: 'Nhập vào tên doanh nghiệp sản xuất phân bón',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'isoCertOrganization',
            value: 'Tổ chức chứng nhận hợp quy',
            placeholder: 'Nhập vào tên tổ chức chứng nhận hợp quy',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'manufactureAndImport',
            value: 'Nhập khẩu, xuất khẩu',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
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

  const labelTitles = getLabelTitlesByType(type);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  function renderAdditionalPlantProtectionProductInput() {
    return (
      <React.Fragment key="hey">
        <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add-additional-info-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Thông tin địa chỉ mua hàng
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
                      // id="manufacturer"
                      className="form-control item"
                      placeholder="Nhà sản xuất"
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
                <button
                  className="btn btn-light"
                  type="button"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#modal-add"
                >
                  Trở lại
                </button>
                <button
                  className="btn btn-info"
                  type="button"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#modal-add-additional-info-2"
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add-additional-info-2">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Thông tin phạm vi sử dụng
                </h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body modal-add-body">
                <fieldset>
                  <legend>Tác dụng 1:</legend>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="plant-name" className="w-100">
                      Tên nông phẩm
                      <input
                        type="text"
                        name="plant-name"
                        id="plant-name"
                        className="form-control item"
                        placeholder="Nhập vào tên nông phẩm"
                      />
                    </label>
                  </div>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="pest" className="w-100">
                      Sâu bọ diệt trừ
                      <input
                        type="text"
                        name="pest"
                        id="pest"
                        className="form-control item"
                        placeholder="Nhập vào tên sâu bọ khắc chế"
                      />
                    </label>
                  </div>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="dosage" className="w-100">
                      Liều lượng
                      <input
                        type="text"
                        name="dosage"
                        id="dosage"
                        className="form-control item"
                        placeholder="Liều lượng sử dụng"
                      />
                    </label>
                  </div>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="usage" className="w-100">
                      Cách sử dụng
                      <textarea
                        rows="4"
                        className="form-control item"
                        placeholder="Mô tả cách sử dụng chi tiết"
                      />
                    </label>
                  </div>
                </fieldset>
                <button className="btn btn-info w-100" type="button">Thêm mới</button>
              </div>
              <div className="modal-footer">
                <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
                <button
                  className="btn btn-light"
                  type="button"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#modal-add-registration-info"
                >
                  Trở lại
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  function renderAdditionalInput(componentStyle) {
    switch (componentStyle) {
      case 'fertilizer':
        return renderAdditionalPlantProtectionProductInput();
      case 'plantProtectionProduct':
        return renderAdditionalPlantProtectionProductInput();
      default:
        return renderAdditionalPlantProtectionProductInput();
    }
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
          />
          {item.notes.length > 0 && renderNotesFields(item.notes)}
        </label>
      </div>
    ));
  }

  return (
    <React.Fragment key="hey">
      {renderAdditionalInput(type)}
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
              <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
              <button
                className="btn btn-info"
                type="button"
                data-toggle="modal"
                data-target="#modal-add-additional-info-1"
                data-dismiss="modal"
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddItemModal;
