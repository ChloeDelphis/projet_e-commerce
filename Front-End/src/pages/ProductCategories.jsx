import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  return (
    <div className="card">
      <div className="card_header">
        <p className="top">{data.top}</p>
        <h2>{data.center}</h2>
        <p className="bottom">{data.bottom}</p>
        <button>
          <Link className="card_btn" to={data.link}>
            See all
          </Link>
        </button>
      </div>
      <div className="card_img">
        <img src={data.img} alt="cateogry_image" />
      </div>
    </div>
  );
};

// La page listant les catégories de produits
const ProductCategories = () => {
  return (
    <div className="product_categories">
      <div className="header">
        <p className="top">Main category</p>
        <h2>Heading goes here</h2>
        <p className="bottom">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, qui.
        </p>
      </div>

      <div className="main">
        <div className="main_left">
          <CategoryCard data={categoryOne} />
        </div>
        <div className="main_right">
          <CategoryCard data={categoryTwo} />
          <CategoryCard data={categoryThree} />
          <CategoryCard data={categoryFour} />
          <CategoryCard data={categoryFive} />
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;

const categoryOne = {
  top: "Main category",
  center: "Main Category",
  bottom:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  link: "/",
  img: "./assets/components/cards/card_01.png",
};

const categoryTwo = {
  top: "Main category",
  center: "Main Category",
  bottom:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  link: "/",
  img: "./assets/components/cards/card_02.png",
};

const categoryThree = {
  top: "Main category",
  center: "Main Category",
  bottom:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  link: "/",
  img: "./assets/components/cards/card_03.png",
};

const categoryFour = {
  top: "Main category",
  center: "Main Category",
  bottom:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  link: "/",
  img: "./assets/components/cards/card_04.png",
};

const categoryFive = {
  top: "Main category",
  center: "Main Category",
  bottom:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  link: "/",
  img: "./assets/components/cards/card_05.png",
};
