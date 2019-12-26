/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class ViewItemModal extends Component {
  constructor(props) {
    super(props);

    this.typeNames = {
      fertilizerTitle: 'fertilizer',
      plantProtectionProductTitle: 'plantProductProtection',
      cooperative: 'cooperative',
    };
  }

  renderFertilizerModalContent(itemData) {
    if (!itemData) {
      return null;
    }
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            Thông tin phân bón
          </h4>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body modal-add-body">
          <div className="container" style={{ padding: 0 }}>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên phân bón</p>
              </div>
              <div className="col-8">
                <p>{itemData.name}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Loại phân bón</p>
              </div>
              <div className="col-8">
                <p>{itemData.type}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Thành phần phân bón</p>
              </div>
              <div className="col-8">
                <p>{itemData.ingredient}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Bộ</p>
              </div>
              <div className="col-8">
                <p>{itemData.ministry}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tỉnh</p>
              </div>
              <div className="col-8">
                <p>{itemData.ministry}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Căn cứ, tiêu chuẩn, quy định</p>
              </div>
              <div className="col-8">
                <p>{itemData.lawDocument}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nơi sản xuất</p>
              </div>
              <div className="col-8">
                <p>{itemData.enterprise}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tổ chức chứng nhận hợp quy</p>
              </div>
              <div className="col-8">
                <p>{itemData.isoCertOrganization}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nhập khẩu, xuất khẩu</p>
              </div>
              <div className="col-8">
                <p>{itemData.manufactureAndImport}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
        </div>
      </div>
    );
  }

  renderCooperativeModalContent(itemData) {
    if (!itemData) {
      return null;
    }
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            Thông tin hợp tác xã
          </h4>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body modal-add-body">
          <div className="container" style={{ padding: 0 }}>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên gọi của hợp tác xã</p>
              </div>
              <div className="col-8">
                <p>{itemData.name}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên nước ngoài của HTX</p>
              </div>
              <div className="col-8">
                <p>{itemData.foreignName}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên viết tắt</p>
              </div>
              <div className="col-8">
                <p>{itemData.abbreviationName}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Logo của HTX</p>
              </div>
              <div className="col-8">
                <img
                  src={itemData.logo}
                  alt="Logo của HTX"
                />
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Thông tin trạng thái của HTX</p>
              </div>
              <div className="col-8">
                <p>{itemData.status}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Mã số HTX</p>
              </div>
              <div className="col-8">
                <p>{itemData.cooperativeID}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Mã số thuế của HTX</p>
              </div>
              <div className="col-8">
                <p>{itemData.tax}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Người đại diện</p>
              </div>
              <div className="col-8">
                <p>{itemData.surrgate}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Giám đốc</p>
              </div>
              <div className="col-8">
                <p>{itemData.director}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Địa chỉ của hợp tác xã</p>
              </div>
              <div className="col-8">
                <p>{itemData.address}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Số điện thoại của HTX</p>
              </div>
              <div className="col-8">
                <p>{itemData.phone}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Địa chỉ fax của HTX</p>
              </div>
              <div className="col-8">
                <p>{itemData.fax}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Đia chỉ website của HTX</p>
              </div>
              <div className="col-8">
                <a href={itemData.website}>
                  {itemData.website}
                </a>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Văn phòng đại diện</p>
              </div>
              <div className="col-8">
                <p>{itemData.representOffice}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Danh sách tài liệu</p>
              </div>
              <div className="col-8">
                <p>{itemData.docs}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
        </div>
      </div>
    );
  }


  renderPPPModalContent(itemData) {
    if (!itemData) {
      return null;
    }
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            Thông tin thuốc bảo vệ thực vật
          </h4>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body modal-add-body">
          <div className="container" style={{ padding: 0 }}>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên thương phẩm</p>
              </div>
              <div className="col-8">
                <p>{itemData.name}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên hoạt chất</p>
              </div>
              <div className="col-8">
                <p>{itemData.activeIngredient}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Hàm lượng sử dụng</p>
              </div>
              <div className="col-8">
                <p>{itemData.content}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên nhóm thuốc</p>
              </div>
              <div className="col-8">
                <p>{itemData.plantProtectionProductGroup}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nhóm độc GHS</p>
              </div>
              <div className="col-8">
                <p>{itemData.ghs}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nhóm độc WHO</p>
              </div>
              <div className="col-8">
                <p>{itemData.who}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
          <button
            className="btn btn-info"
            type="button"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#modal-view-addition-1"
          >
            Tiếp theo
          </button>
        </div>
      </div>
    );
  }

  renderPPPScopeOfUse(itemData) {
    const { scopeOfUse } = itemData;
    if (!scopeOfUse.length) {
      return null;
    }
    return scopeOfUse.map((item) => (
      <div className="container" style={{ padding: 0 }} key={uuidv4()}>
        <legend>Tác dụng:</legend>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Tên cây tác thuốc tác dụng</p>
          </div>
          <div className="col-8">
            <p>{item.plant}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Sâu bọ diệt trừ</p>
          </div>
          <div className="col-8">
            <p>{item.pest}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Liều lượng</p>
          </div>
          <div className="col-8">
            <p>{item.dosage}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Phi</p>
          </div>
          <div className="col-8">
            <p>{item.phi}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Cách sử dụng</p>
          </div>
          <div className="col-8">
            <textarea
              className="form-control item"
              rows="4"
              value={item.usage}
              readOnly
            />
          </div>
        </div>
        <hr />
      </div>
    ));
  }

  renderAdditionalModalPPPContent(itemData) {
    if (!itemData) {
      return null;
    }
    return (
      <>
        {/* <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add-addition-1">
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
        </div> */}
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
            {this.renderPPPScopeOfUse(itemData)}
          </div>
          <div className="modal-footer">
            <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
            <button
              className="btn btn-light"
              type="button"
              data-dismiss="modal"
              data-toggle="modal"
              data-target="#modal-view-1"
            >
              Trở lại
            </button>
          </div>
        </div>
      </>
    );
  }


  renderMainModal(modalContent) {
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-view-1">
        <div className="modal-dialog" role="document">
          {modalContent}
        </div>
      </div>
    );
  }

  renderAdditionalModal(modalContent) {
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-view-addition-1">
        <div className="modal-dialog" role="document">
          {modalContent}
        </div>
      </div>
    );
  }

  renderModals(modalType) {
    const { fertilizerTitle, plantProtectionProductTitle, cooperative } = this.typeNames;
    const { selectedItem } = this.props;
    console.log(selectedItem);
    let renderDOM;

    switch (modalType) {
      case fertilizerTitle:
        renderDOM = (
          <>
            {this.renderMainModal(this.renderFertilizerModalContent(selectedItem))}
          </>
        );
        break;
      case plantProtectionProductTitle:
        renderDOM = (
          <>
            {this.renderMainModal(this.renderPPPModalContent(selectedItem))}
            {this.renderAdditionalModal(this.renderAdditionalModalPPPContent(selectedItem))}
          </>
        );
        break;
      case cooperative:
        renderDOM = (
          <>
            {this.renderMainModal(this.renderCooperativeModalContent(selectedItem))}
          </>
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
      <>
        {this.renderModals(type)}
      </>
    );
  }
}

export default ViewItemModal;
