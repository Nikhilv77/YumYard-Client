import React from "react";

export default function Error({error}) {
  return <div><div style={{fontSize : '30px', marginTop :'200px', width : '500px', marginLeft : '400px'}} class="alert alert-danger" role="alert">
  {error}
</div></div>;
}
