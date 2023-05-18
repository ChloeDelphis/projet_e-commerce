import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// La page du detail d'un produit
const ProductPage = () => {
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
        <Shopping data={article} />
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
      <div className=" nav__link">></div>
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

const Shopping = ({ data }) => {
  dataOne.article = data;
  return (
    <section className="shopping">
      <ProductDetails data={data} />
      <Buy data={dataOne} />
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

  const clientJSON = JSON.parse(sessionStorage.getItem("client"));
  const idPanier = clientJSON.panier.id;

  const [quantite, setQuantite] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [panier, setPanier] = useState({});

  const handleQuantityChange = (event) => {
    let quantity = parseInt(event.target.value);
    
    if (!isNaN(quantity) && quantity >= 1) {
      // console.log("Bonjour",event.target.value)
      console.log("clientJSON", clientJSON);
      
      // console.log(article.ref)

      // const newPanier = { ...panier };
      // newPanier.lignes[index].quantite = quantity;
      // newPanier.lignes[index].total = quantity * newPanier.lignes[index].article.prix;
      // setPanier(newPanier);

      // const nouvelleLigne = {
      //   ...panier.lignes[index],
      //   "panier": {"id": panier.id},
      // };
      // updateLigne(nouvelleLigne);
    }
  };

  const updateLigne = async (nouvelleLigne) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleLigne)
    };
    fetch(`http://localhost:8080/site/ligne/`, requestOptions);
    setIsUpdate(!isUpdate);
  }

  const createLigne = async (nouvelleLigne) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleLigne)
    };
    fetch(`http://localhost:8080/site/ligne/`, requestOptions);
    setIsUpdate(!isUpdate);
  }

  const handleAjout = (quantity) => {
    console.log("la Quantite",quantity);
    console.log("l'article",JSON.stringify(data.article));

    

    let isDouble = false;
    if (panier.lignes) {
      for (let i = 0; i < panier.lignes.length; i++) {
        const ligne = panier.lignes[i];
    
        // console.log("LIGNE : ",JSON.stringify(ligne));
        console.log("LIGNE : ",data.article.ref);
        console.log("LIGNE : ",ligne.article.ref);
        if (data.article.ref == ligne.article.ref) {
          console.log("OUI L ARTICLE EN DOUBLE EST : ", ligne.article.ref);
          isDouble = true;
          const nouvelleLigne = {...ligne, "panier":{"id":idPanier}};
          nouvelleLigne.quantite = parseInt(nouvelleLigne.quantite) + parseInt(quantity);
          console.log("NOUVELLE LIGNE : ", JSON.stringify(nouvelleLigne), "QUANTITEEEE : ", quantity);
          updateLigne(nouvelleLigne);
          break;
        }
      }

      if(!isDouble){
        const nouvelleLigne = {
          "id": 0,
          "panier": {
            "id": idPanier,
          },
          "article": data.article,
          "quantite": quantity,
          "total": data.article.prix*quantity,
        }
        console.log("La ligne a creer",data.article.ref)
        createLigne(nouvelleLigne);
      }
    }
    

    // panier.lignes && panier.lignes.map((ligne, index) => {
      
    //   console.log("LIGNE : ",JSON.stringify(ligne));

    //   if(data.article.ref === ligne.article.ref){
    //     console.log("OUI L ARTICLE EN DOUBLE EST : ", ligne.article.ref);
    //   }
    //   else{
    //     const nouvelleLigne = {
    //       "id": 0,
    //       "panier": {
    //         "id": 1,
    //       },
    //       "article": data.article,
    //       "quantite": quantity,
    //       "total": data.article.prix*quantity,
    //     }
    //     console.log("La ligne a creer",data.article.ref)
    //     createLigne(nouvelleLigne);
    //     break;

    //   }

    // })
    


  };

  useEffect(() => {
    fetch(`http://localhost:8080/site/panier/${idPanier}`)
      .then((res) => res.json())
      .then(data => {
        setPanier(data);
        console.log(data);
      }); 
  }, []);

  useEffect(() => {  
    fetch(`http://localhost:8080/site/panier/${idPanier}`)
      .then((res) => res.json())
      .then(data => {
        sessionStorage.setItem('panier', JSON.stringify(data));
        setPanier(data);
      });   
  }, [isUpdate]);
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
            Quantité
          </label>
          <br />
          
          <input className="shopping__buy__quantity__input" type="number" id="quantity" name="quantity" min="1" onChangeCapture={(event) => handleQuantityChange(event)}></input>
        </div>
        
        <button type="button" className="shopping__buy__cart" onClick={() => handleAjout(document.querySelector('.shopping__buy__quantity__input').value)}>Ajouter au panier</button>
        <br />
        <button type="button" className="shopping__buy__buynow">Acheter maintenant</button>
        <div className="shopping__buy__shipping">
          Livraison gratuite à partir de {data.shipping.freeShipping} € d'achat.
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
  shipping: {
    freeShipping: 50,
  },

  shoppingInfo: {
    list: [
      {
        name: "Détails",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
      },
      {
        name: "Livraison",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
      },
      {
        name: "Retours",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam veniam maxime minus iure, amet placeat quo quidem ducimus quam cumque hic sapiente? Id, eius quia.",
      },
    ],
  },
};

export default ProductPage;
