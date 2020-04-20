/* eslint-disable no-console */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import Pagination from 'react-js-pagination';

import ViewItemModal from '../Modals/ViewItemModal';
import ModifyItemModal from '../Modals/ModifyItemModal';
import DeleteItemModal from '../Modals/DeleteItemModal';

import DataPerPage from './Pagination/DataPerPage';

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
    console.log(itemList);
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
    const {
      data, handlePageChange, activePage, totalProducts, dataPerpage,
    } = this.props;
    const { selectedItem, parentComponent } = this.state;

    if (!Array.isArray(data)) {
      return <h1>Loading....</h1>;
    }
    if (!data.length) {
      return <h1>Loading....</h1>;
    }
    const viewItemModal = <ViewItemModal type="cooperative" selectedItem={selectedItem} />;
    const modifyItemModal = <ModifyItemModal data={data} />;
    const deleteItemModal = <DeleteItemModal
      type="cooperative"
      parentComponent={parentComponent}
      data={data}
    />;

    return (
      <div className="card-body">
        {viewItemModal}
        {modifyItemModal}
        {deleteItemModal}
        <DataPerPage type="cooperative" parentComponent={parentComponent} />

        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
          <table className="table dataTable my-0" id="dataTable">
            <thead>
              <tr>
                <th>Tên hợp tác xã</th>
                <th>Địa chỉ</th>
                <th>Trạng thái hoạt động</th>
                <th>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 && data.map((value, index) => <tr key={uuidv4()}>
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
                        data-target={`#modal-delete-${index}`}
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
                <td><strong>Tên hợp tác xã</strong></td>
                <td><strong>Địa chỉ</strong></td>
                <td><strong>Trạng thái hoạt động</strong></td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>

        <Pagination
          activePage={activePage}
          itemsCountPerPage={dataPerpage}
          totalItemsCount={totalProducts}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    );
  }
}

export default { ListItems };
