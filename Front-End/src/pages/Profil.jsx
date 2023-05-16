import React, { useState } from 'react'

const CardCommande = ({ data }) => {
    return (
        <div className='card_commandes'>
            <h2>
                Mon historique de commandes
            </h2>
            <hr />

            <ul className='commandes_container'>
                <li className='commande'>
                    <div className="date">Date</div>
                    <div className="nbArticles">Nb Articles</div>
                    <div className="status">Status</div>
                    <div className="facture">Montant</div>
                </li>
                {
                    data.map((commande) => (
                        <li className='commande' key={data.id}>
                            <div className="date">{commande.date}</div>
                            <div className="nbArticles">10</div>
                            <div className="status">Envoye</div>
                            <div className="facture">${commande.total}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const CardInfo = ({ data, type }) => {
    return (
        <div className='card_info card'>
            <div className="dataNb">{data}</div>
            {type === 1 &&
                <div className="dataInfo">Commandes Passées</div>
            }
            {type === 2 &&
                <div className="dataInfo">Articles Commandés</div>
            }
            {type === 3 &&
                <div className="dataInfo">Articles dans votre panier</div>
            }
        </div>
    )
}

const CardClient = ({ client }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [lastName, setLastName] = useState(client.nom);
    const [firstName, setFirstName] = useState(client.prenom);
    const [email, setEmail] = useState(client.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState(client.adresse);
    const [phoneNumber, setPhoneNumber] = useState(client.telephone);

    const handleSave = (e) => {
        e.preventDefault();
        // appel fetch client via id
        setShowEditForm(false);
    };

    return (
        <div className="card_client_container">
            <div className='card_client card'>
                <div className="top">
                    <img src="./assets/pages/profil/status_gold.webp" alt="image_status_client" />
                    <p className='nomPrenom'>{client.nom} {client.prenom}</p>
                    <p className='status'>Client {client.status}</p>
                </div>
                <div className="center">
                    <div className="dataStyle">
                        <span>
                            Email
                        </span>
                        <span>
                            {client.email}
                        </span>
                    </div>
                    <div className="dataStyle">
                        <span>
                            Adresse
                        </span>
                        <span>
                            {client.adresse}
                        </span>
                    </div>
                    <div className="dataStyle">
                        <span>
                            Téléphone
                        </span>
                        <span>
                            {client.telephone}
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
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Prenom</span>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>E-mail</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Nouveau mot de passe</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Confirmez le nouveau mot de passe</span>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Adresse</span>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                        </div>
                        <div>
                            <span>Téléphone</span>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
    const client = {
        email: "monemail@email.com",
        password: "password",
        prenom: "Prenom",
        nom: "NOM",
        telephone: "0101010101",
        adresse: "Mon adresse code postal ville",
        panier: "mon panier",
        status: "gold"
    }

    const dataPoints = {
        nbCommandes: 5,
        nbArticlesCommande: 25,
        nbArticlesPaniers: 8
    }

    const dataCommandes = [
        {
            id: 0,
            emailClient: "monemail@email.com",
            date: "12/01/2023",
            total: 300,
            detail: "1-2/5-1/6-5"
        },
        {
            id: 1,
            emailClient: "monemail@email.com",
            date: "14/05/2023",
            total: 200,
            detail: "2-2/6-1/9-5"
        },
    ]


    return (
        <div className='profil_client'>
            <h1>Votre profil</h1>
            <hr />
            <div className="container">
                <div className="left">
                    <CardClient client={client} />
                </div>
                <div className="right">
                    <div className="top">
                        <CardInfo data={dataPoints.nbCommandes} type={1} />
                        <CardInfo data={dataPoints.nbArticlesCommande} type={2} />
                        <CardInfo data={dataPoints.nbArticlesPaniers} type={3} />
                    </div>
                    <div className="bottom card">
                        <CardCommande data={dataCommandes} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profil