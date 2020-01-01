/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class ViewItemModal extends Component {
  constructor(props) {
    super(props);

    this.typeNames = {
      fertilizerTitle: 'fertilizer',
      plantProtectionProductTitle: 'plantProtectionProduct',
      cooperative: 'cooperative',
    };
  }

  renderItemContent(itemData) {
    return itemData || 'Rỗng';
  }

  renderModalFooterContent(itemData, previousModalId, nextModalId) {
    let nextModalButton = null;
    let previousModalButton = null;
    const closeCurrModalButton = (
      <button className="btn btn-dark" type="button" data-dismiss="modal">Đóng</button>
    );
    if (nextModalId) {
      nextModalButton = (
        <button
          className="btn btn-info"
          type="button"
          data-dismiss="modal"
          data-toggle="modal"
          data-target={`#${nextModalId}`}
        >
          Tiếp theo
        </button>
      );
    }
    if (previousModalId) {
      previousModalButton = (
        <button
          className="btn btn-light"
          type="button"
          data-dismiss="modal"
          data-toggle="modal"
          data-target={`#${previousModalId}`}
        >
          Trở lại
        </button>
      );
    }

    return (
      <>
        {closeCurrModalButton}
        {previousModalButton}
        {nextModalButton}
      </>
    );
  }

  renderFertilizerModalContent(itemData, previousModalId, nextModalId) {
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
                <p>{this.renderItemContent(itemData.name)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Loại phân bón</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.type)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Thành phần phân bón</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.ingredient)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Bộ</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.ministry)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tỉnh</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.ministry)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Căn cứ, tiêu chuẩn, quy định</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.lawDocument)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nơi sản xuất</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.enterprise)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tổ chức chứng nhận hợp quy</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.isoCertOrganization)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nhập khẩu, xuất khẩu</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.manufactureAndImport)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {this.renderModalFooterContent(
            null,
            previousModalId,
            nextModalId,
          )}
        </div>
      </div>
    );
  }

  renderCooperativeModalContent(itemData, previousModalId, nextModalId) {
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
                <p>{this.renderItemContent(itemData.name)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên nước ngoài của HTX</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.foreignName)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên viết tắt</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.abbreviationName)}</p>
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
                <p>{this.renderItemContent(itemData.status)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Mã số HTX</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.cooperativeID)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Mã số thuế của HTX</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.tax)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Người đại diện</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.surrgate)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Giám đốc</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.director)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Địa chỉ của hợp tác xã</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.address)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Số điện thoại của HTX</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.phone)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Địa chỉ fax của HTX</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.fax)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Đia chỉ website của HTX</p>
              </div>
              <div className="col-8">
                <a href={itemData.website}>
                  {this.renderItemContent(itemData.website)}
                </a>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Văn phòng đại diện</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.representOffice)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Danh sách tài liệu</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.docs)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {this.renderModalFooterContent(
            null,
            previousModalId,
            nextModalId,
          )}
        </div>
      </div>
    );
  }


  renderPPPModalContent(itemData, previousModalId, nextModalId) {
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
                <p>{this.renderItemContent(itemData.name)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên hoạt chất</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.activeIngredient)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Hàm lượng sử dụng</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.content)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Tên nhóm thuốc</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.plantProtectionProductGroup)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nhóm độc GHS</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.ghs)}</p>
              </div>
            </div>
            <div className="row" key={uuidv4()}>
              <div className="col-4">
                <p>Nhóm độc WHO</p>
              </div>
              <div className="col-8">
                <p>{this.renderItemContent(itemData.who)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {this.renderModalFooterContent(
            null,
            previousModalId,
            nextModalId,
          )}
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
            <p>{this.renderItemContent(item.plant)}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Sâu bọ diệt trừ</p>
          </div>
          <div className="col-8">
            <p>{this.renderItemContent(item.pest)}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Liều lượng</p>
          </div>
          <div className="col-8">
            <p>{this.renderItemContent(item.dosage)}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Phi</p>
          </div>
          <div className="col-8">
            <p>{this.renderItemContent(item.phi)}</p>
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
              value={this.renderItemContent(item.usage)}
              readOnly
            />
          </div>
        </div>
        <hr />
      </div>
    ));
  }

  renderPPPRegistrationInfo(itemData) {
    const { registrationInfo } = itemData;
    if (!registrationInfo) {
      return null;
    }
    return (
      <div className="container" style={{ padding: 0 }} key={uuidv4()}>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Đơn vị đăng ký</p>
          </div>
          <div className="col-8">
            <p>{this.renderItemContent(registrationInfo.registrationUnit)}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Địa chỉ</p>
          </div>
          <div className="col-8">
            <p>{this.renderItemContent(registrationInfo.registrationUnitAddress)}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Nhà sản xuất</p>
          </div>
          <div className="col-8">
            <p>{this.renderItemContent(registrationInfo.manufacturer)}</p>
          </div>
        </div>
        <div className="row" key={uuidv4()}>
          <div className="col-4">
            <p>Địa chỉ sản xuất</p>
          </div>
          <div className="col-8">
            <p>{this.renderItemContent(registrationInfo.manufacturerAddress)}</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  renderAdditionalModalPPPScopeOfUseContent(itemData, previousModalId, nextModalId) {
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
            {this.renderModalFooterContent(
              null,
              previousModalId,
              nextModalId,
            )}
          </div>
        </div>
      </>
    );
  }

  renderAdditionalModalPPPRegistrationInfoContent(itemData, previousModalId, nextModalId) {
    if (!itemData) {
      return null;
    }
    return (
      <>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              Thông tin đăng ký
            </h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body modal-add-body">
            {this.renderPPPRegistrationInfo(itemData)}
          </div>
          <div className="modal-footer">
            {this.renderModalFooterContent(
              null,
              previousModalId,
              nextModalId,
            )}
          </div>
        </div>
      </>
    );
  }

  renderMainModal(modalContent) {
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-view">
        <div className="modal-dialog" role="document">
          {modalContent}
        </div>
      </div>
    );
  }

  renderAdditionalModal(modalContent, modalId) {
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id={modalId}>
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
            {this.renderMainModal(
              this.renderPPPModalContent(
                selectedItem,
                null,
                'modal-view-addition-1',
              ),
            )}
            {this.renderAdditionalModal(
              this.renderAdditionalModalPPPScopeOfUseContent(
                selectedItem,
                'modal-view',
                'modal-view-addition-2',
              ),
              'modal-view-addition-1',
            )}
            {this.renderAdditionalModal(
              this.renderAdditionalModalPPPRegistrationInfoContent(
                selectedItem,
                'modal-view-addition-1',
                null,
              ),
              'modal-view-addition-2',
            )}
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
