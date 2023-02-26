import * as React from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAssignor } from "../../redux/dispatchers/assignor";

export default function Test() {
  const { assignor, getLoading } = useSelector((state) => state.assignor);
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Full Name", field: "name", editable: true },
    { title: "Email", field: "email", editable: true },
    { title: "Max Assignee", field: "maxAssignee", editable: false },
    {
      title: "Expiry Date",
      field: "expiryDate",
      render: (rowData) => moment(rowData).format("DD/MM/YYYY"),
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Edit">
              <IconButton onClick={() => handleEdit(params.row)}>
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

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <button onClick={() => console.log(assignor)}>c</button>
      <button onClick={() => dispatch(getAssignor())}>c</button>
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
  );
}
