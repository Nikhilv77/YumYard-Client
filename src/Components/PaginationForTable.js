import React from "react";

export default function Pagination({totalPizzas,pizzasPerPage,setCurrPage,currPage}) {
    let pages = [];
  for(let i = 1; i <= Math.ceil(totalPizzas/pizzasPerPage); i++){
   pages.push(i);
  }
  return <div className="b-3">
    {pages.map((page,index)=>{
        return <button className={currPage === page ? 'active':''} onClick={()=>setCurrPage(page)} key={index} >{page}</button>
    })}
  </div>;
}
