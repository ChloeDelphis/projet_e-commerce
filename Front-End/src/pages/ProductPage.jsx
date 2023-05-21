import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

// La page du detail d'un produit
const ProductPage = () => {

  const { addQuantity } = useUser();
  // id du produit à afficher
  const { id } = useParams();
  const [article, setArticle] = useState();

  useEffect(() => {
    fetch(`http://localhost:8080/site/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, []);

  return (
    <div className="productPage">
      <Nav data={article} />
      <div className="shop">
        <ProductPhoto data={article} />
        <Shopping data={article} addQuantity={addQuantity} />
      </div>
    </div>
  );
};

const Nav = ({ data }) => {
  const navigate = useNavigate();

  const handleClickToCateg = (ref) => {
    navigate(`/category/${ref}`);
  };

  return (
    <nav className=" nav">
      <a
        className=" nav__category"
        onClick={() => handleClickToCateg(data.categorie.id)}
      >
        {data && data.categorie.name}
      </a>
      <div className=" nav__link">&gt;</div>
      <a className=" nav__product" href="">
        {data && data.nom}
      </a>
    </nav>
  );
};

const ProductPhoto = ({ data }) => {
  return (
    <section className="photo">
      <img
        className="photo__produit"
        src={data && data.img}
        alt="image product"
      />
    </section>
  );
};

const Shopping = ({ data, addQuantity }) => {
  dataOne.article = data;
  return (
    <section className="shopping">
      <ProductDetails data={data} />
      <Buy data={dataOne} addQuantity={addQuantity} />
      <BuyingDetails data={dataOne} />
    </section>
  );
};

const ProductDetails = ({ data }) => {
  return (
    <section className="shopping__details">
      <h1 className="shopping__details__name">{data && data.nom}</h1>
      <br></br>
      <h2 className="shopping__details__brand">{data && data.marque} </h2>
      <br></br>
      <h3 className="shopping__details__price">{data && data.prix} €</h3>
      <p className="shopping__details__description">
        {data && data.description}
      </p>
    </section>
  );
};

const Buy = ({ data }) => {
  const { id } = useParams();
  const clientJSON = JSON.parse(sessionStorage.getItem("client"));
  // const idPanier = clientJSON.panier.id;
  const idPanier = clientJSON ? clientJSON.panier.id : "nolog";
  const navigate = useNavigate();
  const [quantite, setQuantite] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [panier, setPanier] = useState({});
  const { user, handleLogin, isPanierUpdate, setIsPanierUpdate,removeQuantity, addQuantity, cartQuantity } = useUser();
  const [size, setSize] = useState("M");
  const [stock, setStock] = useState({});
  const [messageStock, setMessageStock] = useState("");
  const [messageAjout, setMessageAjout] = useState("");
  
  useEffect(()=> {
    if (user && user.panier){
      setPanier({...user.panier, "client": {"email": user.email}});
      setMessageAjout("");
        fetch(`http://localhost:8080/site/stock/findbyrefandtaille/${id}/${size}`)
        .then((res) => res.json())
        .then(data => {
            setStock(data);
            if(data.stock < 1){
              setMessageStock("Désolé, l'article n'est plus disponible dans cette taille");
            }
            else if(data.stock < 10){
              setMessageStock(`Vite !!! Il ne reste plus que ${data.stock} articles dans cette taille.`);
            }
            else{
              setMessageStock("");
            }
        })
    }
  }, [user,isPanierUpdate,size])

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSize(selectedSize);
  };

  const handleQuantityChange = (event) => {
    let quantity = parseInt(event.target.value);
    if (!isNaN(quantity) && quantity >= 1) {

    }
  };

  const updateLigne = async (nouvelleLigne) => {
    nouvelleLigne.panier = panier;
    nouvelleLigne.taille = size;

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleLigne)
    };

    fetch(`http://localhost:8080/site/ligne/`, requestOptions);
    setIsPanierUpdate(!isPanierUpdate);
  }

  const createLigne = async (nouvelleLigne) => {
    nouvelleLigne.panier = panier;
    nouvelleLigne.taille = size;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleLigne)
    };

    fetch(`http://localhost:8080/site/ligne/`, requestOptions);
    setIsPanierUpdate(!isPanierUpdate);
  }

  const handleAjout = (quantity) => {
    
    if (stock.stock > quantity && quantity > 0) {

      let newStock = stock;
      newStock.stock = stock.stock - quantity;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStock)
      };
      fetch(`http://localhost:8080/site/stock/`, requestOptions);

      addQuantity(Number(quantity));

      let isDouble = false;
      if (panier.lignes) {
        for (let i = 0; i < panier.lignes.length; i++) {
          const ligne = panier.lignes[i];

          if (data.article.ref == ligne.article.ref) {
            isDouble = true;
            const nouvelleLigne = { ...ligne, "panier": { "id": idPanier } };
            nouvelleLigne.quantite = parseInt(nouvelleLigne.quantite) + parseInt(quantity);
            nouvelleLigne.total = nouvelleLigne.quantite * nouvelleLigne.article.prix;
            updateLigne(nouvelleLigne);
            break;
          }
        }

        if (!isDouble) {
          const nouvelleLigne = {
            "id": 0,
            "panier": {
              "id": idPanier,
            },
            "taille": size,
            "article": data.article,
            "quantite": quantity,
            "total": data.article.prix * quantity,
          }
          createLigne(nouvelleLigne);
        }
        setIsPanierUpdate(!isPanierUpdate);
      }
    }
    else{
      setMessageAjout(`Impossible, il ne reste que ${stock.stock} articles en stock`);
    }
  };


  return (
    <>
      <form className="shopping__buy" action="">
        <div className="shopping__buy__size">
          <label className="shopping__buy__size__label" htmlFor="size">
            Taille
          </label>
          <br />
          <select
            name="size"
            id="size"
            className="shopping__buy__size__choices"
            onChange={handleSizeChange}
          >
            <option value="S">S</option>
            <option value="M" selected>
              M
            </option>
            <option value="L">L</option>
          </select>
          <br></br>
          <p className="message-Stock">{messageStock}</p>

        </div>
        

          {stock.stock > 0 && (
            <div className="shopping__buy__quantity">
              <label className="shopping__buy__quantity__label" htmlFor="quantity">
              Quantité
              </label>
              <br />
              <input className="shopping__buy__quantity__input" type="number" id="quantity" name="quantity" min="1" max={stock} onChangeCapture={(event) => handleQuantityChange(event)}></input>
            </div>
          )}
        
        <p className="message-Stock">{messageAjout}</p>
        <button type="button" className="shopping__buy__cart" onClick={() => {
          if (clientJSON == null) {
            navigate("/login");
          }
          else if (document.querySelector('.shopping__buy__quantity__input').value > 0) {
            handleAjout(document.querySelector('.shopping__buy__quantity__input').value);
          }
        }
        }>Ajouter au panier</button>
        <br />
        <button type="button" className="shopping__buy__buynow" onClick={() => {
          if (clientJSON == null) {
            navigate("/login");
          }
          else if (document.querySelector('.shopping__buy__quantity__input').value > 0) {
            handleAjout(document.querySelector('.shopping__buy__quantity__input').value);
            navigate("/cart");
          }
        }
        }>Acheter maintenant</button>
        <div className="shopping__buy__shipping">
          Livraison gratuite à partir de {data.shipping.freeShipping} € d'achat.
        </div>
      </form>
    </>
  );
};

const BuyingDetails = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleRotation = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="buyingdetails">
      {data.shoppingInfo.list.map((item, index) => (
        <details
          className={`buyingdetails__details${openIndex === index ? ' open' : ''}`}
          key={index}
        >
          <summary
            className="buyingdetails__details__summary"
            onClick={() => toggleRotation(index)}
          >
            <span className="buyingdetails__details__summary__name">{item.name}</span>
            <img
              src="../../../assets/pages/productpage/arrow_orange.png"
              alt="arrow_down"
              className={openIndex === index ? 'rotated' : ''}
            />
          </summary>
          <p>{item.details}</p>
        </details>
      ))}
    </div>
  );
};

const dataOne = {
  shipping: {
    freeShipping: 50,
  },

  shoppingInfo: {
    list: [
      {
        name: "Détails",
        details:
          "Découvrez tous les détails de cet article de vêtement. Vous trouverez des informations sur les matériaux utilisés, les mesures et les instructions d'entretien. Profitez d'une qualité exceptionnelle et d'un confort optimal avec cet article.",
      },
      {
        name: "Livraison",
        details:
          "Nous offrons une livraison rapide et fiable pour tous nos produits. Vous recevrez votre commande à votre porte dans les plus brefs délais. Pour plus d'informations sur nos options de livraison, veuillez consulter notre page de livraison.",
      },
      {
        name: "Retours",
        details:
          "Si vous n'êtes pas entièrement satisfait de votre achat, nous acceptons les retours dans les 30 jours suivant la réception de votre commande. Veuillez consulter notre politique de retour pour plus de détails sur la procédure de retour et les conditions applicables.",
      },
    ],
  },
};

export default ProductPage;
