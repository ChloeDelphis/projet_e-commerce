import React from "react";

const HomeTop = () => {
  return (
    <div className="homepage_top">
      {/* partie gauche */}
      <div className="top_left">
        <h1>Les Robes sont à l'honneur !</h1>
        <p>Oh les belles robes !</p>
        <button>Tout voir</button>
      </div>

      {/* partie droite */}
      <div className="top_right">
        <img src="./assets/products/5_robes/1.jpg" alt="image_carousel" />
      </div>
    </div>
  );
};

export default HomeTop;
