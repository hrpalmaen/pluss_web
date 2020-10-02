const INITIAL_STATE = {
    quotation: {},
    error: '',
    cargando: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'get_quotation':
            return {
                ...state,
                ...action.payload,
                cargando: false,
                error: ''
            }
        case 'create_quotation':
            return {
                ...state,
                quotation: action.payload
            }
        case 'get_quotation_active':
            return {
                ...state,
            }
        default:
            return state;
    };
};
