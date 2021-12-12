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
import { getCategories, getSubCategoriesbyCategory } from '../api/inventory';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const AddProducts = () => {

    const [categories, setCategories] = React.useState([]);
    const [subCategories, setSubCategories] = React.useState([]);
    const getSubCategories = (id) => {
        getSubCategoriesbyCategory({category:id}).then(subcat => {
            if(subcat.err){
                makeToast("error", subcat.err);
            }else{
                setSubCategories(subcat);
                setSubCategory(subcat[0]._id);
            }
        }).catch(err =>{
            console.log(err);
        })
    }
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
    },[]);
    React.useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      allCats();
    }, [allCats])
    const [seller, setSeller] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [subCategory, setSubCategory] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [regPrice, setRegPrice] =React.useState("");
    const [salePrice, setSalePrice] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState([]);
    const [showimage, setShowImage] = React.useState(
      "https://thumbs.dreamstime.com/b/product-text-made-wooden-cube-white-background-181800372.jpg"
    );
    const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
    const handleProductImg = (e) => {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && types.includes(selectedFile.type)) {
          setShowImage(URL.createObjectURL(selectedFile));
          setImage(selectedFile);
        } else {
          setImage(null);
        }
      } else {
        console.log("please select your file");
      }
    };
    const clickSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
      const data = {
        category:category,
        subCategory:subCategory,
        name:title,
        mrp:regPrice,
        price:salePrice,
        quantity:quantity, //
        image:image, //
        description: description,
        added_by:seller,
        status:1
      }
      console.log(data);
      makeToast("success","Running submit");
    //   createProduct(data).then(response => {
    //     if(response._id){
    //       setLoading(false);
    //       makeToast("success",`${response.name} product created`);
    //       setTitle("");
    //       setRegPrice("");
    //       setSalePrice("");
    //       setQuantity("");
    //       setFullDesc("");
    //       console.log(response);
    //     }else{
    //       setLoading(false);
    //       makeToast("error", response.err);
    //     }
    //   })
    
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
                  {/* {cat.map((cato) => ( */}
                  <MenuItem value="Seller01">Seller01</MenuItem>
                  <MenuItem value="Seller02">Seller02</MenuItem>
                  <MenuItem value="Seller03">Seller03</MenuItem>
                  <MenuItem value="Seller04">Seller04</MenuItem>
                  {/* ))} */}
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
            <Typography sx={{ padding: "10px", fontWeight: "600" }}>
              Product Image
            </Typography>
            <hr />
            <div style={{ display: "flex",flexDirection:'column', flexWrap: "wrap", padding: "12px" }}>
            <img
                  src={showimage}
                  alt="sourceig"
                  height="150px"
                  width="250px"
                />
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
              {/* <Typography
                sx={{ fontSize: "16px", padding: "5px", fontWeight: "600" }}
              >
                Specifications
              </Typography>
              <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Seller</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Clothing Design/ Style"
                  value={seller}
                  onChange={(e) => handleChange(e, "category")}
                >
                  {cat.map((cato) => (
                  <MenuItem value="Seller01">Seller01</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                   ))} 
                </Select>
              </FormControl> */}

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
