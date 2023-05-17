import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// La page du Panier (shopping cart)
const Cart = () => {

  const { id } = useParams();
  let somme = 0;
  const [panierId, setPanierId] = useState("");
  const [panier, setPanier] = useState({});

  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event, index) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      const newPanier = { ...panier };
      newPanier.lignes[index].quantite = newQuantity;
      newPanier.lignes[index].total = newQuantity * newPanier.lignes[index].article.prix;
      setPanier(newPanier);
      setQuantity(newQuantity);
    }
  };

  function handleMinusClick(index : Numer) {
    if (!isNaN(panier.lignes[index].quantite) && panier.lignes[index].quantite >= 1) {
      const newPanier = { ...panier };
      newPanier.lignes[index].quantite = newPanier.lignes[index].quantite - 1;
      newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
      setPanier(newPanier)
    }
    console.log(panier.lignes[index].quantite, index);

  }

  function handlePlusClick(index) {
    const newPanier = { ...panier };
    newPanier.lignes[index].quantite = newPanier.lignes[index].quantite + 1;
    newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
      setPanier(newPanier)
    console.log(panier.lignes[index].quantite, index);
  }



  useEffect(() => {    
    fetch(`http://localhost:8080/site/panier/${id}`).then((res) => res.json()).then(data => setPanier(data));
}, [])
    


  return (
    <>

        <div className="recap-panier">
          
          <div className="articles">
            {
            
            panier.lignes && panier.lignes.map((ligne, index) => {
                somme += ligne.total;
            
                return(
                  
                  <div className="article">

                    <img src={ligne.article.image} alt="Image" />

                    <div className="description">

                      <h3> {ligne.article.categorie.name} {ligne.article.marque} {ligne.article.nom}</h3>

                      <div className="detail">

                        <label>Taille : </label>
                        <select id="taille" name="taille">
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                        </select>

                        <h4>Prix : {ligne.article.prix}€</h4>

                        <label>Quantité :</label>
                        <div className="quantity-input">
                          <button className="btn-minus" onClick={ () => handleMinusClick(index)}>-</button>
                          <input type="number" id="quantity" name="quantity" min="1" value={panier.lignes[index].quantite} onChange={(event) => handleQuantityChange(event, index)}></input>
                          <button className="btn-plus" onClick={() => handlePlusClick(index)}>+</button>
                        </div>

                        <h4>Total :{panier.lignes[index].total}€</h4>
                      </div>
                      <h5>Supprimer</h5>
                    </div>

                  </div>
                )
                }
              )
            }
          </div>

          <div className="paiement">
              <h2>Résumé de votre Commande</h2>
              <div className="total">
                <h4>Total : </h4>
                <h3>{somme}€</h3>
              </div>
              <button>Passer à la caisse</button>
          </div>
        </div>
    </>
  )
}

export default Cart;
