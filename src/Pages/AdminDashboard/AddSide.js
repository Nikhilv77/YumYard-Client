
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSide } from "../../Actions/SidesActions";
import Loader from "../../Components/Loader";
import Success from "../../Components/Success";
import ErrorForSignup from "../../Components/ErrorForSignup";
import ProductFormForOthers from "./ProductForForOthers";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function AddSide() {
  const addState = useSelector((state) => state.newSide);
  const { loading, success, error } = addState;
  const[anyVacantInput,setAnyVacantInput] = useState(false)
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("");

  const submitHandler = (e) => {
    if(!name||!Price||!pImage||!pDescription||!pCategory){
      setAnyVacantInput(true);
      setTimeout(()=>{
          setAnyVacantInput(false)
      },3000)
      return
  }
    e.preventDefault();
    const newProduct = {
      name: name,
      price : Price,
      category: pCategory,
      image: pImage,
      description: pDescription,
    };
    dispatch(addSide(newProduct));
  };


  return (
    <div className="p-4">
    {error && <Alert variant="danger">"Product could not be added"</Alert>}
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
      {loading?(<><Spinner animation="border" size="sm"/>Adding...</>) : 'Add Side'}
      </button>
      {anyVacantInput && <Alert className="mt-4" variant="warning">Fill all inputs to add a Side!</Alert>}
    </div>
  );
}
