import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

import config from '../../config';

export const ProductIndividual = (props) => {    
    
    const productDetail = (obj) => props.productDetail(obj);
    const addProduct = (obj) => {
        // setColorViewIcon('red')
        props.addProduct(obj)
    }

    // let [colorViewIcon, setColorViewIcon] = useState('');

    // props.selected && setColorViewIcon('red')
    // useEffect(() => {
    //     if (props.selecteds && props.selecteds.length) {
    //         const color = props.selecteds.includes(props.product.referency_id) ? 'red' : '';
    //         setColorViewIcon(color)
    //     }
    // })

    const color = {
        colorRed: {
            color: 'red'
        },
        colorNormal: {
            color: ''
        }
    }

    return (
        <div className="pl-1 pr-1 pb-3 ">
            <div className="card" style={{ width: '16.5rem', height: '25rem' }}>
                <img className="img-product" alt={props.product.name} src={`${config.api_products}${props.product.more_info.codigoProd}.${config.EXTENSION_IMAGE}`} />
                <div className="card-body card-body">
                    <div className="px-0 card-text text-common">
                        {props.product.detail}
                    </div>
                </div>
                <div className="card-footer text-alter" style={{ padding: '0.5rem 0.7rem' }}>
                    <div className="py-0 px-0">
                        Ref. {props.product.referency_id}
                    </div>
                    <div className="col-12 px-0 py-0 d-flex">
                        <div className="col-8 d-flex d-flex align-items-center px-0 py-0">
                            ${props.product.more_info.vlrUnitario} c/u
                                    </div>
                        <div className="d-flex col-4 px-0 py-0">
                            <div className="icon-active d-flex justify-content-center align-items-center">
                                <Tooltip title="Ver detalle" arrow>
                                    <VisibilityIcon onClick={() => productDetail(props.product)} />
                                </Tooltip>
                            </div>
                            <div
                                className="icon-active d-flex justify-content-center align-items-center"
                                style={props.selected ? color.colorRed : color.colorNormal}>
                                <Tooltip title="Agregar producto" arrow>
                                    <AddCircleIcon onClick={() => { addProduct(props.product) }} />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
