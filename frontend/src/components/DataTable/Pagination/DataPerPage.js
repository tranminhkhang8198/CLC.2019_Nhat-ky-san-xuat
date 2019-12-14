import React from 'react';

function DataPerPage() {
  return (
    <div className="row">
      <div className="col-md-6 text-nowrap">
        <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
          <label htmlFor="data-per-page-picker">
            HIển thị&nbsp;
            <select id="data-per-page-picker" className="form-control form-control-sm custom-select custom-select-sm">
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
              placeholder="Tìm thuốc BVTV theo tên"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default DataPerPage;
