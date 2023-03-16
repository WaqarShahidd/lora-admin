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
      render: (rowData) => moment(rowData).format("DD/MM/YYYY"),
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
      <button onClick={() => console.log(childrenData)}>cc</button>
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

const Parents = () => {
  const dispatch = useDispatch();
  const [childrenData, setchildrenData] = useState([]);
  const [paymentData, setpaymentData] = useState([]);
  const [parentName, setparentName] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getAssignor());
  }, []);

  const { assignor, getLoading } = useSelector((state) => state.assignor);

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Full Name", field: "name" },
    { title: "Email", field: "email", flex: 0.75 },
    { title: "Max Assignee", field: "maxAssignee", editable: false },
    {
      title: "Expiry Date",
      field: "expiryDate",
      render: (rowData) => moment(rowData).format("DD/MM/YYYY"),
      editable: false,
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
  ];

  const navigate = useNavigate();
  const handleChange = () => {
    navigate("/form/parent");
  };

  const [modalState, setmodalState] = useState(false);
  const [paymentModalState, setpaymentModalState] = useState(false);

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
            onRowDelete: null,
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                console.log(updatedRow);
                dispatch(
                  updateAssignor(
                    updatedRow.id,
                    updatedRow.name,
                    updatedRow.email
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
