import React, { useState, useEffect } from "react";
import Logo from '../../../static/logo_pop_litle.png'
import conf from '../../../config'

// Components
import { ProductPDF } from './productPDF'

// redux 
import { connect } from 'react-redux'

import * as quotationActions from '../../../actions/quotationActions'
import { saveAs } from 'file-saver'

const buildUnits = (quotation) => {
    const keys = Object.keys(quotation);
    const unitsNumber = keys.filter(_ => !_.indexOf('cost'));
    const units = [];
    for (let index in unitsNumber) {
        index = parseInt(index)
        units.push({
            number: quotation[`unit${index + 1}`],
            unit: quotation[`cost${index + 1}`]
        })
    }
    return units
}

const printPDF = () => {
    // window.print()
    // return true
    let data = window.location.href

    fetch(`${conf.api_url}/quotation/pdf/`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'},//'text/xml'}
        responseType: 'blob'
    }).then(response => response.blob())
    .then(blob => saveAs(blob, 'test.pdf'))
    .catch(e => console.log('error', e))
}

const getQuotation = async(quotation) => {
    try{
        let response = await fetch(`${conf.api_url}/quotation/${quotation}/`)
        let data = await response.json()
        
        return data
    }
    catch {console.log('errrorrrrr')}
}

const getQuotationSession = (props) => {
    const idInitial = props.match.params.id;
    const dataString = idInitial ? getQuotation(idInitial) : JSON.parse(sessionStorage.getItem('quotation'));
    // const dataString = JSON.parse(sessionStorage.getItem('quotation'));
    console.log('dataString: ', dataString);

    return dataString;
}

export const GeneratePDFHook = (props) => {
    console.log('props pdf: ', props);
    const [unitsCost, setUnitsCost] = useState([])
    const [quotation, SetQuotation] = useState()    

    useEffect(async () => { 
        const data = await getQuotationSession(props)

        !quotation && SetQuotation(data)

        if (!unitsCost.length) {
            const units = buildUnits(data)
            if (units.length) {
                setUnitsCost(units);
            }
        }
    }, []);

    return (
        <div id='pdf'>
            {quotation && <div className="container-pdf">
                <section>
                    <div className="header-pdf col-md-12 col-sm-12 d-flex">
                        <div className="col-6 text-descripcion">
                            <p>Medellín, {quotation.quotationDate}</p><br />
                            <p>Señores:</p>
                            {/* <p><span>{quotation.client.name.charAt(0).toUpperCase() + quotation.client.name.slice(1).toLowerCase()}</span></p> */}
                            <p>{quotation.client.address}</p>
                            <p>email. {quotation.client.email}</p>
                            <p>tel. {quotation.client.phone}</p>
                            <p>{quotation.city}</p>

                        </div>

                        <div className="col-3 px-0 text-descripcion">
                            <br />
                            <p><span>Cotización N° {quotation.id}</span></p>
                        </div>
                        <div className="col-3 px-0">
                            <img src={Logo} onClick={printPDF} className="image-logo-pdf" />
                        </div>

                    </div>

                    <div className="col-12 px-0 d-flex">
                        <div className="col-12 px-0 bar-head"></div>
                        {/* <div className="col-2 px-0 d-flex justify-content-end">
                            <div>Cotización</div>
                        </div>
                        <div className="col-3 px-0 bar-head"></div> */}

                    </div>
                    {/* <div className="bar-head" style={{ backgroundColor: "#ff0000" }}>
                        <div className="quotation-title">Cotización</div>
                    </div> */}

                </section>

                <section>
                    {quotation.products.map(product =>
                        <ProductPDF product={product} />
                    )}
                </section><br /><br />
                <hr />
                <section className="floor-pdf">
                    <div className="col-12 px-0 d-flex text-descripcion">
                        <div className="col-1 px-0"></div>
                        <div className="col-5 px-0">
                            <div className="sub-title-pdf text-center">Términos y condiciones</div><br />
                            <p>Precios por unidad</p>
                            <p>Sujeto a disponibilidad en el momento de enviar la orden de compra</p>
                            <p>Los precios no incluyen iva</p>
                            <p>Entrega en sus oficinas en Medellín</p>
                            <p>Forma de pago: 30 días</p>
                            <p>Tiempo de entrega: 8 a 15 días hábiles</p>
                            <p>El Logo será suministrado por el cliente en COREL o ILLUSTRATOR convertido a curvas.</p>
                            <p><b>Nota:</b> productos de tecnología tienen 8 días para reposición y para los demás productos 30 días.</p>
                        </div>
                        <div className="col-2 px-0"></div>
                        <div className="col-2 px-0">
                            <div className="sub-title-pdf text-center">Información de contacto</div><br />
                            <p>{quotation.user.first_name}</p>
                            <p>Ventas</p>
                            <p>PLUSS P.O.P S.A.S</p>
                            <p>Email: {quotation.user.email}</p>
                            <p>Cel: {quotation.user.phone_number}</p>
                        </div>
                    </div><br />
                </section>
            </div>}
        </div>
    )
}

const mapStateToProps = (reducers) => {
    console.log('reducers.quotationReducer: ', reducers.quotationReducer);
    return reducers.quotationReducer;
};

const GeneratePDF = connect(mapStateToProps, quotationActions)(GeneratePDFHook);
export {
    GeneratePDF
}

