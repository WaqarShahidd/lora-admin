import axios from "axios";
import { BASE_URL } from "../../constants/config";

// Parent Flow

export const addAssignee =
  (
    name = "",
    age = "",
    parentId = "",
    gender = "",
    accomodation = "",
    color = "",
    description = "",
    url = "",
    username = ""
  ) =>
  async (dispatch) => {
    let token = localStorage.getItem("token");
    try {
      dispatch({
        type: "addAssigneeRequest",
      });
      const { data } = await axios.post(
        `${BASE_URL}/children/addChild`,
        {
          name: name,
          age: age,
          parentId: parentId,
          gender: gender,
          accomodation: accomodation,
          color: color,
          description: description,
          image: url,
          userName: username.toLowerCase(),
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      );
      dispatch({
        type: "createAssigneeSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "createAssigneeFailure",
        payload: error,
      });
    }
  };

export const clearSuccAss = () => async (dispatch) => {
  try {
    dispatch({
      type: "clearAssigneeSuccess",
    });
  } catch (error) {}
};

export const updateAssignee =
  (
    name = "",
    age = "",
    gender = "",
    color = "",
    description = "",
    url = "",
    parent = ""
  ) =>
  async (dispatch) => {
    let token = localStorage.getItem("token");
    try {
      dispatch({
        type: "updateAssigneeRequest",
      });
      const { data } = await axios.post(
        `${BASE_URL}/updateChild`,
        {
          name: name,
          age: age,
          gender: gender,
          color: color,
          description: description,
          image: url,
          id: parent,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      );
      dispatch({
        type: "updateAssigneeSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "updateAssigneeFailure",
        payload: error,
      });
    }
  };

export const clearSuccUpdateAss = () => async (dispatch) => {
  try {
    dispatch({
      type: "clearUpdAssSuccess",
    });
  } catch (error) {}
};

export const getAssignee = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  try {
    dispatch({
      type: "getAssigneeRequest",
    });
    const { data } = await axios.get(`${BASE_URL}/getChild`, {
      headers: {
        Authorization: `token ${JSON.parse(token)}`,
      },
    });
    dispatch({
      type: "getAssigneeSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAssigneeFailure",
      payload: error,
    });
  }
};
