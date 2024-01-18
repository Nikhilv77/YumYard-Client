import React from "react";
import ProductSidebar from "./ProductSidebar";
import { Routes, Route, Link } from "react-router-dom";
import IndianMealsPage from "./IndianMealsPage";
import PizzaPage from "./PizzaPage";
import BurgerPage from "./BurgerPage";
import BevaragePage from "./BevaragesPage";
import SidesPage from "./SidesPage";

export default function Products() {
  return (
    <div>
      <ProductSidebar></ProductSidebar>
      <Routes>
        <Route path="" element={<IndianMealsPage></IndianMealsPage>}>
          {" "}
        </Route>
        <Route path="pizzas" element={<PizzaPage></PizzaPage>}>
          {" "}
        </Route>
        <Route path="burgers" element={<BurgerPage></BurgerPage>}>
          {" "}
        </Route>
        <Route path="bevarages" element={<BevaragePage></BevaragePage>}>
          {" "}
        </Route>
        <Route path="sides" element={<SidesPage></SidesPage>}>
          {" "}
        </Route>
      </Routes>
    </div>
  );
}
