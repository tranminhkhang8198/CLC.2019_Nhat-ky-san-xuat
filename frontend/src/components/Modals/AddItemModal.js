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
  // validateScopeOfUsePPPInput,
  validateFertilizerInput,
  validateCooperativeInput,
  validateScopeOfUsePPPInput,
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
      // parent: props.parentComponent,
    };

    // PPP only
    this.registrationInfo = {};
    this.scopeOfUse = [];
    this.isPPPInilialized = false;

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
      target,
    } = event;

    const {
      field,
      type: dataType,
      scopeOfUseIndex,
    } = target.dataset;

    const {
      value,
    } = target;

    const {
      type,
    } = this.props;

    if (type === this.typeNames.plantProtectionProductTitle) {
      if (dataType && dataType === 'scopeOfUse') {
        this.scopeOfUse[scopeOfUseIndex] = { ...this.scopeOfUse[scopeOfUseIndex] };
        this.scopeOfUse[scopeOfUseIndex][field] = value;
        this.submitData.scopeOfUse = [...this.scopeOfUse];
      } else if (dataType && dataType === 'registrationInfo') {
        this.registrationInfo[field] = value;
        this.submitData.registrationInfo = { ...this.registrationInfo };
      } else {
        /**
         * Assign inputed values to a containers to prevent re-rendering
         * that leads to unfocused input elements
         */
        this.submitData[field] = value;
      }
    } else {
      /**
       * Assign inputed values to a containers to prevent re-rendering
       * that leads to unfocused input elements
       */
      this.submitData[field] = value;
    }
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
    const {
      serverDomain,
      // parent,
    } = this.state;
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

        break;
      case plantProtectionProductTitle:
        requestUrl = 'plant-protection-products';
        validationErrors = validatePPPInput(this.submitData);

        if (validationErrors.length) {
          const errors = validationErrors.map((item) => `${item} \n`).toString().replace(/,/g, '');
          alert(errors);

          return;
        }

        break;
      case cooperativeTitle:
        requestUrl = 'cooperatives';

        validationErrors = validateCooperativeInput(this.submitData);

        if (validationErrors.length) {
          const errors = validationErrors.map((item) => `${item} \n`).toString().replace(/,/g, '');
          alert(errors);

          return;
        }

        this.submitData.status = this.submitData.status || 'Đang hoạt động';

        break;
      default:
        console.log('.');
        break;
    }

    await this.setState({
      data: this.submitData,
    });

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
        // parent.setState(() => ({
        //   refresh: true,
        // }));
      }

      return;
    } catch (submitError) {
      console.log(submitError);
      const {
        response,
      } = submitError;

      const {
        data: errorData,
      } = response;

      const {
        errorMessage,
      } = errorData;

      alert(errorMessage);
    }
  }

  renderMainModalFertilizer() {
    const {
      data,
    } = this.state;
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
                    defaultValue={data.name}
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
                    defaultValue={data.ingredient}
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
                    defaultValue={data.ministry}
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
                    defaultValue={data.province}
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
                data-dismiss="modal"
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
    const {
      name,
      activeIngredient,
      content,
      plantProtectionProductGroup,
      ghs,
      who,
    } = this.submitData;
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
                    value={name}
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
                    value={activeIngredient}
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
                    value={content}
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
                    defaultValue={plantProtectionProductGroup}
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
                    defaultValue={ghs}
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
                    defaultValue={who}
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
    const {
      ppp,
    } = this.state;

    const {
      currentScopeOfUse,
    } = ppp;

    /**
     * Initialize necessary properties of PPP type
     */
    if (this.isPPPInilialized === false) {
      this.submitData.registrationInfo = {};
      this.submitData.scopeOfUse = [];
      this.isPPPInilialized = true;
    }

    /**
     * Initialize object for each element in scopeOfUse array
     */
    for (let i = 0; i < currentScopeOfUse; i += 1) {
      if (typeof this.submitData.scopeOfUse[i] !== 'object') {
        this.submitData.scopeOfUse[i] = {};
      }
    }

    const {
      registrationInfo,
      scopeOfUse,
    } = this.submitData;

    const {
      registrationUnit,
      registrationUnitAddress,
      manufacturer,
      manufacturerAddress,
    } = registrationInfo;

    const scopeOfUseDOM = [];

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
                data-type="scopeOfUse"
                data-scope-of-use-index={i}
                defaultValue={scopeOfUse[i].plant}
                disabled={(currentScopeOfUse > 1 && i + 1 < currentScopeOfUse)}
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
                data-field="pest"
                data-type="scopeOfUse"
                data-scope-of-use-index={i}
                defaultValue={scopeOfUse[i].pest}
                disabled={(currentScopeOfUse > 1 && i + 1 < currentScopeOfUse)}
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
                data-field="dosage"
                data-type="scopeOfUse"
                data-scope-of-use-index={i}
                defaultValue={scopeOfUse[i].dosage}
                disabled={(currentScopeOfUse > 1 && i + 1 < currentScopeOfUse)}
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
                data-field="phi"
                data-type="scopeOfUse"
                data-scope-of-use-index={i}
                defaultValue={scopeOfUse[i].phi}
                disabled={(currentScopeOfUse > 1 && i + 1 < currentScopeOfUse)}
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
                data-field="usage"
                data-type="scopeOfUse"
                data-scope-of-use-index={i}
                defaultValue={scopeOfUse[i].usage}
                disabled={(currentScopeOfUse > 1 && i + 1 < currentScopeOfUse)}
                onChange={this.handleInputOnChange}
              />
            </label>
          </div>
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
                      data-type="registrationInfo"
                      defaultValue={registrationUnit}
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
                      defaultValue={registrationUnitAddress}
                      placeholder="Nhập vào địa chỉ cửa hàng"
                      data-field="registrationUnitAddress"
                      data-type="registrationInfo"
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
                      defaultValue={manufacturer}
                      placeholder="Nhà sản xuất"
                      data-field="manufacturer"
                      data-type="registrationInfo"
                      onChange={this.handleInputOnChange}
                    />
                  </label>
                </div>
                <div className="form-group" key={uuidv4()}>
                  <label htmlFor="add-ppp-manufacturerAddress" className="w-100">
                    Địa chỉ nhà sản xuất
                    <span style={{ color: 'rgb(249,15,15)' }}>
                      &nbsp;*
                    </span>
                    <input
                      type="text"
                      id="add-ppp-manufacturerAddress"
                      className="form-control item"
                      defaultValue={manufacturerAddress}
                      placeholder="Nhập vào địa chỉ cửa hàng"
                      data-field="manufacturerAddress"
                      data-type="registrationInfo"
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
                    const validationErrors = validateScopeOfUsePPPInput(this.submitData);

                    if (validationErrors.length) {
                      const errors = validationErrors.map((item) => `${item} \n`).toString().replace(/,/g, '');
                      alert(errors);

                      return;
                    }
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
                  data-dismiss="modal"
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
    const {
      data,
    } = this.state;

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
                    defaultValue={data.name}
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
                    defaultValue={data.foreignName}
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
                    defaultValue={data.abbreviationName}
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
                    defaultValue={data.cooperativeID || 'HTX'}
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
                    defaultValue={data.surrgate}
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
                    defaultValue={data.director}
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
                    defaultValue={data.phone}
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
                    defaultValue={data.representOffice}
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
                    defaultValue={data.address}
                    onChange={this.handleInputOnChange}
                  />
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-status" className="w-100">
                  Trạng thái hoạt động
                  <select
                    className="form-control item"
                    id="add-cooperative-status"
                    data-field="status"
                    defaultChecked="Ngừng hoạt động"
                    defaultValue={data.status}
                    onChange={this.handleInputOnChange}
                  >
                    <option
                      date-field="status"
                      key={uuidv4()}
                      value="Đang hoạt động"
                    >
                      Đang hoạt động
                    </option>
                    <option
                      date-field="status"
                      key={uuidv4()}
                      value="Ngừng hoạt động"
                    >
                      Ngừng hoạt động
                    </option>
                  </select>
                  <small className="form-text text-muted" key={uuidv4()}>
                    Mặc định: Đang hoạt động
                  </small>
                </label>
              </div>

              <div className="form-group" key={uuidv4()}>
                <label htmlFor="add-cooperative-email" className="w-100">
                  Thư điện tử
                  <input
                    type="email"
                    className="form-control item"
                    id="add-cooperative-email"
                    placeholder="Thư điện tử của hợp tác xã"
                    data-field="email"
                    defaultValue={data.email}
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
                    defaultValue={data.website}
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
                    defaultValue={data.fax}
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
                    defaultValue={data.tax}
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
                data-dismiss="modal"
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
