/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import ModifyItemModal from '../Modals/ModifyItemModal';
import DeleteItemModal from '../Modals/DeleteItemModal';

import DataPerPage from './Pagination/DataPerPage';
import Pagination from './Pagination/Paginator';
import ViewItemModal from '../Modals/ViewItemModal';

export class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentComponent: props.parentComponent,
      selectedItem: null,
    };
    this.selectTableItemEventHandler = this.selectTableItemEventHandler.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getItemBaseOnId(itemList, itemId) {
    let result = null;
    for (let i = 0; i < itemList.length; i += 1) {
      if (itemList[i]._id === itemId) {
        result = itemList[i];
        break;
      }
    }
    return result;
  }

  selectTableItemEventHandler(e) {
    e.preventDefault();
    const { data } = this.props;
    const { selectedItem } = this.state;
    const selectedItemId = e.target.getAttribute('href');
    if (selectedItem !== null) {
      if (selectedItem._id === selectedItemId) {
        return;
      }
    }
    const item = this.getItemBaseOnId(data, selectedItemId);
    this.setState({ selectedItem: item });
  }

  render() {
    const { data } = this.props;
    const { selectedItem, parentComponent } = this.state;

    if (!Array.isArray(data)) {
      return <h1>Loading....</h1>;
    }
    if (!data.length) {
      return <h1>Loading....</h1>;
    }
    // console.log(data.length);

    const viewItemModal = <ViewItemModal />;
    const modifyItemModal = <ModifyItemModal />;
    const deleteItemModal = <DeleteItemModal
      type="cooperativeHRManagement"
      parentComponent={parentComponent}
      selectedItem={selectedItem}
    />;

    return (
      <div className="card-body">
        {viewItemModal}
        {modifyItemModal}
        {deleteItemModal}
        <DataPerPage type="cooperativeHRManagement" parentComponent={parentComponent} />

        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
          <table className="table dataTable my-0" id="dataTable">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Chức vụ</th>
                <th>Số điện thoại</th>
                <th>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 && data.map((value) => <tr key={uuidv4()}>
                <td>{value.name}</td>
                <td>{value.address}</td>
                <td>{value.status}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" type="button">Hành động&nbsp;</button>
                    <div className="dropdown-menu" role="menu" style={{ overflow: 'hidden', padding: 0 }}>
                      <a
                        className="dropdown-item text-white bg-info"
                        href={value._id}
                        role="presentation"
                        data-toggle="modal"
                        data-target="#modal-view"
                        style={{ cursor: 'pointer' }}
                        onClick={this.selectTableItemEventHandler}
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
                        href={value._id}
                        role="presentation"
                        style={{ cursor: 'pointer' }}
                        data-toggle="modal"
                        data-target="#modal-delete-item-1"
                        onClick={this.selectTableItemEventHandler}
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
                <td><strong>Họ và tên</strong></td>
                <td><strong>Chức vụ</strong></td>
                <td><strong>Số điện thoại</strong></td>
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
