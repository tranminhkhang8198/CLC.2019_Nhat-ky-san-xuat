/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

function DataPerPage({ type, parentComponent }) {
  function getSearchPlaceholder(dataType) {
    let placeholderData = '';

    switch (dataType) {
      case 'fertilizer':
        placeholderData = 'Tìm phân bón theo tên';
        break;
      case 'plantProductProtection':
        placeholderData = 'Tìm thuốc bảo thực vật theo tên';
        break;
      default:
        placeholderData = 'Tìm kiếm dữ liệu theo tên';
        break;
    }

    return { placeholderData };
  }

  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };


  let optionRef = null;
  async function changeDataPerPageEventHandler(e, fieldRef) {
    e.preventDefault();
    const dataPerPage = fieldRef.options[fieldRef.selectedIndex].value;
    parentComponent.setState(() => ({
      refresh: true,
      dataPerpage: dataPerPage,
    }));
  }
  const { placeholderData } = getSearchPlaceholder(type);
  return (
    <div className="row">
      <div className="col-md-6 text-nowrap">
        <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
          <label htmlFor="data-per-page-picker">
            Hiển thị&nbsp;
            <select
              id="data-per-page-picker"
              className="form-control form-control-sm custom-select custom-select-sm"
              ref={(element) => { optionRef = element; }}
              onChange={(e) => (changeDataPerPageEventHandler(e, optionRef))}
            >
              <option value={10} defaultValue>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            &nbsp;
          </label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="text-md-right dataTables_filter" id="dataTable_filter">
          <label htmlFor="search-by-name">
            <input
              id="search-by-name"
              type="search"
              className="form-control form-control-sm"
              aria-controls="dataTable"
              placeholder={placeholderData}
              value={searchValue}
              onChange={handleInputChange}
            />
          </label>
          <div className="btn btn-info ml-2" onClick={() => parentComponent.searchDataByName(searchValue)}>Tìm</div>
        </div>
      </div>
    </div>
  );
}

export default DataPerPage;
