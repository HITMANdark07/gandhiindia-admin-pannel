import { isAuthenticated } from "../auth";
import { API } from "../config";


export const createProducts = (data) => {
  return fetch(`${API}/admin/product/add/${isAuthenticated().admin._id}`,{
    method:'POST',
    headers:{
      Accept:'application/json',
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

export const getProducts = () => {
  return fetch(`${API}/admin/product-list/${isAuthenticated().admin._id}`,{
    method:'GET',
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${isAuthenticated().token}`
    }
  }).then(response => {
    return response.json();
  }).catch(err =>{
    console.log(err);
  })
};


export const getProductById = (id) => {
  return fetch(`${API}/product/details/${id}`,{
    method:"GET",
    headers:{
      Accept:'application/json',
      "Content-Type":"application/json"
    }
  }).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err);
  })
}

export const updateProduct = (id, data) =>{
  return fetch(`${API}/admin/product/update/${id}/${isAuthenticated().admin._id}`,{
    method:'PUT',
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${isAuthenticated().token}`
    },
    body:JSON.stringify(data)
  }).then(response => {
    return response.json()
  }).catch((err) => {
    console.log(err);
  })
}

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

export const getSubCategorylist = () => {
  return fetch(`${API}/sub-category-list`, {
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

export const getCategoryById = (id) => {
  return fetch(`${API}/category/${id}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
    },
  }).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err);
  })
}

export const getSubCategoryById = (id) => {
  return fetch(`${API}/sub-category/${id}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
    },
  }).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err);
  })
}

export const updateCategory = (id,data) => {
  return fetch(`${API}/admin/category/update/${id}/${isAuthenticated().admin._id}`,{
    method:'PUT',
    headers:{
      Accept:'application/json',
      Authorization:`Bearer ${isAuthenticated().token}`
    },
    body:data
  }).then(response =>{
    return response.json();
  }).catch(err => {
    console.log(err);
  })
}

export const updateSubCategory = (id,data) => {
  return fetch(`${API}/admin/sub-category/update/${id}/${isAuthenticated().admin._id}`,{
    method:'PUT',
    headers:{
      Accept:'application/json',
      Authorization:`Bearer ${isAuthenticated().token}`
    },
    body:data
  }).then(response =>{
    return response.json();
  }).catch(err => {
    console.log(err);
  })
}

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
  export const createSubCategory =(data) => {
    return fetch(`${API}/admin/sub-cateogry/add/${isAuthenticated().admin._id}`,{
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
  export const deleteCategory = (id) => {
    return fetch(`${API}/admin/category/delete/${id}/${isAuthenticated().admin._id}`,{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        "Content-Type":"application/json",
        Authorization:`Bearer ${isAuthenticated().token}`
      }
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      console.log(error);
    })
  }

  export const deleteSubCategory = (id) => {
    return fetch(`${API}/admin/sub-category/delete/${id}/${isAuthenticated().admin._id}`,{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        "Content-Type":"application/json",
        Authorization:`Bearer ${isAuthenticated().token}`
      }
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      console.log(error);
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

 export const createSpecification = (data) => {
    return fetch(`${API}/specification/create/${isAuthenticated().admin._id}`,{
      method:'POST',
      headers:{
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${isAuthenticated().token}`
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json()
    }).catch(err =>{
      console.log(err);
    }) 
 };

 export const updateSpecification = (id,data) => {
  return fetch(`${API}/specification/update/${id}/${isAuthenticated().admin._id}`,{
    method:'PUT',
    headers:{
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(data)
  }).then(response => {
    return response.json()
  }).catch(err =>{
    console.log(err);
  }) 
};

 export const getAllSpecifications = () =>{
   return fetch(`${API}/specification/list`,{
     method:'GET',
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

 export const deleteSpecification = (id) => {
   return fetch(`${API}/specification/delete/${id}/${isAuthenticated().admin._id}`,{
     method:'DELETE',
     headers:{
       Accept:"application/json",
       "Content-Type":"application/json",
       Authorization: `Bearer ${isAuthenticated().token}`
     }
   }).then(response =>{
     return response.json();
   }).catch(err => {
     console.log(err);
   })
 }

 export const getSpecificationById = (id) => {
  return fetch(`${API}/specification/details/${id}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    }
  }).then(response =>{
    return response.json()
  }).catch(err => {
    console.log(err);
  })
 }
  
