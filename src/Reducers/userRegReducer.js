export const userRegReducer = (
  state = { success: false, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case "REGISTRATION_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
    case "REGISTRATION_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { Users: [] }, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        Users: action.payload,
        loading: false,
        error: null,
      };
    case "GET_USERS_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const removeUserReducer = (
  state = { removedLoading: false, success: false, removedError: null },
  action
) => {
  switch (action.type) {
    case "REMOVE_USER_REQUEST":
      return {
        ...state,
        removedLoading: true,
        success: false,
        removedError: null,
      };
    case "REMOVE_USER_SUCCESS":
      return {
        ...state,
        removedLoading: false,
        success: true,
        removedError: null,
      };
    case "REMOVE_USER_FAILED":
      return {
        ...state,
        removedLoading: false,
        success: false,
        removedError: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const userAlreadyExistsReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case "ALREADY_EXISTS_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "ALREADY_EXISTS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case "ALREADY_EXISTS_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const updatePasswordReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case "UPDATE_PASSWORD_REQUEST":
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case "UPDATE_PASSWORD_SUCCESSFUL":
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case "UPDATE_PASSWORD_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case "RESET_UPDATE_PASSWORD":
      return {
        loading: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
};

export const getUserReducer = (
  state = { User: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case "GET_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        User: action.payload,
        loading: false,
        error: null,
      };
    case "GET_USER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state
  }
};

