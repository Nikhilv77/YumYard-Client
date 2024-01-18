import React, { useState, useEffect } from "react";
import IndianMeal from "./IndianMeal";
import { getAllIndianMealsActions, getFilteredIndianMeals } from "../../Actions/IndianMealsActions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Pagination from "../../Components/PaginationForAdmin";
import FilterForIndianMeals from "../../Components/FilterForIndianMeals";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";

export default function IndianMealsPage() {
  const location = useLocation();
  const searchValue = location.state;
  const dispatch = useDispatch({});
  const IndianMealsState = useSelector((state) => state.IndianMeals);
  const { Meals, loading, error } = IndianMealsState;
  const [currPage, setCurrPage] = useState(1);
  const [pizzasPerPage, setPizzasPerPage] = useState(6);

  useEffect(() => {
    if(searchValue){
      dispatch(getFilteredIndianMeals(searchValue,"all"))
    }else{
      dispatch(getAllIndianMealsActions());
    }
  }, [searchValue]);

  if (loading) {
    return (
      <div className="card-container">
        <div
          style={{ display: "flex", height: "88vh", justifyContent: "center" }}
          className="card"
        >
          <ClipLoader className="m-auto" size={60}></ClipLoader>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="card-container">
        <div style={{ display: "flex", height: "85vh", justifyContent: "center" }} className="card">
          <Alert className="m-auto"  style={{maxWidth:'300px'}} variant="danger">Something went wrong!</Alert>
        </div>
      </div>
    );
  }
  if (!loading && !error && Meals.length < 1) {
    return (
      <div className="card-container">
           <div
          style={{ display: "flex", height: "85vh", justifyContent: "center" }}
          className="card"
        >
         <img src="/food-not-found.png" style={{maxHeight:'450px', maxWidth:'400px'}} className="m-auto"></img>
        </div>
      </div>
    );
  }
  const lastPizzaIndex = pizzasPerPage * currPage;
  const firstIndex = lastPizzaIndex - pizzasPerPage;
  const pagedMeals = Meals.slice(firstIndex, lastPizzaIndex);

  return (
    <div>
      <div className="card-container">
        <div className="card ">
          <FilterForIndianMeals></FilterForIndianMeals>
          <div className="row justify-content-center">
            {pagedMeals
              ? pagedMeals.map((meal) => (
                  <div className="col-md-3 m-3" key={meal._id}>
                    <div>
                      <IndianMeal indianMeal={meal}></IndianMeal>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="card">
            <Pagination
              totalPizzas={Meals.length}
              pizzasPerPage={pizzasPerPage}
              setCurrPage={setCurrPage}
              currPage={currPage}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
