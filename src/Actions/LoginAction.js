import Cookies from "js-cookie";
import axios from "axios";
export const LoginAction = (loginInfo,loginFunction) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const response = await axios.post("https://yumyard-server.cyclic.app/api/users/login",loginInfo);
    dispatch({ type: "LOGIN_SUCCESSFUL", payload: response.data });
    // Set cookie instead of localStorage
    Cookies.set("currUser", JSON.stringify(response.data));
    
   loginFunction();
  } catch (error) {
    dispatch({ type: "LOGIN_FAILED", payload: error });
  }
};

export const logoutAction = (logoutFunction) => (dispatch) => {
  // Remove cookie instead of localStorage
  Cookies.remove("currUser");
  
  window.location.href = '/login';
};