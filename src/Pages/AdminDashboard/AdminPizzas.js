import React, { useEffect, useState } from "react";
import { getAllPizzas, deleteProduct } from "../../Actions/PizzaAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import SuccessForUsers from "../../Components/SuccessForUsers";
import ErrorForUsers from "../../Components/ErrorForUsers";
import { Link } from "react-router-dom";
import Pagination from "../../Components/PaginationForAdmin";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { AddProductsModal } from "../../Components/Modal";
import AddPizza from "./AddPizza";
import EditPizza from "./EditPizza";
import "./AdminApp.css";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";

export default function AdminPizzas() {
  const addState = useSelector((state) => state.newProduct);
  const { loading:addLoading, success:addSuccess, error:addError } = addState;
  const [isModalOpenForAddingPizza, setIsModalOpenForAddingPizza] =
    useState(false);
  const [isModalOpenForEditingPizza, setIsModalOpenForEditingPizza] =
    useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [pizzaIdState, setPizzaIdState] = useState(null);
  const pizzaState = useSelector((state) => state.pizzas);
  const { pizzas, error, loading } = pizzaState;
  const { success, deliveryError, deliveryLoading } = useSelector(
    (state) => state.deleteProduct
  );
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch,success,addSuccess,editSuccess]);

  if (loading) {
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
  if (!loading && !error && pizzas.length < 1) {
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
  const pagedPizzas = pizzas.slice(firstIndex, lastPizzaIndex);

  return (
    <>
      {isModalOpenForAddingPizza && (
        <AddProductsModal
          Children={<AddPizza></AddPizza>}
          isOpen={isModalOpenForAddingPizza}
          onRequestClose={() => {
            setIsModalOpenForAddingPizza(false);
          }}
        ></AddProductsModal>
      )}
      {isModalOpenForEditingPizza && (
        <AddProductsModal
          Children={<EditPizza pizzaId={pizzaIdState}></EditPizza>}
          isOpen={isModalOpenForEditingPizza}
          onRequestClose={() => {
            setIsModalOpenForEditingPizza(false);
          }}
        ></AddProductsModal>
      )}

      <div className="overflow-x-auto">
     
        {deliveryError && (
             <Alert variant="danger" style={{ fontSize: "1.2rem" }}>
             Could not delete, something went wrong.
           </Alert>
        )}

        <table className="  bg-white border-gray-300  mx-auto rounded mt-3">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Pizza</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pagedPizzas.map((pizza) => (
              <tr key={pizza._id} className="border border-gray-300">
                <td className="py-2 px-4">
                  {" "}
                  <span>
                    {" "}
                    <img
                      style={{ height: "60px", width: "60px" }}
                      src={pizza.image}
                      alt={pizza.name}
                      className="object-cover rounded mx-1"
                    />
                    {pizza.name}
                  </span>
                </td>

                <td className="py-2 px-4">
                  <strong>Category:</strong> {pizza.category} <br />
                  <strong>Prices- </strong>
                  Small- {pizza.prices[0]["small"]}, Medium-{" "}
                  {pizza.prices[0]["medium"]}, Large- {pizza.prices[0]["large"]}
                  <br />
                </td>
                <td className="py-2 px-4">
                  <FaPlus
                    onClick={() => {
                      setIsModalOpenForAddingPizza(true);
                    }}
                    className="m-1 plus-icon"
                  />

                  <FaEdit
                    onClick={() => {
                      setPizzaIdState(pizza._id);
                      setIsModalOpenForEditingPizza(true);
                    }}
                    className="text-blue-500 hover:underline mr-4 m-1 edit-icon"
                  />

                  <FaTrashAlt
                    className="m-1 trash-icon"
                    onClick={() => dispatch(deleteProduct(pizza._id))}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">
                <div className="flex justify-center items-center">
                  <Pagination
                    className="pagination-container"
                    totalPizzas={pizzas.length}
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
