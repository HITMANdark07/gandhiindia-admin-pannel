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
import Avatar from "@mui/material/Avatar";
import { withRouter } from "react-router-dom";
// import makeToast from "../Toaster";
import { API } from "../config";
import { listSeller, listSellerRequests } from "../api/seller";

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

function SellerPage({history}) {
  const [sellers, setSellers] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getSellers = () => {
    listSeller()
      .then((response) => {
        setSellers(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getKycRequests = () => {
    listSellerRequests()
      .then((response) => {
        setRequests(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getSellers();
    getKycRequests();
  }, []);
  return (
    <Header>
      <h1 style={{ textAlign: "center" }}>
        KYC REQUESTS{" "}
        <Switch
          checked={loading}
          onChange={() => setLoading(!loading)}
          name="loading"
          color="primary"
        />
        <span>
          {!loading ? (
            <span
              style={{
                fontSize: "16px",
                background: "red",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              UNDER REVIEW
            </span>
          ) : (
            <span
              style={{
                fontSize: "16px",
                background: "green",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              VERIFIED
            </span>
          )}
        </span>
      </h1>
      {!loading ? (
        <TableContainer
          component={Paper}
          style={{ width: "90%", margin: "0 auto" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>seller Photo</StyledTableCell>
                <StyledTableCell>Seller Name</StyledTableCell>
                <StyledTableCell>Seller Email</StyledTableCell>
                <StyledTableCell>Seller Phone</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((pro) => (
                <StyledTableRow key={pro._id}>
                  <StyledTableCell>
                    <Avatar
                      alt={pro.name}
                      src={`${API}/seller/kyc/photo/${pro._id}`}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{pro.name}</StyledTableCell>
                  <StyledTableCell>{pro.email}</StyledTableCell>
                  <StyledTableCell>{pro.phone}</StyledTableCell>

                  <StyledTableCell>
                    <VisibilityIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                          history.push(`/seller/verification/${pro._id}`)
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell colSpan={6}>
                  Number of Unverified KYC Requests: {requests.length}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer
          component={Paper}
          style={{ width: "90%", margin: "0 auto" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Seller Name</StyledTableCell>
                <StyledTableCell>Seller Email</StyledTableCell>
                <StyledTableCell>Seller Phone</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers.map((pro) => (
                <StyledTableRow key={pro._id}>
                  {/* <StyledTableCell>
                    <Avatar
                      alt={pro.name}
                      src={`${API}/seller/kyc/photo/${pro._id}`}
                    />
                  </StyledTableCell> */}
                  <StyledTableCell>{pro.name}</StyledTableCell>
                  <StyledTableCell>{pro.email}</StyledTableCell>
                  <StyledTableCell>{pro.phone}</StyledTableCell>

                  <StyledTableCell>
                    <VisibilityIcon
                      style={{ cursor: "pointer" }}
                      // onClick={() => {
                      //     history.push(`/update-product/${pro._id}`)
                      // }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell colSpan={6}>
                  Number of Unverified KYC Requests: {requests.length}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Header>
  );
}

export default withRouter(SellerPage);
