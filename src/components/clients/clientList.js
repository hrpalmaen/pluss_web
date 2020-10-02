import React from 'react'
import MaterialTable from 'material-table';

import {
    AlertDialog,
    TableGeneric
} from '../common/common'

export class ClientList extends React.Component {
    constructor(props) {        
        super(props)
    }

    state = {
        alert: {
            open: false
        },
        columns: [
            { title: 'Nit', field: 'nit' },
            { title: 'Nombre', field: 'name' },
            { title: 'Teléfono', field: 'phone' },
            { title: 'Asesor de venta', field: 'agent' },
            { title: 'Ciudad', field: 'city' },
            { title: 'id', field: 'id' }
        ],
        dataUser: [],
        showAlert: false,
        selectRegister: null,
    };

    actions = [
        {
            type: 'edit',
            title: 'Editar cliente',
        },
        {
            type: 'file_copy',
            title: 'Duplicar cliente',
        },
        {
            type: 'delete',
            title: 'Eliminar cliente',
        }
    ]

    showConfirmation = (rowData) => {
        this.setState({
            showAlert: {
                open: true,
                option: 'delete'
            },
            selectRegister: rowData
        })
    }

    handleChangePage = (forward) => {
        console.log('forward: ', forward);
        this.props.changePage(forward)
    }

    render() {
        return (
            <div>
                <div className="sub-title">
                    <span className="text">
                        Lista de Clientes
                </span>
                </div>
                <TableGeneric
                    title=""
                    columns={this.state.columns}
                    data={this.props.clientList}
                    actions={this.actions}
                    editItem={this.props.selectUpdate}
                    deleteItem={this.showConfirmation}
                    duplicateItem={this.props.duplicateClient}
                    changePage={this.handleChangePage}
                    count={this.props.count}

                />
                {/* <MaterialTable
                    title=""
                    columns={this.state.columns}
                    data={this.props.clientList} /> */}

                <AlertDialog
                    open={this.state.showAlert.open}
                    option={this.state.showAlert.option}
                    close={() => this.setState({ showAlert: !this.state.showAlert })}
                    confirm={() => this.props.selectDelete(this.state.selectRegister)}
                />
            </div>
        );
    }
}