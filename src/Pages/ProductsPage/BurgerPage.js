import React, { useState, useEffect } from "react";
import Burger from "./Burger";
import { getAllBurgersAction, getFilteredBurgers } from "../../Actions/BurgerActions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import Pagination from "../../Components/PaginationForAdmin";
import FilterForBurger from "../../Components/FilterForBurger";
import { useLocation } from "react-router-dom";
export default function BurgerPage() {
  const location = useLocation();
  const searchValue = location.state;
  const dispatch = useDispatch({});
  const BurgerState = useSelector((state) => state.burgers);
  const { Burgers, loading, error } = BurgerState;
  const [currPage, setCurrPage] = useState(1);
  const [pizzasPerPage, setPizzasPerPage] = useState(6);

  useEffect(() => {
    if(searchValue){
      dispatch(getFilteredBurgers(searchValue,"all"))
    }else{

      dispatch(getAllBurgersAction());
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
  if (!loading && !error && Burgers.length < 1) {
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
  const pagedBurgers = Burgers.slice(firstIndex, lastPizzaIndex);

  return (
    <div>
      <div className="card-container">
        <div  className="card ">
          <FilterForBurger/>
          <div className="row justify-content-center">
            {pagedBurgers
              ? pagedBurgers.map((burger) => (
                  <div className="col-md-3 m-3" key={burger._id}>
                    <div>
                      <Burger burger={burger}></Burger>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="card">
          <Pagination
             totalPizzas={Burgers.length}
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
