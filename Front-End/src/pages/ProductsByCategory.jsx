import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Page qui affiche tous les produits en fonction d'une catégorie
const ProductsByCategory = () => {
  // id de la catégorie à afficher
  const { id } = useParams();

  return (
    <div className="productsbycategory">
      <CategoryHeader data={dataOne} />
      <CategoryDetail data={dataOne} />
    </div>
  );
};

const CategoryHeader = ({ data }) => {
  return (
    <div className="header">
      <h1 className="header__title">{data.header.titre}</h1>
      <h2 className="header__description">{data.header.description}</h2>
    </div>
  );
};

// Component qui affiche une catégorie en dynamique
const CategoryDetail = ({ data }) => {
  return (
    <div className="list">
      {data.products.list.map((item, index) => (
        <div className="list__item" key={index}>
          <img className="list__item__img" src={item.img} alt="product_image" />
          <h3 className="list__item__name">{item.name}</h3>
          <h4 className="list__item__brand"> {item.brand}</h4>
          <p className="list__item__price">{item.price},00 €</p>
        </div>
      ))}
    </div>
  );
};

const dataOne = {
  header: {
    titre: "T-shirts",
    description: "Des t-shirts à la coule",
  },
  products: {
    list: [
      {
        img: "../assets/products/1_t-shirts/1.jpg",
        name: "Product name",
        brand: "Product brand",
        price: 55.0,
      },
      {
        img: "../assets/products/1_t-shirts/2.jpg",
        name: "Product name",
        brand: "Product brand",
        price: 55.0,
      },
      {
        img: "../assets/products/1_t-shirts/3.jpg",
        name: "Product name",
        brand: "Product brand",
        price: 55.0,
      },
      {
        img: "../assets/products/1_t-shirts/4.jpg",
        name: "Product name",
        brand: "Product brand",
        price: 55.0,
      },
      {
        img: "../assets/products/1_t-shirts/5.jpg",
        name: "Product name",
        brand: "Product brand",
        price: 55.0,
      },
      {
        img: "../assets/products/1_t-shirts/4.jpg",
        name: "Product name",
        brand: "Product brand",
        price: 55.0,
      },
    ],
  },
};

export default ProductsByCategory;
