import React, { useEffect, useState } from "react";
import Pagination from "../../Components/PaginationForAdmin";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllContactsActions } from "../../Actions/ContactActions";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import { useMemo } from "react";
import './AdminContacts.css'
const AdminContacts =  () => {
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllContactsActions());
  }, []);
  const { Contacts, loading, error } = useSelector((state) => state.Contacts);
  console.log(Contacts);
  const sortedContacts = useMemo(
    () =>
     Contacts && Contacts.length > 0
        ? Contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [],
    [Contacts]
  );

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
      <div >
        <div style={{ display: "flex", height: "85vh", justifyContent: "center" }}>
          <Alert className="m-auto"  style={{maxWidth:'300px'}} variant="danger">Something went wrong!</Alert>
        </div>
      </div>
    );
  }

  if (!loading && !error && Contacts.length < 1) {
    return (
      <>
      <div
      style={{display : 'flex',height:'80vh', justifyContent:'center'}}
      >

<img src="/empty-item.webp" style={{maxHeight:'600px',maxWidth:'500px', margin:'auto'}}></img>
      </div>
      </>
    );
  }

  const lastPizzaIndex = 6 * currPage;
  const firstIndex = lastPizzaIndex - 6;
  const pagedContacts = sortedContacts.slice(firstIndex, lastPizzaIndex);
  return (
    <div
      
 className="overflow-x-auto"
    >
      <table className=" tableForContacts mx-auto rounded mt-3 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-start">Date & Sender Information</th>
            <th className="py-2 px-4 border-b">Sender Status</th>
            <th className="py-2 px-4 border-b">Message Type</th>
            <th className="py-2 px-4 border-b text-center">Message</th>
          </tr>
        </thead>

        <tbody>
          {pagedContacts.map((contact) => (
            <tr key={contact._id} className="border border-gray-300">
              <td className="py-2 px-4 text-start break-email">
              {new Date(contact.createdAt).toLocaleDateString()},
                <br />{new Date(contact.createdAt).toLocaleTimeString()},
                <br />
                {contact.name},
                <br />{contact.email},<br />{contact.number},
                <br />
               
              </td>
              <td className="py-2 px-4 break-email">
                {contact.isCustomer ? (
                  <>
                    <img
                      style={{ height: "50px", width: "50px" }}
                      src="/customer-icon.jpg"
                      alt="customer icon"
                      className="object-cover rounded"
                    />
                    <br />
                    <span>Customer</span>
                  </>
                ) : (
                  <>
                    <img
                      style={{ height: "50px", width: "50px" }}
                      src="/no-customer-icon.png"
                      alt="customer icon"
                      className="object-cover rounded"
                    />
                    <br />
                    <span>Visitor</span>
                  </>
                )}
              </td>
              <td style={{ whiteSpace: 'pre-line' }} className="py-2 px-4">{contact.category}</td>
              <td className="py-2 px-4 break-email">{contact.message}</td>
            </tr>
          ))}
            <tr>
              <td colSpan="4">
                <div className="flex justify-center items-center">
                <Pagination
        totalPizzas={Contacts.length}
        pizzasPerPage={6}
        setCurrPage={setCurrPage}
        currPage={currPage}
      />
                </div>
              </td>
            </tr>
        </tbody>
      </table>
     
    </div>
  );
};
export default AdminContacts;


/* return (
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
        {deliveryLoading && <Loader></Loader>}
        {success && (
          <SuccessForUsers successMessage="Product deleted successfully!"></SuccessForUsers>
        )}
        {deliveryError && (
          <ErrorForUsers error="Could not delete, something went wrong!"></ErrorForUsers>
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
  ); */
