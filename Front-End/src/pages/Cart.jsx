import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// La page du Panier (shopping cart)
const Cart = () => {

  const { id } = useParams();
  const [panierId, setPanierId] = useState("");
  const [panier, setPanier] = useState({});

  const [quantity, setQuantity] = useState(0);

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlusClick = () => {
      setQuantity(quantity + 1);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };


  useEffect(() => {
       
    console.log(id)
    
    fetch(`http://localhost:8080/site/panier/${id}`).then((res) => res.json()).then(data => setPanier(data));
}, [])
    


  return (
    <>
        {/* <h2>Panier</h2>

          <ul>
            <li>Id : {panier.id}</li>
            <li>Email Client : {panier.mailClient}</li>
            <li>Date : {panier.date}</li>
            <li>Prix Total : {panier.total}</li>
            <li>Lignes : {panier.lignes}</li>
            <li>Version : {panier.version}</li>
          </ul> */}

          <div className="recap-panier">

            <div className="articles">

              <div className="article">

                <img src="" alt="Image" />

                <div className="description">

                  <h3>Chemise 1</h3>

                  <div className="detail">

                    <label>Taille :</label>
                    <select id="taille" name="taille">
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </select>

                    <h4>Prix : 9.49€</h4>

                    <label>Quantité :</label>
                    <div className="quantity-input">
                      <button className="btn-minus" onClick={handleMinusClick}>-</button>
                      <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange}></input>
                      <button className="btn-plus" onClick={handlePlusClick}>+</button>
                    </div>

                    <h4>Total : 9.49€</h4>
                  </div>
                  <h5>Supprimer</h5>
                </div>
              </div>

              <div className="article">

                <img src="" alt="Image" />

                <div className="description">

                  <h3>Tshirt 1</h3>

                  <div className="detail">

                    <label>Taille :</label>
                    <select id="taille" name="taille">
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </select>

                    <h4>Prix : 9.49€</h4>

                    <label>Quantité :</label>
                    <div className="quantity-input">
                      <button className="btn-minus" onClick={handleMinusClick}>-</button>
                      <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange}></input>
                      <button className="btn-plus" onClick={handlePlusClick}>+</button>
                    </div>

                    <h4>Total : 9.49€</h4>
                  </div>
                  <h5>Supprimer</h5>
                </div>
              </div>

              <div className="article">

                <img src="" alt="Image" />

                <div className="description">

                  <h3>Jean 1</h3>

                  <div className="detail">
                    
                    <label>Taille :</label>
                    <select id="taille" name="taille">
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </select>

                    <h4>Prix : 9.49€</h4>

                    <label>Quantité :</label>
                    <div className="quantity-input">
                      <button className="btn-minus" onClick={handleMinusClick}>-</button>
                      <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange}></input>
                      <button className="btn-plus" onClick={handlePlusClick}>+</button>
                    </div>

                    <h4>Total : 9.49€</h4>
                    
                  </div>

                  <h5>Supprimer</h5>
                </div>
              </div>
              
            </div>

            <div className="paiement">
              <h2>Résumé de votre Commande</h2>
              <div className="total">
                <h4>Total : </h4>
                <h3>16.98€</h3>
              </div>
              <button>Passer à la caisse</button>
            </div>

          </div>
    </>
  )
}

export default Cart;
