/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import ViewItemModal from '../Modals/ViewItemModal';
import ModifyItemModal from '../Modals/ModifyItemModal';
import DeleteItemModal from '../Modals/DeleteItemModal';

import DataPerPage from './Pagination/DataPerPage';
import Pagination from './Pagination/Paginator';

export class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      Items: [],
    };
  }

  render() {
    const { data } = this.props;
    if (!data.length) {
      return <h1>Loading....</h1>;
    }

    return (
      <div className="card-body">
        <ViewItemModal />
        <ModifyItemModal />
        <DeleteItemModal />

        <DataPerPage type="fertilizer" />

        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
          <table className="table dataTable my-0" id="dataTable">
            <thead>
              <tr>
                <th>Tên phân bón</th>
                <th>Loại phân bón</th>
                <th>Nơi Sản Xuất</th>
                <th>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 && data.map((value) => <tr key={uuidv4()}>
                <td>{value.name}</td>
                <td>{value.type}</td>
                <td>{value.enterprise}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">Hành động&nbsp;</button>
                    <div className="dropdown-menu" role="menu" style={{ overflow: 'hidden', padding: 0 }}>
                      <a
                        className="dropdown-item text-white bg-info"
                        href="/"
                        role="presentation"
                        data-toggle="modal"
                        data-target="#modal-view-1"
                        style={{ cursor: 'pointer' }}
                      >
                        Xem thông tin
                      </a>
                      <a
                        className="dropdown-item text-white bg-warning"
                        href="/"
                        role="presentation"
                        data-toggle="modal"
                        data-target="#modal-modify-1"
                        style={{ cursor: 'pointer' }}
                      >
                        Chỉnh sửa
                      </a>
                      <a
                        className="dropdown-item text-white bg-danger"
                        href="/"
                        role="presentation"
                        data-toggle="modal"
                        data-target="#modal-delete-item-1"
                        style={{ cursor: 'pointer' }}
                      >
                        Xóa hàng này
                      </a>
                    </div>
                  </div>
                </td>
              </tr>)}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Tên phân bón</strong></td>
                <td><strong>Loại phân bón</strong></td>
                <td><strong>Nơi Sản Xuất</strong></td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>

        <Pagination />
      </div>
    );
  }
}

export default { ListItems };
