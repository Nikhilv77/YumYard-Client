import axios from "axios";

export const getAllIndianMealsActions = ()=>async(dispatch)=>{
    dispatch({type:'GET_ALL_INDIANMEALS_REQUEST'})
    try {
        const response = await axios.get('/api/indianmeals/getallindianmeals');
        dispatch({type:'GET_ALL_INDIANMEALS_SUCCESSFUL',payload:response.data})
    } catch (error) {
        dispatch({type:'GET_ALL_INDIANMEALS_FAILED',payload:error})
    }
}

export const getFilteredIndianMeals = (searchValue, category) => async (dispatch) => {
    dispatch({ type: "GET_ALL_INDIANMEALS_REQUEST" });
    let filteredIndianMeals;
    try {
      const response = await axios.get("/api/indianmeals/getallindianmeals");
      filteredIndianMeals = response.data.filter((meal) =>
        meal.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log(filteredIndianMeals);
      if (category !== "all") {
        filteredIndianMeals = filteredIndianMeals.filter(
          (meal) => meal.category.toLowerCase() === category.toLowerCase()
        );
      }
      dispatch({ type: "GET_ALL_INDIANMEALS_SUCCESSFUL", payload: filteredIndianMeals });
    } catch (err) {
      dispatch({ type: "GET_ALL_INDIANMEALS_FAILED", payload: err });
    }
  };

  export const deleteIndianMeal = (productId)=>async(dispatch)=>{
    dispatch({type:'DELETE_INDIANMEAL_REQUEST'});
    try{
      const response = await axios.post('/api/indianmeals/deleteindianmeal',{productId});
      dispatch({type:'DELETE_INDIANMEAL_SUCCESS'})
    }catch(error){
      dispatch({type:'DELETE_INDIANMEAL_FAILED',payload:error});
    }
  }

  export const addIndianMeal = (product)=>async (dispatch)=>{
    dispatch({type:'ADD_INDIANMEAL_REQUEST'})
    try{
    const response = await axios.post('/api/indianmeals/addnewindianmeal',{product})
    dispatch({type:'ADD_INDIANMEAL_SUCCESS'})
    }catch(error){
    dispatch ({type:'ADD_INDIANMEAL_FAILED',payload:error})
    }
    }

    export const getIndianMealByIdAction  = (productId)=>async(dispatch)=>{
      dispatch({type:'GET_INDIANMEAL_BYID_REQUEST'})
      try{
      const response = await axios.post('/api/indianmeals/getbyid',{productId});
      dispatch({type:'GET_INDIANMEAL_BYID_SUCCESS',payload:response.data})
      }catch(error){
      dispatch({type:'GET_INDIANMEAL_BYID_FAILED',payload:error})
      } 
    }
    
    export const editIndianMeal = (product)=>async (dispatch)=>{
      dispatch({type:'EDIT_INDIANMEAL_REQUEST'})
      try{
      const response = await axios.post('/api/indianmeals/editindianmeal',{product})
      dispatch({type:'EDIT_INDIANMEAL_SUCCESS'})
      }catch(error){
      dispatch ({type:'EDIT_INDIANMEAL_FAILED',payload:error})
      }
      }