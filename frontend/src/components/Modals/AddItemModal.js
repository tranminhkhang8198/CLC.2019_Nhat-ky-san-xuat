/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';

import { validatePPPInput, validateFertilizerInput } from '../../validation/CreateValidation';

class AddItemModal extends Component {
  constructor(props) {
    super(props);

    this.submitData = {};
    this.typeNames = {
      fertilizerTitle: 'fertilizer',
      plantProtectionProductTitle: 'plantProductProtection',
    };

    this.state = {
      data: {},
      serverDomain: 'http://localhost:3001',
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleDataSubmit = this.handleDataSubmit.bind(this);

    this.renderAdditionalPPP = this.renderAdditionalPPP.bind(this);
    this.renderMainModalPPP = this.renderMainModalPPP.bind(this);

    this.renderMainModalFertilizer = this.renderMainModalFertilizer.bind(this);

    this.renderModals = this.renderModals.bind(this);
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
    let validationErrors;
    const { type } = this.props;
    const { fertilizerTitle, plantProtectionProductTitle } = this.typeNames;
    const { serverDomain } = this.state;
    let requestUrl = '';

    switch (type) {
      case fertilizerTitle:
        requestUrl = 'fertilizers';

        validationErrors = validateFertilizerInput(this.submitData);

        if (validationErrors.length) {
          const errors = validationErrors.map((item) => `${item} \n`).toString().replace(/,/g, '');
          alert(errors);

          return;
        }

        await this.setState({
          data: {
            name: this.submitData.name,
            type: this.submitData.type,
            ingredient: this.submitData.ingredient,
            ministry: this.submitData.ministry,
            province: this.submitData.province,
            lawDocument: this.submitData.lawDocument,
            enterprise: this.submitData.enterprise,
            isoCertOrganization: this.submitData.isoCertOrganization,
            manufactureAndImport: this.submitData.manufactureAndImport,
          },
        });

        break;
      case plantProtectionProductTitle:
        requestUrl = 'plant-protection-products';
        validationErrors = validatePPPInput(this.submitData);

        if (validationErrors.length) {
          const errors = validationErrors.map((item) => `${item} \n`).toString().replace(/,/g, '');
          alert(errors);

          return;
        }

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
        break;
      case 'cooperative':
        break;
      default:
        console.log('.');
        break;
    }

    const { data } = this.state;
    try {
      const createDataRequest = await axios({
        url: `${serverDomain}/api/${requestUrl}`,
        method: 'post',
        data,
      });

      if (createDataRequest.status >= 200 && createDataRequest.status < 300) {
        alert('Tạo mới dữ liệu thành công');
      }
    } catch (submitError) {
      console.log(submitError.response);
      alert('Có lỗi không mong muốn đã xảy ra, báo cáo với quản trị viên!');
    }
  }

  renderMainModalFertilizer() {
    const { data } = this.state;
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Thêm mới phân bón
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body modal-add-body">
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-name" className="w-100">
                  Tên phân bón
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-name"
                    data-field="name"
                    placeholder="Tên phân bón"
                    value={data.name}
                    onChange={(this.handleInputOnChange)}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-type" className="w-100">
                  Loại phân bón
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-type"
                    data-field="type"
                    placeholder="Loại phân bón"
                    value={data.type}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-ingredient" className="w-100">
                  Thành phần phân bón
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-ingredient"
                    data-field="ingredient"
                    placeholder="Thành phần của phân bón"
                    value={data.ingredient}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-ministry" className="w-100">
                  Tên nhóm thuốc
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-ministry"
                    placeholder="Tên Bộ cấp phép sử dụng phân bón"
                    data-field="ministry"
                    value={data.ministry}
                    onChange={this.handleInputOnChange}
                  />
                  <small className="form-text text-muted" key={uuidv4()}>
                    Ví dụ: Bộ Công thương
                  </small>
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-province" className="w-100">
                  Nơi sản xuất
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-province"
                    placeholder="Tên tỉnh, thành sản xuất phân bón"
                    data-field="province"
                    value={data.province}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-lawDocument" className="w-100">
                  Tiêu chuẩn phân bón
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-lawDocument"
                    placeholder="Căn cứ, tiêu chuẩn, quy định của phân bón"
                    data-field="lawDocument"
                    value={data.lawDocument}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-enterprise" className="w-100">
                  Doanh nghiệp sản xuất phân bón
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-enterprise"
                    placeholder="Tên doanh nghiệp sản xuất phân bón"
                    data-field="enterprise"
                    value={data.enterprise}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-isoCertOrganization" className="w-100">
                  Tổ chức chứng nhận hợp quy
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-isoCertOrganization"
                    placeholder="Tên tổ chức chứng nhận hợp quy"
                    data-field="isoCertOrganization"
                    value={data.isoCertOrganization}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-fertilizer-manufactureAndImport" className="w-100">
                  Thông tin xuất, nhập khẩu
                  <input
                    type="text"
                    className="form-control item"
                    name="add-fertilizer-manufactureAndImport"
                    placeholder="Thông tin xuất, nhập khẩu"
                    data-field="manufactureAndImport"
                    value={data.manufactureAndImport}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
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
    );
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
                    placeholder="Nhập vào tên thuốc bảo vệ thực vật"
                    value={data.name}
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
                    value={data.activeIngredient}
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
                    value={data.content}
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
                    value={data.plantProtectionProductGroup}
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
                    value={data.ghs}
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
                    value={data.who}
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
                  <legend>Tác dụng:</legend>
                  <div className="form-group" key={uuidv4()}>
                    <label htmlFor="add-ppp-plant-name" className="w-100">
                      Tên cây tác thuốc tác dụng
                      <span style={{ color: 'rgb(249,15,15)' }}>
                        &nbsp;*
                      </span>
                      <input
                        type="text"
                        name="add-ppp-plant-name"
                        className="form-control item"
                        placeholder="Nhập vào tên cây thuốc tác dụng"
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
                      <span style={{ color: 'rgb(249,15,15)' }}>
                        &nbsp;*
                      </span>
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
                {/* <button className="btn btn-info w-100" type="button">Thêm mới</button> */}
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

  renderModals(modalType) {
    const { fertilizerTitle, plantProtectionProductTitle } = this.typeNames;
    let renderDOM;

    switch (modalType) {
      case fertilizerTitle:
        renderDOM = (
          <React.Fragment>
            {this.renderMainModalFertilizer()}
          </React.Fragment>
        );
        break;
      case plantProtectionProductTitle:
        renderDOM = (
          <React.Fragment>
            {this.renderMainModalPPP()}
            {this.renderAdditionalPPP()}
          </React.Fragment>
        );
        break;
      default:
        console.log('.');
        break;
    }

    return renderDOM;
  }

  render() {
    const { type } = this.props;
    return (
      <React.Fragment>
        {this.renderModals(type)}
      </React.Fragment>
    );
  }
}

export default AddItemModal;
