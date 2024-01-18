import React from "react";
export default function Error({error}) {
  return <div style={{ marginTop: "50px"}}><div style = {{width: "700px", marginLeft : '420px' }} class="alert alert-danger" role="alert">
  {error}
</div></div>;
}
