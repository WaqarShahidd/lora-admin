import axios from "axios";
import { BASE_URL } from "../../constants/config";

// Parent

export const login =
  (email = "", password = "", question = "", answer = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "loginRequest",
      });
      const { data } = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
        question: question,
        answer: answer,
      });
      dispatch({
        type: "loginSuccess",
        payload: data,
      });
      localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
      dispatch({
        type: "loginFailure",
        payload: error,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  try {
    dispatch({
      type: "logoutRequest",
    });

    dispatch({
      type: "logoutSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error,
    });
  }
};
