import React from "react";

export default function ErrorForEdit({error}) {
    function reloadHandler(){
        window.location.href = '/admin/products';
    }
  return <div><div class="alert alert-danger" role="alert">
  {error}
  <br />
  <br></br>
  <a style = {{textDecoration : 'underline'}}onClick={reloadHandler}>Click here to go to products.</a>
</div>
</div>;
}
