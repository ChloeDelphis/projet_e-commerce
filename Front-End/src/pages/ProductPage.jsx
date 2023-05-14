import React from "react";
import { useParams } from "react-router-dom";

// La page du detail d'un produit
const ProductPage = () => {
  // id du produit à afficher
  const { id } = useParams();

  return (
    <div className="productPage">
      Je suis la page du détail du produit {id}
      <Nav data={dataOne} />
      <ProductPhoto data={dataOne} />
      <Shopping data={dataOne} />
    </div>
  );
};

const Nav = ({ data }) => {
  return (
    <nav className="productPage__nav">
      <a className="productPage__nav__category" href="">
        Category
      </a>
      <div className="productPage__nav__link">&amp;gt;</div>
      <a className="productPage__nav__product" href="">
        Product name
      </a>
    </nav>
  );
};

const ProductPhoto = ({ data }) => {
  return (
    <section className="productPage__photo">
      <img src={data.product.img} alt="" />
    </section>
  );
};

const Shopping = ({ data }) => {
  return (
    <section className="productPage__shopping">
      <ProductDetails data={dataOne} />
      <Buy data={dataOne} />
      <BuyingDetails data={dataOne} />
    </section>
  );
};

const ProductDetails = ({ data }) => {
  return (
    <section className="productPage__shopping__details">
      <h1 className="productPage__shopping__details__name">
        {data.product.name}
      </h1>
      <h2 className="productPage__shopping__details__price">
        {data.product.price}
      </h2>
      <p className="productPage__shopping__details__description">
        {data.product.description}
      </p>
    </section>
  );
};

const Buy = ({ data }) => {
  return (
    <>
      <form className="productPage__shopping__buy" action="">
        <label
          className="productPage__shopping__buy__quantitylabel"
          htmlFor="quantity"
        >
          Quantity
        </label>
        <input
          className="productPage__shopping__buy__quantityinput"
          type="number"
          value="1"
        />
        <button className="productPage__shopping__buy__cart">
          Add to Cart
        </button>
        <button className="productPage__shopping__buy__buynow">Buy now</button>
        <div className="productPage__shopping__buy__shipping">
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
        <details className="productPage__shopping__details" key={index}>
          <summary className="productPage__shopping__details__summary">
            {item.name}
          </summary>
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
