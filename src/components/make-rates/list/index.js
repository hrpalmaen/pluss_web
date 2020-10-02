import React, { Component } from "react";
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom'


import conf from '../../../config'

export class MakeRate extends Component {

    constructor(props){
      super(props)
      console.log('props list cotización: ', props);
      this.state = {
          columns: [
              { title: 'Id', field: 'id' },
              { title: 'Fecha creación', field: 'date_created' },
              { title: 'Cliente', field: 'client_name' },
              { title: 'Creado por', field: 'user_name' },
              { title: 'Estado', field: 'status'}
          ],
          dataQuotations: [],
          redirectFormQuotation: false,
          alert: {
            open: (props.location.state && props.location.state.open) ? props.location.state.open : false,
            message: (props.location.state && props.location.state.open) ? props.location.state.message : '',
            type: (props.location.state && props.location.state.open) ? props.location.state.type : '',
          }
      };
    }

    componentDidMount () {
      this.getDataQuotations()
    }

    getDataQuotations = async () => {
        try {
            let response = await fetch(`${conf.api_url}/quotation/?limit=30`)
            let data = await response.json()
            console.log('data quotation: ', data);        
            this.setState({
              dataQuotations: data.results
            })
        } catch (error) {
            console.log('error', error)
        }    
    }

    duplicateQuotation = quotation => {
      const data = quotation
      data.status = "En progreso"
      data.client = quotation.client.id
      data.user = quotation.user.id
  
      fetch(`${conf.api_url}/quotation/`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {

        console.log('response duplicate: ', response);
        let resp = await response.json()
        console.log('resp duplicate: ', resp);
        if (response.status === 200 ||  response.status == 201){
          this.setState({
            dataQuotations: [...this.state.dataQuotations, resp],
            alert: {
              open: true,
              message: 'La cotización se duplico correctamente.',
              type:'success'
            }
          })
        }
      })
      .catch(error => console.log('Error: ', error))
    }

    render(){
        return(
          <>
            <div className="title">
              Listado de cotizaciones
            </div>
          
            <MaterialTable
                title=''
                columns={this.state.columns}
                data={this.state.dataQuotations}
                actions={[
                    {
                      icon: 'visibility',
                      tooltip: 'Ver cotización',
                      onClick: (event, rowData) => {
                        // sessionStorage.setItem('quotation', JSON.stringify(rowData))
                        window.open(`/cotizacion/${rowData.id}/`, '_blank','',true)
                        // window.open(`/cotizacion/`, '_blank','',true)
                      }
                    },
                    rowData => ({
                      icon: 'edit',
                      tooltip: 'Editar cotización',
                      onClick: (event, rowData) => {
                        this.props.history.push({
                          pathname: '/cotizaciones/crear',
                          state: {
                            selectUpdate: rowData
                          }  
                        })
                      },
                      hidden: rowData.status == 'Finalizado'
                    }),
                    rowData => ({
                      icon: 'file_copy',
                      tooltip: 'Duplicar cotización',
                      onClick: (event, rowData) => {
                        this.duplicateQuotation(rowData)
                      },
                      hidden: rowData.status == 'En progreso'
                    })
                  ]}
                /> 
            <Link to="chart" id="linkQuotation" target="_blank" to="/clientes" ></Link>

            <Snackbar
              open={this.state.alert.open}
              autoHideDuration={3000}
              onClose={() => 
                this.setState({alert: {open: false}})
              }
              anchorOrigin= {{ 
                vertical: 'bottom',
                horizontal: 'left'
              }}>
              <Alert variant="filled" severity={this.state.alert.type}>{this.state.alert.message}</Alert>
            </Snackbar>
          </>
        )
    }
}