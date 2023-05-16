import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Page qui affiche tous les produits en fonction d'une catégorie
const ProductsByCategory = () => {
  // id de la catégorie à afficher
  const { id } = useParams();

  const [categorie, setCategorie] = useState();

  useEffect(() => {
    console.log(id);

    fetch(`http://localhost:8080/site/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCategorie(data));
  }, []);

  return (
    <div className="productsbycategory">
      <CategoryHeader data={categorie} />
      <OrderandFilter />
      <CategoryDetail data={categorie} />
    </div>
  );
};

const CategoryHeader = ({ data }) => {
  return (
    <div className="header">
      <h1 className="header__title">{data && data.name}</h1>
      <h2 className="header__description">{data && data.name}</h2>
    </div>
  );
};

const OrderandFilter = () => {
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
        <label className="orderandfiler__filter__label">
          Filtrer par marque :
        </label>
        <select
          name="orderby"
          id="orderby"
          className="shopping__buy__filter__choices"
        >
          {/* {data.categorie.articles.map((item, index) => (
            <option key={index} value="priceasc">
              {item.marque}
            </option>
          ))} */}
        </select>
      </div>
    </form>
  );
};

// Component qui affiche une catégorie en dynamique
const CategoryDetail = ({ data }) => {
  return (
    <div className="list">
      {data &&
        data.articles.map((item, index) => (
          <div className="list__item" key={index}>
            <img
              className="list__item__img"
              src={item.img}
              alt="product_image"
            />
            <h3 className="list__item__name">{item.nom}</h3>
            <h4 className="list__item__brand"> {item.marque}</h4>
            <p className="list__item__price">{item.prix},00 €</p>
          </div>
        ))}
    </div>
  );
};

export default ProductsByCategory;
