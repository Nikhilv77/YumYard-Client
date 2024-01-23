
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Actions/PizzaAction";
import Loader from "../../Components/Loader";
import Success from "../../Components/Success";
import ErrorForSignup from "../../Components/ErrorForSignup";
import ProductForm from "./ProductForm";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function AddPizza() {
  const addState = useSelector((state) => state.newProduct);
  const { loading, success, error } = addState;
  const [anyVacantInput, setAnyVacantInput] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [sPrice, setSPrice] = useState("");
  const [mPrice, setMPrice] = useState("");
  const [lPrice, setLPrice] = useState("");
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !name ||
      !sPrice ||
      !mPrice ||
      !lPrice ||
      !pImage ||
      !pDescription ||
      !pCategory
    ) {
      setAnyVacantInput(true);
      setTimeout(() => {
        setAnyVacantInput(false);
      }, 3000);
      return;
    }
    const newProduct = {
      name: name,
      variants: ["small", "medium", "large"],
      prices: [
        {
          small: sPrice,
          medium: mPrice,
          large: lPrice,
        },
      ],
      category: pCategory,
      image: pImage,
      description: pDescription,
    };
    dispatch(addProduct(newProduct));
  };

  return (
    <div className="p-4">
      {error && <Alert variant="danger">"Product could not be added"</Alert>}

      <ProductForm
        name={name}
        sPrice={sPrice}
        mPrice={mPrice}
        lPrice={lPrice}
        pImage={pImage}
        pDescription={pDescription}
        pCategory={pCategory}
        onNameChange={(e) => setName(e.target.value)}
        onSPriceChange={(e) => setSPrice(e.target.value)}
        onMPriceChange={(e) => setMPrice(e.target.value)}
        onLPriceChange={(e) => setLPrice(e.target.value)}
        onPImageChange={(e) => setPImage(e.target.value)}
        onPDescriptionChange={(e) => setPDescription(e.target.value)}
        onPCategoryChange={(e) => setPCategory(e.target.value)}
      />

      <button type="submit" className="btn mt-2" onClick={submitHandler}>
      {loading?(<><Spinner animation="border" size="sm"/>Adding...</>) : 'Add Pizza'}
      </button>
      {anyVacantInput && (
        <Alert className="mt-4" variant="warning">
          Please fill all inputs.
        </Alert>
      )}
    </div>
  );
}
