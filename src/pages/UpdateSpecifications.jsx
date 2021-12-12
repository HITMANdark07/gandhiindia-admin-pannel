import React from "react";
import Header from "../component/Header";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import makeToast from "../Toaster";
import { deleteSpecification, getAllSpecifications, getSpecificationById, getSubCategorylist, updateSpecification } from "../api/inventory";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function UpdateSpecification({history,match:{params:{specificationId}}}) {
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [specifications, setSpecification] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState("");
  const [subCategories, setSubCategories] = React.useState([]);
  const [options, setOPtions] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const getSpecs = () => {
      getAllSpecifications().then(response => {
          setSpecification(response);
      }).catch(err => {
          console.log(err);
      })
  }
  const getSpecById = (id) => {
      getSpecificationById(id).then(response => {
          if(response._id){
              setTitle(response.name);
              setOPtions(response.options);
              setSubCategory(response.subCategory);
              setLoading(false);
          }else{
              makeToast("error","Something went Wrong");
          }
      }).catch(err =>{
          console.log(err);
      })
  }
  const getSubCategories = () => {
    getSubCategorylist()
      .then((data) => {
        setSubCategories(data);
        setSubCategory(data[0]._id);
        setLoading(false);
      })
      .catch((err) => {
        makeToast("error", err);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getSpecById(specificationId);
    getSubCategories();
    getSpecs();
  }, [specificationId]);
  

  const handleChange = (event, name) => {
    switch (name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "option":
        setOPtions(event.target.value);
        break;
      default:
    }
  };
  const clickSubmit = () => {
      setLoading(true);
      const data = {
          name:title,
          options:options,
          subCategory:subCategory
      }
      updateSpecification(specificationId,data).then(response => {
          if(response._id){
              makeToast("success",response.name+" Specification Updated");
              getSpecs();
          }else{
              makeToast("error", response.error);
          }
          setLoading(false);
      }).catch((err) => {
          console.log(err);
          setLoading(false);
      })
  }
  const deleteSpec = (id) =>{
    deleteSpecification(id).then(response => {
        if(response._id){
            makeToast("success",response.name+" deleted");
            setTitle("");
            setOPtions("");
            getSpecs();
        }else{
            makeToast("error", "Something Went Wrong");
        }
    }).catch(err => {
        console.log(err);
    })
  }
  const showLoading = () => {
    loading && (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  };
  return (
    <>
      <Header >
      <div className="manageCategoryConatiner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            margin: "20px",
          }}
        >
          <TableContainer component={Paper}>
                <h2 style={{ padding: "5px" }}>Update Specification</h2>
              
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <TextField
                id="standard-basic"
                label="Specification Name"
                value={title}
                onChange={(e) => handleChange(e, "title")}
                variant="outlined"
                sx={{ margin: "20px" }}
              />
              <textarea style={{margin:"20px", padding:"10px", fontSize:"1rem"}} value={options} onChange={(e) => handleChange(e,'option')} placeholder="Options" rows={12} />
              <FormControl  fullWidth>
                <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sub-Category"
                    value={subCategory}
                    onChange={(e) => {
                        setSubCategory(e.target.value);
                    }}
                >
                    {subCategories.map((cato) => (
                    <MenuItem key={cato._id} value={cato._id}>{cato.name}</MenuItem>
                    ))}
                </Select>
                </FormControl>
              
              {showLoading()}
              <Button
                variant="contained"
                disabled={loading}
                onClick={clickSubmit}
                sx={{ margin: "20px auto", width: "90%" }}
                startIcon={<SaveIcon />}
              >
                SAVE
              </Button>
            </div>
          </TableContainer>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 6,
            margin: "20px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Options</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* ------------------------   table dumm data  ---------------------------------- */}
                {
                    specifications.map((spec) =>(
                        <StyledTableRow key={spec._id}>
                        <StyledTableCell component="th" scope="row">
                            {spec.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                        {spec.options}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <EditIcon style={{ cursor: "pointer" }} onClick={() => { history.push(`/update-specification/${spec._id}`);}} />{" "}
                            <DeleteForeverIcon style={{ cursor: "pointer" }} onClick={() => deleteSpec(spec._id)} />{" "}
                        </StyledTableCell>
                        </StyledTableRow>
                    ))
                }

                
                {/* ------------------------   table dumm data  ---------------------------------- */}
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" colSpan="3">
                    Number of Specification: {specifications.length}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      </Header>
    </>
  );
}

export default withRouter(UpdateSpecification);
