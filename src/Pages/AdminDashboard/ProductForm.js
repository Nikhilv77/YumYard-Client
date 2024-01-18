// ProductForm.js
import React from "react";

const ProductForm = ({
  name,
  sPrice,
  mPrice,
  lPrice,
  pImage,
  pDescription,
  pCategory,
  onNameChange,
  onSPriceChange,
  onMPriceChange,
  onLPriceChange,
  onPImageChange,
  onPDescriptionChange,
  onPCategoryChange,
}) => {
  const inputStyle = { width: "100%",minWidth:'200px' };

  return (
    <div className="table-responsive">
      <table style={{ boxShadow: "none", width: "100%" }} className="table">
        <tbody>
          <tr>
            <td>Product Name</td>
            <td>
              <input
                required
                onChange={onNameChange}
                className="form-control"
                value={name}
                type="text"
                placeholder="Name of the product"
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td>Small Price</td>
            <td>
              <input
                required
                onChange={onSPriceChange}
                className="form-control"
                value={sPrice}
                type="number"
                placeholder="Small Price"
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td>Medium Price</td>
            <td>
              <input
                required
                onChange={onMPriceChange}
                className="form-control"
                value={mPrice}
                type="number"
                placeholder="Medium Price"
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td>Large Price</td>
            <td>
              <input
                required
                onChange={onLPriceChange}
                className="form-control"
                value={lPrice}
                type="number"
                placeholder="Large Price"
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td>Category</td>
            <td>
              <input
                required
                onChange={onPCategoryChange}
                className="form-control"
                value={pCategory}
                type="text"
                placeholder="Product Category"
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>
              <input
                required
                onChange={onPImageChange}
                className="form-control"
                value={pImage}
                type="text"
                placeholder="Product Image"
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <input
                required
                onChange={onPDescriptionChange}
                className="form-control"
                value={pDescription}
                type="text"
                placeholder="Product Description"
                style={inputStyle}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductForm;
