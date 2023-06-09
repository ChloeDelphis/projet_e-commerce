import { useState, useEffect } from 'react'

const CommandesClient = ({ email }) => {
    const [commandes, setCommandes] = useState([]);
    const [showCommandes, setShowCommandes] = useState(true);

    const [commandesByArticle, setCommandesByArticle] = useState([]);

    const [articles, setArticles] = useState();

    // update la liste de tous les articles commandes
    useEffect(() => {
        if (commandes.length > 0) {
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
                                const date = new Date(command.date).toLocaleDateString('en-GB');
                                allArticles.push({ itemID, quantity, date });
                            }
                        }
                    }
                }
            }

            setCommandesByArticle(allArticles);
        }
    }, [commandes]);


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

    // retourne le nom de l'article via son (id) ref
    const getArticleNameFromArticleID = (id) => {
        const foundArticle = articles.find(article => article.ref === id);
        return foundArticle ? foundArticle.nom : null;
    };

    // retourne le nom de l'article via son (id) ref
    const getArticlePriceFromArticleID = (id) => {
        const foundArticle = articles.find(article => article.ref === id);
        return foundArticle ? foundArticle.prix : null;
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
                    </thead>

                    <tbody>
                        {commandes && commandes.map((commande, index) => (
                            <tr className='commande' key={index}>
                                <td className='date'>{new Date(commande.date).toLocaleDateString("en-GB")}</td>
                                <td>{getNbArticles(commande.detail)}</td>
                                <td className='status'><div>Envoyé</div></td>
                                <td>{commande.total} €</td>
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
                    </thead>

                    <tbody>
                        {commandesByArticle.map((commande, index) => (
                            <tr className='commande' key={index}>
                                <td className='date'>{commande.date}</td>
                                <td>{getArticleNameFromArticleID(commande.itemID)}</td>
                                <td>{commande.quantity}</td>
                                <td>{getArticlePriceFromArticleID(commande.itemID)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }
        </div>
    )
}

export default CommandesClient