import { API } from "../config";


export const signup = (user) => {
    return fetch(`${API}/admin/signup`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        });
    };

export const signin = (user) => {
    return fetch(`${API}/admin/signin`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        });
    };

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt-admin', JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt-admin');
        next();
    }
};

export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        console.log("run");
        return false
    }
    if(localStorage.getItem('jwt-admin')){
        return JSON.parse(localStorage.getItem('jwt-admin'));
    }else{
        return false;
    }
};