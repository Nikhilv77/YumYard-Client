import axios from "axios";

export const getAllBevaragesAction = ()=>async(dispatch)=>{
dispatch({type:'GET_ALL_BEVARAGES_REQUEST'})
try {
    const response = await axios.get('https://yumyard-server-erfw.onrender.com/api/bevarages/getallbevarages')
   
    dispatch({type:'GET_ALL_BEVARAGES_SUCCESSFUL',payload:response.data})
} catch (error) {
    dispatch({type:'GET_ALL_BEVARAGES_FAILED',payload:error})
}
}
export const getFilteredBevarages = (searchValue, category) => async (dispatch) => {
    dispatch({ type: "GET_ALL_BEVARAGES_REQUEST" });
    let filteredBevarages;
    try {
      const response = await axios.get("https://yumyard-server-erfw.onrender.com/api/bevarages/getallbevarages");
      filteredBevarages = response.data.filter((bevarages) =>
        bevarages.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (category !== "all") {
        filteredBevarages = filteredBevarages.filter(
          (bevarages) => bevarages.category.toLowerCase() === category.toLowerCase()
        );
      } 
      dispatch({ type: "GET_ALL_BEVARAGES_SUCCESSFUL", payload: filteredBevarages });
    } catch (err) {
      dispatch({ type: "GET_ALL_BEVARAGES_FAILED", payload: err });
    }
  };

  export const deleteBevarage= (productId)=>async(dispatch)=>{
    dispatch({type:'DELETE_BEVARAGE_REQUEST'});
    try{
      const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/bevarages/deletebevarage',{productId});
      dispatch({type:'DELETE_BEVARAGE_SUCCESS'})
    }catch(error){
      dispatch({type:'DELETE_BEVARAGE_FAILED',payload:error});
    }
  }

  export const addBevarage = (product)=>async (dispatch)=>{
    dispatch({type:'ADD_BEVARAGE_REQUEST'})
    try{
    const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/bevarages/addnewbevarage',{product})
    dispatch({type:'ADD_BEVARAGE_SUCCESS'})
    }catch(error){
    dispatch ({type:'ADD_BEVARAGE_FAILED',payload:error})
    }
    }

    export const getBevarageByIdAction  = (productId)=>async(dispatch)=>{
      dispatch({type:'GET_BEVARAGE_BYID_REQUEST'})
      try{
      const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/bevarages/getbyid',{productId});
      dispatch({type:'GET_BEVARAGE_BYID_SUCCESS',payload:response.data})
      }catch(error){
      dispatch({type:'GET_BEVARAGE_BYID_FAILED',payload:error})
      } 
    }
    
    export const editBevarage = (product)=>async (dispatch)=>{
      dispatch({type:'EDIT_BEVARAGE_REQUEST'})
      try{
      const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/bevarages/editbevarage',{product})
      dispatch({type:'EDIT_BEVARAGE_SUCCESS'})
      }catch(error){
      dispatch ({type:'EDIT_BEVARAGE_FAILED',payload:error})
      }
      }