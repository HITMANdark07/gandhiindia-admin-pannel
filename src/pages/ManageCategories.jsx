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
import CircularProgress from "@mui/material/CircularProgress";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import makeToast from "../Toaster";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { createCategory, getCategorylist } from "../api/inventory";
import { API } from "../config";

const ManageCategories = (props) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [slug, setSlug] = useState("");
  const [showImage, setShowImage] = useState("");
  const [image, setImage] = useState(null);
  const getCategories = () => {
    getCategorylist()
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch((err) => {
        makeToast("error", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getCategories();
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
  const handleSubmit = (event) => {
    setAddLoading(true);
    event.preventDefault();
    const data = new FormData();
    data.set('name',title);
    data.set('slug', slug);
    data.set('description',description);
    data.set('photo',image);
    console.log(data);
    createCategory(data).then(response => {
        if(response._id){
            makeToast("success",`${title}, Category Created`);
            setTitle("");
            setDescription("");
            setSlug("");
            setImage(null);
            getCategories();
        }else{
            makeToast("error",response.error);
        }
        setAddLoading(false);
    }).catch(err => {
        console.log(err);
    }) 
  };
  return (
    <Header>
      <h2 style={{ textAlign: "center" }}>CREATE CATEGORY</h2>
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
          label="Category Description"
          name="description"
        />
        <div style={{display:'flex',flexDirection:'column'}}>
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
          {addLoading ? "ADDING..." : "ADD"} CATEGORY
        </Button>
      </Box>

      {category.length > 0 && (
        <h2 style={{ textAlign: "center" }}>CATEGORIES</h2>
      )}
      {loading && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <CircularProgress />
        </div>
      )}
      <div style={{ maxWidth: "700px", margin: " 0 auto" }}>
        {category.map((cat, idx) => (
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
                  props.history.push(`/manage-category/${cat._id}`)
                }
              ></Button>
              <Avatar alt={cat.name} src={`${API}/category/photo/${cat._id}`} />
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

export default connect(null)(withRouter(ManageCategories));
