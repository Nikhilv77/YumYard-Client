// ProductForm.js
import React from "react";

const ProductFormForOthers = ({
  name,
  Price,
  pImage,
  pDescription,
  pCategory,
  onNameChange,
  onPriceChange,
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
              <div className="col-sm-12">
                <input
                  required
                  onChange={onNameChange}
                  className="form-control"
                  value={name}
                  type="text"
                  placeholder="Name of the product"
                  style={inputStyle}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              <div className="col-sm-12">
                <input
                  required
                  onChange={onPriceChange}
                  className="form-control"
                  value={Price}
                  type="number"
                  placeholder="Product Price"
                  style={inputStyle}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Category</td>
            <td>
              <div className="col-sm-12">
                <input
                  required
                  onChange={onPCategoryChange}
                  className="form-control"
                  value={pCategory}
                  type="text"
                  placeholder="Product Category"
                  style={inputStyle}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>
              <div className="col-sm-12">
                <input
                  required
                  onChange={onPImageChange}
                  className="form-control"
                  value={pImage}
                  type="text"
                  placeholder="Product Image"
                  style={inputStyle}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <div className="col-sm-12">
                <input
                  required
                  onChange={onPDescriptionChange}
                  className="form-control"
                  value={pDescription}
                  type="text"
                  placeholder="Product Description"
                  style={inputStyle}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductFormForOthers;
