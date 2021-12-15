import { isAuthenticated } from "../auth";
import { API } from "../config";

export const listSeller = () => {
    return fetch(`${API}/seller/list`,{
        method:'GET',
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const listSellerRequests = () => {
    return fetch(`${API}/seller/kyc/list`,{
        method:'GET',
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const getRequestDetails = (id) => {
    return fetch(`${API}/seller/kyc/details/${id}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}

export const verifySendMail = (data) => {
    return fetch(`${API}/seller/send/email/${isAuthenticated().admin._id}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
        },
        body:JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    })
}