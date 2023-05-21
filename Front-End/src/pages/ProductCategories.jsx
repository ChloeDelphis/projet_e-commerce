import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// La page listant les catégories de produits
const ProductCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/site/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);


  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/category/${id}`);
  };

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
        {categories &&
          categories.map((category, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleClick(category && category.id)}
            >
              <CategoryCard {...category} />
            </div>
          ))}
      </div>
    </div>
  );
};

const CategoryCard = (category) => {
  return (
    <>
      <div className="card_header">
        <h2>{category && category.name}</h2>
        <p className="bottom">{category && category.description}</p>
        <button>
          <Link className="card_btn" to={`/category/${category.id}`}>
            Voir nos articles
          </Link>
        </button>
      </div>
      <div className="card_img">
        <img src={category && category.image} alt="cateogry_image" />
      </div>
    </>
  );
};

export default ProductCategories;
