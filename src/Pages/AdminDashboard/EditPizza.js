
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIdAction } from "../../Actions/PizzaAction";
import { editProduct } from "../../Actions/PizzaAction";
import Loader from "../../Components/Loader";
import ErrorForEdit from "../../Components/ErrorForEdit";
import SuccessForEdit from "../../Components/SuccessForEdit";
import ProductForm from "./ProductForm";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function EditPizza({pizzaId}) {
  const [name, setName] = useState("");
  const [sPrice, setSPrice] = useState();
  const [mPrice, setMPrice] = useState();
  const [lPrice, setLPrice] = useState();
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("");
  const { product, loading, error } = useSelector(
    (state) => state.getProductById
  );
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      if (product._id === pizzaId) {
        setName(product.name);
        setSPrice(product.prices[0]["small"]);
        setMPrice(product.prices[0]["medium"]);
        setLPrice(product.prices[0]["large"]);
        setPCategory(product.category);
        setPImage(product.image);
        setPDescription(product.description);
      } else {
        dispatch(getProductByIdAction(pizzaId));
      }
    } else {
      dispatch(getProductByIdAction(pizzaId));
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const editedProduct = {
      _id: pizzaId,
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
    dispatch(editProduct(editedProduct));
  };

  return (
    <div className="p-4">
      <form onSubmit={submitHandler}>
      {loading &&  <div style={{display:'flex',height:'70vh', justifyContent:'center'}}><ClipLoader className="m-auto" size={50}></ClipLoader></div>}
        {error && (
           <Alert className = 'mt-2' variant="danger" >Could not fetch Product, something went wrong!</Alert>
        )}
        {editError && (
         <Alert className = 'mt-2' variant="danger" >Could not update Product, something went wrong!</Alert>
        )}

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

<button type="submit" className="btn mt-2">
      {editLoading? <><Spinner animation="border" size="sm"/>Editing...</>:'Edit Pizza'}
        </button>
      </form>
    </div>
  );
}
