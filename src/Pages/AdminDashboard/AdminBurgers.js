import React, { useEffect, useState } from "react";
import { getAllBurgersAction } from "../../Actions/BurgerActions";
import { useDispatch, useSelector } from "react-redux";

import { deleteBurgers } from "../../Actions/BurgerActions";
import { Link } from "react-router-dom";
import Pagination from "../../Components/PaginationForAdmin";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import AddBurger from "./AddBurger";
import EditBurger from "./EditBurger";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import { AddProductsModalForOtherProducts } from "../../Components/ModalForOtherProducts";

export default function AdminBurgers() {
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editBurger
  );
  const addState = useSelector((state) => state.newBurger);
  const {
    loading: addLoading,
    success: addSuccess,
    error: addError,
  } = addState;
  const [IsModalOpenForAddingProduct, setIsModalOpenForAddingProduct] =
    useState(false);
  const [IsModalOpenForEditingProduct, setIsModalOpenForEditingProduct] =
    useState(false);
  const [burgerIdState, setBurgerIdState] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const BurgerState = useSelector((state) => state.burgers);

  const { Burgers, error, loading } = BurgerState;
  const { success, deliveryError } = useSelector((state) => state.deleteBurger);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBurgersAction());
  }, [dispatch, success, addSuccess,editSuccess]);
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
        <div
          style={{ display: "flex", height: "85vh", justifyContent: "center" }}
        >
          <Alert
            className="m-auto"
            style={{ maxWidth: "300px" }}
            variant="danger"
          >
            Something went wrong!
          </Alert>
        </div>
      </div>
    );
  }
  if (!loading && !error && Burgers.length < 1) {
    return (
      <div>
        <div
          style={{ display: "flex", height: "85vh", justifyContent: "center" }}
        >
          <img
            src="/no-data-found.png"
            style={{ maxHeight: "250px", maxWidth: "300px" }}
            className="m-auto"
          ></img>
        </div>
      </div>
    );
  }

  const lastPizzaIndex = 7 * currPage;
  const firstIndex = lastPizzaIndex - 7;
  const pagedBurgers = Burgers.slice(firstIndex, lastPizzaIndex);

  return (
    <>
      {IsModalOpenForAddingProduct && (
        <AddProductsModalForOtherProducts
          Children={<AddBurger></AddBurger>}
          isOpen={IsModalOpenForAddingProduct}
          onRequestClose={() => {
            setIsModalOpenForAddingProduct(false);
          }}
        ></AddProductsModalForOtherProducts>
      )}
      {IsModalOpenForEditingProduct && (
        <AddProductsModalForOtherProducts
          Children={<EditBurger productId={burgerIdState}></EditBurger>}
          isOpen={IsModalOpenForEditingProduct}
          onRequestClose={() => {
            setIsModalOpenForEditingProduct(false);
          }}
        ></AddProductsModalForOtherProducts>
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
              <th className="py-2 px-4 border-b">Burger</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pagedBurgers.map((pizza) => (
              <tr key={pizza._id} className="border border-gray-300">
                <td className="py-2 px-4">
                  <img
                    style={{ height: "60px", width: "60px" }}
                    src={pizza.image}
                    alt={pizza.name}
                    className="object-cover rounded mx-1"
                  />
                  {pizza.name}
                </td>

                <td className="py-2 px-4">
                  <strong>Price: </strong>
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
                      setBurgerIdState(pizza._id);
                      setIsModalOpenForEditingProduct(true);
                    }}
                    className="text-blue-500 hover:underline mr-4 m-1 edit-icon"
                  />

                  <FaTrashAlt
                    className="m-1 trash-icon"
                    onClick={() => {
                      dispatch(deleteBurgers(pizza._id));
                    }}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">
                <div className="flex justify-center items-center">
                  <Pagination
                    totalPizzas={Burgers.length}
                    pizzasPerPage={7}
                    setCurrPage={setCurrPage}
                    currPage={currPage}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>{" "}
    </>
  );
}
