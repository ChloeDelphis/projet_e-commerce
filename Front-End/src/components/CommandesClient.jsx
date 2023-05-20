import { all } from 'axios';
import React, { useState, useEffect } from 'react'

const CommandesClient = ({ email }) => {
    const [commandes, setCommandes] = useState([]);
    const [showCommandes, setShowCommandes] = useState(true);

    const [commandesByArticle, setCommandesByArticle] = useState([]);

    const [articles, setArticles] = useState();

    useEffect(() => {
        // console.log("COMMANDES: ", commandes);
        if (commandes.length > 0) {
            console.log(commandes);
            const getAllArticleFromCommandes = (commandes) => {
                const allArticles = [];

                for (let command of commandes) {
                    if (command.detail) {
                        const articles = command.detail.split('/');

                        for (let article of articles) {
                            const articleParts = article.split('-');
                            if (articleParts.length === 2) {
                                const itemID = parseInt(articleParts[0]);
                                const quantity = parseInt(articleParts[1]);
                                if (!isNaN(itemID) && !isNaN(quantity)) {
                                    allArticles.push({ itemID, quantity });
                                }
                            }
                        }
                    }
                }
                console.log(allArticles);
                return allArticles;
            };


            getAllArticleFromCommandes(commandes);
        }
    }, [commandes])

    // Fetch Commandes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/site/commandes/findbyemail/${email}`);
                const jsonData = await response.json();
                setCommandes(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    // Fetch Articles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/site/articles`);
                const jsonData = await response.json();
                setArticles(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const getNbArticles = (detail) => {
        let nbArticles = 0;
        if (detail) {
            const articles = detail.split('/');
            for (let article of articles) {
                const articleParts = article.split('-');
                const quantity = parseInt(articleParts[1]);
                if (!isNaN(quantity)) {
                    nbArticles += quantity;
                }
            }
        }
        return nbArticles;
    };




    const getArticleNameQuantityList = (detail) => {
        const articleNames = [];
        const finalArticleNames = [];

        if (detail) {
            const refArticles = detail.split('/');
            for (let article of refArticles) {
                const [name, quantity] = article.split('-');
                articleNames.push({ name: parseInt(name), quantity: parseInt(quantity) });
            }
        }

        for (let i = 0; i < articleNames.length; i++) {
            for (let article of articles) {
                if (articleNames[i].name === article.ref) {
                    finalArticleNames.push({ name: article.nom, quantity: articleNames[i].quantity });
                }
            }
        }

        return finalArticleNames;
    };




    return (
        <div className='card_commandes'>

            <div className="headerCommandes">
                <h2 className={`${showCommandes && "titleBold selected"}`} onClick={() => setShowCommandes(true)}>
                    Mon historique de commandes
                </h2>

                <h2 className={`${!showCommandes && "titleBold selected"}`} onClick={() => setShowCommandes(false)}>
                    Détails des commandes
                </h2>
            </div>

            {showCommandes &&
                <table className='commandes_container card'>
                    <thead>
                        <tr className='commande'>
                            <th>Date</th>
                            <th>Nb Articles</th>
                            <th>Status</th>
                            <th>Montant</th>
                        </tr>
                        <hr />
                    </thead>
                    <tbody>
                        {commandes && commandes.map((commande, index) => (
                            <tr className='commande' key={index}>
                                <td>{new Date(commande.date).toLocaleDateString("en-GB")}</td>
                                <td>{getNbArticles(commande.detail)}</td>
                                <td className='status'><div>Envoyé</div></td>
                                <td>${commande.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }

            {!showCommandes &&
                <table className='commandes_container card'>
                    <thead>
                        <tr className='commande'>
                            <th>Date</th>
                            <th>Article</th>
                            <th>Quantite</th>
                            <th>Montant</th>
                        </tr>
                        <hr />
                    </thead>
                    <tbody>
                        {commandes.map((commande, index) => (
                            <tr className='commande' key={index}>
                                <td>{new Date(commande.date).toLocaleDateString("en-GB")}</td>
                                <td>
                                    <ul>
                                        {getArticleNameQuantityList(commande.detail).map((article, index) => (
                                            <li key={index}>{article.name}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {getArticleNameQuantityList(commande.detail).map((article, index) => (
                                            <li key={index}>{article.quantity}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>${commande.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }
        </div>
    )
}

export default CommandesClient