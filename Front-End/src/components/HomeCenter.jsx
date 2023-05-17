import React from "react";
import { Link } from "react-router-dom";

const HomeCenter = () => {
  return (
    <div className="homepage_center">
      <DisplayHomeCenter data={dataTrending} />
    </div>
  );
};

const DisplayHomeCenter = ({ data }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="header_container">
          <div className="header_center">Nos petits prix</div>
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

const dataTrending = {
  header: {
    top: "Trending",
    center: "Trending Products",
    bottom: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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

const dataOffers = {
  header: {
    top: "Offers & Promotion",
    center: "Offers & Promotion Products",
    bottom: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  products: {
    list: [
      {
        img: "./assets/components/homecenter/product_05.png",
        name: "Product name",
        price: 55.0,
      },
      {
        img: "./assets/components/homecenter/product_06.png",
        name: "Product name",
        price: 55.0,
      },
      {
        img: "./assets/components/homecenter/product_07.png",
        name: "Product name",
        price: 55.0,
      },
      {
        img: "./assets/components/homecenter/product_08.png",
        name: "Product name",
        price: 55.0,
      },
    ],
  },
};

export default HomeCenter;
