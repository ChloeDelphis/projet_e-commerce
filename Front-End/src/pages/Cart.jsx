import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Commande from "../classes/Commande";

import { useUser } from "../context/UserContext";

// La page du Panier (shopping cart)
const Cart = () => {

  const { user, handleLogin, isPanierUpdate, setIsPanierUpdate, removeQuantity, addQuantity, cartQuantity } = useUser();
  const [panier, setPanier] = useState(null);
  const [stock, setStock] = useState({});
  const [client, setClient] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedClient = JSON.parse(sessionStorage.getItem("client"));
    // on redirige le user vers la page de login s'il n'est pas en session
    if (!storedClient) {
        navigate('/login');
    } else {
        setClient(storedClient);
    }
}, [navigate]);

  // useEffect(() => {
  //   if (user && user.panier) {
  //     setPanier({ ...user.panier, "client": { "email": user.email } });
  //   }
  // }, [user, isPanierUpdate])

  // useEffect(() => {
  //   if (panier !== null) {
  //   }
  // }, [panier]);

  useEffect(() => {
    if (user && user.panier) {
      const updatedPanier = { ...user.panier, "client": { "email": user.email } };
      // Mettre à jour les quantités dans le panier
      updatedPanier.lignes.forEach((ligne) => {
        ligne.quantite = parseInt(ligne.quantite);
        ligne.total = ligne.quantite * ligne.article.prix;
      });
      setPanier(updatedPanier);
    }
  }, [user, isPanierUpdate]);
  

  const supprimerLigne = (index) => {


    user.panier.lignes && panier.lignes.map((ligne, indexLignePanier) => {
      if (ligne.id == index) {
        if (ligne.article.categorie.name != 'Occasion'){
        console.log(ligne.article.categorie.name);
        fetch(`http://localhost:8080/site/stock/findbyrefandtaille/${ligne.article.ref}/${ligne.taille}`)
          .then((res) => res.json())
          .then(data => {

            let newStock = data;
            newStock.qte = data.qte + ligne.quantite;
            const requestOptionsStock = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newStock)
            };
            fetch(`http://localhost:8080/site/stock/`, requestOptionsStock);
          })
        }
      }
    })

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:8080/site/ligne/${index}`, requestOptions)
    .then(() => {
      // Mise à jour de l'état du panier après suppression
      const updatedPanier = {
        ...panier,
        lignes: panier.lignes.filter((ligne) => ligne.id !== index),
      };
      setPanier(updatedPanier);
      setIsPanierUpdate(!isPanierUpdate);
    });

  }

  function handleCommandClick() {
    const currentDate = new Date().toISOString();

    let detail = "";

    panier.lignes && panier.lignes.map((ligne, index) => {

      detail += ligne.article.ref + "-" + ligne.quantite + "/";
      supprimerLigne(ligne.id);
    })

    const maCommande = {
      "emailClient": panier.client.email,
      "date": currentDate,
      "total": panier.total,
      "detail": detail
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(maCommande)
    };
    fetch(`http://localhost:8080/site/commandes/`, requestOptions);

  }

  const handleQuantityChange = (event, index) => {
    let quantity = parseInt(event.target.value);
    if (!isNaN(quantity) && quantity >= 1) {
      setPanier(prevPanier => {
        const newPanier = { ...prevPanier };
        newPanier.lignes[index].quantite = quantity;
        newPanier.lignes[index].total = quantity * newPanier.lignes[index].article.prix;
        const nouvelleLigne = {
          ...newPanier.lignes[index],
          "panier": { "id": newPanier.id },
        };
        addQuantity(quantity - prevPanier.lignes[index].quantite);
        updateLigne(nouvelleLigne);
        return newPanier;
      });
    }
  };
  

  function handleMinusClick(index) {
    if (!isNaN(panier.lignes[index].quantite) && panier.lignes[index].quantite > 1) {
      setPanier(prevPanier => {
        const newPanier = { ...prevPanier };
        newPanier.lignes[index].quantite = newPanier.lignes[index].quantite - 1;
        newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
        const nouvelleLigne = {
          ...newPanier.lignes[index],
          "panier": { "id": newPanier.id },
        };
        removeQuantity(1);
        updateLigne(nouvelleLigne);
        return newPanier;
      });
    }
  }
  
  function handlePlusClick(index) {
    setPanier(prevPanier => {
      const newPanier = { ...prevPanier };
      newPanier.lignes[index].quantite = newPanier.lignes[index].quantite + 1;
      newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
      const nouvelleLigne = {
        ...newPanier.lignes[index],
        "panier": { "id": newPanier.id },
      };
      addQuantity(1);
      updateLigne(nouvelleLigne);
      return newPanier;
    });
  }

  const updateLigne = async (nouvelleLigne) => {
    console.log("On m'appelle ici ");
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleLigne)
    };
    fetch(`http://localhost:8080/site/ligne/`, requestOptions).then(
      setIsPanierUpdate(!isPanierUpdate)
    )

  }
  return (
    <>
      {panier && panier.lignes.length > 0 ? (
        <div className="recap-panier">
          <div className="articles">
            {
              user.panier.lignes && panier.lignes.map((ligne, index) => {

              let linkProduct = "/productpage/" + ligne.article.ref;
              return(
                <div key={ligne.id} className="article">
                  <img src={ligne.article.img} alt="Image" />
                  <div className="description">
                    <h3>
                      <Link to={linkProduct}>
                      {ligne.article.categorie.name} {ligne.article.marque} {ligne.article.nom}
                      </Link>
                    </h3>
                    {ligne.article.categorie.name != 'Occasion' &&(
                    <div className="detail">
                      <label>Taille : {ligne.taille}</label>

                        <h4>Prix : {ligne.article.prix} €</h4>

                        <label>Quantité : </label>
                        <div className="quantity-input">
                          <button className="btn-minus" onClick={() => handleMinusClick(index)}>-</button>
                          <input type="number" id="quantity" name="quantity" value={panier.lignes[index].quantite} onChangeCapture={(event) => handleQuantityChange(event, index)} />
                          <button className="btn-plus" onClick={() => handlePlusClick(index)}>+</button>
                        </div>

                        <h4>Total : {panier.lignes[index].total}€</h4>
                      </div>
                    )}
                    {ligne.article.categorie.name == 'Occasion' &&(
                    <div className="detail">
                      <label></label>
                      <h4>Total : {panier.lignes[index].total}€</h4>
                    </div>
                    )}
                    <h5 onClick={() => supprimerLigne(ligne.id)}>Supprimer</h5>
                  </div>
                </div>
                )
              })
            }
          </div>
          <div className="paiement">
            <h2>Résumé de votre commande</h2>
            <div className="total">
              <h4>Total : </h4>
              <h3>{panier.total}€</h3>
            </div>
            <button onClick={() => handleCommandClick()}>Passer à la caisse</button>
          </div>

        </div>
      ) : (
        <div className="panier-vide">
          <h2>
            Votre panier est vide... Envie de shopping ?
          </h2>
          <button><Link to={"/productcategories"}>Allons-y !</Link></button>
        </div>
      )};

    </>
  )
}

export default Cart;