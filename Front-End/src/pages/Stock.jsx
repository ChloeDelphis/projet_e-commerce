import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// NE PAS LOAD CETTE PAGE, UNIQUEMENT POUR LA CREATION DE LA TABLE STOCK
const Stock = () => {
    const [stock, setStock] = useState(null);

      fetch(`http://localhost:8080/site/articles`)
        .then((res) => res.json())
        .then(data => {
            
            data && data.map((article, index) => {

                const newStockS = {
                    "refArticle": article.ref,
                    "taille": "S",
                    "stock": "50"
                }

                const requestOptionsStockS = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newStockS)
                  };
              
                  fetch('http://localhost:8080/site/stock', requestOptionsStockS)

                const newStockM = {
                    "refArticle": article.ref,
                    "taille": "M",
                    "stock": "50"
                }

                const requestOptionsStockM = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newStockM)
                  };
              
                  fetch('http://localhost:8080/site/stock', requestOptionsStockM)

                const newStockL = {
                    "refArticle": article.ref,
                    "taille": "L",
                    "stock": "50"
                }

                const requestOptionsStockL = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newStockL)
                  };
              
                  fetch('http://localhost:8080/site/stock', requestOptionsStockL)
                })
            })


  return (
    <>

    </>
  );
};

export default Stock;
