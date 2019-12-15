import React from 'react';
import uuidv4 from 'uuid/v4';

function AddItemModal({ type }) {
  function getLabelTitlesByType(dataType) {
    let labelTitles = [];
    switch (dataType) {
      case 'fertilizer':
        labelTitles = [
          '',
        ];
        break;
      case 'plantProductProtection':
        labelTitles = [
          {
            name: 'ten-thuong-pham',
            value: 'Tên thương phẩm',
            required: true,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            name: 'ten-hoat-chat',
            value: 'Tên hoạt chất',
            required: false,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            name: 'ten-loai-thuoc',
            value: 'Tên loại thuốc',
            required: false,
            notes: [
              'Tên các thương phẩm phải cách nhau bằng dấu ,',
              'Ví dụ: Thương phẩm 1, Thương phẩm 2',
            ],
          },
          {
            name: 'ten-nhom-thuoc',
            value: 'Tên nhóm thuốc',
            required: false,
            notes: [],
          },
          {
            name: 'danh-muc-thuoc',
            value: 'Danh mục thuốc',
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

  function renderLabels(labelsData) {
    return labelsData.map((item) => (
      <div className="form-group" key={uuidv4()}>
        <label htmlFor={item.value} className="w-100">
          {item.value}
          {item.required === true && renderRequiredFields()}
          <input
            type="text"
            id={item.value}
            className="form-control item"
            placeholder={item.value}
          />
          {item.notes.length > 0 && renderNotesFields(item.notes)}
        </label>
      </div>
    ));
  }

  const labelTitles = getLabelTitlesByType(type);

  return (
    <div className="modal fade" role="dialog" tabIndex={-1} id="modal-add">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Thêm mới thuốc BVTV</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body modal-add-body">
            {renderLabels(labelTitles)}
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" type="button" data-dismiss="modal">Đóng</button>
            <button className="btn btn-primary" type="button">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
