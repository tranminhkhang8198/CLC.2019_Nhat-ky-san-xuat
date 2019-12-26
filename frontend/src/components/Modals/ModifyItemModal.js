/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-fragments */

import React, { Component } from 'react';
import uuidv4 from 'uuid';
import axios from 'axios';

class ModifyItemModal extends Component {
  constructor(props) {
    super(props);

    // PPP type only
    this.scopeOfUse = [];

    this.submitData = {};
    this.typeNames = {
      fertilizerTitle: 'fertilizer',
      plantProtectionProductTitle: 'plantProtectionProduct',
    };

    this.state = {
      data: {},
      serverDomain: 'http://localhost:3001',
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleDataSubmit = this.handleDataSubmit.bind(this);

    this.renderMainModalPPP = this.renderMainModalPPP.bind(this);
    this.renderScopeOfUsePPP = this.renderScopeOfUsePPP.bind(this);
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
      index: scopeOfUseIndex,
    } = target.dataset;

    const {
      value,
    } = target;

    // PPP type only
    if (dataType && dataType === 'scopeOfUse') {
      if (!this.scopeOfUse[scopeOfUseIndex]) {
        this.scopeOfUse = [...this.scopeOfUse];
      }
      this.scopeOfUse[scopeOfUseIndex][field] = value;
      console.log(this.scopeOfUse);
    } else {
      /**
       * Assign inputed values to a containers to prevent re-rendering
       * that leads to unfocused input elements
       */
      this.submitData[field] = value;
    }
  }

  async handleDataSubmit(event) {
    const {
      id,
      index,
    } = event.target.dataset;
    const { type, data: paginatedData } = this.props;
    const { fertilizerTitle, plantProtectionProductTitle } = this.typeNames;
    const { serverDomain } = this.state;
    let requestUrl = '';
    const immutableSubmitData = { ...paginatedData[index] };

    Object.keys(this.submitData).forEach((key) => {
      immutableSubmitData[key] = this.submitData[key];
    });
    await this.setState({
      data: immutableSubmitData,
    });

    switch (type) {
      case fertilizerTitle:
        requestUrl = 'fertilizers';

        break;
      case plantProtectionProductTitle:
        requestUrl = 'plant-protection-products';

        break;
      default:
        console.log('.');
        break;
    }

    const { data } = this.state;
    console.log(data);
    try {
      const updateDataRequest = await axios({
        url: `${serverDomain}/api/${requestUrl}?_id=${id}`,
        method: 'patch',
        data,
      });
      console.log(data);

      if (updateDataRequest.status >= 200 && updateDataRequest.status < 300) {
        alert('Cập nhật dữ liệu thành công');
      }
    } catch (submitError) {
      console.log(submitError.response);
      alert('Có lỗi không mong muốn đã xảy ra, báo cáo với quản trị viên!');
    }
  }

  renderScopeOfUsePPP(scopeOfUseData) {
    return (
      <React.Fragment>
        {scopeOfUseData.length && scopeOfUseData.map((item, index) => (
          <div
            key={uuidv4()}
          >
            <hr />
            <div className="row">
              <div className="col-4">
                <p>Tên cây thuốc tác dụng</p>
              </div>
              <div className="col-8">
                <input
                  className="form-control-plaintext p-0"
                  type="text"
                  data-field="plant"
                  data-type="scopeOfUse"
                  data-index={index}
                  defaultValue={`${item.plant}`}
                  style={{ padding: 0 }}
                  onChange={(this.handleInputOnChange)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <p>Tên sâu bệnh thuốc tác dụng</p>
              </div>
              <div className="col-8">
                <input
                  className="form-control-plaintext p-0"
                  type="text"
                  data-field="pest"
                  data-type="scopeOfUse"
                  data-index={index}
                  defaultValue={`${item.pest}`}
                  style={{ padding: 0 }}
                  onChange={(this.handleInputOnChange)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <p>Liều lượng sử dụng</p>
              </div>
              <div className="col-8">
                <input
                  className="form-control-plaintext p-0"
                  type="text"
                  data-field="dosage"
                  data-type="scopeOfUse"
                  data-index={index}
                  defaultValue={`${item.dosage}`}
                  style={{ padding: 0 }}
                  onChange={(this.handleInputOnChange)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <p>Cách sử dụng</p>
              </div>
              <div className="col-8">
                <textarea
                  className="form-control item"
                  rows="4"
                  value={`${item.usage}`}
                  data-field="usage"
                  data-type="scopeOfUse"
                  data-index={index}
                  onChange={(this.handleInputOnChange)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <p>Hàm lượng phi trong thuốc</p>
              </div>
              <div className="col-8">
                <input
                  className="form-control-plaintext p-0"
                  type="text"
                  data-field="phi"
                  data-type="scopeOfUse"
                  data-index={index}
                  defaultValue={`${item.phi}`}
                  style={{ padding: 0 }}
                  onChange={(this.handleInputOnChange)}
                />
              </div>
            </div>

          </div>
        ))}
      </React.Fragment>
    );
  }

  renderMainModalPPP() {
    const { data } = this.props;
    return (
      <React.Fragment>
        {data.length && data.map((item, index) => (
          <div className="modal fade" role="dialog" key={uuidv4()} tabIndex={-1} id={`modal-modify-${index}`}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Chỉnh sửa thông tin thuốc BVTV</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body modal-modify-body">
                  <div className="container" style={{ padding: 0 }}>
                    <h2>Thông số cơ bản</h2>
                    <div className="row">
                      <div className="col-4">
                        <p>Tên thương phẩm</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="name"
                          defaultValue={`${item.name}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Tên hoạt chất</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="activeIngredient"
                          defaultValue={`${item.activeIngredient}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Hàm lượng sử dụng</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="content"
                          defaultValue={`${item.content}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Tên nhóm thuốc</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="plantProtectionProductGroup"
                          defaultValue={`${item.plantProtectionProductGroup}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Hàm lượng độc GHS</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="ghs"
                          defaultValue={`${item.ghs}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Hàm lượng độc WHO</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="who"
                          defaultValue={`${item.who}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <h2>Địa chỉ mua hàng</h2>
                    <div className="row">
                      <div className="col-4">
                        <p>Tên cửa hàng mua thuốc</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="registrationUnit"
                          defaultValue={`${item.registrationInfo.registrationUnit}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Địa chỉ cửa hàng</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="registrationUnitAddress"
                          defaultValue={`${item.registrationInfo.registrationUnitAddress}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Nhà sản xuất</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="manufacturer"
                          defaultValue={`${item.registrationInfo.manufacturer}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Địa chỉ nhà sản xuất</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="manufacturerAddress"
                          defaultValue={`${item.registrationInfo.manufacturerAddress}`}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <h2>Cách sử dụng</h2>
                    {this.renderScopeOfUsePPP(item.scopeOfUse)}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-dark"
                    type="button"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-dismiss="modal"
                    data-id={item._id}
                    data-index={index}
                    onClick={this.handleDataSubmit}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }

  renderMainModalFertilizer() {
    const { data } = this.props;
    console.log(data);
    return (
      <React.Fragment>
        {data.length && data.map((item, index) => (
          <div className="modal fade" role="dialog" key={uuidv4()} tabIndex={-1} id={`modal-modify-${index}`}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Chỉnh sửa thông tin phân bón</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body modal-modify-body">
                  <div className="container" style={{ padding: 0 }}>
                    <div className="row">
                      <div className="col-4">
                        <p>Tên phân bón</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="name"
                          defaultValue={item.name ? `${item.name}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Loại phân bón</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="type"
                          defaultValue={item.type ? `${item.type}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Thành phần </p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="ingredient"
                          defaultValue={item.ingredient ? `${item.ingredient}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Nơi cấp phép</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="ministry"
                          defaultValue={item.ministry ? `${item.ministry}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Nơi sản xuất</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="province"
                          defaultValue={item.province ? `${item.province}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Tiêu chuẩn phân bón</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="lawDocument"
                          defaultValue={item.lawDocument ? `${item.lawDocument}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Doanh nghiệp sản xuất</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="enterprise"
                          defaultValue={item.enterprise ? `${item.enterprise}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Tổ chức chứng nhận</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="isoCertOrganization"
                          defaultValue={item.isoCertOrganization ? `${item.isoCertOrganization}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <p>Thông tin xuất/nhập khẩu</p>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control-plaintext p-0"
                          type="text"
                          data-field="manufactureAndImport"
                          defaultValue={item.manufactureAndImport ? `${item.manufactureAndImport}` : 'Rỗng'}
                          style={{ padding: 0 }}
                          onChange={(this.handleInputOnChange)}
                        />
                      </div>
                    </div>

                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-dismiss="modal"
                    data-index={index}
                    data-id={item._id}
                    onClick={this.handleDataSubmit}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default ModifyItemModal;
