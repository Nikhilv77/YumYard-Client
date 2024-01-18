export const getAllPizzasReducer = (state = { pizzas:[]},action)=>{
    switch(action.type){
        case 'REQUEST' : return{
            ...state,
            loading:true,
            error : null,
        }
        case 'SUCCESS':return{
            ...state,
            loading : false,
            pizzas: action.payload,
            error:null,
        }
        case 'FAILED' : return{
            ...state,
            loading: false,
            error:action.payload,
        }
        default:
            return state;
    }
}

export const addNewProductReducer = (state = { loading: false, success: false, error: null },action)=>{

    switch(action.type){
        case 'ADD_PRODUCT_REQUEST':return{
            ...state,
            loading:true,
            success:false,
            error:null
        }
        case "ADD_PRODUCT_SUCCESS":return{
            ...state,
            loading:false,
            success:true,
            error:null,
        }
        case"ADD_PRODUCT_FAILED":return{
            ...state,
            loading:false,
            success:false,
            error:action.payload,
        }
        default : return state;
    }
}

export const deleteProductReducer= (state = {deleteLoading: false, success: false, deleteError: null } , action) => {
    switch (action.type) {
      case "DELETE_PRODUCT_REQUEST":
        return {
          ...state,
         deleteLoading:true,
         success:false,
         deleteError:null
        };
      case "DELETE_PRODUCT_SUCCESS":
        return {
            ...state,
            deleteLoading: false,
            success: true,
            deleteError: null,
          
        };
      case "DELETE_PRODUCT_FAILED":
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

  export const getProductByIdReducer = (state={product:[],loading:false,error:null},action)=>{
    switch(action.type){
        case 'GET_PRODUCT_BYID_REQUEST':return{
            ...state,
            loading : true,
            error:null,
        }
        case 'GET_PRODUCT_BYID_SUCCESS':return{
            ...state,
            loading:false,
            product:action.payload,
            error:null,
        }
        case "GET_PRODUCT_BYID_FAILED":return{
            ...state,
            loading:false,
            error:action.payload,
        }
        default :return state
    }
  }

  export const editProductReducer = (state = { editLoading: false, editSuccess: false, editError: null },action)=>{

    switch(action.type){
        case 'EDIT_PRODUCT_REQUEST':return{
            ...state,
            editLoading:true,
            editSuccess:false,
            editError:null
        }
        case "EDIT_PRODUCT_SUCCESS":return{
            ...state,
            editLoading:false,
           editSuccess:true,
           editError:null,
        }
        case"EDIT_PRODUCT_FAILED":return{
            ...state,
            editLoading:false,
           editSuccess:false,
            editError:action.payload,
        }
        default : return state;
    }
}

