/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint no-plusplus: [
  "warn",
  {
      "allowForLoopAfterthoughts": true
  }
], */

import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';

import {
  validatePPPInput,
  validateFertilizerInput,
  validateCooperativeInput,
} from '../../validation/CreateValidation';

class AddItemModal extends Component {
  constructor(props) {
    super(props);

    this.submitData = {};
    this.typeNames = {
      fertilizerTitle: 'fertilizer',
      plantProtectionProductTitle: 'plantProtectionProduct',
      cooperativeTitle: 'cooperative',
    };

    this.state = {
      data: {},
      serverDomain: 'http://localhost:3001',
      ppp: {
        currentScopeOfUse: 1,
      },
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleDataSubmit = this.handleDataSubmit.bind(this);

    this.renderAdditionalPPP = this.renderAdditionalPPP.bind(this);
    this.renderMainModalPPP = this.renderMainModalPPP.bind(this);

    this.renderMainModalCooperatives = this.renderMainModalCooperatives.bind(this);

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
    console.log(this.submitData);
  }

  async handleDataSubmit() {
    let validationErrors;
    const {
      type,
    } = this.props;
    const {
      fertilizerTitle,
      plantProtectionProductTitle,
      cooperativeTitle,
    } = this.typeNames;
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
                plant: this.submitData.plant,
                pest: this.submitData.pest,
                dosage: this.submitData.dosage,
                usage: this.submitData.usage,
                phi: parseInt(this.submitData.phi, 10),
              },
            ],
            registrationInfo: {
              registrationUnit: this.submitData.registrationUnit,
              registrationUnitAddress: this.submitData.registrationUnitAddress,
              manufacturer: this.submitData.manufacturer,
              manufacturerAddress: this.submitData.manufacturerAddress,
            },
          },
        });
        break;
      case cooperativeTitle:
        requestUrl = 'cooperatives';

        validationErrors = validateCooperativeInput(this.submitData);

        if (validationErrors.length) {
          const errors = validationErrors.map((item) => `${item} \n`).toString().replace(/,/g, '');
          alert(errors);

          return;
        }

        await this.setState({
          data: {
            name: this.submitData.name,
            foreignName: this.submitData.foreignName,
            abbreviationName: this.submitData.abbreviationName,
            cooperativeID: this.submitData.cooperativeID,
            surrgate: this.submitData.surrgate,
            director: this.submitData.director,
            representOffice: this.submitData.representOffice,
            status: this.submitData.status || 'Đang hoạt động',
            address: this.submitData.address,
            phone: this.submitData.phone,
            tax: this.submitData.tax,
            email: this.submitData.email,
            fax: this.submitData.fax,
            website: this.submitData.website,
            logo: this.submitData.logo,
          },
        });

        break;
      default:
        console.log('.');
        break;
    }

    const { data } = this.state;
    console.log(data);
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
                    id="add-fertilizer-name"
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
                    id="add-fertilizer-type"
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
                    id="add-fertilizer-ingredient"
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
                    id="add-fertilizer-ministry"
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
                    id="add-fertilizer-province"
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
                    id="add-fertilizer-lawDocument"
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
                    id="add-fertilizer-enterprise"
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
                    id="add-fertilizer-isoCertOrganization"
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
                    id="add-fertilizer-manufactureAndImport"
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
                    id="add-ppp-name"
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
                    id="add-ppp-activeIngredient"
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
                    id="add-ppp-content"
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
                    id="add-ppp-plantProtectionProductGroup"
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
                    id="add-ppp-ghs"
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
                    id="add-ppp-who"
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
    const scopeOfUseDOM = [];

    const {
      ppp,
    } = this.state;

    const {
      currentScopeOfUse,
    } = ppp;

    for (let i = 0; i < currentScopeOfUse; i += 1) {
      scopeOfUseDOM.push(
        <React.Fragment key={uuidv4()}>
          <h3> Tác dụng của thuốc </h3>
          <div className="form-group" key={uuidv4()}>
            <label htmlFor="add-ppp-plant-name" className="w-100">
              Tên cây tác thuốc tác dụng
              <span style={{ color: 'rgb(249,15,15)' }}>
                &nbsp;*
              </span>
              <input
                type="text"
                id="add-ppp-plant-name"
                className="form-control item"
                placeholder="Nhập vào tên cây thuốc tác dụng"
                data-field="plant"
                onChange={this.handleInputOnChange}
              />
            </label>
          </div>

          <div className="form-group" key={uuidv4()}>
            <label htmlFor={`add-ppp-pest-${i}`} className="w-100">
              Sâu bọ diệt trừ
              <input
                type="text"
                className="form-control item"
                placeholder="Nhập vào tên sâu bọ khắc chế"
                id={`add-ppp-pest-${i}`}
                data-field={`pest-${i}`}
                onChange={this.handleInputOnChange}
              />
            </label>
          </div>

          <div className="form-group" key={uuidv4()}>
            <label htmlFor={`add-ppp-dosage-${i}`} className="w-100">
              Liều lượng
              <input
                type="text"
                className="form-control item"
                placeholder="Liều lượng sử dụng"
                id={`add-ppp-dosage-${i}`}
                data-field={`dosage-${i}`}
                onChange={this.handleInputOnChange}
              />
            </label>
          </div>

          <div className="form-group" key={uuidv4()}>
            <label htmlFor={`add-ppp-phi-${i}`} className="w-100">
              Phi
              <span style={{ color: 'rgb(249,15,15)' }}>
                &nbsp;*
              </span>
              <input
                type="number"
                className="form-control item"
                placeholder="Nhập vào độ phi"
                id={`add-ppp-phi-${i}`}
                data-field={`phi-${i}`}
                onChange={this.handleInputOnChange}
              />
            </label>
          </div>

          <div className="form-group" key={uuidv4()}>
            <label htmlFor={`add-ppp-usage-${i}`} className="w-100">
              Cách sử dụng
              <textarea
                rows="4"
                className="form-control item"
                placeholder="Mô tả cách sử dụng chi tiết"
                id={`add-ppp-usage-${i}`}
                data-field={`usage-${i}`}
                onChange={this.handleInputOnChange}
              />
            </label>
          </div>
          {i >= 1 ? (
            <button
              className="btn btn-danger w-100"
              type="button"
              onClick={() => {
                this.setState({
                  ppp: {
                    currentScopeOfUse: currentScopeOfUse - 1,
                  },
                });
              }}
            >
              Xóa ô này
            </button>
          ) : null}
          <hr />
        </React.Fragment>,
      );
    }

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
                      id="add-ppp-registrationUnit"
                      className="form-control item"
                      placeholder="Nhập vào tên cửa hàng"
                      data-field="registrationUnit"
                      onChange={this.handleInputOnChange}
                    />
                  </label>
                </div>
                <div className="form-group" key={uuidv4()}>
                  <label htmlFor="add-ppp-registrationUnitAddress" className="w-100">
                    Địa chỉ cửa hàng
                    <span style={{ color: 'rgb(249,15,15)' }}>
                      &nbsp;*
                    </span>
                    <input
                      type="text"
                      id="add-ppp-registrationUnitAddress"
                      className="form-control item"
                      placeholder="Nhập vào địa chỉ cửa hàng"
                      data-field="registrationUnitAddress"
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
                      id="add-ppp-manufacturer"
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
                      id="add-ppp-manufacturerAddress"
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
                {scopeOfUseDOM}
                <button
                  className="btn btn-info w-100"
                  type="button"
                  onClick={() => {
                    this.setState({
                      ppp: {
                        currentScopeOfUse: currentScopeOfUse + 1,
                      },
                    });
                  }}
                >
                  Thêm tác dụng khác
                </button>
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

  renderMainModalCooperatives() {
    const { data } = this.state;
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Thêm mới hợp tác xã
              </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body modal-add-body">
              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-name" className="w-100">
                  Tên hợp tác xã
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-name"
                    data-field="name"
                    placeholder="Nhập vào tên hợp tác xã"
                    value={data.name}
                    onChange={(this.handleInputOnChange)}
                  />
                  <small className="form-text text-muted" key={uuidv4()}>
                    Ví dụ: Hợp tác xã U Minh Hạ
                  </small>
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-foreignName" className="w-100">
                  Tên tiếng Anh
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-foreignName"
                    data-field="foreignName"
                    onChange={this.handleInputOnChange}
                    value={data.foreignName}
                    placeholder="Nhập vào tên tiếng Anh của HTX"
                  />
                  <small className="form-text text-muted" key={uuidv4()}>
                    Ví dụ: Hop tac xa U Minh Ha
                  </small>
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-abbreviationName" className="w-100">
                  Tên viết tắt
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-abbreviationName"
                    data-field="abbreviationName"
                    placeholder="Tên viết tắt"
                    value={data.abbreviationName}
                    onChange={this.handleInputOnChange}
                  />
                  <small className="form-text text-muted" key={uuidv4()}>
                    Ví dụ: UMH
                  </small>
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-cooperativeID" className="w-100">
                  Mã hợp tác xã
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-cooperativeID"
                    data-field="cooperativeID"
                    placeholder="Mã hợp tác xã"
                    value={data.cooperativeID}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-surrgate" className="w-100">
                  Người đại diện
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-surrgate"
                    placeholder="Tên người đại diện cho hợp tác xã"
                    data-field="surrgate"
                    value={data.surrgate}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-director" className="w-100">
                  Giám đốc hợp tác xã
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-director"
                    placeholder="Tên giám đốc hợp tác xã"
                    data-field="director"
                    value={data.director}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-phone" className="w-100">
                  Số điện thoại
                  <span style={{ color: 'rgb(249,15,15)' }}>
                    &nbsp;*
                  </span>
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-phone"
                    placeholder="Số điện thoại của hợp tác xã"
                    data-field="phone"
                    value={data.phone}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-representOffice" className="w-100">
                  Văn phòng đại diện
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-representOffice"
                    placeholder="Văn phòng đại diện của hợp tác xã"
                    data-field="representOffice"
                    value={data.representOffice}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-address" className="w-100">
                  Địa chỉ
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-address"
                    placeholder="Địa chỉ hợp tác xã"
                    data-field="address"
                    value={data.address}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-status" className="w-100">
                  Trạng thái hoạt động
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-status"
                    placeholder="Trạng thái hoạt động của hợp tác xã"
                    data-field="status"
                    value={data.status}
                    onChange={this.handleInputOnChange}
                  />
                  <small className="form-text text-muted" key={uuidv4()}>
                    Mặc định: Đang hoạt động
                  </small>
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-email" className="w-100">
                  Thư điện tử
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-email"
                    placeholder="Thư điện tử của hợp tác xã"
                    data-field="email"
                    value={data.email}
                    onChange={this.handleInputOnChange}
                  />
                  <small className="form-text text-muted" key={uuidv4()}>
                    Ví dụ: htxuminh@gmail.com
                  </small>
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-website" className="w-100">
                  Địa chỉ website
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-website"
                    placeholder="Địa chỉ website của hợp tác xã"
                    data-field="website"
                    value={data.website}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-fax" className="w-100">
                  Địa chỉ FAX
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-fax"
                    placeholder="Địa chỉ FAX của hợp tác xã"
                    data-field="fax"
                    value={data.fax}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-tax" className="w-100">
                  Mã số thuế
                  <input
                    type="text"
                    className="form-control item"
                    id="add-cooperative-tax"
                    placeholder="Mã số thuế"
                    data-field="tax"
                    value={data.tax}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-logo" className="w-100">
                  Logo hợp tác xã
                  <input
                    type="file"
                    className="form-control item"
                    id="add-cooperative-logo"
                    data-field="logo"
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

  renderModals(modalType) {
    const {
      fertilizerTitle,
      plantProtectionProductTitle,
      cooperativeTitle,
    } = this.typeNames;
    let renderDOM;

    switch (modalType) {
      case fertilizerTitle:
        renderDOM = (
          <React.Fragment>
            {this.renderMainModalFertilizer()}
          </React.Fragment>
        );
        break;
      case cooperativeTitle:
        renderDOM = (
          <React.Fragment>
            {this.renderMainModalCooperatives()}
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
