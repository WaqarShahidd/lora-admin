import axios from "axios";
import { BASE_URL } from "../../constants/config";

// Parent Flow

export const createTask =
  (
    name = "",
    type = "",
    task = "",
    time = false,
    timeAllowed = "",
    assignedToId = "",
    desc = "",
    date = "",
    month = ""
  ) =>
  async (dispatch) => {
    let token = localStorage.getItem("token");
    console.log(date, month);
    try {
      dispatch({
        type: "createTaskRequest",
      });
      const { data } = await axios.post(
        `${BASE_URL}/createTask`,
        {
          name: name,
          type: type,
          task: task,
          time: time,
          timeAllowed: timeAllowed,
          assignedToId: assignedToId,
          description: desc,
          date: date,
          month: month,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      dispatch({
        type: "createTaskSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "createTaskFailure",
        payload: error,
      });
    }
  };

export const updateTaskStatus =
  (id, status = "") =>
  async (dispatch) => {
    let token = localStorage.getItem("token");
    try {
      dispatch({
        type: "updateTaskRequest",
      });
      const { data } = await axios.post(
        `${BASE_URL}/updateTaskStatus`,
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      dispatch({
        type: "updateTaskSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "updateTaskFailure",
        payload: error.response,
      });
    }
  };

export const clearSuccess = () => async (dispatch) => {
  try {
    dispatch({
      type: "clearSuc",
    });
  } catch (error) {}
};

export const getTask = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  try {
    dispatch({
      type: "getTaskRequest",
    });
    const { data } = await axios.get(`${BASE_URL}/getTask`, {
      headers: {
        Authorization: `token ${JSON.parse(token)}`,
      },
    });
    dispatch({
      type: "getTaskSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getTaskFailure",
      payload: error,
    });
  }
};
