import axios from "axios";

export const getAllBurgersAction = ()=>async(dispatch)=>{
dispatch({type:'GET_ALL_BURGERS_REQUEST'})
try {
    const response = await axios.get('https://yumyard-server-jq26.onrender.com/api/burgers/getallburgers')
    dispatch({type:'GET_ALL_BURGERS_SUCCESSFUL',payload:response.data})
} catch (error) {
    dispatch({type:'GET_ALL_BURGERS_FAILED',payload:error})
}
}
export const getFilteredBurgers = (searchValue, category) => async (dispatch) => {
    dispatch({ type: "GET_ALL_BURGERS_REQUEST" });
    let filteredBurgers;
    try {
      const response = await axios.get("https://yumyard-server-jq26.onrender.com/api/burgers/getallburgers");
      filteredBurgers = response.data.filter((burger) =>
        burger.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (category !== "all") {
        filteredBurgers = filteredBurgers.filter(
          (burger) => burger.category.toLowerCase() === category.toLowerCase()
        );
      }
      dispatch({ type: "GET_ALL_BURGERS_SUCCESSFUL", payload: filteredBurgers });
    } catch (err) {
      dispatch({ type: "GET_ALL_BURGERS_FAILED", payload: err });
    }
  };
  export const deleteBurgers = (productId)=>async(dispatch)=>{
    dispatch({type:'DELETE_BURGER_REQUEST'});
    try{
      const response = await axios.post('https://yumyard-server-jq26.onrender.com/api/burgers/deleteburger',{productId});
      dispatch({type:'DELETE_BURGER_SUCCESS'})
    }catch(error){
      dispatch({type:'DELETE_BURGER_FAILED',payload:error});
    }
  }

  export const addBurger = (product)=>async (dispatch)=>{
    dispatch({type:'ADD_BURGER_REQUEST'})
    try{
    const response = await axios.post('https://yumyard-server-jq26.onrender.com/api/burgers/addnewburger',{product})
    dispatch({type:'ADD_BURGER_SUCCESS'})
    }catch(error){
    dispatch ({type:'ADD_BURGER_FAILED',payload:error})
    }
    }

    export const getBurgerByIdAction  = (productId)=>async(dispatch)=>{
      dispatch({type:'GET_BURGER_BYID_REQUEST'})
      try{
      const response = await axios.post('https://yumyard-server-jq26.onrender.com/api/burgers/getbyid',{productId});
      dispatch({type:'GET_BURGER_BYID_SUCCESS',payload:response.data})
      }catch(error){
      dispatch({type:'GET_BURGER_BYID_FAILED',payload:error})
      } 
    }
    
    export const editBurger = (product)=>async (dispatch)=>{
      dispatch({type:'EDIT_BURGER_REQUEST'})
      try{
      const response = await axios.post('https://yumyard-server-jq26.onrender.com/api/burgers/editburger',{product})
      dispatch({type:'EDIT_BURGER_SUCCESS'})
      }catch(error){
      dispatch ({type:'EDIT_BURGER_FAILED',payload:error})
      }
      }