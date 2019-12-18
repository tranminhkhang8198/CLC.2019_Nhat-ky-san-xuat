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
      // eslint-disable-next-line react/no-unused-state
      data: props.data,
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
    // eslint-disable-next-line no-unused-vars
    e.preventDefault();
    const { data } = this.props;
    const selectedItemId = e.target.getAttribute('href');
    // console.log();
    const item = this.getItemBaseOnId(data, selectedItemId);
    this.setState({ selectedItem: item });
  }

  render() {
    const { data } = this.props;
    const { selectedItem, parentComponent } = this.state;
    if (!data.length) {
      return <h1>Loading....</h1>;
    }

    let passedItem = selectedItem;
    if (passedItem === null) {
      // eslint-disable-next-line prefer-destructuring
      passedItem = data[0];
    }

    return (
      <div className="card-body">
        <ViewItemModal />
        <ModifyItemModal />
        <DeleteItemModal type="plantProductProtection" parentComponent={parentComponent} selectedItem={passedItem} />
        <DataPerPage type="plantProductProtection" parentComponent={parentComponent} />

        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
          <table className="table dataTable my-0" id="dataTable">
            <thead>
              <tr>
                <th>Tên thương phẩm</th>
                <th>Nhóm thuốc</th>
                <th>Tên hoạt chất</th>
                <th>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 && data.map((value) => <tr key={uuidv4()}>
                <td>{value.name}</td>
                <td>{value.plantProtectionProductGroup}</td>
                <td>{value.activeIngredient}</td>
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
                <td><strong>Tên thương phẩm</strong></td>
                <td><strong>Nhóm thuốc</strong></td>
                <td><strong>Tên hoạt chất</strong></td>
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
