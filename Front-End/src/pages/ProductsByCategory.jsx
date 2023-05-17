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

  // Info de brandSearchTerm (définie dans le composant OrderandFilter)
  const [brandSearchTerm, setBrandSearchTerm] = useState("");

  // Info de tri (définie dans le composant OrderandFilter)
  const [sortBy, setSortBy] = useState("newtoold");

  useEffect(() => {
    fetch(`http://localhost:8080/site/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCategorie(data));
  }, []);

  return (
    <div className="productsbycategory">
      {/* <div>La valeur de brandSearchTerm est : {brandSearchTerm}</div> */}
      {/* <div>La valeur de sortBy est : {sortBy}</div> */}
      <CategoryHeader data={categorie} />
      <OrderandFilter
        data={categorie}
        modifyBrandSearchTerm={setBrandSearchTerm}
        modifySortBy={setSortBy}
      />
      <CategoryDetail
        data={categorie}
        brandSearchTerm={brandSearchTerm}
        sortBy={sortBy}
      />
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

const OrderandFilter = ({ data, modifyBrandSearchTerm, modifySortBy }) => {
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

  const handleBrandSearchTerm = (e) => {
    // On récupère la valeur de la marque cliquée
    // console.log(e.target.value);
    let value = e.target.value;
    // On l'assigne à brandSearchTerm (useState du parent)
    modifyBrandSearchTerm(value);
  };

  const handleSortBy = (e) => {
    // On récupère la valeur du tri cliqué
    // console.log(e.target.value);
    let value = e.target.value;
    // On l'assigne à brandSearchTerm (useState du parent)
    modifySortBy(value);
  };

  return (
    <form className="orderandfilter">
      <div className="orderandfilter__order">
        <label className="orderandfilter__order__label">Trier par : </label>

        <select
          name="orderby"
          id="orderby"
          className="orderandfilter__order__choices"
          onChange={handleSortBy}
        >
          <option value="newtoold">Nouveautés en premier</option>
          <option value="priceasc">Prix croissants</option>
          <option value="pricedesc">Prix décroissants</option>
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
const CategoryDetail = ({ data, brandSearchTerm, sortBy }) => {
  const navigate = useNavigate();

  // Methode qui gère les liens vers le détail produit
  const handleClick = (ref) => {
    // console.log(ref);
    // console.log(typeof ref);
    navigate(`/productpage/${ref}`);
  };

  // On prend les données des articles dans un tableau sortedArticles
  const sortedArticles = data && [...data.articles];

  // Quand sortedArticles est rempli on le trie selon ce qu'on veut
  if (sortedArticles) {
    if (sortBy === "newtoold") {
      sortedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "priceasc") {
      sortedArticles.sort((a, b) => a.prix - b.prix);
    } else if (sortBy === "pricedesc") {
      sortedArticles.sort((a, b) => b.prix - a.prix);
    }
  }

  return (
    <div className="list">
      {sortedArticles &&
        sortedArticles
          .filter((val) => val.marque.includes(brandSearchTerm))
          .map((val, index) => (
            <div
              className="list__item"
              key={index}
              onClick={() => handleClick(val.ref)}
            >
              <img
                className="list__item__img"
                src={val.img}
                alt="product_image"
              />
              <h3 className="list__item__name">{val.nom}</h3>
              <h4 className="list__item__brand"> {val.marque}</h4>
              <p className="list__item__price">{val.prix},00 €</p>
            </div>
          ))}
    </div>
  );
};

export default ProductsByCategory;
