import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import ErrorForEdit from "../../Components/ErrorForEdit";
import SuccessForEdit from "../../Components/SuccessForEdit";
import ProductFormForOthers from "./ProductForForOthers";
import { getBevarageByIdAction,editBevarage } from "../../Actions/BevarageActions";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function EditBevarage({productId}) {
  const [name, setName] = useState("");
  const [Price, setPrice] = useState();
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pCategory, setPCategory] = useState("");
  const { Bevarage, loading, error } = useSelector(
    (state) => state.getBevarageById
  );
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editBevarage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (Bevarage) {
      if (Bevarage._id === productId) {
        setName(Bevarage.name);
        setPrice(Bevarage.price);
        setPCategory(Bevarage.category);
        setPImage(Bevarage.image);
        setPDescription(Bevarage.description);
      } else {
        dispatch(getBevarageByIdAction(productId));
      }
    } else {
      dispatch(getBevarageByIdAction(productId));
    }
  }, [Bevarage, dispatch]);

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
    dispatch(editBevarage(editedProduct));
  };

  return (
    <div className="p-4">
      <form onSubmit={submitHandler}>
      {loading &&  <div style={{display:'flex',height:'60vh', justifyContent:'center'}}><ClipLoader className="m-auto" size={50}></ClipLoader></div>}
        {error && (
           <Alert className = 'mt-2' variant="danger" >Could not fetch Product, something went wrong!</Alert>
        )}
        {editError && (
         <Alert className = 'mt-2' variant="danger" >Could not update Product, something went wrong!</Alert>
        )}

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
        {editLoading? <><Spinner animation="border" size="sm"/>Editing...</>:'Edit Bevarage'}
        </button>
      </form>
    </div>
  );
}
