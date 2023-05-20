import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Commande from "../classes/Commande";

import { useUser } from "../context/UserContext";

// La page du Panier (shopping cart)
const Cart = () => {
  
  const { user, handleLogin, isPanierUpdate, setIsPanierUpdate,removeQuantity, addQuantity, cartQuantity } = useUser();
  const [panier, setPanier] = useState(null);

  useEffect(()=> {
    if (user && user.panier){
      setPanier({...user.panier, "client": {"email": user.email}});
    }
  }, [user,isPanierUpdate])

  useEffect(()=> {
    console.log("LE PANIER:",panier);
  }, [panier])

  const supprimerLigne = (index) => {
    
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:8080/site/ligne/${index}`, requestOptions);

    setIsPanierUpdate(!isPanierUpdate);
  }

  const handleQuantityChange = (event, index) => {
    let quantity = parseInt(event.target.value);
    if (!isNaN(quantity) && quantity >= 1) {
      const newPanier = { ...panier };
      newPanier.lignes[index].quantite = quantity;
      newPanier.lignes[index].total = quantity * newPanier.lignes[index].article.prix;
      setPanier(newPanier);

      const nouvelleLigne = {
        ...newPanier.lignes[index],
        "panier": { "id": newPanier.id },
      };

      addQuantity(cartQuantity-cartQuantity);
      updateLigne(nouvelleLigne);
    }
  };

  function handleMinusClick(index: Number) {
    if (!isNaN(panier.lignes[index].quantite) && panier.lignes[index].quantite > 1) {
      const newPanier = { ...panier };
      newPanier.lignes[index].quantite = newPanier.lignes[index].quantite - 1;
      newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
      setPanier(newPanier);

      const nouvelleLigne = {
        ...newPanier.lignes[index],
        "panier": { "id": newPanier.id },
      };
      removeQuantity(1);
      updateLigne(nouvelleLigne);
    }
  }

  function handlePlusClick(index) {
    const newPanier = { ...panier };
    newPanier.lignes[index].quantite = newPanier.lignes[index].quantite + 1;
    newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
    setPanier(newPanier);
    const nouvelleLigne = {
      ...newPanier.lignes[index],
      "panier": { "id": newPanier.id },
    };
    
    addQuantity(1);
    updateLigne(nouvelleLigne);
  }

  const updateLigne = async (nouvelleLigne) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleLigne)
    };
    fetch(`http://localhost:8080/site/ligne/`, requestOptions);

    setIsPanierUpdate(!isPanierUpdate);
  }
    return(
      <>
      {panier && panier.lignes.length > 0 ?( 
      <div className="recap-panier">
        <div className="articles">
          {
            user.panier.lignes && panier.lignes.map((ligne, index) => {

              let linkProduct = "productpage/" + ligne.article.ref;
              return(
                <div key={ligne.id} className="article">
                  <img src={ligne.article.img} alt="Image" />
                  <div className="description">
                    <h3>
                      <Link to={linkProduct}>
                      {ligne.article.categorie.name} {ligne.article.marque} {ligne.article.nom}
                      </Link>
                    </h3>

                    <div className="detail">
                      <label>Taille : </label>
                      <select name="taille" id="taille">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                      </select>

                      <h4>Prix : {ligne.article.prix} €</h4>

                      <label>Quantité : </label>
                      <div className="quantity-input">
                        <button className="btn-minus" onClick={() => handleMinusClick(index)}>-</button>
                        <input type="number" id="quantity" name="quantity" value={panier.lignes[index].quantite} onChangeCapture={(event) => handleQuantityChange(event, index)} />
                        <button className="btn-plus" onClick={() => handlePlusClick(index)}>+</button>
                      </div>

                      <h4>Total : {panier.lignes[index].total}€</h4>
                    </div>
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
            <button >Passer à la caisse</button>
          </div>

      </div> 
      ) : (
      <div></div>
      )}; 

      </>
    )
}

export default Cart;
