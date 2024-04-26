import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  ThemeProvider,
  createTheme,
  useTheme,
  Box,
  Tooltip,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignor,
  getAssignor,
  updateAssignor,
} from "../../redux/dispatchers/assignor";
import moment from "moment";
import { tokens } from "../../constants/theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ModalTable = ({ childrenData, parent }) => {
  const modalColumns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        // p: 4,
      }}
    >
      <Box
        // m="40px 0 0 0"
        // height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title={`${parent}'s Assignees`}
          data={
            childrenData
              ? Object.values(childrenData)?.map((val) => ({ ...val }))
              : []
          }
          columns={modalColumns}
        />
      </Box>
    </Box>
  );
};

const PaymentModalTable = ({ childrenData, parent }) => {
  const modalColumns = [
    { title: "ID", field: "id" },
    { title: "Amount", field: "amount" },
    { title: "Currency", field: "currency" },
    {
      title: "Expiry",
      field: "expiry",
      render: (rowData) => (
        <Typography>{moment(rowData.expiry).format("DD/MM/YYYY")}</Typography>
      ),
    },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        // p: 4,
      }}
    >
      <Box
        // m="40px 0 0 0"
        // height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title={`${parent}'s Billing History`}
          data={
            childrenData
              ? Object.values(childrenData)?.map((val) => ({ ...val }))
              : []
          }
          columns={modalColumns}
        />
      </Box>
    </Box>
  );
};

const ResetPasswordModal = ({ id, setresetModalState }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [password, setpassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const [showPass, setshowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState("");

  const handleClickShowPassword = () => setshowPass((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setshowConfirmPass((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    let token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}/adminResetPasswordParent`,
        {
          id: id,
          password: password,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setresetModalState(false);
      })
      .catch((e) => {
        console.log(`reset error ${e}`);
      });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        // p: 4,
      }}
    >
      <Box
        // m="40px 0 0 0"
        // height="75vh"
        sx={{
          padding: "50px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Reset Password
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          type={showPass ? "text" : "password"}
          label="Password"
          value={password}
          name="assigneePass"
          sx={{
            "& .MuiInputLabel-root": {
              color: colors.primary[100],
            },
            "& .MuiInput-underline": {
              borderBottomColor: colors.primary[100],
            },
            "& .MuiInput-label": {
              color: "#f00",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setpassword(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <Box
          display="flex"
          justifyContent="center"
          mt="20px"
          sx={{ width: "100%" }}
        >
          <Button
            onClick={handleReset}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Parents = () => {
  const dispatch = useDispatch();
  const [childrenData, setchildrenData] = useState([]);
  const [paymentData, setpaymentData] = useState([]);
  const [parentName, setparentName] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [parentId, setparentId] = useState("");

  useEffect(() => {
    dispatch(getAssignor());
  }, []);

  const { assignor, getLoading } = useSelector((state) => state.assignor);

  const [expiryDate, setexpiryDate] = useState("");

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Full Name", field: "name" },
    { title: "Email", field: "email", flex: 0.75 },
    { title: "Max Assignee", field: "maxAssignee", editable: false },
    {
      title: "Expiry Date",
      field: "expiryDate",
      render: (rowData) => (
        <Typography>
          {moment(rowData.expiryDate).format("DD/MM/YYYY")}
        </Typography>
      ),
      editComponent: (props) => (
        <input
          type="date"
          value={moment(props.value).format("YYYY-MM-DD")}
          onChange={(e) => props.onChange(e.target.value)}
          style={{
            backgroundColor: "transparent",
            height: "50px",
            borderRadius: "8px",
            padding: "10px",
            border: "1px solid #565656",
          }}
        />
      ),
    },
    {
      title: "Children",
      render: (rowData) => (
        <IconButton
          onClick={() => {
            setmodalState(true);
            setchildrenData(rowData.children);
            setparentName(rowData.name);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      title: "Payments",
      render: (rowData) => (
        <IconButton
          onClick={() => {
            setpaymentModalState(true);
            setpaymentData(rowData.payments);
            setparentName(rowData.name);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      title: "Reset Password",
      render: (rowData) => (
        <IconButton
          onClick={() => {
            setresetModalState(true);
            setparentId(rowData.id);
            console.log(rowData.id);
          }}
        >
          <LockResetIcon />
        </IconButton>
      ),
    },
  ];

  const navigate = useNavigate();
  const handleChange = () => {
    navigate("/form/parent");
  };

  const [modalState, setmodalState] = useState(false);
  const [paymentModalState, setpaymentModalState] = useState(false);
  const [resetModalState, setresetModalState] = useState(false);

  const [deleted, setdeleted] = useState(false);

  const DeleteAssignor = (id) => {
    setdeleted(false);
    let token = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}/deleteParent?parentId=${id}`, {
        headers: {
          Authorization: `token ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setdeleted(true);
      })
      .catch((e) => {
        console.log(`delete error ${e}`);
        setdeleted(false);
      });
  };

  const handleDeleteRow = (oldData) =>
    new Promise((resolve, reject) => {
      DeleteAssignor(oldData.id);
      if (deleted) {
        resolve();
        dispatch(getAssignor());
      } else {
        reject();
      }
    });

  return (
    <Box m="20px" sx={{ ml: "42px", mr: "42px" }}>
      <Header title="Assignors" subtitle="Parents" />

      <Modal open={modalState} onClose={() => setmodalState(false)}>
        <ModalTable childrenData={childrenData} parent={parentName} />
      </Modal>
      <Modal
        open={paymentModalState}
        onClose={() => setpaymentModalState(false)}
      >
        <PaymentModalTable childrenData={paymentData} parent={parentName} />
      </Modal>
      <Modal open={resetModalState} onClose={() => setresetModalState(false)}>
        <ResetPasswordModal
          id={parentId}
          setresetModalState={setresetModalState}
        />
      </Modal>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Assignor Data"
          data={
            assignor ? Object.values(assignor)?.map((val) => ({ ...val })) : []
          }
          columns={columns}
          editable={{
            onRowAdd: null,
            onRowDelete: handleDeleteRow,
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                dispatch(
                  updateAssignor(
                    updatedRow.id,
                    updatedRow.name,
                    updatedRow.email,
                    updatedRow.image,
                    updatedRow.expiryDate
                  )
                );
                setTimeout(() => {
                  dispatch(getAssignor());
                  resolve();
                }, 2000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Add task",
              onClick: handleChange,
              isFreeAction: true,
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Parents;
