import axios from "axios";
export const getAllPizzas = ()=>async (dispatch) => {
  dispatch({ type: "REQUEST" });
  try {
    const response = await axios.get("https://yumyard-server-erfw.onrender.com/api/pizzas/getallpizzas");
  
    dispatch({ type: "SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "FAILED", payload: err });
  }
};

export const getFilteredPizzas = (searchValue, category) => async (dispatch) => {
  dispatch({ type: "REQUEST" });
  let filteredPizzas;
  try {
    const response = await axios.get("https://yumyard-server-erfw.onrender.com/api/pizzas/getallpizzas");
    filteredPizzas = response.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (category !== "all") {
      filteredPizzas = filteredPizzas.filter(
        (pizza) => pizza.category.toLowerCase() === category.toLowerCase()
      );
    }
    dispatch({ type: "SUCCESS", payload: filteredPizzas });
  } catch (err) {
    dispatch({ type: "FAILED", payload: err });
  }
};

  export const addProduct = (product)=>async (dispatch)=>{
  dispatch({type:'ADD_PRODUCT_REQUEST'})
  try{
  const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/pizzas/addnewproduct',{product})
  dispatch({type:'ADD_PRODUCT_SUCCESS'})
  }catch(error){
  dispatch ({type:'ADD_PRODUCT_FAILED',payload:error})
  }
  }

  export const deleteProduct = (productId)=>async(dispatch)=>{
    dispatch({type:'DELETE_PRODUCT_REQUEST'});
    try{
      const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/pizzas/deleteproduct',{productId});
      dispatch({type:'DELETE_PRODUCT_SUCCESS'})
    }catch(error){
      dispatch({type:'DELETE_PRODUCT_FAILED',payload:error});
    }
  }
export const getProductByIdAction  = (productId)=>async(dispatch)=>{
  dispatch({type:'GET_PRODUCT_BYID_REQUEST'})
  try{
  const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/pizzas/getbyid',{productId});
  dispatch({type:'GET_PRODUCT_BYID_SUCCESS',payload:response.data})
  }catch(error){
  dispatch({type:'GET_PRODUCT_BYID_FAILED',payload:error})
  } 
}

export const editProduct = (product)=>async (dispatch)=>{
  dispatch({type:'EDIT_PRODUCT_REQUEST'})
  try{
  const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/pizzas/editproduct',{product})
  dispatch({type:'EDIT_PRODUCT_SUCCESS'})
  }catch(error){
  dispatch ({type:'EDIT_PRODUCT_FAILED',payload:error})
  }
  }
