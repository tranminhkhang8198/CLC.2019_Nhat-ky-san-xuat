/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-fragments */

import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';

class AddItemModal extends Component {
  constructor(props) {
    super(props);

    this.submitData = {};

    this.state = {
      data: {},
      serverDomain: 'http://localhost:3001',
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleDataSubmit = this.handleDataSubmit.bind(this);

    this.renderAdditionalPPP = this.renderAdditionalPPP.bind(this);
    this.renderMainModalPPP = this.renderMainModalPPP.bind(this);
  }

  getLabelTitlesByType(dataType) {
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
      default:
        labelTitles = [];
        break;
    }
    return labelTitles;
  }

  handleInputOnChange(event) {
    const {
      field,
    } = event.target.dataset;

    const {
      value,
    } = event.target;

    /**
     * Assign inputed values to a containers to prevent re-rendering
     * that leads to unfocused input elements
     */
    this.submitData[field] = value;
  }

  async handleDataSubmit() {
    await this.setState({
      data: {
        name: this.submitData.name,
        activeIngredient: this.submitData.activeIngredient,
        content: this.submitData.content,
        plantProtectionProductGroup: this.submitData.plantProtectionProductGroup,
        ghs: parseInt(this.submitData.ghs, 10),
        who: parseInt(this.submitData.who, 10),
        scopeOfUse: [
          {
            plant: this.submitData['plant-name'],
            pest: this.submitData.pest,
            dosage: this.submitData.dosage,
            usage: this.submitData.usage,
            phi: parseInt(this.submitData.phi, 10),
          },
        ],
        registrationInfo: {
          registrationUnit: this.submitData.registrationUnit,
          registrationUnitAddress: this.submitData.registrationAddress,
          manufacturer: this.submitData.manufacturer,
          manufacturerAddress: this.submitData.manufacturerAddress,
        },
      },
    });
    console.log(this.state);
    console.log(this.submitData);
    const { data, serverDomain } = this.state;

    try {
      const newPPPRequest = await axios({
        url: `${serverDomain}/api/plant-protection-products`,
        method: 'post',
        data,
      });

      console.log(newPPPRequest);
    } catch (submitError) {
      console.log(submitError.response);
    }
  }

  renderMainModalPPP() {
    const { data } = this.state;
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Thêm mới thuốc bảo vệ thực vật
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body modal-add-body">
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-ppp-name" className="w-100">
                  Tên thương phẩm
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    name="add-ppp-name"
                    data-field="name"
                    value={data.name}
                    placeholder="Nhập vào tên thuốc bảo vệ thực vật"
                    onChange={(this.handleInputOnChange)}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-ppp-activeIngredient" className="w-100">
                  Tên hoạt chất
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    name="add-ppp-activeIngredient"
                    data-field="activeIngredient"
                    onChange={this.handleInputOnChange}
                    placeholder="Nhập vào tên hoạt chất"
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-ppp-content" className="w-100">
                  Hàm lượng sử dụng
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    name="add-ppp-content"
                    data-field="content"
                    placeholder="Hàm lượng sử dụng của thuốc"
                    onChange={this.handleInputOnChange}
                  />
                  <small className="form-text text-muted" key={uuidv4()}>
                    Ví dụ: 50g/1 liều
                  </small>
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-ppp-plantProtectionProductGroup" className="w-100">
                  Tên nhóm thuốc
                  <input
                    type="text"
                    className="form-control item"
                    name="add-ppp-plantProtectionProductGroup"
                    placeholder="Nhập vào tên nhóm thuốc"
                    data-field="plantProtectionProductGroup"
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-ppp-ghs" className="w-100">
                  Nhóm độc GHS
                  <input
                    type="number"
                    className="form-control item"
                    name="add-ppp-ghs"
                    placeholder="Nhập vào nhóm độc GHS"
                    data-field="ghs"
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-ppp-who" className="w-100">
                  Nhóm độc WHO
                  <input
                    type="number"
                    className="form-control item"
                    name="add-ppp-who"
                    placeholder="Nhập vào nhóm độc WHO"
                    data-field="who"
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
              <button
                className="btn btn-info"
                type="button"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#modal-add-addition-1"
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAdditionalPPP() {
    return (
      <React.Fragment>
        <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add-addition-1">
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
                  <label htmlFor="add-ppp-registrationUnit" className="w-100">
                    Nhập vào tên cửa hàng
                    <span style={{ color: 'rgb(249,15,15)' }}>
                      &nbsp;*
                    </span>
                    <input
                      type="text"
                      name="add-ppp-registrationUnit"
                      className="form-control item"
                      placeholder="Nhập vào tên cửa hàng"
                      data-field="registrationUnit"
                      onChange={this.handleInputOnChange}
                    />
                  </label>
                </div>
                <div className="form-group" key={uuidv4()}>
                  <label htmlFor="add-ppp-registrationAddress" className="w-100">
                    Địa chỉ cửa hàng
                    <span style={{ color: 'rgb(249,15,15)' }}>
                      &nbsp;*
                    </span>
                    <input
                      type="text"
                      name="add-ppp-registrationAddress"
                      className="form-control item"
                      placeholder="Nhập vào địa chỉ cửa hàng"
                      data-field="registrationAddress"
                      onChange={this.handleInputOnChange}
                    />
                  </label>
                </div>
                <div className="form-group" key={uuidv4()}>
                  <label htmlFor="add-ppp-manufacturer" className="w-100">
                    Nhà sản xuất
                    <span style={{ color: 'rgb(249,15,15)' }}>
                      &nbsp;*
                    </span>
                    <input
                      type="text"
                      name="add-ppp-manufacturer"
                      className="form-control item"
                      placeholder="Nhà sản xuất"
                      data-field="manufacturer"
                      onChange={this.handleInputOnChange}
                    />
                  </label>
                </div>
                <div className="form-group" key={uuidv4()}>
                  <label htmlFor="add-ppp-manufacturerAddress" className="w-100">
                    Địa chỉ cửa hàng
                    <span style={{ color: 'rgb(249,15,15)' }}>
                      &nbsp;*
                    </span>
                    <input
                      type="text"
                      name="add-ppp-manufacturerAddress"
                      className="form-control item"
                      placeholder="Nhập vào địa chỉ cửa hàng"
                      data-field="manufacturerAddress"
                      onChange={this.handleInputOnChange}
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
                  data-target="#modal-add-addition-2"
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add-addition-2">
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
                    <label htmlFor="add-ppp-plant-name" className="w-100">
                      Tên cây tác thuốc tác dụng
                      <input
                        type="text"
                        name="add-ppp-plant-name"
                        className="form-control item"
                        placeholder="Nhập vào tên nông phẩm"
                        data-field="plant-name"
                        onChange={this.handleInputOnChange}
                      />
                    </label>
                  </div>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="add-ppp-pest" className="w-100">
                      Sâu bọ diệt trừ
                      <input
                        type="text"
                        name="add-ppp-pest"
                        className="form-control item"
                        placeholder="Nhập vào tên sâu bọ khắc chế"
                        data-field="pest"
                        onChange={this.handleInputOnChange}
                      />
                    </label>
                  </div>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="add-ppp-dosage" className="w-100">
                      Liều lượng
                      <input
                        type="text"
                        name="add-ppp-dosage"
                        className="form-control item"
                        placeholder="Liều lượng sử dụng"
                        data-field="dosage"
                        onChange={this.handleInputOnChange}
                      />
                    </label>
                  </div>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="add-ppp-phi" className="w-100">
                      Phi
                      <input
                        type="number"
                        className="form-control item"
                        name="add-ppp-phi"
                        placeholder="Nhập vào độ phi"
                        data-field="phi"
                        onChange={this.handleInputOnChange}
                      />
                    </label>
                  </div>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="add-ppp-usage" className="w-100">
                      Cách sử dụng
                      <textarea
                        rows="4"
                        name="add-ppp-usage"
                        className="form-control item"
                        placeholder="Mô tả cách sử dụng chi tiết"
                        data-field="usage"
                        onChange={this.handleInputOnChange}
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
                  data-target="#modal-add-addition-1"
                >
                  Trở lại
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.handleDataSubmit}
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

  render() {
    return (
      <React.Fragment>
        {this.renderMainModalPPP()}
        {this.renderAdditionalPPP()}
      </React.Fragment>
    );
  }
}

export default AddItemModal;
