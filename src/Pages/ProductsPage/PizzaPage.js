import React, { useState, useEffect } from "react";
import Pizza from "./Pizza";
import { getAllPizzas, getFilteredPizzas } from "../../Actions/PizzaAction";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import FilterForPizza from "../../Components/FilterForPizza";
import Pagination from "../../Components/PaginationForAdmin";
import { useLocation } from "react-router-dom";
export default function PizzaPage() {
  const location = useLocation();
  const searchValue = location.state;
 
  const dispatch = useDispatch({});
  const pizzaState = useSelector((state) => state.pizzas);
  const { pizzas, loading, error } = pizzaState;
  const [currPage, setCurrPage] = useState(1);
  const [pizzasPerPage, setPizzasPerPage] = useState(6);

  useEffect(() => {
    if(searchValue){
      dispatch(getFilteredPizzas(searchValue,"all"))
    }else{
      dispatch(getAllPizzas());
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
  if (!loading && !error && pizzas.length < 1) {
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
  const pagedPizzas = pizzas.slice(firstIndex, lastPizzaIndex);

  return (
    <div>
      <div className="card-container">
        <div className="card ">
          <FilterForPizza  />
          <div className="row justify-content-center">
            {pagedPizzas
              ? pagedPizzas.map((pizza) => (
                  <div className="col-md-3 m-3" key={pizza._id}>
                    <div>
                      <Pizza pizza={pizza}></Pizza>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="card">
          <Pagination
            totalPizzas={pizzas.length}
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
