
import React from "react";
import Modal from "react-modal";

export const AddProductsModalForOtherProducts = ({
  Children,
  isOpen,
  onRequestClose,
}) => {
  const customStyles = {
    content: {
      width: "70%",
      margin: "auto",
      maxHeight: "70vh",
      overflow: "auto",
      borderRadius: "10px",
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const mediaQuery = window.matchMedia("(max-width: 1024px)");
  if (mediaQuery.matches) {
    customStyles.content.width = "80%";
  }

 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Product"
      style={customStyles}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onRequestClose}
          style={{ cursor: "pointer", border: "none", background: "none" }}
        >
          <span style={{ fontSize: "20px" }}>X</span>
        </button>
      </div>
      {Children}
    </Modal>
  );
};
