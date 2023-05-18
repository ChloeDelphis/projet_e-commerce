import React from "react";
import { Link } from "react-router-dom";

// La page listant les catégories de produits
const ProductCategories = () => {
  return (
    <div className="product_categories">
      <div className="header">
        <h2>Toutes nos catégories</h2>
        <p className="bottom">
          Découvrez une sélection exclusive de vêtements tendance qui vous
          permettront de vous démarquer avec style. Exprimez votre personnalité
          et faites sensation avec nos collections soigneusement choisies pour
          vous.
        </p>
      </div>

      <div className="main">
        <CategoryCard data={categoryOne} />
        <CategoryCard data={categoryTwo} />
        <CategoryCard data={categoryThree} />
        <CategoryCard data={categoryFour} />
        <CategoryCard data={categoryFive} />
      </div>
    </div>
  );
};

const CategoryCard = ({ data }) => {
  return (
    <Link to={data.link}>
      <div className="card">
        <div className="card_header">
          <h2>{data.center}</h2>
          <p className="bottom">{data.bottom}</p>
          <button>
            <Link className="card_btn" to={data.link}>
              Voir nos articles
            </Link>
          </button>
        </div>
        <div className="card_img">
          <img src={data.img} alt="cateogry_image" />
        </div>
      </div>
    </Link>
  );
};

const categoryOne = {
  center: "T-Shirts",
  bottom:
    "Affichez votre personnalité avec nos t-shirts originaux et faites sensation en un seul clic !",
  link: "/category/1",
  img: "./assets/components/cards/card_02.png",
};

const categoryTwo = {
  center: "Pulls",
  bottom:
    "Emmitouflez-vous dans nos pulls confortables et adoptez un look cosy en un clic !",
  link: "/category/2",
  img: "./assets/components/cards/card_02.png",
};

const categoryThree = {
  center: "Pantalons",
  bottom:
    "Découvrez notre collection de pantalons pour un style élégant et moderne en un seul clic !",
  link: "/category/3",
  img: "./assets/components/cards/card_03.png",
};

const categoryFour = {
  center: "Jupes",
  bottom:
    "Révélez votre féminité avec nos jupes tendance et créez des looks uniques en un clic !",
  link: "/category/4",
  img: "./assets/components/cards/card_04.png",
};

const categoryFive = {
  center: "Robes",
  bottom:
    "Enfilez nos robes raffinées et soyez la star de chaque occasion en un seul clic !",
  link: "/category/5",
  img: "./assets/components/cards/card_05.png",
};

export default ProductCategories;
