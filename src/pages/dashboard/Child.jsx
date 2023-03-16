import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, useTheme, Box } from "@mui/material";
import { getAssignee, updateAssignee } from "../../redux/dispatchers/assignee";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import Header from "../../components/Header";
import { tokens } from "../../constants/theme";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Child = () => {
  const dispatch = useDispatch();
  const defaultMaterialTheme = createTheme();
  const empList = [
    { id: 1, fullName: "Jon", email: "email@email.com", username: "User" },
    { id: 2, fullName: "Cersei", email: "email@email.com", username: "User" },
    { id: 3, fullName: "Jaime", email: "email@email.com", username: "User" },
    { id: 4, fullName: "Arya", email: "email@email.com", username: "User" },
  ];
  const [data, setData] = useState(empList);
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    { title: "Gender", field: "gender" },
    { title: "Color", field: "color" },
    {
      title: "Description",
      field: "description",
      cellStyle: {
        width: 20,
        maxWidth: 100,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    { title: "Username", field: "userName" },
    { title: "Parent ID", field: "parentId", editable: false },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getAssignee());
  }, []);

  const { assignee } = useSelector((state) => state.ass);

  const [deleted, setdeleted] = useState(false);

  const DeleteAssignee = (id) => {
    setdeleted(false);
    let token = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}/deleteChild?childId=${id}`, {
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
      dispatch(DeleteAssignee(oldData.id));
      if (deleted) {
        resolve();
        dispatch(getAssignee());
      } else {
        reject();
      }
    });

  const navigate = useNavigate();
  const handleChange = () => {
    navigate("/form/child");
  };

  return (
    <Box m="18px" sx={{ pb: "20px", ml: "42px", mr: "0px" }}>
      <Header title="Assignees" subtitle="Children" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiTable-root": {
            border: "none",
          },
          "& .MuiTable-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiTable-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiTable-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiTable-footerContainer": {
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
          title="Assignee Data"
          data={
            assignee ? Object.values(assignee)?.map((val) => ({ ...val })) : []
          }
          columns={columns}
          editable={{
            onRowAdd: null,
            onRowDelete: handleDeleteRow,
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                console.log(updatedRow);
                dispatch(
                  updateAssignee(
                    updatedRow.name,
                    updatedRow.age,
                    updatedRow.gender,
                    updatedRow.color,
                    updatedRow.description,
                    updatedRow.url,
                    updatedRow.id
                  )
                );
                setTimeout(() => {
                  dispatch(getAssignee());
                  resolve();
                }, 2000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            sorting: true,
            defaultSort: "asc",
          }}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Add assignee",
              onClick: handleChange,
              isFreeAction: true,
            },
          ]}
          style={{ width: "95%" }}
          addRowPosition="never"
        />
      </Box>
    </Box>
  );
};

export default Child;
