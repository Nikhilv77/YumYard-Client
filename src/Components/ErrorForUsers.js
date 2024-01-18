import React from "react";

export default function ErrorForUsers({error}) {
    function reloadHandler(){
        window.location.reload();
    }
  return <div><div class="alert alert-danger" role="alert">
  {error}
  <br />
  <br></br>
  <a style = {{textDecoration : 'underline'}}onClick={reloadHandler}>Click here to reload.</a>
</div>
</div>;
}
