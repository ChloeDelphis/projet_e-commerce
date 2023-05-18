import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

const HomeTop = () => {
  const [categorieMea, setCategorieMea] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/site/categories/mea/1`)
      .then((res) => res.json())
      .then((data) => setCategorieMea(data));
  }, []);

  // console.log(categorieMea);

  return (
    <div className="homepage_top">
      {/* partie gauche */}
      <div className="top_left">
        <h1>
          Les {categorieMea && categorieMea.name.toLowerCase()} sont à l'honneur
          !
        </h1>
        <p>{categorieMea && categorieMea.description}</p>
        <button>
          <Link to={`/category/${categorieMea && categorieMea.id}`}>
            Tout voir
          </Link>
        </button>
      </div>

      {/* partie droite */}
      <div className="top_right">
        <Carousel articles={categorieMea && categorieMea.articles} />
      </div>
    </div>
  );
};

export default HomeTop;
