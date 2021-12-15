import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { getRequestDetails, verifySendMail } from "../api/seller";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import Header from "../component/Header";
import makeToast from "../Toaster";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import VerifiedIcon from '@mui/icons-material/Verified';
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css'
import { API } from "../config";
import TableHead from "@mui/material/TableHead";
import { Button } from "@mui/material";

function VerificationPage({
  history,
  match: {
    params: { requestId },
  },
}) {
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
  const [request, setRequest] = React.useState({
    name: "",
    email: "",
    phone: "",
    id: "",
  });

  const getDetails = React.useCallback(
    (id) => {
      getRequestDetails(id)
        .then((response) => {
          if (response._id) {
            setRequest({
              name: response.name,
              email: response.email,
              phone: response.phone,
              id: response._id,
            });
          } else {
            makeToast("error", "Something Went Wrong");
            history.goBack();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [history]
  );
  useEffect(() => {
    getDetails(requestId);
  }, [requestId, getDetails]);
  console.log(request);
  const styles={
      height:"250px",
      width:"200px"
  }
  const docStyle = {
      height:"150",
      width:"300px"
  }
  return (
    <Header>
      <TableContainer
        component={Paper}
        style={{ width: "90%", margin: "0 auto",marginBottom:"80px" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SELLER DETAILS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
                <StyledTableCell colSpan={6}>
                    <b>SELLER NAME: </b>{request.name}
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell colSpan={6}>
                    <b>SELLER EMAIL: </b>{request.email}
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell colSpan={6}>
                    <b>SELLER PHONE: </b>{request.phone}
                </StyledTableCell>
            </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                <b>SELLER PHOTO: </b>
                <Zoom>
                  <img
                    alt={request.name}
                    style={styles}
                    src={`${API}/seller/kyc/photo/${request.id}?${new Date()}`}
                  />
                  </Zoom>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                <b>SELLER SIGNATURE: </b>
                  <Zoom>
                  <img
                    alt={request.name}
                    style={docStyle}
                    src={`${API}/seller/kyc/signature/${request.id}?${new Date()}`}
                  />
                  </Zoom>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                <b>SELLER PAN CARD: </b>
                  <Zoom>
                  <img
                    alt={request.name}
                    style={docStyle}
                    src={`${API}/seller/kyc/pan/${request.id}?${new Date()}`}
                  />
                  </Zoom>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                <b>SELLER ID PROOF: </b>
                  <Zoom>
                  <img
                    alt={request.name}
                    style={docStyle}
                    src={`${API}/seller/kyc/id-proof/${request.id}?${new Date()}`}
                  />
                  </Zoom>
                </StyledTableCell>
              </StyledTableRow>
            <StyledTableRow></StyledTableRow>
            <StyledTableRow>
                
              <StyledTableCell colSpan={6}>
                <Button variant="contained" size="large"
                onClick={() => {
                    verifySendMail(request).then((response) => {
                        if(response.message){
                            makeToast("success",response.message);
                        }else{
                            makeToast("error",response.error);
                        }
                    })
                }}
                startIcon={<VerifiedIcon />}>VERIFY</Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Header>
  );
}

export default withRouter(VerificationPage);
