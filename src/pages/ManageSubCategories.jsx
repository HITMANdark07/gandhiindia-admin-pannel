import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../component/Header";
import Button from "@mui/material/Button";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import makeToast from "../Toaster";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { createSubCategory, getSubCategorylist, getCategories, deleteSubCategory } from "../api/inventory";
import { API } from "../config";

const ManageSubCategories = (props) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [slug, setSlug] = useState("");
  const [showImage, setShowImage] = useState("");
  const [image, setImage] = useState(null);
  const getSubCategories = () => {
    getSubCategorylist()
      .then((data) => {
        setSubCategory(data);
        setLoading(false);
      })
      .catch((err) => {
        makeToast("error", err);
        setLoading(false);
      });
  };
  const getCategory = () => {
      getCategories().then(data =>{
          setCategories(data);
          setCategory(data[0]._id);
      }).catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getSubCategories();
    getCategory();
  }, []);
  const handleChange = (event, name) => {
    switch (name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "slug":
        setSlug(event.target.value);
        break;
      default:
    }
  };
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
      makeToast("warning", "please select your file");
    }
  };
  const deleteSubCat = (id) => {
    deleteSubCategory(id).then(response => {
      makeToast("success","Subcategory deleted");
      getSubCategories();
    }).catch((err) => {
      makeToast("error",err);
    })
  }
  const handleSubmit = (event) => {
    setAddLoading(true);
    event.preventDefault();
    const data = new FormData();
    data.set("name", title);
    data.set("slug", slug);
    data.set("category",category);
    data.set("description", description);
    data.set("photo", image);
    createSubCategory(data)
      .then((response) => {
        if (response._id) {
          makeToast("success", `${title} Created`);
          setTitle("");
          setDescription("");
          setSlug("");
          setImage(null);
          getSubCategories();
        } else {
          makeToast("error", response.error);
        }
        setAddLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Header>
      <h2 style={{ textAlign: "center" }}>CREATE SUB-CATEGORY</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
        style={{ maxWidth: "700px", margin: " 0 auto" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="title"
          value={title}
          onChange={(e) => handleChange(e, "title")}
          label="Title"
          id="title"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={slug}
          onChange={(e) => handleChange(e, "slug")}
          id="slug"
          label="Enter Slug"
          name="Enter Slug"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={description}
          onChange={(e) => handleChange(e, "description")}
          id="description"
          label="Sub-Category Description"
          name="description"
        />
        <FormControl sx={{ marginTop: "20px" }} fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            value={category}
            onChange={(e) => {
                setCategory(e.target.value);
            }}
        >
            {categories.map((cato) => (
            <MenuItem key={cato._id} value={cato._id}>{cato.name}</MenuItem>
            ))}
        </Select>
        </FormControl>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {showImage && (
            <img
              src={showImage}
              alt="sourceig"
              style={{ padding: "5px" }}
              height="150px"
              width="250px"
            />
          )}
          {addLoading && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <CircularProgress />
            </div>
          )}
          <label htmlFor="contained-button-file">
            <input
              style={{ display: "none" }}
              onChange={handleProductImg}
              accept="image/*"
              id="contained-button-file"
              type="file"
            />
            <Button
                sx={{marginTop:"20px"}}
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Upload
            </Button>
          </label>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={addLoading}
          sx={{ mt: 3, mb: 2 }}
          startIcon={<AddBusinessIcon />}
        >
          {addLoading ? "ADDING..." : "ADD"} SUB-CATEGORY
        </Button>
      </Box>

      {subcategory.length > 0 && (
        <h2 style={{ textAlign: "center" }}>SUB-CATEGORIES</h2>
      )}
      {loading && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <CircularProgress />
        </div>
      )}
      <div style={{ maxWidth: "700px", margin: " 0 auto", marginBottom:"40px" }}>
        {subcategory.map((cat, idx) => (
          <Accordion key={cat._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel${idx}a-header`}
            >
              <Typography>
                <b>{cat.name}</b>
              </Typography>
              <Button
                variant="inherit"
                startIcon={<EditIcon />}
                onClick={() =>
                  props.history.push(`/update-sub-category/${cat._id}`)
                }
              ></Button>
              <Avatar alt={cat.name} src={`${API}/sub-category/photo/${cat._id}?${Date.now()}`} />
              <Button
                variant="inherit"
                startIcon={<DeleteForeverIcon />}
                onClick={() => {
                  deleteSubCat(cat._id);
                }}
              ></Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{cat.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Header>
  );
};

export default connect(null)(withRouter(ManageSubCategories));
