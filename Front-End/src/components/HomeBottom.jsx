import React from "react";

const HomeBottom = () => {
  return (
    <div className="homepage_bottom">
      <div className="left">
        <img src="./assets/components/homebottom/image.png" alt="home_image" />
      </div>
      <div className="right">
        <div className="top">
          Long heading is what you see here in this feature section
        </div>
        <div className="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </div>
        <div className="bottom">
          <div>
            <img src="./assets/components/icons/box.png" alt="bullet_point" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div>
            <img src="./assets/components/icons/box.png" alt="bullet_point" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div>
            <img src="./assets/components/icons/box.png" alt="bullet_point" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBottom;
