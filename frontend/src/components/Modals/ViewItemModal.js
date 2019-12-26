/* eslint class-methods-use-this: [
  "error",
  { "exceptMethods":
    [
      "getLabelTitlesByType", "renderTypeTitle", "renderLabels",
      "getToken", "renderBaseOnDataType", "renderFertilizerModalContent", "renderModal"
    ]
  }
] */

import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class ViewItemModal extends Component {
  constructor(props) {
    super(props);

    this.typeNames = {
      fertilizerTitle: 'fertilizer',
      plantProtectionProductTitle: 'plantProductProtection',
    };
  }

  getLabelTitlesByType(dataType) {
    let labelTitles = [];
    switch (dataType) {
      case 'cooperative':
        labelTitles = [
          {
            type: 'text',
            name: 'name',
            value: 'Tên hợp tác xã',
            placeholder: 'Nhập vào tên phân bón',
            required: true,
            notes: [],
          },
          {
            type: 'text',
            name: 'foreignName',
            value: 'Tên nước ngoài của HTX',
            placeholder: 'Nhập vào loại phân bón',
            required: true,
            notes: [],
          },
          {
            type: 'text',
            name: 'abbreviationName',
            value: 'Tên viết tắt',
            placeholder: 'Nhập vào thành phần của phân bón',
            required: false,
            notes: [
              'Tên các thành phần phải cách nhau bằng dấu ;',
              'Ví dụ: Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%;...',
            ],
          },
          {
            type: 'image',
            name: 'logo',
            value: 'Logo của HTX',
            placeholder: 'Nhập vào tên Bộ cấp phép sử dụng phân bón',
            required: false,
            notes: [
              'Ví dụ: Công thương',
            ],
          },
          {
            type: 'text',
            name: 'status',
            value: 'Thông tin trạng thái của HTX',
            placeholder: 'Nhập vào tên tỉnh, thành nơi sản xuất phân bón',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'cooperativeID',
            value: 'Mã số HTX',
            placeholder: 'Nhập vào căn cứ, tiêu chuẩn, quy định',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'tax',
            value: 'Mã số thuế của HTX',
            placeholder: 'Nhập vào tên doanh nghiệp sản xuất phân bón',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'surrgate',
            value: 'Người đại diện',
            placeholder: 'Nhập vào tên tổ chức chứng nhận hợp quy',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'director',
            value: 'Giám đốc',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'address',
            value: 'Địa chỉ của hợp tác xã',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'phone',
            value: 'Số điện thoại của HTX',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'fax',
            value: 'Địa chỉ fax của HTX',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
          {
            type: 'link',
            name: 'website',
            value: 'Đia chỉ website của HTX',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'representOffice',
            value: 'Văn phòng đại diện',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
          {
            type: 'text',
            name: 'docs',
            value: 'Danh sách tài liệu',
            placeholder: 'Nhập vào thông tin nhập khẩu, xuất khẩu',
            required: false,
            notes: [],
          },
        ];
        break;
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

  renderTypeTitle(typeData) {
    let typeTitle = '';
    switch (typeData) {
      case 'fertilizer':
        typeTitle = ' phân bón';
        break;
      case 'plantProductProtection':
        typeTitle = ' thuốc bảo vệ thực vật';
        break;
      case 'seed':
        typeTitle = ' giống lúa ';
        break;
      case 'cooperative':
        typeTitle = ' hợp tác xã ';
        break;
      default:
        typeTitle = '';
        break;
    }
    return typeTitle;
  }

  renderBaseOnDataType(typeData, dataContent) {
    let result = '';
    switch (typeData) {
      case 'link':
        result = <a href={dataContent}>{dataContent}</a>;
        break;
      case 'image':
        result = <img src={dataContent} alt="sameplePic" />;
        break;
      case 'text':
        result = dataContent;
        break;
      default:
        result = dataContent;
        break;
    }
    return result;
  }


  renderLabels(labelsData, itemData) {
    if (!itemData) {
      return null;
    }
    return labelsData.map((item) => (
      <div className="container" style={{ padding: 0 }} key={uuidv4()}>
        <div className="row">
          <div className="col-4">
            <p>{item.value}</p>
          </div>
          <div className="col-8">
            <p>{this.renderBaseOnDataType(item.type, itemData[item.name])}</p>
          </div>
        </div>
      </div>
    ));
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
      </div>
    );
  }


  renderModal(modalContent) {
    return (
      <div className="modal fade" role="dialog" tabIndex={-1} id="modal-view-1">
        <div className="modal-dialog" role="document">
          {modalContent}
        </div>
      </div>
    );
  }

  renderModals(modalType) {
    const { fertilizerTitle, plantProtectionProductTitle } = this.typeNames;
    const { selectedItem } = this.props;
    console.log(selectedItem);
    let renderModalContent;
    switch (modalType) {
      case fertilizerTitle:
        renderModalContent = this.renderFertilizerModalContent();
        break;
      case plantProtectionProductTitle:
        renderModalContent = this.renderFertilizerModalContent();
        break;
      default:
        console.log('.');
        break;
    }
    return this.renderModal(renderModalContent);
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
