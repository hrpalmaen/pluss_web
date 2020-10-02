
import config from '../config'

export class ProductsService {

    constructor() { }

    response = {
        status: 200,
        data: [],
        state: true,
        messagge: ''
    }

    buildResponseError = (error) => {
        this.response.state = false
        this.response.messagge = error.messagge
    }

    getProducts = async () => {
        try {
            const res = await fetch(`${config.api_url}/product/?limit=10`)
            this.response.data = await res.json();
        }
        catch (error) {
            this.buildResponseError(error)
            console.log('error', error)
        }
        return new Promise(resolve => resolve(this.response));
    }

    getProductsByName = async (name) => {
        console.log('name: ', name);
        try {
            const res = await fetch(`${config.api_url}/product?name=${name}`)
            this.response.data = await res.json();
        }
        catch (error) {
            this.buildResponseError(error)
            console.log('error', error)
        }
        return new Promise(resolve => resolve(this.response));
    }

    getProductsByReferency_id = async (referency_id) => {
        try {
            const res = await fetch(`${config.api_url}/product?referency_id=${referency_id}`)
            this.response.data = await res.json();
        }
        catch (error) {
            this.buildResponseError(error)
            console.log('error', error)
        }
        return new Promise(resolve => resolve(this.response));
    }



}
