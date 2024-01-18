import React from "react";
export default function SuccessForEdit({successMessage}){
    function reloadHandler(){
        window.location.href = '/admin/products';
    }
  return <div><div class="alert alert-success" role="alert">
  {successMessage} 
  <br />
  <br></br>
  <a style={{textDecoration : 'underline'}} onClick={reloadHandler}>Check Products by clicking here.</a>
</div></div>
}
