import { useState, useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { useNavigate } from "react-router-dom";
import { mailOutline, lockClosedOutline, personOutline, locationOutline, callOutline } from 'ionicons/icons';

// La page de Login (connexion)
const Login = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState({});
  const [isNewClient, setIsNewClient] = useState(false);
  const [isClientLogged, setIsClientLogged] = useState(false);
  const [panier, setPanier] = useState({});
  const [adresse, setAdresse] = useState({});

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const [msgErreurI, setMsgErreurI] = useState("");
  const [msgErreurC, setMsgErreurC] = useState("");

  const requestOptionsAdresse = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adresse)
  };

  const requestOptionsPanier = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    
      "date": new Date().toISOString(),
      "total": 0,
      "lignes": [],
      "client": {
          "email": client.email
      }
  })
  };

  const requestOptionsClient = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  };

  const requestUpdateAdresseClient = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  };

  useEffect(() => {
    if (isNewClient) {
      console.log("ISNEWCLIENT YES");
      const fetchPostClient = () => {

        fetch('http://localhost:8080/site/client', requestUpdateAdresseClient);
      }

      fetchPostClient();
      console.log("NOUVEAU PANIER : ",JSON.stringify(requestOptionsPanier.body));
      fetch('http://localhost:8080/site/panier', requestOptionsPanier)
    }
  }, [isNewClient]);


  const CreateClient = async (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/site/adresse', requestOptionsAdresse)
      .then(response => response.json())
      .then(responseData => {
        {
          const newAdresse = {
            id: responseData,
            numero: adresse.numero,
            rue: adresse.rue,
            complement: "",
            cp: adresse.cp,
            ville: adresse.ville
          }

          fetch('http://localhost:8080/site/client', requestOptionsClient).then(async response => {

          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }

          }).catch(error => {
           // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            setMsgErreurI("Il existe déjà un compte avec cette adresse mail");
        });

        setMsgErreurI("");
          setClient({ ...client, ['adresse']: newAdresse });
          // setClient({ ...client, ['adresse']: responseData });
          setIsNewClient(true);

        }
      });
  }

  useEffect(() => {
    if (isClientLogged) {
      sessionStorage.setItem("client", client);
      console.log("ok");
      setMsgErreurC("");
      navigate("/");
    }
  }, [isClientLogged])

  const connexion = (event) => {
    event.preventDefault();

      fetch(`http://localhost:8080/site/client/findbyemailandmdp/${email}/${mdp}`).then((res) => res.json()).then(data => {
      
      setClient(JSON.stringify(data))
      setIsClientLogged(true);
      console.log("DATAS : ",JSON.stringify(data));
      localStorage.setItem('client', JSON.stringify(data));
    }).then(async response => {

      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();

      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
      }

      }).catch(error => {
       // this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
        setMsgErreurC("Adresse mail ou mot de passe invalide");
    });
  }

  return (
    <>
      <div className="loginpage">

        <div className="login">
          <div className="form-box">
            <form onSubmit={connexion}>

              <h2>Login</h2>

              <p className='msgError'>{msgErreurC}</p>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input type="email" required onChange={(e) => setEmail(e.target.value)} ></input>
                <label htmlFor="">Email</label>
              </div>

              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" required onChange={(e) => setMdp(e.target.value)} ></input>
                <label htmlFor="">Password</label>
              </div>

              <div className="ligne">
                <label htmlFor=""><input type="checkbox"></input>Remember Me </label>
                <a href="">Forget Password</a>
              </div>

              <button>Log in</button>
            </form>
          </div>
        </div>

        <div className="signup">
          <div className="form-box">
            <form onSubmit={CreateClient}>

              <h2>Sign in</h2>

              <p className='msgError'>{msgErreurI}</p>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input type="email" required onChange={(e) => setClient({ ...client, ['email']: e.target.value })} pattern="^[a-zA-Z0-9\._-]+@[a-zA-Z0-9\.-]+\..[a-z]{1,}$" title="exemple : lorem@ispum.fr"></input>
                <label htmlFor="">Email</label>
              </div>

              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" required onChange={(e) => setClient({ ...client, ['mdp']: e.target.value })} pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$" title="minimum 8 caractères (minuscule, majuscule, chiffre)"></input>
                <label htmlFor="">Password</label>
              </div>

              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={personOutline} />
                  <input type="text" required onChange={(e) => setClient({ ...client, ['nom']: e.target.value })} pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Nom</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={personOutline} />
                  <input type="text" required onChange={(e) => setClient({ ...client, ['prenom']: e.target.value })} pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Prenom</label>
                </div>
              </div>
              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['numero']: e.target.value })} pattern="^[0-9]+$" title=""></input>
                  <label htmlFor="">Numéro</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['rue']: e.target.value })} pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Rue</label>
                </div>
              </div>
              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['cp']: e.target.value })} pattern="^[0-9]+$" title=""></input>
                  <label htmlFor="">Code Postal</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['ville']: e.target.value })} pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Ville</label>
                </div>
              </div>
              <div className="inputbox">
                <IonIcon icon={callOutline} />
                <input type="text" required onChange={(e) => setClient({ ...client, ['tel']: e.target.value })} pattern="^[0-9\-\.]+$" title=""></input>
                <label htmlFor="">Telephone</label>
              </div>

              <button type="submit">Sign in</button>
            </form>
          </div>
        </div>

      </div>
    </>


  )
};

export default Login;