import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, useTheme, Box } from "@mui/material";
import { getAssignee, updateAssignee } from "../../redux/dispatchers/assignee";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import Header from "../../components/Header";
import { tokens } from "../../constants/theme";

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
    { title: "Description", field: "description" },
    { title: "Username", field: "userName" },
    { title: "Parent ID", field: "parentId", editable: false },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getAssignee());
  }, []);

  const { assignee } = useSelector((state) => state.ass);

  const DeleteAssignee = (id) => {
    let token = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}/deleteChild?childId=${id}`, {
        headers: {
          Authorization: `token ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(`delete error ${e}`);
      });
  };

  return (
    <Box m="20px" sx={{ ml: "42px", mr: "42px" }}>
      <Header title="Assignors" subtitle="Parents" />
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
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Assignor Data"
            data={
              assignee
                ? Object.values(assignee)?.map((val) => ({ ...val }))
                : []
            }
            columns={columns}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  console.log(newRow);
                  dispatch();
                  setTimeout(() => {
                    dispatch(getAssignee());
                    resolve();
                  }, 2000);
                }),
              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  dispatch(DeleteAssignee(selectedRow.id));
                  setTimeout(() => {
                    dispatch(getAssignee());
                    resolve();
                  }, 2000);
                }),
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
            }}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default Child;
