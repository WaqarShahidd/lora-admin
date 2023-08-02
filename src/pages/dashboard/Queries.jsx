import { Box, createTheme, ThemeProvider, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { BASE_URL } from "../../constants/config";
import axios from "axios";
import Header from "../../components/Header";
import { tokens } from "../../constants/theme";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Queries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      title: "ID",
      field: "id",
      editable: false,
    },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    {
      title: "Message",
      field: "message",
      cellStyle: {
        width: 20,
        maxWidth: 100,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  ];

  const [allContactUs, setallContactUs] = useState([]);

  const GetQueries = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/contactus/getAllContactUs`, {
        headers: {
          Authorization: `token ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setallContactUs(res.data.contactus);
      })
      .catch((e) => {
        console.log(`error ${e}`);
      });
  };

  useEffect(() => {
    GetQueries();
  }, []);

  return (
    <Box m="18px" sx={{ pb: "20px", ml: "42px", mr: "0px" }}>
      <Header title="Queries" />
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
          title="Queries"
          data={allContactUs ? allContactUs : []}
          columns={columns}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          style={{ width: "95%" }}
        />
      </Box>
    </Box>
  );
};

export default Queries;
