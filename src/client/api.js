import axios from "axios"
import { token } from "./config"

export const getTableData = (query) => {
    return axios.get('get/test/records', {
        params: {
            query
        },
        headers: {
            Token: token,
            'Content-Type': 'application/json',
        },
    })
}
export const tooglePurchase = (id, updated_by, isPurchase) => {
    return axios.post('/test/update', {
        id, updated_by, isPurchase
    }, {
        headers: {
            Token: token,
            'Content-Type': 'application/json',
        },
    })
}
