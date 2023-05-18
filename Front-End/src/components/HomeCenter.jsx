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

  // Traitement nouveautés
  let nouveautes = null;

  if (articles) {
    nouveautes = [...articles].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    nouveautes = nouveautes.slice(0, 4);
  }

  // Traitement petits prix
  let lowprices = null;

  if (articles) {
    lowprices = [...articles].sort((a, b) => a.prix - b.prix);
    lowprices = lowprices.slice(0, 4);
  }

  return (
    <div className="homepage_center">
      <DisplayHomeCenter articles={nouveautes} mea={dataMea.nouveautes} />
      <DisplayHomeCenter articles={lowprices} mea={dataMea.lowprices} />
    </div>
  );
};

const DisplayHomeCenter = ({ articles, mea }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="header_container">
          <div className="header_center">{mea.titre}</div>
        </div>
      </div>
      <div className="list">
        {articles &&
          articles.map((article, index) => (
            <div className="list__item" key={index}>
              <Link to={`/productpage/${article.ref}`}>
                <img
                  className="list__item__img"
                  src={article.img}
                  alt="product_image"
                />
                <h3 className="list__item__name">{article.nom}</h3>
                <h4 className="list__item__brand"> {article.marque}</h4>
                <p className="list__item__price">{article.prix},00€</p>
              </Link>
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
  lowprices: {
    titre: "Nos petits prix",
  },
};

export default HomeCenter;
