import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Commande from "../classes/Commande";

import { useUser } from "../context/UserContext";

// La page du Panier (shopping cart)
const Cart = () => {
  const { user, handleLogin } = useUser();
  console.log("USER",user);
  return(
    <>

    <div className="recap-panier">
      <div className="articles">
        {/* {
          user.panier.lignes && panier.lignes.map((ligne, index) => {
            return(
              <>
              </>
            )
          })
        } */}
      </div>
      <div className="paiement">
          <h2>Résumé de votre commande</h2>
          <div className="total">
            <h4>Total : </h4>
            <h3>12€</h3>
          </div>
          <button >Passer à la caisse</button>
        </div>

    </div>

    </>
  )
}

export default Cart;
