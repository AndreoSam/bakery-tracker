import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Products from "../Components/Products/Products";
import Header from "../Header/Header";
import Edit from "../Components/Products/Edit";
import AddProduct from "../Components/Products/AddProduct";

const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Products />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="addprod" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default Routing;
