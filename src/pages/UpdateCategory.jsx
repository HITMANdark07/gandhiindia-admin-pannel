import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../component/Header";
import Button from "@mui/material/Button";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";
import makeToast from "../Toaster";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { getCategoryById, updateCategory } from "../api/inventory";
import { API } from "../config";

const UpdateCategory = ({match:{params:{categoryId}}}) => {
  const [title, setTitle] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [showImage, setShowImage] = useState("");
  const [image, setImage] = useState(null);
  const getCategory = useCallback((id) => {
    getCategoryById(id)
      .then((data) => {
        setTitle(data.name);
        setSlug(data.slug);
        setDescription(data.description);
        setShowImage(`${API}/category/photo/${data._id}?${Date.now()}`)
      })
      .catch((err) => {
        makeToast("error", err);
      });
  },[]);
  useEffect(() => {
    getCategory(categoryId);
  }, [getCategory,categoryId]);
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
    data.set("name", title);
    data.set("slug", slug);
    data.set("description", description);
    if(image){
      data.set("photo", image);
    }
    updateCategory(categoryId,data).then(response => {
        if(response.error){
            makeToast("error",response.error);
        }else{
            makeToast("success","Updated Successfully.");
        }
        setAddLoading(false);
        getCategory(categoryId);
    }).catch(err => {
        makeToast("error", err);
        setAddLoading(false);
    })
    // createCategory(data)
    //   .then((response) => {
    //     if (response._id) {
    //       makeToast("success", `${title}, Category Created`);
    //       setTitle("");
    //       setDescription("");
    //       setSlug("");
    //       setImage(null);
    //     } else {
    //       makeToast("error", response.error);
    //     }
    //     setAddLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <Header>
      <h2 style={{ textAlign: "center" }}>UPDATE CATEGORY</h2>
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
          {addLoading ? "UPDATING..." : "UPDATE"} CATEGORY
        </Button>
      </Box>
    </Header>
  );
};

export default connect(null)(withRouter(UpdateCategory));
