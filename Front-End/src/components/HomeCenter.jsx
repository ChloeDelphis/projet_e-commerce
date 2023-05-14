import React from "react";

const DisplayHomeCenter = ({ data }) => {
  return (
    <div>
      <div className="header">
        <div className="header_container">
          <div className="header_up">{data.header.top}</div>
          <div className="header_center">{data.header.center}</div>
          <div className="header_bottom">{data.header.bottom}</div>
        </div>
        <button>View all</button>
      </div>
    </div>
  );
};

const HomeCenter = () => {
  const data = {
    header: {
      top: "Trending",
      center: "Trending Products",
    },
  };
  return <div className="homepage_center"></div>;
};

export default HomeCenter;
