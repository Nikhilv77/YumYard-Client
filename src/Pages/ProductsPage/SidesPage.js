import React, { useState, useEffect } from "react";
import { getAllSidesAction, getFilteredSides } from "../../Actions/SidesActions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import Pagination from "../../Components/PaginationForAdmin";
import FilterForSides from "../../Components/FilterForSide";
import Side from "./Side";
import { useLocation } from "react-router-dom";
export default function SidesPage() {
  const location = useLocation();
  const searchValue = location.state;
  const dispatch = useDispatch({});
  const SidesState = useSelector((state) => state.Sides);
  const { Sides, loading, error } = SidesState;
  const [currPage, setCurrPage] = useState(1);
  const [pizzasPerPage, setPizzasPerPage] = useState(6);

  useEffect(() => {
    if(searchValue){
      dispatch(getFilteredSides(searchValue,"all"))
    }else{

      dispatch(getAllSidesAction());
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
  if (!loading && !error && Sides.length < 1) {
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
  const pagedSides = Sides.slice(firstIndex, lastPizzaIndex);

  return (
    <div>
      <div className="card-container">
        <div className="card">
          <FilterForSides/>
          <div className="row justify-content-center">
            {pagedSides
              ? pagedSides.map((side) => (
                  <div className="col-md-3 m-3" key={side._id}>
                    <div>
                      <Side side={side}></Side>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="card">
          <Pagination
             totalPizzas={Sides.length}
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
