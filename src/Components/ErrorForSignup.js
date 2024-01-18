import React from "react";

export default function ErrorForSignup({error}) {
  return <div><div class="alert alert-danger" role="alert">
  {error}
</div></div>;
}
