import React, { useState } from 'react'

// Material
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale'

// config theme
const theme = createMuiTheme({}, zhCN);

export const TableGeneric = (props) => {
    // useEffect(() => {
    //     console.log('props: 2 ', props);
    //     if (props) {
    //         // const _data = { ...props }
    //         // const actions = buildActions(_data)
    //         // buildTable(props)
    //     }
    // })
    const [page, setPage] = useState(0)
    const [pageForPage, setPageForPage] = useState(5)
    // const [_data, set_data] = useState()

    // console.log('_data: ', _data);

    const buildActions = (props) => {
        let actionsAux = []
        props.actions.forEach(item => {
            let eventEmitter;
            let icon;
            switch (item.type) {
                case 'edit':
                    eventEmitter = props.editItem
                    icon = 'edit'
                    break;
                case 'delete':
                    eventEmitter = props.deleteItem
                    icon = 'delete'
                    break;
                case 'show':
                    eventEmitter = props.showItem
                    icon = 'remove_red_eye'
                    break;
                case 'file_copy':
                    eventEmitter = props.duplicateItem
                    icon = 'file_copy'
                    break;
                default:
                    break;
            }
            const action = {
                icon: icon,
                tooltip: item.title,
                onClick: (event, rowData) => {
                    eventEmitter(rowData)
                }
            }
            actionsAux.push(action)
        });
        return actionsAux;
    }

    const handleChangePage = (event, nextPage) => {
        setPage(nextPage)
        nextPage > page ? props.changePage('next') : props.changePage('previout')
    }

    // Functions that returns the len and page actual of total data respectively
    const count = () => props.count
    const pageActual = () => page
    const backIconButtonText = () => 'Atras'

    const buildTable = (props) => {
        return (
            <MaterialTable
                title={props.title}
                columns={props.columns}
                data={props.data}
                actions={buildActions(props)}
                components={
                    {
                        Pagination: (propsPaginator) => (
                            console.log('propsPaginator: ', propsPaginator),
                            <ThemeProvider theme={theme}>
                                <TablePagination
                                    {...propsPaginator}
                                    rowsPerPage={pageForPage}
                                    // rowsPerPageOptions={[5]}
                                    onChangePage={handleChangePage}
                                    // backIconButtonText={backIconButtonText} // name button
                                    // nextIconButtonText={'Siguiente'} // text button
                                    count={count()}
                                    page={pageActual()}
                                />
                            </ThemeProvider>
                        )
                    }}
            />
        )
    }


    return (
        <>
            {buildTable(props)}
        </>
    )

}