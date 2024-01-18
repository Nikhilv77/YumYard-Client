// EditProduct.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import ErrorForEdit from "../../Components/ErrorForEdit";
import SuccessForEdit from "../../Components/SuccessForEdit";
import ProductFormForOthers from "./ProductForForOthers";
import ClipLoader from "react-spinners/ClipLoader";
import { Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { getIndianMealByIdAction,editIndianMeal } from "../../Actions/IndianMealsActions";

export default function EditIndianMeal({productId}) {
  const [name, setName] = useState("");
  const [Price, setPrice] = useState();
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("");
  const { IndianMeal, loading, error } = useSelector(
    (state) => state.getIndianMealById
  );
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editIndianMeal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (IndianMeal) {
      if (IndianMeal._id === productId) {
        setName(IndianMeal.name);
        setPrice(IndianMeal.price);
        setPCategory(IndianMeal.category);
        setPImage(IndianMeal.image);
        setPDescription(IndianMeal.description);
      } else {
        dispatch(getIndianMealByIdAction(productId));
      }
    } else {
      dispatch(getIndianMealByIdAction(productId));
    }
  }, [IndianMeal, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const editedProduct = {
      _id: productId,
      name: name,
      price : Price,
      category: pCategory,
      image: pImage,
      description: pDescription,
    };
    dispatch(editIndianMeal(editedProduct));
  };

  return (
    <div className="p-4">
      <form onSubmit={submitHandler}>
      {loading &&  <div style={{display:'flex',height:'60vh', justifyContent:'center'}}><ClipLoader className="m-auto" size={50}></ClipLoader></div>}
      

        <ProductFormForOthers
          name={name}
          Price={Price}
          pImage={pImage}
          pDescription={pDescription}
          pCategory={pCategory}
          onNameChange={(e) => setName(e.target.value)}
          onPriceChange={(e) => setPrice(e.target.value)}
          onPImageChange={(e) => setPImage(e.target.value)}
          onPDescriptionChange={(e) => setPDescription(e.target.value)}
          onPCategoryChange={(e) => setPCategory(e.target.value)}
        />

        <button type="submit" className="btn mt-2">
        {editLoading? <><Spinner animation="border" size="sm"/>Editing...</>:'Edit Meal'}
        </button>
        {error && (
          <Alert className = 'mt-2' variant="danger" >Could not fetch Product, something went wrong!</Alert>
        )}

        {editError && (
               <Alert className = 'mt-2' variant="danger" >Could not update Product, something went wrong!</Alert>
        )}

      </form>
    </div>
  );
}
