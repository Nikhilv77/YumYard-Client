import React from "react";
export default function SuccessForUsers({successMessage}){
  return <div><div class="alert alert-success text-center" role="alert">
  {successMessage} 
  <br />
  <br></br>
  <a style={{textDecoration : 'underline'}}></a>
</div></div>
}
