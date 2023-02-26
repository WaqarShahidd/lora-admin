import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTask } from "../../redux/dispatchers/tasks";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { t } from "../../constants/data";
import { BASE_URL } from "../../constants/config";
import axios from "axios";

const Task = () => {
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
    { title: "Task Type", field: "type" },
    { title: "Task", field: "task" },

    { title: "Task Status", field: "status" },
    {
      title: "Time",
      field: "timeAllowed",
    },
    {
      title: "Description",
      field: "description",
    },
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
    console.log(
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
    );
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

  return (
    <div style={{ margin: "10px 15px" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title="Tasks"
          data={
            taskData ? Object.values(taskData)?.map((val) => ({ ...val })) : []
          }
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                console.log(newRow);

                setTimeout(() => {
                  resolve();
                }, 2000);
              }),
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
                console.log(
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
                }, 2000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default Task;
