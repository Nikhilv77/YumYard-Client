import React from "react";
export default function Success({ successMessage }) {
  return (
    <div style={{ marginTop: "50px"}}>
      <div style = {{width: "700px", marginLeft : '420px' }}class="alert alert-success" role="alert">
        {successMessage}
      </div>
    </div>
  );
}
