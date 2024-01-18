
const ConfirmForDelete = ({ message, onYes, onNo}) => {
  
  return (
    <div style={{ fontFamily: "'Tinos', serif"}} className="confirmation-dialog mt-3">
      <p style={{fontSize:'1.2rem'}}>{message}
        <p style={{fontSize:'1.2rem'}}>Note: This will permanently delete your account.<p> If you click "Yes", your account will be deleted and you will be logged out.</p></p>
      </p>
      <div className="button-container">
         <button className="yes-button" onClick={onYes}>
          Yes
        </button>
        <button className="no-button" onClick={onNo}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmForDelete;