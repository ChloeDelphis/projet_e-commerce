import React from "react";
import { useParams } from "react-router-dom";

// La page du detail d'un produit
const ProductPage = () => {
  // id du produit à afficher
  const { id } = useParams();

  return (
    <div className="productPage">
      <Nav data={dataOne} />
      <div className="shop">
        <ProductPhoto data={dataOne} />
        <Shopping data={dataOne} />
      </div>
    </div>
  );
};

const Nav = ({ data }) => {
  return (
    <nav className=" nav">
      <a className=" nav__category" href="">
        {data.product.category}
      </a>
      <div className=" nav__link">></div>
      <a className=" nav__product" href="">
        {data.product.name}
      </a>
    </nav>
  );
};

const ProductPhoto = ({ data }) => {
  return (
    <section className="photo">
      <img
        className="photo__produit"
        src={data.product.img}
        alt="image product"
      />
    </section>
  );
};

const Shopping = ({ data }) => {
  return (
    <section className="shopping">
      <ProductDetails data={dataOne} />
      <Buy data={dataOne} />
      <BuyingDetails data={dataOne} />
    </section>
  );
};

const ProductDetails = ({ data }) => {
  return (
    <section className="shopping__details">
      <h1 className="shopping__details__name">{data.product.name}</h1>
      <h2 className="shopping__details__price">${data.product.price}</h2>
      <p className="shopping__details__description">
        {data.product.description}
      </p>
    </section>
  );
};

const Buy = ({ data }) => {
  return (
    <>
      <form className="shopping__buy" action="">
        <div className="shopping__buy__size">
          <label className="shopping__buy__size__label" htmlFor="size">
            Size
          </label>
          <br />
          <select
            name="size"
            id="size"
            className="shopping__buy__size__choices"
          >
            <option value="s">S</option>
            <option value="m" selected>
              M
            </option>
            <option value="l">L</option>
          </select>
        </div>
        <div className="shopping__buy__quantity">
          <label className="shopping__buy__quantity__label" htmlFor="quantity">
            Quantity
          </label>
          <br />
          <input
            className="shopping__buy__quantity__input"
            type="number"
            value="1"
            min="1"
          />
        </div>

        <button className="shopping__buy__cart">Add to Cart</button>
        <br />
        <button className="shopping__buy__buynow">Buy now</button>
        <div className="shopping__buy__shipping">
          Free shipping over ${data.shipping.freeShipping}
        </div>
      </form>
    </>
  );
};

const BuyingDetails = ({ data }) => {
  return (
    <div className="buyingdetails">
      {data.shoppingInfo.list.map((item, index) => (
        <details className="buyingdetails__details" key={index}>
          <summary className="buyingdetails__details__summary">
            <span className="buyingdetails__details__summary__name">
              {item.name}{" "}
            </span>{" "}
            <span className="buyingdetails__details__summary__v">V</span>
          </summary>
          <p>{item.details}</p>
        </details>
      ))}
    </div>
  );
};

const dataOne = {
  product: {
    img: "../assets/products/1_t-shirts/1.jpg",
    name: "Led Zeppelin",
    price: 55.0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
    category: "T-shirts",
  },

  shipping: {
    freeShipping: 50,
  },

  shoppingInfo: {
    list: [
      {
        name: "Details",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
      },
      {
        name: "Shipping",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
      },
      {
        name: "Returns",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
      },
    ],
  },
};

export default ProductPage;
