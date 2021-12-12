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