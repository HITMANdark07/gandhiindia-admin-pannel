import React from 'react'
import Header from '../component/Header';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { isAuthenticated } from "../auth/index";
import makeToast from "../Toaster";
import { getCategories, getSpecificationBySubCategory, getSubCategoriesbyCategory,uploadImages } from '../api/inventory';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { listSeller } from '../api/seller';
import { API } from '../config';

const AddProducts = () => {

    const [categories, setCategories] = React.useState([]);
    const [subCategories, setSubCategories] = React.useState([]);
    
    const getSpecifications = React.useCallback((id) => {
      getSpecificationBySubCategory(id).then(response => {
        response.forEach((res,idx) => {
          res.options=res.options.split(",");
        })
        setSpecifications(response);
      })
    },[])
    const getSellers = React.useCallback(() => {
      listSeller().then(data => {
        if(data){
          setSellers(data);
          setSeller(data[0]._id);
        }
      })
    },[]);
    const getSubCategories = React.useCallback((id) => {
      getSubCategoriesbyCategory({category:id}).then(subcat => {
          if(subcat.err){
              makeToast("error", subcat.err);
          }else{
              setSpecifications([]);
              setSubCategories(subcat);
              setSubCategory(subcat[0]._id);
              getSpecifications(subcat[0]._id)
          }
      }).catch(err =>{
          console.log(err);
      })
  },[getSpecifications]);
    const allCats = React.useCallback(() => {
        getCategories().then(data => {
        if(data){
          setCategories(data);
          setCategory(data[0]._id);
          getSubCategories(data[0]._id);
        }else{
          makeToast("error","Something Went Wrong");
        }
      }) 
    },[getSubCategories]);
    React.useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      allCats();
      getSellers();
    }, [allCats,getSellers])
    const [seller, setSeller] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [sellers, setSellers] = React.useState([]);
    const [subCategory, setSubCategory] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [regPrice, setRegPrice] =React.useState("");
    const [salePrice, setSalePrice] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [specifications, setSpecifications] = React.useState([]);
    const [image, setImage] = React.useState([]);
    const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
    const handleProductImg = (e) => {
      let selectedFile = e.target.files[0];
      const data = new FormData();
      if (selectedFile) {
        if (selectedFile && types.includes(selectedFile.type)) {
          data.set('photo',selectedFile);
          uploadImages(data).then(response => {
            if(response.message){
              setImage((prev) => [...prev,response.id]);
              makeToast("success",response.message);
            }else{
              makeToast("error", response.error);
            }
          })
        } else {
          makeToast("warning","please select correct image file");
        }
      } else {
        makeToast("warning","please select your file");
      }
    };
    const clickSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
      const specs = [];
      specifications.forEach((spc) => {
        specs.push({
          name:spc.name,
          value:spc.options[0]
        })
      })
      const data = {
        category:category,
        subCategory:subCategory,
        name:title,
        mrp:regPrice,
        price:salePrice,
        quantity:quantity, //
        photo:image, //
        description: description,
        specifications:specs,
        added_by:seller,
        status:1
      }
      console.log(data);
      makeToast("success","Running submit");
    
    }
    const handleChange = (event, name) => {
      switch (name) {
        case "title":
          setTitle(event.target.value);
          break;
        case "description":
            setDescription(event.target.value);
            break;
        case "sale":
            setSalePrice(event.target.value);
            break;
        case "regular":
            setRegPrice(event.target.value);
            break;
        case "quantity":
              setQuantity(event.target.value);
              break;
        case "seller":
            setSeller(event.target.value);
            break;
        case "category":
            setCategory(event.target.value);
            getSubCategories(event.target.value);
            break;
        case "subCategory":
            setSubCategory(event.target.value);
            setSpecifications([]);
            getSpecifications(event.target.value);
            break;
        default:
      }
    };

    return (
        <Header>
            {!isAuthenticated() && <Redirect to="/sigin" />}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px auto",
            width:"80%"
          }}
        >
          <TableContainer component={Paper}>
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ paddingLeft: "15px" }}>Add Products</h2>
              <Button variant="contained" onClick={clickSubmit} startIcon={loading ? <CircularProgress size={25} color="inherit" /> :<SaveIcon />}>
                SAVE & PUBLISH
              </Button>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px",
              }}
            >
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Seller</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Seller"
                  value={seller}
                  onChange={(e) => handleChange(e, "seller")}
                >
                  {sellers.map((seller) => (
                  <MenuItem value={seller._id} key={seller._id}>{seller.email}</MenuItem>
                  ))} 
                </Select>
              </FormControl>
              <TextField
                id="standard-basic"
                label="Product Name"
                value={title}
                onChange={(e) => handleChange(e, "title")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />

                <TextField
                id="standard-basic"
                label="Product Description"
                value={description}
                onChange={(e) => handleChange(e, "description")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              

              <TextField
                id="standard-basic"
                label="Regular Price"
                value={regPrice}
                type="number"
                onChange={(e) => handleChange(e, "regular")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                id="standard-basic"
                type="number"
                label="Sale Price"
                value={salePrice}
                onChange={(e) => handleChange(e, "sale")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                id="standard-basic"
                type="number"
                label="Product Quantity"
                value={quantity}
                onChange={(e) => handleChange(e, "quantity")}
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  value={category}
                  onChange={(e) => handleChange(e, "category")}
                >
                  {categories.map((cato) => (
                  <MenuItem key={cato._id} value={cato._id}>{cato.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sub Category"
                  value={subCategory}
                  onChange={(e) => handleChange(e, "subCategory")}
                >
                  {subCategories.map((cato) => (
                  <MenuItem key={cato._id} value={cato._id}>{cato.name}</MenuItem>
                   ))} 
                </Select>
              </FormControl>
              {
                specifications.map((spec,idx) => {
                  return(
                    <FormControl sx={{ marginTop: "20px" }} key={spec._id}>
                    <InputLabel id="demo-simple-select-label">{spec.name}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={spec.name}
                      value={spec.options[0]}
                      onChange={(e) => {
                        let specs = specifications;
                        let index = spec.options.indexOf(e.target.value);
                        let op0= spec.options[0];
                        specs[idx].options[0] = e.target.value;
                        specs[idx].options[index] = op0;
                        setSpecifications([...specs]);
                      }}
                    >
                      {spec.options.map((cato,idx) => (
                      <MenuItem key={idx} name={cato} value={cato}>{cato}</MenuItem>
                      ))} 
                    </Select>
                  </FormControl>
                  )
                })
              }
            <Typography sx={{ padding: "10px", fontWeight: "600" }}>
              Product Image
            </Typography>
            <hr />
            <div style={{ display: "flex",flexDirection:'column', flexWrap: "wrap", padding: "12px" }}>
            <div style={{display:"flex",flexDirection:'row', flexWrap:'wrap', padding:'10px'}}>
                {
                  image.map((im) => (
                    <img
                    src={`${API}/image/photo/${im}`}
                    alt="sourceig"
                    key={im}
                    style={{padding:'5px'}}
                    height="150px"
                    width="250px"
                  />
                  ))
                }
            </div>
              <label htmlFor="contained-button-file">
              <input
                  style={{ display: "none" }}
                  onChange={handleProductImg}
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                //   sx={{ margin: "20px auto" }}
                >
                  Upload
                </Button>
              </label>
            </div>
              
              <Button
                variant="contained"
                sx={{ margin: "20px auto", width: "90%" }}
                onClick={clickSubmit}
                startIcon={loading ? <CircularProgress size={25} color="inherit" /> : <SaveIcon />}
              >
                SAVE & PUBLISH
              </Button>
            </div>
          </TableContainer>
        </div>
        </Header>
    )
}

export default AddProducts;
