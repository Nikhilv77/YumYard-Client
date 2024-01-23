import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { downloadDonationReceiptAction, saveThroughSessionDonation } from "../../Actions/DonationActions";
import { useDispatch } from "react-redux";

const DonationSuccessful = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const[receiptLoading,setReceiptLoading] = useState(false);
  let transactionId;
  useEffect(()=>{
    const params = new URLSearchParams(location.search)
     transactionId = params.get("session_id")
    if(!transactionId){
      navigate('/404')
    }
    if(transactionId){
      dispatch(saveThroughSessionDonation(transactionId))
    }
  },[location,navigate])

  const handleDownloadReceipt  = async()=>{
  try {
    setReceiptLoading(true)
    const Receipt = await dispatch(downloadDonationReceiptAction(transactionId));
    
    const pdfUIntArray = new Uint8Array(Receipt)
    const blob = new Blob([pdfUIntArray],{type:'application/pdf'})
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob)
    link.download = `DonationReceipt ${transactionId}.pdf`
    link.click()
  } catch (error) {
    console.log(error);
    setReceiptLoading(false)
  }finally{
    setReceiptLoading(false)
  }
  
  }
  return (
    <div style={{display:'flex'}} className="text-center justify-content-center mt-5 mb-5">
     

      <Card style={{  fontFamily: "'Tinos', serif", fontSize:'1.2rem',  margin: "10px",maxWidth: "500px",borderRadius:'10px' }}>
        <Card.Img
          variant="top"
          src={process.env.PUBLIC_URL + "/order-successful.jpg"}
          alt="order-placed"
        />
        <Card.Body>
          <Card.Title style={{fontSize:'1.8rem'}}>Thanks for the Donation!</Card.Title>
          <Card.Text>
            Thank you for being a kind person. Your donation will feed many homeless and orphan kids across India
            .
          </Card.Text>
          <Button style={{fontSize:'1.2rem'}} variant="success" onClick={handleDownloadReceipt}>
            {receiptLoading?<>Downloading...<Spinner size="sm" animation="border"/></>:'Download Receipt'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DonationSuccessful;
