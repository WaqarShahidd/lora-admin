import { Box, createTheme, ThemeProvider, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTask } from "../../redux/dispatchers/tasks";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { BASE_URL } from "../../constants/config";
import axios from "axios";
import Header from "../../components/Header";
import { tokens } from "../../constants/theme";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Task = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      field: "id",
      editable: false,
    },
    { title: "Task Type", field: "type" },
    { title: "Task", field: "task" },
    { title: "Task Name", field: "name" },
    {
      title: "Task Status",
      field: "status",
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "pending"
                ? "#8d5c0a"
                : access === "assigned"
                ? "#a6a6a6"
                : access === "stopped"
                ? "#a73215"
                : "#0a7f00"
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      title: "Time",
      field: "timeAllowed",
    },
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
    { title: "Assignee ID", field: "assignedToId" },
  ];

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const { taskData } = useSelector((state) => state.task);

  const DeleteTask = (id) => {
    let token = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}/deleteTask?taskId=${id}`, {
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
  const UpdateTask = (
    id,
    type,
    task,
    status,
    time,
    desc,
    name,
    timeAllowed,
    ass,
    date,
    month
  ) => {
    let token = localStorage.getItem("token");

    axios
      .post(
        `${BASE_URL}/updateTask`,
        {
          name: name,
          type: type,
          task: task,
          time: time,
          timeAllowed: timeAllowed,
          assignedToId: ass,
          description: desc,
          date: date,
          month: month,
          id: id,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(getTask());
      })
      .catch((e) => {
        console.log(`delete error ${e}`);
      });
  };

  const handleChange = () => {
    navigate("/form/task");
  };

  return (
    <Box m="18px" sx={{ pb: "20px", ml: "42px", mr: "0px" }}>
      <Header title="Tasks" />
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
          title="Task Data"
          data={
            taskData ? Object.values(taskData)?.map((val) => ({ ...val })) : []
          }
          columns={columns}
          editable={{
            onRowAdd: null,
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                DeleteTask(selectedRow.id);
                setTimeout(() => {
                  dispatch(getTask());
                  resolve();
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                UpdateTask(
                  updatedRow.id,
                  updatedRow.type,
                  updatedRow.task,
                  updatedRow.status,
                  updatedRow.time,
                  updatedRow.description,
                  updatedRow.name,
                  updatedRow.timeAllowed,
                  updatedRow.assignedToId,
                  updatedRow.date,
                  updatedRow.month
                );
                setTimeout(() => {
                  resolve();
                  dispatch(getTask());
                }, 2000);
              }),
          }}
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: "Add task",
              onClick: handleChange,
              isFreeAction: true,
            },
          ]}
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

export default Task;
