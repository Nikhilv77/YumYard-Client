import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, removeUser } from "../../Actions/UserRegActions";

import Pagination from "../../Components/PaginationForAdmin";
import { FaTrashAlt } from "react-icons/fa";
import './AdminUsers.css';
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";

export default function AdminUsers() {
  const [currPage, setCurrPage] = useState(1);
  const { Users, loading, error } = useSelector((state) => state.users);
  const { removedLoading, success, removedError } = useSelector(
    (state) => state.removeUser
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [success]);

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

  if (!loading && !error && Users.length < 1) {
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


  const lastUserIndex = 6 * currPage;
  const firstIndex = lastUserIndex - 6;
  const pagedUsers = Users.slice(firstIndex, lastUserIndex);

  return (
    <div className="overflow-x-auto">
      {removedLoading &&  <div
          style={{ display: "flex", height: "88vh", justifyContent: "center" }}
         
        >
          <ClipLoader className="m-auto" size={60}></ClipLoader>
        </div>}
      {success && (
        <Alert style={{fontSize:'1.2rem'}} className="mt-3 text-center" variant="success">User removed successfully.</Alert>
      )}
      {removedError && (
         <Alert style={{fontSize:'1.2rem'}} className="mt-1 text-center" variant="danger">Could not remove user, something went wrong!</Alert>
      )}
      <div className="table-responsive">
        <table className="tableForUsers mx-auto rounded mt-3">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pagedUsers.map((user) => (
              <tr key={user._id} className="border border-gray-300">
                <td className="py-2 px-4 break-email">
                  <strong>{user.name}</strong>
                </td>
                <td className="py-2 px-4 break-email">
                  {user.isAdmin ? (
                    <>
                      <img
                        style={{ height: "60px", width: "60px" }}
                        src="/admin-icon.jpg"  // Replace with the correct URL or filename
                        alt="admin"
                        className="object-cover rounded"
                      />
                      <br />
                      <span>Admin</span>
                    </>
                  ) : (
                    <>
                      <img
                        style={{ height: "60px", width: "60px" }}
                        src="/customer-icon.jpg"  // Replace with the correct URL or filename
                        alt="customer"
                        className="object-cover rounded"
                      />
                      <br />
                      <span>Customer</span>
                    </>
                  )}
                </td>

                <td className="py-2 px-4 break-email">
                  <strong>{user.email},</strong>
                  <br />
                  <strong>{user.number}</strong>
                </td>
                <td className="py-2 px-4">
                  <FaTrashAlt
                    className="m-1 trash-icon"
                    onClick={() => {
                      dispatch(removeUser(user._id,'adminAction'));
                    }}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">
                <div className="flex justify-center items-center">
                  <Pagination
                    totalPizzas={Users.length}
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
    </div>
  );
}
