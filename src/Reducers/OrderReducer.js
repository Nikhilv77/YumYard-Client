export const orderReducer = (state = { order: { loading: false, success: false, error: null } }, action) => {
  switch (action.type) {
    case "ORDER_REQUEST":
      return {
        ...state,
        order: {
          ...state.order,
          loading: true,
          success: false,
          error: null,
        }
      };
    case "ORDER_SUCCESSFULL":
      return {
        ...state,
        order: {
          ...state.order,
          loading: false,
          success: true,
          error: null,
        }
      };
    case "ORDER_FAILED":
      return {
        ...state,
        order: {
          ...state.order,
          loading: false,
          success: false,
          error: action.payload,
        }
      };
    default:
      return state; // No need to spread state here, just return the existing state
  }
};

export const getUserOrderReducer = (state={orders:[]},action)=>{
  switch(action.type){
    case'GET_USER_ORDERS_REQUEST':return{
      ...state,
      loading:true,
      error:false,
    }
    case 'GET_USER_ORDERS_SUCCESS':return{
      ...state,
      loading:false,
      error:false,
      orders:action.payload
    }
    case 'GET_USER_ORDERS_FAILED':return{
      ...state,
      loading:false,
      error:true,
    }
    default :return state
  }
}

export const getAllOrdersReducer = (state={Orders:[]},action)=>{
  switch(action.type){
    case'GET_ALL_ORDERS_REQUEST':return{
      ...state,
      loading:true,
      error:null,
    }
    case 'GET_ALL_ORDERS_SUCCESS':return{
      ...state,
      loading:false,
      error:null,
      Orders:action.payload
    }
    case 'GET_ALL_ORDERS_FAILED':return{
      ...state,
      loading:false,
      error:action.payload,
    }
    default : return state
  }
}


export const deliveryReducer = (state = {deliveryLoading: false, success: false, deliveryError: null } , action) => {
  switch (action.type) {
    case "DELIVERY_REQUEST":
      return {
        ...state,
       deliveryLoading:true,
       success:false,
       deliveryError:null
      };
    case "DELIVERY_SUCCESS":
      return {
          ...state,
          deliveryLoading: false,
          success: true,
          deliveryError: null,
        
      };
    case "DELIVERY_FAILED":
      return {
        ...state,
          deliveryLoading: false,
          success: false,
          deliveryError: action.payload,
      };
    default:
      return state; // No need to spread state here, just return the existing state
  }
};

export const deleteOrderReducer= (state = {deleteLoading: false, success: false, deleteError: null } , action) => {
  switch (action.type) {
    case "DELETE_ORDER_REQUEST":
      return {
        ...state,
       deleteLoading:true,
       success:false,
       deleteError:null
      };
    case "DELETE_ORDER_SUCCESS":
      return {
          ...state,
          deleteLoading: false,
          success: true,
          deleteError: null,
        
      };
    case "DELETE_ORDER_FAILED":
      return {
        ...state,
          deleteLoading: false,
          success: false,
          deleteError: action.payload,
      };
    default:
      return state; // No need to spread state here, just return the existing state
  }
};


export const sessionOrderReducer = (state = { loading: false, success: false, error: null } , action) => {
  switch (action.type) {
    case "SAVE_ORDER_REQUEST":
      return {
        ...state,
          loading: true,
          success: false,
          error: null,
        
      };
    case "SAVE_ORDER_SUCCESSFUL":
      return {
        ...state,
          loading: false,
          success: true,
          error: null,
        
      };
    case "SAVE_ORDER_FAILED":
      return {
        ...state,
          loading: false,
          success: false,
          error: action.payload,
        
      };
    default:
      return state; // No need to spread state here, just return the existing state
  }
};


