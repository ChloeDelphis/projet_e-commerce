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
      <OrderandFilter data={dataOne} />
      <CategoryDetail data={dataOne} />
    </div>
  );
};

const CategoryHeader = ({ data }) => {
  return (
    <div className="header">
      <h1 className="header__title">{data.categorie.name}</h1>
      <h2 className="header__description">{data.categorie.description}</h2>
    </div>
  );
};

const OrderandFilter = ({ data }) => {
  return (
    <form className="orderandfilter">
      <div className="orderandfilter__order">
        <label className="orderandfilter__order__label">Trier par : </label>

        <select
          name="orderby"
          id="orderby"
          className="orderandfilter__order__choices"
        >
          <option value="priceasc">prix croissants</option>
          <option value="pricedesc">prix décroissants</option>
          <option value="newtoold">nouveautés en premier</option>
        </select>
      </div>
      <div className="orderandfilter__filter">
        <label className="orderandfiler__filter__label">Filtrer par :</label>
        <select
          name="orderby"
          id="orderby"
          className="shopping__buy__filter__choices"
        >
          <option value="priceasc">Marque 1</option>
          <option value="pricedesc">Marque 1</option>
          <option value="newtoold">Marque 1</option>
        </select>
      </div>
    </form>
  );
};

// Component qui affiche une catégorie en dynamique
const CategoryDetail = ({ data }) => {
  return (
    <div className="list">
      {data.categorie.articles.map((item, index) => (
        <div className="list__item" key={index}>
          <img className="list__item__img" src={item.img} alt="product_image" />
          <h3 className="list__item__name">{item.nom}</h3>
          <h4 className="list__item__brand"> {item.marque}</h4>
          <p className="list__item__price">{item.prix},00 €</p>
        </div>
      ))}
    </div>
  );
};

const dataOne = {
  categorie: {
    id: 1,
    name: "T-shirts",
    description: "Des t-shirts à la coule",
    image: null,
    mea: 0,
    articles: [
      {
        ref: 101,
        nom: "Led Zeppelin",
        marque: "Music",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
        prix: 35.0,
        img: "../assets/products/1_t-shirts/1.jpg",
        mea: 0,
        date: "2022-03-02T00:00:00.000+0000",
      },
      {
        ref: 102,
        nom: "Country Roads",
        marque: "Music",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
        prix: 30.0,
        img: "../assets/products/1_t-shirts/2.jpg",
        mea: 0,
        date: "2022-03-03T00:00:00.000+0000",
      },
      {
        ref: 103,
        nom: "Cactus & Bloom",
        marque: "In Bloom",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
        prix: 25.0,
        img: "../assets/products/1_t-shirts/3.jpg",
        mea: 0,
        date: "2022-03-04T00:00:00.000+0000",
      },
      {
        ref: 104,
        nom: "Flower Charts",
        marque: "In Bloom",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
        prix: 20.0,
        img: "../assets/products/1_t-shirts/4.jpg",
        mea: 0,
        date: "2022-04-01T00:00:00.000+0000",
      },
      {
        ref: 105,
        nom: "Marguerite",
        marque: "In Bloom",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
        prix: 24.0,
        img: "../assets/products/1_t-shirts/5.jpg",
        mea: 0,
        date: "2022-05-01T00:00:00.000+0000",
      },
      {
        ref: 106,
        nom: "Since 1971",
        marque: "Vintage",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
        prix: 22.0,
        img: "../assets/products/1_t-shirts/6.jpg",
        mea: 0,
        date: "2022-06-01T00:00:00.000+0000",
      },
    ],
  },
};

export default ProductsByCategory;
