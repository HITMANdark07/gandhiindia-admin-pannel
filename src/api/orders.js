import { isAuthenticated } from "../auth";
import { API } from "../config";

export const orderslist = (limit, skip) => {
    return fetch(`${API}/orders/list/${isAuthenticated().admin._id}?limit=${limit}&skip=${skip}`, {
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
        }
    }).then((response) => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const updateStatus = (id,data) => {
    return fetch(`${API}/order/update/${id}/${isAuthenticated().admin._id}`, {
        method:"PUT",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
        },
        body:JSON.stringify(data)
    }).then((response) => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const moveToShipped = (products) => {
    return fetch(`${API}/order/bulk/status/${isAuthenticated().admin._id}`, {
        method:"PUT",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
        },
        body:JSON.stringify({products:products})
    }).then((response) => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
