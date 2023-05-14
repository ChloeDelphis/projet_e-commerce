import React from "react";
import { Link } from "react-router-dom";

// Component qui affiche une catégorie en dynamique
const Category = ({ data }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="header_container">
          <div className="header_up">{data.header.top}</div>
          <div className="header_center">{data.header.center}</div>
        </div>
      </div>
      <div className="items_display">
        {data.products.list.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.img} alt="product_image" />
            <p className="item_name">{item.name}</p>
            <p className="item_price">${item.price}.00</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// La page (modèle) qui liste les produits/articles.
// On peut la réutiliser dynamiquement pour afficher tout type de produits
const ProductList = () => {
  return (
    <div className="productList">
      <div className="header">
        <h1>Main Category Name</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="list">
        <Category data={dataOne} />
        <Category data={dataOne} />
        <Category data={dataOne} />
        <Category data={dataOne} />
      </div>
    </div>
  );
};

export default ProductList;

const dataOne = {
  header: {
    top: "Main category name",
    center: "Sub Category Name",
  },
  products: {
    list: [
      {
        img: "./assets/components/homecenter/product_01.png",
        name: "Product name",
        price: 55.0,
      },
      {
        img: "./assets/components/homecenter/product_02.png",
        name: "Product name",
        price: 55.0,
      },
      {
        img: "./assets/components/homecenter/product_03.png",
        name: "Product name",
        price: 55.0,
      },
      {
        img: "./assets/components/homecenter/product_04.png",
        name: "Product name",
        price: 55.0,
      },
    ],
  },
};
