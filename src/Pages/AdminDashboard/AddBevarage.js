
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBevarage } from "../../Actions/BevarageActions";
import Loader from "../../Components/Loader";
import Success from "../../Components/Success";
import ErrorForSignup from "../../Components/ErrorForSignup";
import ProductFormForOthers from "./ProductForForOthers";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function AddBevarage() {
  const addState = useSelector((state) => state.newBevarage);
  
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
    dispatch(addBevarage(newProduct));
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
      {loading?(<><Spinner animation="border" size="sm"/>Adding...</>) : 'Add Bevarage'}
      </button>
      {anyVacantInput && <Alert className="mt-4" variant="warning">Please give all information!</Alert>}
    </div>
  );
}
