import React, { useState, useEffect } from "react";
import { getAllBevaragesAction, getFilteredBevarages } from "../../Actions/BevarageActions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import Pagination from "../../Components/PaginationForAdmin";
import FilterForBevarage from "../../Components/FilterForBevarage";
import Bevarage from "./Bevarage";
import { useLocation } from "react-router-dom";
export default function BevaragePage() {
  const location = useLocation();
  const searchValue = location.state;
  const dispatch = useDispatch({});
  const BevaragesState = useSelector((state) => state.Bevarages);
  const { Bevarages, loading, error } = BevaragesState;
  const [currPage, setCurrPage] = useState(1);
  const [pizzasPerPage, setPizzasPerPage] = useState(6);

  useEffect(() => {
    if(searchValue){
      dispatch(getFilteredBevarages(searchValue,"all"))
    }else{

      dispatch(getAllBevaragesAction());
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
  if (!loading && !error && Bevarages.length < 1) {
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
  const pagedBevarages = Bevarages.slice(firstIndex, lastPizzaIndex);

  return (
    <div>
      <div className="card-container">
        <div className="card  ">
          <FilterForBevarage></FilterForBevarage>
          <div className="row justify-content-center">
            {pagedBevarages
              ? pagedBevarages.map((bevarage) => (
                  <div className="col-md-3 m-3" key={bevarage._id}>
                    <div>
                      <Bevarage bevarage={bevarage}></Bevarage>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="card">
          <Pagination
             totalPizzas={Bevarages.length}
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
