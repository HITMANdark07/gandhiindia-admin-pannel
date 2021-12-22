import React from "react";
import Header from "../component/Header";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import { withRouter } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import {API} from '../config';
import makeToast from "../Toaster";
import { moveToShipped, orderslist, updateStatus } from "../api/orders";
import { Button, MenuItem, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

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
const style={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ManageOrders() {
  const [orders, setOrders] = React.useState([]);
  const [open , setOpen] = React.useState(false);
  const [bulk, setBulk] = React.useState([]);
  const [showLoad, setShowLoad] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [skip, setSkip] = React.useState(0);
  const limit = 2;
  const getOrders = React.useCallback(() => {
    orderslist(limit,skip)
      .then((response) => {
        if (response.length===0) {
          setShowLoad(false);
          return;
        }
        setShowLoad(true);
        setOrders((prev) => [...prev,...response]);
      })
      .catch((err) => {
        console.log(err);
      });
  },[limit, skip]);
  const bulkShipped = React.useCallback((bulk) => {
    moveToShipped(bulk).then((response) => {
      if(response.error){
        makeToast("error", response.error);
      }
      if(response.message){
        makeToast("success", response.message);
        window.location.reload();
      }
    })
  },[]);
  const [photos,setPhotos] =React.useState([]);
  React.useEffect(() => {
    getOrders();
  }, [getOrders]);
  const handleClose = () => {
      setOpen(false);
  }
  return (
    <Header>
      <h1 style={{ textAlign: "center" }}>
        Manage Orders{" "}
        <Switch
          checked={loading}
          onChange={() => setLoading(!loading)}
          name="loading"
          color="primary"
        />
        {bulk.length>1 && <Button variant="contained" onClick={() => {bulkShipped(bulk)}} >MOVE TO SHIPPED</Button>}
      </h1>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Products
          </Typography>
          <div style={{margin:'8px', display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
            {photos.map((photo,idx) => (
                <img src={`${API}/image/photo/${photo.photo[0]}`} height={250} width={200} alt={photo.photo[0]} key={idx} />
            ))}
          </div>
        </Box>
      </Modal>
      
        <TableContainer
          component={Paper}
          style={{ width: "90%", margin: "0 auto" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {loading && <StyledTableCell>Select</StyledTableCell>}
                <StyledTableCell>Buyer Name</StyledTableCell>
                <StyledTableCell>Sellers</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>status</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order._id}>
                  {/* <StyledTableCell>
                    <Avatar
                      alt={pro.name}
                      src={`${API}/seller/kyc/photo/${pro._id}`}
                    />
                  </StyledTableCell> */}
                  {loading && <StyledTableCell><input type="checkbox" onChange={(event) => {
                    if(bulk.includes(order._id)){
                      let b = bulk.filter((bul) => bul!==order._id);
                      setBulk(b);
                    }else{
                      setBulk((prev) => [...prev, order._id])
                    }
                  }} /></StyledTableCell>}
                  <StyledTableCell>{order.address.fullName}</StyledTableCell>
                  <StyledTableCell>{order.sellers.map(s => s.name+", ")}</StyledTableCell>
                  <StyledTableCell>+91 {order.address.phone}</StyledTableCell>
                  <StyledTableCell>{order.address.address1 +" "+ order.address.city +" "+ order.address.state +" "+ order.address.pincode}</StyledTableCell>
                  <StyledTableCell>
                  <FormControl sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  value={order.status}
                  onChange={(event) => {
                      updateStatus(order._id, {status: event.target.value}).then((response) => {
                        if(response.error){
                          makeToast("error", response.error);
                        }else{
                          makeToast("success", "Updated Successfully");
                          window.location.reload();
                        }
                      }).catch((err) => {
                        console.log(err);
                      })
                  }}
                >
                  <MenuItem value="Not processed" >Not processed</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered" >Delivered</MenuItem>
                  <MenuItem value="Cancelled" >Cancelled</MenuItem>
                  <MenuItem value="Refunded" >Refunded</MenuItem>
                </Select>
              </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <VisibilityIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                          setOpen(true);
                          setPhotos(order.products);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{textAlign:"center", margin:"20px"}}>
          {showLoad && <Button variant="contained" onClick={() => setSkip(prev => prev+limit)} >LOAD MORE...</Button>}
        </div>
    </Header>
  );
}

export default withRouter(ManageOrders);
