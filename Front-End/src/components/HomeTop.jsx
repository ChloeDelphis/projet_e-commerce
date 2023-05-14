import React from "react";

const HomeTop = () => {
  return (
    <div className="homepage_top">
      {/* partie gauche */}
      <div className="top_left">
        <div className="ellipse"></div>
        <h1>Medium length hero headline goes here</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <button>Start Looking</button>
      </div>

      {/* partie droite */}
      <div className="top_right">
        <img
          src="./assets/components/carousel/carousel1.png"
          alt="image_carousel"
        />
      </div>
    </div>
  );
};

export default HomeTop;
