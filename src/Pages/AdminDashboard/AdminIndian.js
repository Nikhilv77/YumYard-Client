import React, { useEffect, useState } from "react";
// import { getAllPizzas } from "../../Actions/PizzaAction";
import { getAllIndianMealsActions } from "../../Actions/IndianMealsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import SuccessForUsers from "../../Components/SuccessForUsers";
import ErrorForUsers from "../../Components/ErrorForUsers";
import { deleteIndianMeal } from "../../Actions/IndianMealsActions";
import { Link } from "react-router-dom";
import Pagination from "../../Components/PaginationForAdmin";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { AddProductsModalForOtherProducts } from "../../Components/ModalForOtherProducts";
import EditIndianMeal from "./EditIndianMeal";
import AddIndianMeal from "./AddIndianMeal";
import ClipLoader from 'react-spinners/ClipLoader'
import { Alert } from "react-bootstrap";

export default function AdminIndian() {
  const addState = useSelector((state) => state.newIndianMeal);
  const { loading:addLoading, success:addSuccess, error:addError } = addState;
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editIndianMeal
  );
  const [IsModalOpenForAddingProduct, setIsModalOpenForAddingProduct] =
    useState(false);
  const [IsModalOpenForEditingProduct, setIsModalOpenForEditingProduct] =
    useState(false);
  const [mealStateId, setMealStateId] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const MealState = useSelector((state) => state.IndianMeals);
  const { Meals, error, loading } = MealState;
  const { success, deliveryError, deliveryLoading } = useSelector(
    (state) => state.deleteIndianMeal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIndianMealsActions());
  }, [dispatch,success,editSuccess,addSuccess]);

  if (loading){
    return (
      <div>
        <div
          style={{ display: "flex", height: "88vh", justifyContent: "center" }}
          
        >
          <ClipLoader className="m-auto" size={60}></ClipLoader>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <div style={{ display: "flex", height: "85vh", justifyContent: "center" }}>
          <Alert className="m-auto"  style={{maxWidth:'300px'}} variant="danger">Something went wrong!</Alert>
        </div>
      </div>
    );
  }
  if (!loading && !error && Meals.length < 1) {
    return (
      <div >
           <div
          style={{ display: "flex", height: "85vh", justifyContent: "center" }}
         
        >
          <img src="/no-data-found.png" style={{maxHeight:'250px', maxWidth:'300px'}} className="m-auto"></img>
        </div>
      </div>
    );
  }

  
  const lastPizzaIndex = 7 * currPage;
  const firstIndex = lastPizzaIndex - 7;
  const pagedMeals = Meals.slice(firstIndex, lastPizzaIndex);

  return (
    <>
      {IsModalOpenForAddingProduct && (
        <AddProductsModalForOtherProducts
          Children={<AddIndianMeal></AddIndianMeal>}
          isOpen={IsModalOpenForAddingProduct}
          onRequestClose={() => {
            setIsModalOpenForAddingProduct(false);
          }}
        ></AddProductsModalForOtherProducts>
      )}
      {IsModalOpenForEditingProduct && (
        <AddProductsModalForOtherProducts
          Children={<EditIndianMeal productId={mealStateId}></EditIndianMeal>}
          isOpen={IsModalOpenForEditingProduct}
          onRequestClose={() => {
            setIsModalOpenForEditingProduct(false);
          }}
        ></AddProductsModalForOtherProducts>
      )}
      <div
        
        className="overflow-x-auto"
      >

   
        {deliveryError && (
         <Alert variant="danger" style={{ fontSize: "1.2rem" }}>
         Could not delete, something went wrong.
       </Alert>
        )}
        <table className="  bg-white border-gray-300  mx-auto rounded mt-3">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Meal</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pagedMeals.map((pizza) => (
              <tr key={pizza._id} className="border border-gray-300">
                <td className="py-2 px-4"> <img
                    style={{ height: "60px", width: "60px" }}
                    src={pizza.image}
                    alt={pizza.name}
                    className="object-cover rounded mx-1"
                  />{pizza.name}</td>
               
                <td className="py-2 px-4">
                  <strong>Price:</strong>
                  {pizza.price}
                  <br />
                  <strong>Category:</strong> {pizza.category}
                </td>
                <td className="py-2 px-4">
                  <FaPlus
                    onClick={() => {
                      setIsModalOpenForAddingProduct(true);
                    }}
                    className="m-1 plus-icon"
                  />

                  <FaEdit
                    onClick={() => {
                      setMealStateId(pizza._id);
                      setIsModalOpenForEditingProduct(true);
                    }}
                    className="text-blue-500 hover:underline mr-4 m-1 edit-icon"
                  />

                  <FaTrashAlt
                    className="m-1 trash-icon"
                    onClick={() => dispatch(deleteIndianMeal(pizza._id))}
                  />
                </td>
              </tr>
            ))}
            <tr>
    <td colSpan="3">
      <div className="flex justify-center items-center">
      <Pagination
          totalPizzas={Meals.length}
          pizzasPerPage={7}
          setCurrPage={setCurrPage}
          currPage={currPage}
        />
      </div>
    </td>
  </tr>
          </tbody>
        </table>
      
      </div>
    </>
  );
}
