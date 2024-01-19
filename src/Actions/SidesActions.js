import axios from "axios";

export const getAllSidesAction = ()=>async(dispatch)=>{
dispatch({type:'GET_ALL_SIDES_REQUEST'})
try {
    const response = await axios.get('https://yumyard-server.cyclic.app/api/sides/getallsides')
    console.log(response.data);
    dispatch({type:'GET_ALL_SIDES_SUCCESSFUL',payload:response.data})
} catch (error) {
    dispatch({type:'GET_ALL_SIDES_FAILED',payload:error})
}
}
export const getFilteredSides = (searchValue, category) => async (dispatch) => {
    dispatch({ type: "GET_ALL_SIDES_REQUEST" });
    let filteredSides;
    try {
      const response = await axios.get("https://yumyard-server.cyclic.app/api/sides/getallsides");
      filteredSides = response.data.filter((sides) =>
        sides.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (category !== "all") {
        filteredSides = filteredSides.filter(
          (sides) => sides.category.toLowerCase() === category.toLowerCase()
        );
      } 
      dispatch({ type: "GET_ALL_SIDES_SUCCESSFUL", payload: filteredSides });
    } catch (err) {
      dispatch({ type: "GET_ALL_SIDES_FAILED", payload: err });
    }
  };
  export const deleteSides = (productId)=>async(dispatch)=>{
    dispatch({type:'DELETE_SIDE_REQUEST'});
    try{
      const response = await axios.post('https://yumyard-server.cyclic.app/api/sides/deleteside',{productId});
      dispatch({type:'DELETE_SIDE_SUCCESS'})
    }catch(error){
      dispatch({type:'DELETE_SIDE_FAILED',payload:error});
    }
  }

  export const addSide = (product)=>async (dispatch)=>{
    dispatch({type:'ADD_SIDE_REQUEST'})
    try{
    const response = await axios.post('https://yumyard-server.cyclic.app/api/sides/addnewside',{product})
    dispatch({type:'ADD_SIDE_SUCCESS'})
    }catch(error){
    dispatch ({type:'ADD_SIDE_FAILED',payload:error})
    }
    }

    export const getSideByIdAction  = (productId)=>async(dispatch)=>{
      dispatch({type:'GET_SIDE_BYID_REQUEST'})
      try{
      const response = await axios.post('https://yumyard-server.cyclic.app/api/sides/getbyid',{productId});
      dispatch({type:'GET_SIDE_BYID_SUCCESS',payload:response.data})
      }catch(error){
      dispatch({type:'GET_SIDE_BYID_FAILED',payload:error})
      } 
    }
    
    export const editSide = (product)=>async (dispatch)=>{
      dispatch({type:'EDIT_SIDE_REQUEST'})
      try{
      const response = await axios.post('https://yumyard-server.cyclic.app/api/sides/editside',{product})
      dispatch({type:'EDIT_SIDE_SUCCESS'})
      }catch(error){
      dispatch ({type:'EDIT_SIDE_FAILED',payload:error})
      }
      }