import React, { Component } from "react";

import MaterialTable from 'material-table';

import {
  TableGeneric,
  AlertDialog
} from '../common/common'

import conf from '../../config'

export class List extends Component {
  constructor(props) {
    super(props)
    console.log('props count: ', props);
  }

  actions = [
    {
      type: 'edit',
      title: 'Editar usuario'
    },
    {
      type: 'delete',
      title: 'Eliminar usuario'
    }
  ]

  showConfirmation = (rowData) => {
    this.setState({
      showAlert: {
        open: true,
        option: 'delete'
      },
      selectRegisterDelete: rowData.user.id
    })
  }

  state = {
    alert: {
      open: false
    },
    columns: [
      { title: 'codigo', field: 'code' },
      { title: 'Nombre', field: 'user.first_name' },
      { title: 'Correo electrónico', field: 'user.username' },
      { title: 'Documento', field: 'identification_number' },
      { title: 'Teléfono', field: 'phone_number' }
    ],
    dataUser: [],
    showAlert: false,
    selectRegisterDelete: null,
  };

  handleChangePage = (forward) => {
    this.props.changePage(forward)
  }

  render() {
    return (
      <div>
        <div className="sub-title">
          <span className="text">
            Lista de usuarios
          </span>
        </div>
        <TableGeneric
          title=''
          columns={this.state.columns}
          data={this.props.userList}
          actions={this.actions}
          editItem={this.props.selectUpdate}
          deleteItem={this.showConfirmation}
          changePage={this.handleChangePage}
          count={this.props.count || 0}
        />
        {/* <MaterialTable
          title=""
          columns={this.state.columns}
          data={this.props.userList}
          actions={}
        /> */}

        <AlertDialog
          open={this.state.showAlert.open}
          option={this.state.showAlert.option}
          close={() => this.setState({ showAlert: !this.state.showAlert })}
          confirm={() => this.props.selectDelete(this.state.selectRegisterDelete)}
        />
      </div>
    );
  }
}