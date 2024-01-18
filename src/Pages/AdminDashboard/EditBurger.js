// EditProduct.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import ErrorForEdit from "../../Components/ErrorForEdit";
import SuccessForEdit from "../../Components/SuccessForEdit";
import ProductFormForOthers from "./ProductForForOthers";
import { getBurgerByIdAction, editBurger } from "../../Actions/BurgerActions";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function EditBurger({ productId }) {

  const [name, setName] = useState("");
  const [Price, setPrice] = useState();
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("");
  const { Burger, loading, error } = useSelector(
    (state) => state.getBurgerById
  );
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editBurger
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (Burger) {
      if (Burger._id === productId) {
        setName(Burger.name);
        setPrice(Burger.price);
        setPCategory(Burger.category);
        setPImage(Burger.image);
        setPDescription(Burger.description);
      } else {
        dispatch(getBurgerByIdAction(productId));
      }
    } else {
      dispatch(getBurgerByIdAction(productId));
    }
  }, [Burger,dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const editedProduct = {
      _id: productId,
      name: name,
      price: Price,
      category: pCategory,
      image: pImage,
      description: pDescription,
    };
    dispatch(editBurger(editedProduct));
    
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
      {editLoading? <><Spinner animation="border" size="sm"/>Editing...</>:'Edit Burger'}
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
