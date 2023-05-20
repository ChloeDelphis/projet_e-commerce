import { useState, useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { useNavigate } from "react-router-dom";
import { mailOutline, lockClosedOutline, personOutline, locationOutline, callOutline } from 'ionicons/icons';

import { useUser } from "../context/UserContext";

const Login = () => {

  const [client, setClient] = useState({});
  const [isClientLogged, setIsClientLogged] = useState(false);
  const { user, handleLogin } = useUser();
  const navigate = useNavigate();

  const CreateClient = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const mdp = event.target.password.value;
    const nom = event.target.nom.value;
    const prenom = event.target.prenom.value;
    const numrue = event.target.numrue.value;
    const nomrue = event.target.nomrue.value;
    const cp = event.target.cp.value;
    const ville = event.target.ville.value;
    const tel = event.target.phone.value;

    const newAdresse = {
          "numero": numrue,
          "rue": nomrue,
          "complement": null,
          "cp": cp,
          "ville": ville
    }

    const requestOptionsAdresse = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAdresse)
    };

    fetch('http://localhost:8080/site/adresse', requestOptionsAdresse)
      .then(response => response.json())
      .then(data => {
        const adresseId = data;

        const newClient = {
          "email": email,
          "mdp": mdp,
          "prenom": prenom,
          "nom": nom,
          "tel": tel,
          "adresse": {
              "id":adresseId
          },
          "panier": {
            "date": new Date().toISOString(),
            "total": 0,
            "lignes": [],
            "client": {
              "email": email
            }
          }
        }
    
        const requestOptionsClient = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newClient)
        };
    
        fetch('http://localhost:8080/site/client', requestOptionsClient)
            setClient(newClient);
            setIsClientLogged(true);
      
            // add user in the user context

            handleLogin(newClient);
      })
  }

  const loginClient = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const mdp = event.target.password.value;

    fetch(`http://localhost:8080/site/client/findbyemailandmdp/${email}/${mdp}`)
      .then((res) => res.json()).then(data => {

      console.log("Logged in");
      console.log(data);
      setClient(data);
      setIsClientLogged(true);

      // add user in the user context
      handleLogin(data);
      })
    }

    useEffect(() => {
      if (isClientLogged) {
        sessionStorage.setItem("client", JSON.stringify(client));
  
        // add user in the user context
        // handleLogin(client);
  
        // setMsgErreurC("");
        navigate("/");
      }
    }, [isClientLogged])

    useEffect(() => {
      if (sessionStorage.getItem("client") != null) {
        console.log("Vous êtes déja log");
        navigate("/");
      }
    }, [isClientLogged])



  return(
  <>
    <div className="loginpage">
      
      <div className="login">
            <div className="form-box">
              <form onSubmit={loginClient}>

                <h2>Login</h2>

                <p className='msgError'>message</p>
                <div className="inputbox">
                  <IonIcon icon={mailOutline} />
                  <input type="email" name="email" required ></input>
                  <label htmlFor="">Email</label>
                </div>

                <div className="inputbox">
                  <IonIcon icon={lockClosedOutline} />
                  <input type="password" name="password" required ></input>
                  <label htmlFor="">Password</label>
                </div>

                <div className="ligne">
                  {/* <label htmlFor=""><input type="checkbox"></input>Remember Me </label>
                  <a href="">Forget Password</a> */}
                </div>

                <button type="submit">Log in</button>
              </form>
            </div>
        </div>

        <div className="signup">
          <div className="form-box">
            <form onSubmit={CreateClient}>

              <h2>Sign in</h2>

              <p className='msgError'>msgErreurI</p>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input type="email" name="email" required pattern="^[a-zA-Z0-9\._-]+@[a-zA-Z0-9\.-]+\..[a-z]{1,}$" title="exemple : lorem@ispum.fr"></input>
                <label htmlFor="">Email</label>
              </div>

              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" name="password" required pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$" title="minimum 8 caractères (minuscule, majuscule, chiffre)"></input>
                <label htmlFor="">Password</label>
              </div>

              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={personOutline} />
                  <input type="text" name="nom" required  pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Nom</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={personOutline} />
                  <input type="text" name="prenom" required  pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Prenom</label>
                </div>
              </div>
              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" name="numrue" pattern="^[0-9]+$" title=""></input>
                  <label htmlFor="">Numéro</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" name="nomrue" pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Rue</label>
                </div>
              </div>
              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text"  name="cp" pattern="^[0-9]+$" title=""></input>
                  <label htmlFor="">Code Postal</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" name="ville" required  pattern="^[a-zA-Z\-']{2,}$" title=""></input>
                  <label htmlFor="">Ville</label>
                </div>
              </div>
              <div className="inputbox">
                <IonIcon icon={callOutline} />
                <input type="text" name="phone" required pattern="^[0-9\-\.]+$" title=""></input>
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