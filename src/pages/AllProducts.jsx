import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Header from "../component/Header";
import Paper  from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormControl from "@mui/material/FormControl";
import TableRow from "@mui/material/TableRow";
import Switch from '@mui/material/Switch';
import { getProducts, updateProduct } from "../api/inventory";
import { API } from "../config";
import Avatar from "@mui/material/Avatar";
import { withRouter } from "react-router-dom";
import makeToast from "../Toaster";

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

const AllProducts = ({history}) => {
  const [products, setProducts] = React.useState([]);
  const getProduct = () => {
    getProducts().then((response) => {
      setProducts(response);
    });
  };
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const rep = getProduct();
    return () => rep;
  }, []);
  const filteredProducts = products.filter((pro) => {
      if(loading){
          return pro.status===1
      }else{
          return pro.status===0;
      }
  })
  return (
    <Header>
        <h1 style={{textAlign:"center"}}>ALL PRODUCTS <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
          <span>{!loading ? (
              <span style={{
                  fontSize:"16px",
                  background:"red",
                  color:"white",
                  padding:'5px',
                  borderRadius:'5px'
              }}>UNDER REVIEW</span>
          ): (
              <span style={{
                fontSize:"16px",
                background:"green",
                color:"white",
                padding:'5px',
                borderRadius:'5px'
            }}>LIVE</span>
          )}</span>
          </h1>
      <TableContainer component={Paper} style={{width:'90%', margin:'0 auto'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Thumbnail</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>status</StyledTableCell>
              <StyledTableCell>sold</StyledTableCell>
              <StyledTableCell>price</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((pro) => (
              <StyledTableRow key={pro._id}>
                <StyledTableCell>
                  <Avatar
                    alt={pro.name}
                    src={`${API}/image/photo/${pro.photo[0]}`}
                  />
                </StyledTableCell>
                <StyledTableCell>{pro.name}</StyledTableCell>
                <StyledTableCell>
                <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Seller</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Seller"
                  value={pro.status}
                  onChange={() => {
                      updateProduct(pro._id,{...pro,status:pro.status===0 ? 1 : 0}).then((response => {
                          makeToast("success",pro.name+" updated successfully");
                          getProduct();
                      })).catch(err => {
                          console.log(err);
                      })
                  }}
                >
                  <MenuItem value={0} key={0}>0 (status)</MenuItem>
                  <MenuItem value={1} key={1}>1 (status)</MenuItem>
                </Select>
              </FormControl>
                </StyledTableCell>
                <StyledTableCell>{pro.sold}</StyledTableCell>
                
                <StyledTableCell>₹{pro.price}/-</StyledTableCell>
                <StyledTableCell>
                    <VisibilityIcon  style={{cursor:'pointer'}} onClick={() => {
                        history.push(`/update-product/${pro._id}`)
                    }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
                <StyledTableCell colSpan={6}>
                    Number of Products: {filteredProducts.length}
                </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Header>
  );
};

export default withRouter(AllProducts);
