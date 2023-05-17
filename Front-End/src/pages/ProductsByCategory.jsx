import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Page qui affiche tous les produits en fonction d'une catégorie
const ProductsByCategory = () => {
  // id de la catégorie à afficher
  const { id } = useParams();

  // On stocke les infos sur la catégorie récupérées depuis la bdd
  const [categorie, setCategorie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/site/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCategorie(data));
  }, []);

  return (
    <div className="productsbycategory">
      <CategoryHeader data={categorie} />
      <OrderandFilter data={categorie} />
      <CategoryDetail data={categorie} />
    </div>
  );
};

const CategoryHeader = ({ data }) => {
  return (
    <div className="header">
      <h1 className="header__title">{data && data.name}</h1>
      <h2 className="header__description">{data && data.description}</h2>
    </div>
  );
};

const OrderandFilter = ({ data }) => {
  // Quand data est là on demande de remplir le tableau des marques sans doublon
  useEffect(() => {
    if (data) {
      makeBrands(data);
    }
  }, [data]);

  const [brands, setBrands] = useState([]);

  // Methode qui retourne les marques sans doublon et les assigne au useState brands :
  const makeBrands = (categorie) => {
    // On recup les marques
    let a = data.articles.map((item, index) => {
      return item.marque;
    });
    // On retire les doublons
    let b = a.filter((x, i) => {
      return a.indexOf(x) === i;
    });

    // On assigne les marques sans doublon au useState brands
    setBrands(b);

    // Verif des types et valeurs
    // console.log("typeof a = " + typeof a);
    // console.log("a = " + a);
    // console.log("typeof b = " + typeof b);
    // console.log("b = " + b);
    // console.log("typeof brands = " + typeof brands);
    // console.log("brands = " + brands);
  };

  // On stocke la marque qui a été cliquée dans le select
  const [brandSearchTerm, setbrandSearchTerm] = useState("");

  const handleBrandSearchTerm = (e) => {
    // On récupère la valeur de la marque cliquée
    // console.log(e.target.value);
    let value = e.target.value;
    // On l'assigne à brandSearchTerm
    setbrandSearchTerm(value);
  };

  // console.log(brandSearchTerm);

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
        <label className="orderandfiler__filter__brandlabel">
          Filtrer par marque :
        </label>
        <select
          name="brands"
          id="brands"
          className="shopping__buy__filter__brandchoices"
          onChange={handleBrandSearchTerm}
        >
          <option value="">Toutes les marques</option>
          {brands.map((marque) => {
            return <option value={marque}>{marque}</option>;
          })}
        </select>
      </div>
    </form>
  );
};

// Component qui affiche une catégorie en dynamique
const CategoryDetail = ({ data }) => {
  const navigate = useNavigate();

  // redirect to the item page
  const handleClick = (ref) => {
    // console.log(ref);
    // console.log(typeof ref);
    navigate(`/productpage/${ref}`);
  };

  return (
    <div className="list">
      {data &&
        data.articles.map((item, index) => (
          <div
            className="list__item"
            key={index}
            onClick={() => handleClick(item.ref)}
          >
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
