import { getImageListItemBarUtilityClass } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../constants/config";

// Parent Flow

export const addAssignor =
  (name = "", email = "", password = "", image = "") =>
  async (dispatch) => {
    let token = localStorage.getItem("token");
    try {
      dispatch({
        type: "addAssignorRequest",
      });
      const { data } = await axios.post(
        `${BASE_URL}/addParent`,
        {
          name: name,
          email: email,
          password: password,
          image: image,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      );
      dispatch({
        type: "createAssignorSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "createAssignorFailure",
        payload: error,
      });
    }
  };

export const clearSuccAss = () => async (dispatch) => {
  try {
    dispatch({
      type: "clearAssignorSuccess",
    });
  } catch (error) {}
};

export const updateAssignor =
  (id = "", name = "", email = "", image = "", expiryDate) =>
  async (dispatch) => {
    let token = localStorage.getItem("token");
    try {
      dispatch({
        type: "updateAssignorRequest",
      });
      const { data } = await axios.post(
        `${BASE_URL}/updateParent`,
        {
          id: id,
          name: name,
          email: email,
          image: image,
          expiryDate: expiryDate,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      );
      dispatch({
        type: "updateAssignorSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "updateAssignorFailure",
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

export const getAssignor = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  try {
    dispatch({
      type: "getAssignorRequest",
    });
    const { data } = await axios.get(`${BASE_URL}/getParent`, {
      headers: {
        Authorization: `token ${JSON.parse(token)}`,
      },
    });
    dispatch({
      type: "getAssignorSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAssignorFailure",
      payload: error,
    });
  }
};
