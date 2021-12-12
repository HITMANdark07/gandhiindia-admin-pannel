import { isAuthenticated } from "../auth";
import { API } from "../config";

export const getCategories = () => {
  return fetch(`${API}/category-list`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImages = (data) => {
  return fetch(`${API}/image/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body:data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getSubCategoriesbyCategory = (data) => {
    return fetch(`${API}/sub-category-by/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const getCategorylist = () => {
    return fetch(`${API}/category-list`,{
      method:'GET',
      headers:{
        Accept:'application/json',
        "Content-Type":"application/json",
      },
    }).then((response) => {
      return response.json();
    }).catch((err) => {
      console.log(err);
    });
  };

  export const createCategory =(data) => {
    return fetch(`${API}/admin/cateogry/add/${isAuthenticated().admin._id}`,{
      method:'POST',
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
      body:data
    }).then(response => {
      return response.json();
    }).catch(err => {
      console.log(err);
    })
  }
  export const getSubCategoriesbySlug = (data) => {
    return fetch(`${API}/sub-category-by/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

 export const getSpecificationBySubCategory = (id) => {
  return fetch(`${API}/specification/by-subcategory/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
 }
  
