import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// La page du Panier (shopping cart)
const Cart = () => {

  const { id } = useParams();
  const [panierId, setPanierId] = useState("");
  const [panier, setPanier] = useState({});


  useEffect(() => {
       
    console.log(id)
    
    fetch(`http://localhost:8080/site/panier/${id}`).then((res) => res.json()).then(data => setPanier(data));
}, [])
    


  return (
    <>
        <h2>Panier</h2>

          <ul>
            <li>Id : {panier.id}</li>
            <li>Email Client : {panier.mailClient}</li>
            <li>Date : {panier.date}</li>
            <li>Prix Total : {panier.total}</li>
            <li>Lignes : {panier.lignes}</li>
            <li>Version : {panier.version}</li>
          </ul>

    </>
  )
}

export default Cart;
