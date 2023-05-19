import React, { useState, useEffect } from 'react'
import CommandesClient from '../components/CommandesClient';
import { useNavigate } from 'react-router-dom';

const CardInfo = ({ data, type }) => {

    const getStatus = () => {
        if (data < 5) return "Silver";
        else if (data >= 5 && data <= 10) return "Gold";
        else return "Platinum";
    }

    return (
        <div className='card_info card'>
            {type === 1 &&
                <>
                    <div className="dataNb">{data}</div>
                    <div className="dataInfo">Commandes Passées</div>
                </>
            }
            {type === 2 &&
                <>
                    <div className="dataNb">{data}</div>
                    <div className="dataInfo">Articles Commandés</div>
                </>
            }
            {type === 3 &&
                <>
                    <div className="dataNb">{getStatus()}</div>
                    <div className="dataInfo">Votre status actuel</div>
                </>
            }
        </div>
    )
}

const CardClient = ({ client, nbArticles }) => {
    // const { numero, rue, cp, ville } = client.adresse;

    const [showEditForm, setShowEditForm] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

    const [editedClient, setEditedClient] = useState(client);
    const [displayedClient, setDisplayedClient] = useState(client);

    // const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState(client.mdp);

    const requestUpdateClient = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedClient)
    };

    const requestUpdateAdresse = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedClient.adresse)
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (editedClient.mdp === confirmNewPassword) {
            // update client
            fetch('http://localhost:8080/site/client', requestUpdateClient);

            // update adresse
            fetch('http://localhost:8080/site/adresse', requestUpdateAdresse)

            // update client displayed on page
            setDisplayedClient(editedClient);

            // update localSession
            sessionStorage.setItem("client", JSON.stringify(editedClient));

            setShowEditForm(false);

        } else {
            console.log("error password");
            setPasswordErrorMsg(true);
        }

    };

    // useEffect(() => {
    //     console.log(displayedClient);
    // }, [displayedClient])

    return (
        <div className="card_client_container">
            <div className='card_client card'>
                <div className="top">
                    {
                        nbArticles && nbArticles < 5 &&
                        <>
                            <img src="./assets/pages/profil/silver.png" alt="image_status_client" />
                            <p className='status'>Client Silver</p>
                        </>
                    }
                    {
                        nbArticles && nbArticles >= 5 && nbArticles <= 10 &&
                        <>
                            <img src="./assets/pages/profil/gold.png" alt="image_status_client" />
                            <p className='status'>Client Gold</p>
                        </>
                    }
                    {
                        nbArticles && nbArticles > 10 &&
                        <>
                            <img src="./assets/pages/profil/platinum.png" alt="image_status_client" />
                            <p className='status'>Client Platinum</p>
                        </>
                    }
                    <p className='nomPrenom'>{displayedClient.nom} {displayedClient.prenom}</p>
                    {/* <p className='status'>Client {client.status}</p> */}
                    {/* <p className='status'>Client gold</p> */}
                </div>
                <div className="center">
                    <div className="dataStyle">
                        <span>
                            Email
                        </span>
                        <span>
                            {displayedClient.email}
                        </span>
                    </div>
                    <div className="dataStyle">
                        <span>
                            Adresse
                        </span>
                        <span>
                            {displayedClient.adresse.numero + " "
                                + displayedClient.adresse.rue + " "
                                + displayedClient.adresse.cp + " "
                                + displayedClient.adresse.ville}
                        </span>
                    </div>
                    <div className="dataStyle">
                        <span>
                            Téléphone
                        </span>
                        <span>
                            {displayedClient.tel}
                        </span>
                    </div>
                </div>
                <div className="bottom">
                    <button onClick={() => setShowEditForm(!showEditForm)}>Modifier mes informations</button>
                </div>
            </div>

            {showEditForm &&
                <div className="card_client_edit card">
                    <form onSubmit={handleSave}>
                        <div>
                            <span>Nom</span>
                            <input
                                type="text"
                                value={editedClient.nom}
                                onChange={(e) => setEditedClient({ ...client, ['nom']: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <span>Prenom</span>
                            <input
                                type="text"
                                value={editedClient.prenom}
                                onChange={(e) => setEditedClient({ ...client, ['prenom']: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <span>E-mail</span>
                            <input
                                type="email"
                                value={editedClient.email}
                                onChange={(e) => setEditedClient({ ...client, ['email']: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <span>Nouveau mot de passe</span>
                            <input
                                type="password"
                                className={`${passwordErrorMsg && "inputBorderError"}`}
                                value={editedClient.mdp}
                                onChange={(e) => {
                                    // setNewPassword(e.target.value);
                                    setEditedClient({ ...client, ['mdp']: e.target.value });
                                    setPasswordErrorMsg(false);
                                }}
                            />
                        </div>
                        <div>
                            <span>Confirmez le nouveau mot de passe</span>
                            <input
                                type="password"
                                className={`${passwordErrorMsg && "inputBorderError"}`}
                                value={confirmNewPassword}
                                onChange={(e) => {
                                    setConfirmNewPassword(e.target.value);
                                    setPasswordErrorMsg(false);
                                }}
                            />

                            <div>
                                <p className={`errorPasswordMsg  ${passwordErrorMsg && "showErrorPasswordMsg"}`}>Les mots de passe ne correspondent pas</p>
                            </div>

                        </div>
                        <div>
                            <span>Numéro de rue</span>
                            <input
                                type="text"
                                value={editedClient.adresse.numero}
                                onChange={(e) =>
                                    setEditedClient({
                                        ...editedClient,
                                        adresse: { ...editedClient.adresse, numero: e.target.value }
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            <span>Rue</span>
                            <input
                                type="text"
                                value={editedClient.adresse.rue}
                                onChange={(e) =>
                                    setEditedClient({
                                        ...editedClient,
                                        adresse: { ...editedClient.adresse, rue: e.target.value }
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            <span>Code Postal</span>
                            <input
                                type="text"
                                value={editedClient.adresse.cp}
                                onChange={(e) =>
                                    setEditedClient({
                                        ...editedClient,
                                        adresse: { ...editedClient.adresse, cp: e.target.value }
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            <span>Ville</span>
                            <input
                                type="text"
                                value={editedClient.adresse.ville}
                                onChange={(e) =>
                                    setEditedClient({
                                        ...editedClient,
                                        adresse: { ...editedClient.adresse, ville: e.target.value }
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            <span>Téléphone</span>
                            <input
                                type="tel"
                                value={editedClient.tel}
                                onChange={(e) => setEditedClient({ ...client, ['tel']: e.target.value })}
                            />
                        </div>
                        <button type="submit">Sauvegarder</button>
                    </form>
                </div>
            }
        </div>
    )
}

// La page de profil du client
const Profil = () => {
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [commandes, setCommandes] = useState([]);

    useEffect(() => {
        const storedClient = JSON.parse(sessionStorage.getItem("client"));
        // on redirige le user vers la page de login s'il n'est pas en session
        if (!storedClient) {
            navigate('/login');
        } else {
            setClient(storedClient);
        }
    }, [navigate]);

    // Fetch Commandes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/site/commandes/findbyemail/${client.email}`);
                const jsonData = await response.json();
                setCommandes(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (client)
            fetchData();
    }, [client])

    // useEffect(() => {
    //     if (client) {
    //         console.log(client);
    //     }
    //     if (commandes)
    //         console.log(commandes);
    // }, [client, commandes]);

    const dataPoints = {
        nbCommandes: 5,
        nbArticlesCommande: 25,
        nbArticlesPaniers: 8
    }

    const getNbArticlesTotal = () => {
        let nbArticles = 0;

        for (let i = 0; i < commandes.length; i++) {
            if (commandes[i].detail) {
                const articles = commandes[i].detail.split('/');
                for (let article of articles) {
                    const [, quantity] = article.split('-');
                    nbArticles += parseInt(quantity);
                }
            }
        }
        return nbArticles;
    };

    return (
        <div className='profil_client'>
            <h1>Votre profil</h1>
            <hr />
            <div className="container">
                <div className="left">
                    {client && <CardClient client={client} nbArticles={commandes ? getNbArticlesTotal() : 0} />}
                </div>
                <div className="right">
                    <div className="top">
                        {client && <CardInfo data={commandes ? commandes.length : 0} type={1} />}
                        {client && <CardInfo data={commandes ? getNbArticlesTotal() : 0} type={2} />}
                        {client && <CardInfo data={commandes ? getNbArticlesTotal() : 0} type={3} />}
                    </div>
                    <div className="bottom card">
                        {client && <CommandesClient email={client.email} />}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profil