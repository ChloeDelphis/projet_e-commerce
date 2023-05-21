import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Commande from "../classes/Commande";

import { useUser } from "../context/UserContext";


// La page du Panier (shopping cart)
const Occasion = () => {
    const { user } = useUser();
    const [isUpdate, setIsUpdated] = useState(false);
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
    
    useEffect(() => {
      }, [isUpdate]);

    return(
        <div className="occas">
            <Formulaire />
        </div>

    )
};

const Formulaire = () => {
    const [maxRef, setMaxRef] = useState(0);
    const [isUpdated, setIsUpdated] = useState(false);
    const [message, setMessage] = useState("");
    const [nom, setNom] = useState("");
    const [marque, setMarque] = useState("");
    const [prix, setPrix] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const miseEnVente = async (event) => {
        event.preventDefault();
        const nom = event.target.nom.value;
        const marque = event.target.marque.value;
        const prix = event.target.prix.value;
        const image = event.target.image.value;
        const description = event.target.description.value;

        console.log(nom,marque,prix,image,description);

        const newArticle = {
            "ref": maxRef+1,
            "categorie" : {"id":12},
            "nom": nom,
            "marque": marque,
            "description": description,
            "prix": prix,
            "img": image,
            "mea": 0
        }

        const requestOptionsArticleOcas = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newArticle)
          };

        fetch('http://localhost:8080/site/articles', requestOptionsArticleOcas)
        .then(response => {
            setMessage("Article mis en vente avec succès !");
            setNom("");
            setMarque("");
            setPrix("");
            setImage("");
            setDescription("");

        setIsUpdated(!isUpdated);
      })
      .catch(error => {
        // Gérer les erreurs du fetch
        // ...
      });
    }

    useEffect(() => {
        fetch(`http://localhost:8080/site/articles/findmaxref`)
          .then((res) => res.json())
          .then((data) => setMaxRef(data));
      }, [isUpdated]);

    console.log(maxRef);
    return(
        <>
         <h2>Mettre en vente un nouvel article</h2>
         {message && <p>{message}</p>}
            <form onSubmit={miseEnVente}>

            <div className="inputbox">
                  <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} required ></input>
                  <label>Nom</label>
            </div>

            <div className="inputbox">
                  <input type="text" name="marque" value={marque} onChange={(e) => setMarque(e.target.value)} required ></input>
                  <label>Marque</label>
            </div>

            <div className="inputbox">
                  <input type="number" name="prix" value={prix} onChange={(e) => setPrix(e.target.value)} required ></input>
                  <label>Prix</label>
            </div>

            <div className="inputbox">
                  <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} required ></input>
                  <label>Lien de l'image</label>
            </div>

            <div className="inputbox">
                  <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                  <label>Description</label>
            </div>

            <button type="submit">Mettre en vente</button>
            </form> 
        </>
    )
}
export default Occasion;