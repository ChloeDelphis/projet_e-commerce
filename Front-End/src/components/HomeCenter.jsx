import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Affiche les produits mis en avant selo
const HomeCenter = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/site/articles`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className="homepage_center">
      <DisplayHomeCenter articles={articles} mea={dataMea.nouveautes} />
    </div>
  );
};

const DisplayHomeCenter = ({ articles, mea }) => {
  let sortedArticles = null;

  if (articles) {
    sortedArticles = [...articles].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    sortedArticles = sortedArticles.slice(0, 4);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header_container">
          <div className="header_center">{mea.titre}</div>
        </div>
      </div>
      <div className="list">
        {sortedArticles &&
          sortedArticles.map((article, index) => (
            <div className="list__item" key={index}>
              <img
                className="list__item__img"
                src={article.img}
                alt="product_image"
              />
              <h3 className="list__item__name">{article.nom}</h3>
              <h4 className="list__item__brand"> {article.marque}</h4>
              <p className="list__item__price">{article.prix},00€</p>
            </div>
          ))}
      </div>
    </div>
  );
};

const dataMea = {
  nouveautes: {
    titre: "Nos dernières nouveautés",
  },
  petitsprix: {
    titre: "Nos petits prix",
  },
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
