
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBurger, getAllBurgersAction } from "../../Actions/BurgerActions";
import Loader from "../../Components/Loader";
import Success from "../../Components/Success";
import ErrorForSignup from "../../Components/ErrorForSignup";
import ProductFormForOthers from "./ProductForForOthers";
import { Alert, Spinner } from "react-bootstrap";

export default function AddBurger() {
  const addState = useSelector((state) => state.newBurger);
  const { loading, success, error } = addState;
  const[anyVacantInput,setAnyVacantInput] = useState(false)
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if(!name||!Price||!pImage||!pDescription||!pCategory){
        setAnyVacantInput(true);
        setTimeout(()=>{
            setAnyVacantInput(false)
        },3000)
        return
    }
    const newProduct = {
      name: name,
      price : Price,
      category: pCategory,
      image: pImage,
      description: pDescription,
    };
    dispatch(addBurger(newProduct));
  };


  return (
    <div className="p-4">
    

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

      <button type="submit" className="btn mt-2" onClick={submitHandler}>
        {loading?(<><Spinner animation="border" size="sm"/>Adding...</>) : 'Add Burger'}
      </button>
      {error && (
        <Alert variant="danger" className="mt-2">Burger Could not be added!</Alert>
      )}
      {anyVacantInput && <Alert variant="warning" className="mt-4">For Adding a burger, all fields are necessary!</Alert>}
    </div>
  );
}
