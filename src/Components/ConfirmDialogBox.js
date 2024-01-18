import React, { useEffect, useState } from 'react';

const ConfirmationDialog = ({ message, onYes, onNo,orderDate}) => {
  const[disbleYes,setDisableYes] = useState(false);
  const orderD = orderDate
  useEffect(()=>{
    const currentDate = new Date();
    const dateOfOrder = new Date(orderD);
    const timeDifference = currentDate - dateOfOrder;
    if(timeDifference > 3 * 60 * 1000){
      setDisableYes(true)
    }
  },[orderD])
  return (
    <div className="confirmation-dialog" style={{color:'whitesmoke'}}>
      <p>{message}
        <p>Note: Order can not be Cancelled after 3 minutes of placing the order.<p> If you cancel, your money shall be refunded within 4 hours.</p></p>
      </p>
      <div className="button-container">
         <button disabled = {disbleYes} className="yes-button" onClick={onYes}>
          Yes
        </button>
        <button className="no-button" onClick={onNo}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
