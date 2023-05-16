import React from "react";
import { Link, useNavigate } from "react-router-dom";

// La page à afficher en cas d'erreur d'url
const PageNotFound = () => {
  const navigate = useNavigate();

  return <div className="pageNotFound">
    <h1>
      Oups, cette page n'est pas disponible.
    </h1>
    <div className="button_wrap">
      <button onClick={() => navigate(-1)}>Page Précédente</button>
      <button><Link to={"/"} className="btn-link">Page Principale</Link></button>
    </div>
  </div>;
};

export default PageNotFound;
