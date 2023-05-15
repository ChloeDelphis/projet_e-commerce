import React from "react";
import { useParams } from "react-router-dom";

// La page du detail d'un produit
const ProductPage = () => {
  // id du produit à afficher
  const { id } = useParams();

  return (
    <div className="productPage">
      <Nav data={dataOne} />
      <ProductPhoto data={dataOne} />
      <Shopping data={dataOne} />
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
      <img src={data.product.img} alt="" />
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
      <h2 className="shopping__details__price">{data.product.price}</h2>
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
        <label className="shopping__buy__quantitylabel" htmlFor="quantity">
          Quantity
        </label>
        <input
          className="shopping__buy__quantityinput"
          type="number"
          value="1"
        />
        <button className="shopping__buy__cart">Add to Cart</button>
        <button className="shopping__buy__buynow">Buy now</button>
        <div className="shopping__buy__shipping">
          Free shipping over $ {data.shipping.freeShipping}
        </div>
      </form>
    </>
  );
};

const BuyingDetails = ({ data }) => {
  return (
    <>
      {data.shoppingInfo.list.map((item, index) => (
        <details className="shopping__details" key={index}>
          <summary className="shopping__details__summary">{item.name}</summary>
          <p>{item.details}</p>
        </details>
      ))}
    </>
  );
};

const dataOne = {
  product: {
    img: "./assets/components/homecenter/product_01.png",
    name: "Product name",
    price: 55.0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
    category: "dresses",
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
