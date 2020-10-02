import React, { Component } from 'react'
import {
  Link,
  Redirect
} from 'react-router-dom'

// components
import { FormQuotation } from './formQuotation'
import conf from '../../../config'

// redux
import { connect } from 'react-redux'
import * as productActions from '../../../actions/productActions'
import * as quotationActions from '../../../actions/quotationActions'

class CreateQuotationHook extends Component {

  preViewPDF = false;

  constructor(props) {
    console.log('props llegando 1: ', props);
    super(props)
    this.state = {
      downloadPDF: false,
      preView: false,
      OpenAlert: null,
      redirectList: false,
      // Create for pass product from products
      productReducerAux: {
        selectUpdate: {
          products: this.props.productReducer.products,
          units: this.props.productReducer.units,
        }
      }
    }
    this.createQuotation = this.createQuotation.bind(this)
    this.eventSavePDF = this.eventSavePDF.bind(this)
    this.endQuotation = this.endQuotation.bind(this)
    this.updateQuotations = this.updateQuotations.bind(this)
    // this.generatePDF = this.generatePDF.bind(this)
  }

  componentDidMount() {
    if (this.props.productReducer.products.length) {
      this.setState({
        productReducerAux: {
          selectUpdate: {
            products: this.props.productReducer.products,
            units: this.props.productReducer.units,
            selectUpdate: 1
          }
        }
      })
    }
  }

  eventSavePDF(quotation) {
    window.open('/cotizacion', '_blank', '', true)
  }

  redirectToPDF() {
    if (this.preViewPDF) {
      this.props.history.push('/cotizacion')
    }
  }

  createQuotation(data) {
    // this.props.createQuotation({ ...data })
    let dataEmail = data.email

    fetch(`${conf.api_url}/quotation/`, {
      method: 'POST', body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (response) => {
        let resp = await response.json()

        if (response.status === 200 ||  response.status == 201){
          
          if (dataEmail) {
            dataEmail.client = resp.client
            dataEmail.url = `${window.origin}/cotizacion/${resp.id}`
  
            this.endQuotation(dataEmail)
          }else{
            this.setState({
              OpenAlert: {
                open: true,
                message: 'La cotización se creo correctamente.',
                type:'success'
              }
            })
          }
        }
    })
    .catch(error => console.log('Error: ', error))
  }

  updateQuotations (data) {
    let idSelectUpdate = data.id
    let dataEmail = data.email

    fetch(`${conf.api_url}/quotation/${idSelectUpdate}/`,{
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      let resp = await response.json()

      if (response.status === 200 ||  response.status == 201){

        if (dataEmail) {
          dataEmail.client = resp.client
          dataEmail.url = `${window.origin}/cotizacion/${resp.id}`

          this.endQuotation(dataEmail)
        }else{
          this.setState({
            OpenAlert: {
              open: true,
              message: 'La cotización se actualizo correctamente.',
              type:'success'
            }
          })
        }
        // this.state.OpenAlert && this.setState({redirectList: true})  
      }
    })
    .catch(error => console.log('Error: ', error))
  }

  endQuotation(quotation) {

    // quotation.quotation.id ? this.updateQuotations(quotation.quotation) : this.createQuotation(quotation)
    // let data = quotation
    // data.url = window.origin
    // // let data.url = origin
    // data.id = this.state.dataQuo
    
    fetch(`${conf.api_url}/quotation/send_email/`,{ method: 'POST', body: JSON.stringify(quotation),headers:{ 'Content-Type': 'application/json' } })
    .then(async (response) => {
      let resp = response.json()
    })
    .catch(e => console.log('no entro al send Email', e))
  }

  render() {
    return (
      <div>
        <FormQuotation
          eventCreateQuotation={this.createQuotation}
          preQuotation={this.state.productReducerAux}
          eventSavePDF={this.eventSavePDF}
          updateQuotation={this.props.location.state}
          // endQuotation = {this.endQuotation}
          updateQuotations = {this.updateQuotations}
        />          
        {this.state.OpenAlert && <Redirect to={{ pathname: '/cotizaciones', state:this.state.OpenAlert}}/>}
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return {
    productReducer: reducers.productReducer,
    quotationReducer: reducers.quotationReducer
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    productActions,
    quotationActions
  }
}

// connect reducer to component
const CreateQuotation = connect(mapStateToProps, mapDispatchToProps)(CreateQuotationHook);
export {
  CreateQuotation
}