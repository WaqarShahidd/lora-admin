import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  ThemeProvider,
  createTheme,
  useTheme,
  Box,
  Tooltip,
  IconButton,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const Parents = () => {
  const dispatch = useDispatch();

  const [isInEditMode, setisInEditMode] = useState(false);

  const [selectionModel, setSelectionModel] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getAssignor());
  }, []);

  const { assignor, getLoading } = useSelector((state) => state.assignor);

  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    setSelectionModel([]);
    console.log("Delete row:", id);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleEditRowModelChange = (model) => {
    console.log("Edit rows:", model);
  };

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Full Name", field: "name", editable: true },
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
      render: (rowData) => rowData.children.map((i) => i.name),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return isInEditMode ? (
          <>
            <Tooltip title="Save">
              <IconButton
                onClick={() => {
                  console.log(params.row, "save");
                  setisInEditMode(false);
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton
                onClick={() => {
                  console.log(params.row.id);
                  setisInEditMode(false);
                }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <div>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  handleEdit(params.row);
                  setisInEditMode(!isInEditMode);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px" sx={{ ml: "42px", mr: "42px" }}>
      <Header title="Assignors" subtitle="Parents" />
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
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Assignor Data"
            data={
              assignor
                ? Object.values(assignor)?.map((val) => ({ ...val }))
                : []
            }
            columns={columns}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  console.log(newRow);
                  dispatch(
                    addAssignor(newRow.fullName, newRow.email, newRow.username)
                  );
                  setTimeout(() => {
                    dispatch(getAssignor());
                    resolve();
                  }, 2000);
                }),
              // onRowDelete: (selectedRow) =>
              //   new Promise((resolve, reject) => {
              //     const index = selectedRow.tableData.id;
              //     console.log(selectedRow.id);
              //     setTimeout(() => {
              //       resolve();
              //     }, 2000);
              //   }),
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  console.log(oldRow);
                  dispatch(
                    updateAssignor(
                      updatedRow.id,
                      updatedRow.fullName === ""
                        ? oldRow.fullName
                        : updatedRow.fullName,
                      updatedRow.email === "" ? oldRow.email : updatedRow.email
                    )
                  );
                  const index = oldRow.tableData.id;
                  const updatedRows = [...data];
                  updatedRows[index] = updatedRow;
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
          />
        </ThemeProvider> */}
        <DataGrid
          rows={assignor ? assignor : []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectionModel}
          editMode="row"
          onEditRowModelChange={handleEditRowModelChange}
        />
      </Box>
    </Box>
  );
};

export default Parents;
