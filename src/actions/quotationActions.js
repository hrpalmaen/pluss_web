
export const getAllQuotation = () => (dispatch) => {
    dispatch({
        type: 'get_quotation',
        payload: 'store.quotation'

    })
}

export const createQuotation = (quotation) => (dispatch) => {
    dispatch({
        type: 'create_quotation',
        payload: quotation
    })
}

export const getQuotationActive = (dispatch) => {
    dispatch({
        type: 'get_quotation_active'        
    })
}


