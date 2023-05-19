import React, { useState, useEffect } from 'react'

const CommandesClient = ({ email }) => {
    const [commandes, setCommandes] = useState([]);
    const [showCommandes, setShowCommandes] = useState(true);

    const [articles, setArticles] = useState();

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

    // useEffect(() => {
    //     // console.log(commandes);
    // }, [commandes])
    // useEffect(() => {
    //     console.log(articles);
    // }, [articles])

    const getNbArticles = (detail) => {
        let nbArticles = 0;
        if (detail) {
            const articles = detail.split('/');
            for (let article of articles) {
                const [, quantity] = article.split('-');
                nbArticles += parseInt(quantity);
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
                <h2 className={`${showCommandes && "titleBold"}`} onClick={() => setShowCommandes(true)}>
                    Mon historique de commandes
                </h2>

                <h2 className={`${!showCommandes && "titleBold"}`} onClick={() => setShowCommandes(false)}>
                    Détails des commandes
                </h2>
            </div>
            <hr />

            {showCommandes &&
                <table className='commandes_container'>
                    <thead>
                        <tr className='commande'>
                            <th>Date</th>
                            <th>Nb Articles</th>
                            <th>Status</th>
                            <th>Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map((commande, index) => (
                            <tr className='commande' key={index}>
                                <td>{new Date(commande.date).toLocaleDateString("en-GB")}</td>
                                <td>{getNbArticles(commande.detail)}</td>
                                <td>Envoye</td>
                                <td>${commande.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }

            {!showCommandes &&
                <table className='commandes_container'>
                    <thead>
                        <tr className='commande'>
                            <th>Date</th>
                            <th>Article</th>
                            <th>Quantite</th>
                            <th>Montant</th>
                        </tr>
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