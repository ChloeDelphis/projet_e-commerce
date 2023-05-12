import React from "react";
import { useParams } from "react-router-dom";

// La page du detail d'un produit
const ProductPage = () => {
  // id du produit à afficher
  const { id } = useParams();

  return <div className="">Je suis la page du détail du produit {id}</div>;
};

export default ProductPage;
