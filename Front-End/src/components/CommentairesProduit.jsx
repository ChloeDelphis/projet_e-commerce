import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const CommentairesProduit = ({ itemID }) => {
    const [listCommentaires, setListCommentaires] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedRating, setSelectedRating] = useState(1);
    const [isUpdated, setIsUpdated] = useState(false);

    const { user } = useUser();

    useEffect(() => {
        fetch(`http://localhost:8080/site/commentaires`)
            .then((res) => res.json())
            .then((data) =>
                setListCommentaires(data.filter(comment => comment.idProduit === parseInt(itemID)))
            );
    }, [itemID, isUpdated]);

    const displayEtoiles = (nb) => {
        const etoiles = [];
        for (let i = 0; i < nb; i++) {
            etoiles.push(
                <img
                    key={i}
                    src="../../../assets/components/commentaires/star.png"
                    alt="etoile"
                />
            );
        }
        return etoiles;
    };

    function getCurrentDate() {
        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(false);

        const newComment = {
            idProduit: parseInt(itemID),
            nbEtoiles: selectedRating,
            nom: user.nom,
            date: getCurrentDate(),
            commentaire: message
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        };

        fetch(`http://localhost:8080/site/commentaires/`, requestOptions)
            .then(() => setIsUpdated(!isUpdated));
    }

    return (
        <div className='commentaires-produit'>
            <h2>Commentaires</h2>

            <div className='form-container'>
                {!showForm &&
                    <button onClick={() => setShowForm(true)}>Laisser un commentaire</button>
                }
                {
                    showForm && !user &&
                    <div className='not-connected'>
                        <p>
                            Veuillez vous connecter pour écrire un commentaire
                        </p>
                        <div>
                            <button><Link to={"/login"}>Se connecter</Link></button>
                            <button onClick={() => setShowForm(false)}>Annuler</button>
                        </div>
                    </div>
                }
                {showForm && user &&
                    <form onSubmit={handleSubmit}>
                        <div className='top'>
                            <textarea
                                placeholder="Entrez votre message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>

                            <label htmlFor="rating">Votre note {" "}{" "}
                                <select
                                    name="rating"
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                                    required
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='bottom'>
                            <button type='submit'>Envoyer</button>
                            <button onClick={() => {
                                setShowForm(false);
                                setMessage("")
                            }}>
                                Annuler</button>
                        </div>
                    </form>
                }
            </div>

            <div className="list-commentaires">
                {listCommentaires.length > 0 ? (
                    <ul>
                        {listCommentaires.map((comment, index) => (
                            <li key={index}>
                                <div className="top">
                                    <div className='name'>{comment.nom}</div>
                                    <div className="stars">{displayEtoiles(comment.nbEtoiles)}</div>
                                </div>
                                <div className='date'>{comment.date}</div>
                                <div className='comment'>{comment.commentaire}</div>
                                <div className='line'></div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Aucun commentaire</div>
                )}
            </div>
        </div>
    );
};

export default CommentairesProduit;
