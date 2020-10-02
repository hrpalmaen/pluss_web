import React, { PureComponent } from "react";
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';


// services
import { ProductsService } from '../../services/products';
import Button from '@material-ui/core/Button';
import Detail from '../../components/products/detail'

// common
import conf from '../../config'
import Loader from '../../components/common/loader';
import * as productActions from '../../actions/productActions';

// Style
import '../../styles/product.css'

// Component
import { ProductIndividual } from './product-individual';
import AlertDialog from '../../components/common/confirm';
import { FiltersComponent } from '../../components/common/filters/filter-component'


class Products extends PureComponent {

  productsService = new ProductsService()
  longitud = 0
  productsAux = [];
  externalQuery = true

  fieldsFilter = [
    {
      id: 'referency_id',
      type: 'input',
      name: 'referency_id',
      placeHolder: 'Referencia del producto',
      query: `${conf.api_url}/product?referency_id=_referency_id`
    },
    {
      id: 'provier_name',
      type: 'select',
      name: 'provier_name',
      placeHolder: 'Proveedor',
      data: [
        {
          value: 0,
          text: 'Todos'
        },
        {
          value: conf.PROVEEDORES.MPPROMOCIONALES,
          text: conf.PROVEEDORES.MPPROMOCIONALES
        },
        {
          value: conf.PROVEEDORES.PRUEBA,
          text: conf.PROVEEDORES.PRUEBA
        }
      ],
      query: `${conf.api_url}/product?provier_name=_provier_name`
    },
    {
      id: 'name',
      type: 'input',
      name: 'name',
      placeHolder: 'Nombre del producto',
      query: `${conf.api_url}/product?name=_name`
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      dataProducts: [],
      dataProductsDisplay: [],
      detailProducts: {},
      open: false,
      count: 0,
      loader: true,
      products: props.products,
      productsSelecteds: [],
      units: [],
      showDialogUnits: false,
    }
    this.addProduct = this.addProduct.bind(this);

    // store.subscribe(() => {
    //   this.setState({
    //     productDetail: store.getProducts()
    //   })
    // })
  }

  componentDidMount() {
    this.getProducts()
    if (this.state.products.length) {
      this.setState({
        productsSelecteds: this.state.products.map(_ => _.id)
      })
    }
  }

  getProducts = async () => {
    this.setState({ loader: true })
    const res = await this.productsService.getProducts();
    if (res.state) {
      this.setState({
        dataProducts: res.data.results,
        dataProductsDisplay: res.data.results,
        count: res.data.count,
        loader: false
      })
    }
  }

  productDetail = (dataProduct) => {
    if (dataProduct) {
      // this.setState({
      //   open: true,
      //   detailProducts: dataProduct
      // })
    }
  }

  addProduct = (dataProduct) => {
    this.props.addProduct(dataProduct);
    this.productsAux.push(dataProduct)
    this.setState({ productsSelecteds: [...this.state.productsSelecteds, dataProduct.id] });
  }

  goToCreateQuotation = () => {
    if (!this.state.units.length) {
      // this.props.addProduct(this.state.prod);
      this.setState({
        showDialogUnits: {
          open: true,
          option: 'units'
        }
      });
    }
  }

  addUnits = (_units) => {
    if (this.productsAux.length) {
      const productsWithUnits = this.productsAux.map(_ => {
        _.units = _units
        return _
      })
      this.props.addProducts(productsWithUnits);
      this.props.addUnits(_units);
      this.props.history.push('/cotizaciones/crear')
    }
  }

  afterFiltered = (newData) => {
    if (newData.results) {
      this.setState({ dataProductsDisplay: newData.results })  
    } else{
      this.setState({ dataProductsDisplay: newData })
    }
  }

  render() {
    return (
      <div>
        <div className="title">
          <div className="col-12 px-0 d-flex">
            <div className="col-8 px-0">
              Productos
            </div>
            <div className="col-4 px-0 d-flex flex-row-reverse">
              {this.state.productsSelecteds.length}
              <span className="store-car" onClick={this.goToCreateQuotation}>
                <LocalGroceryStoreIcon />
              </span>
            </div>
          </div>
        </div>
        <br />
        <FiltersComponent fields={this.fieldsFilter}
          data={this.state.dataProducts}
          nameFilter={'produtos'}
          external={this.externalQuery}
          dataFiltered={this.afterFiltered} />
        <br />

        <div className="col-12 px-0">
          {
            this.state.loader ?
              (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '50vh', width: '100%' }}>
                  <Loader size={70} />
                </div>
              )
              :
              (
                <div className="col-12 px-0 d-flex flex-wrap justify-content-between">
                  {this.state.dataProductsDisplay.map(product => {
                    let selected = this.state.productsSelecteds.indexOf(product.id) < 0 ? false : true;
                    return (
                      <ProductIndividual
                        key={product.id}
                        product={product}
                        productDetail={obj => this.productDetail(obj)}
                        addProduct={obj => this.addProduct(obj)}
                        selected={selected} />)
                  })}
                </div>
              )
          }
        </div>


        <Dialog
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
        >
          <Detail selectDetail={this.state.detailProducts} />
        </Dialog>
        {this.state.showDialogUnits &&
          <AlertDialog
            option={this.state.showDialogUnits.option}
            open={this.state.showDialogUnits.open}
            close={() => this.setState({ showDialogUnits: false })}
            confirm={this.addUnits}
          />}
      </div>
    )
  }

}

// Add reducers
const mapStateToProps = (reducers) => {
  return reducers.productReducer;
}

// Connect actions between redurcers with the component
const ProductComponent = connect(mapStateToProps, productActions)(Products)

export {
  ProductComponent
}