import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Commande from "../components/Commande";

// La page du Panier (shopping cart)
const Cart = () => {

  const { id } = useParams();
  const [panier, setPanier] = useState({});
  const [commande, setCommande] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCommande, setIsCommande] = useState(0);

  function handleCommandClick() {
    const currentDate = new Date().toISOString();

    let detail = "";

    panier.lignes && panier.lignes.map((ligne, index) => {
      
      detail += ligne.quantite + "/" + ligne.article.ref + " ";
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

    setIsCommande(isCommande+1);    
  }

  const updateLigne = async (nouvelleLigne) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleLigne)
    };
    fetch(`http://localhost:8080/site/ligne/`, requestOptions);
    setIsUpdate(!isUpdate);
  }

  const supprimerLigne = (index) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  };
  fetch(`http://localhost:8080/site/ligne/${index}`, requestOptions);
  setIsUpdate(!isUpdate);
  }


  const handleQuantityChange = (event, index) => {
    let quantity = parseInt(event.target.value);
    if (!isNaN(quantity) && quantity >= 1) {
      const newPanier = { ...panier };
      newPanier.lignes[index].quantite = quantity;
      newPanier.lignes[index].total = quantity * newPanier.lignes[index].article.prix;
      setPanier(newPanier);

      const nouvelleLigne = {
        ...panier.lignes[index],
        "panier": {"id": panier.id},
      };
      updateLigne(nouvelleLigne);
    }
  };

  function handleMinusClick(index : Number) {
    if (!isNaN(panier.lignes[index].quantite) && panier.lignes[index].quantite > 1) {      
      const newPanier = { ...panier };      
      newPanier.lignes[index].quantite = newPanier.lignes[index].quantite - 1;
      newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
      setPanier(newPanier);
      
      const nouvelleLigne = {
        ...panier.lignes[index],
        "panier": {"id": panier.id},
      };

      updateLigne(nouvelleLigne);
    }
  }

  function handlePlusClick(index) {
    const newPanier = { ...panier };
    newPanier.lignes[index].quantite = newPanier.lignes[index].quantite + 1;
    newPanier.lignes[index].total = newPanier.lignes[index].quantite * newPanier.lignes[index].article.prix;
    setPanier(newPanier);
    const nouvelleLigne = {
      ...panier.lignes[index],
      "panier": {"id": panier.id},
    };
    updateLigne(nouvelleLigne);    
  }


  useEffect(() => {  
      if(Object.keys(panier).length !== 0){
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(panier)
        };
        fetch(`http://localhost:8080/site/panier/`, requestOptions);
      }
  }, [panier]);


  useEffect(() => {  
    fetch(`http://localhost:8080/site/panier/${id}`)
      .then((res) => res.json())
      .then(data => {
        sessionStorage.setItem('panier', JSON.stringify(data));
        setPanier(data);
      });   
  }, [isUpdate,panier]);
  // if (panier.length > 0) {
    return (
      <>
          
          <div className="recap-panier">
            
            <div className="articles">
              {
              
              panier.lignes && panier.lignes.map((ligne, index) => {            
                  return(
                    
                    <div key={ligne.id} className="article">

                      <img src={ligne.article.img} alt="Image" />
                      
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
                            <input type="number" id="quantity" name="quantity" value={panier.lignes[index].quantite} onChangeCapture={(event) => handleQuantityChange(event, index)}></input>
                            <button className="btn-plus" onClick={() => handlePlusClick(index)}>+</button>
                          </div>

                          <h4>Total :{panier.lignes[index].total}€</h4>
                        </div>
                        <h5 onClick={ () => supprimerLigne(ligne.id)}>Supprimer</h5>
                      </div>

                    </div>
                  )
                  }
                )
              }
            </div>

            <div className="paiement">
                <h2>Résumé de votre commande</h2>
                <div className="total">
                  <h4>Total : </h4>
                  <h3>{panier.total}€</h3>
                </div>
                <button onClick={ () => handleCommandClick()}>Passer à la caisse</button>
            </div>
          </div>
      </>
    )
  // }
  // else{
  //   return(
  //     <div className="noArticle">Vous n'avez aucun article dans votre panier</div>
  //   )
  // }
}

export default Cart;
