export const loginReducer = (state = {}, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return {
          ...state,
          loading: true,
          success:false,
          error:null,
          currUser:null,
        };
      case "LOGIN_SUCCESSFUL":
        return {
          ...state,
          loading: false,
          success: true,
          error:null,
          currUser: action.payload
        };
      case "LOGIN_FAILED":
        return {
          ...state,
          loading: false,
          success:false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  