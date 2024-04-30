import axios from "axios";
import Cookies from "js-cookie";
export const userRegAction = (user) => async (dispatch) => {
  dispatch({ type: "REGISTRATION_REQUEST" });
  try {
    const response = await axios.post("https://yumyard-server.onrender.com/api/users/signup", user);

    dispatch({ type: "REGISTRATION_SUCCESS", payload: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: "REGISTRATION_FAILED", payload: error });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const response = await axios.get("https://yumyard-server.onrender.com/api/users/getusers");
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};
export const removeUser = (userId,adminAction) => async (dispatch) => {
  dispatch({ type: "REMOVE_USER_REQUEST" });


  try {
    const response = await axios.post("https://yumyard-server.onrender.com/api/users/removeusers", { userId });
    dispatch({ type: "REMOVE_USER_SUCCESS", payload: response.data });
    Cookies.remove("currUser");
    if(!adminAction){
      window.location.href = '/login'
    }
  } catch (error) {
    dispatch({ type: "REMOVE_USER_FAILED", payload: error });
  }
};
export const userAlreadyExistsAction = (user) => async (dispatch) => {
  dispatch({ type: "ALREADY_EXISTS_REQUEST" });
  try {
    const response = await axios.post("https://yumyard-server.onrender.com/api/users/alreadyexists", user);
    dispatch({ type: "ALREADY_EXISTS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ALREADY_EXISTS_FAILED", payload: error });
  }
};

export const updatePasswordAction = (info) => async (dispatch) => {
  dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

  try {
    const response = axios.post("https://yumyard-server.onrender.com/api/users/updatepassword", info);
    dispatch({ type: "UPDATE_PASSWORD_SUCCESSFUL" });
  } catch (error) {
    dispatch({ type: "UPDATE_PASSWORD_FAILED", payload: error });
  }
};

export const getUserByEmail = (email) => async (dispatch) => {
  dispatch({ type: "GET_USER_REQUEST" });

  try {
    const response = await axios.post("https://yumyard-server.onrender.com/api/users/getuserbyemail", email);
    dispatch({ type: "GET_USER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_FAILED", payload: error });
  }
};

