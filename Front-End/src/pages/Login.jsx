import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline, personOutline, locationOutline, callOutline } from 'ionicons/icons';
import { Adresse } from '../classes/Adresse';
import { Client } from '../classes/Client';

// La page de Login (connexion)
const Login = () => {

  const [adresse, setAdresse] = useState({});
  const [adresse2, setAdresse2] = useState({});
  const [client, setClient] = useState({});

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const requestOptionsAdresse = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adresse)
  };

  const requestOptionsClient = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
};

/*    const CreateClient = (event) => {
    event.preventDefault();
    //fetch('http://localhost:8080/site/adresse/2').then((res) => res.json()).then(data => console.log(data));
     console.log(fetch('http://localhost:8080/site/adresse', requestOptionsAdresse))
     console.log(fetch('http://localhost:8080/site/adresse/findbynumeroandrueandcpandville', requestOptionsAdresse))
     fetch('http://localhost:8080/site/adresse/findbynumeroandrueandcpandville', requestOptionsAdresse).then((res) => res.json()).then(data => setAdresse2(data));
     console.log(JSON.stringify(adresse2));
   // fetch('http://localhost:8080/site/client', requestOptionsClient);
  } */ 

  const CreateClient = async() =>{
    try {
      const res = await  fetch('http://localhost:8080/site/adresse', requestOptionsAdresse);
      return await fetch('http://localhost:8080/site/adresse/findbynumeroandrueandcpandville', requestOptionsAdresse).then((res) => res.json()).then(data => setAdresse2(data));
      console.log(adresse2);
    } catch(e) {
      console.error("marche pas");
    }
  }

  const connexion =(event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/site/client/findbyemailandmdp/${email}/${mdp}`).then((res) => res.json()).then(data => setClient(data));
  }

  return (
    <>
      <div className="loginpage">

        <div className="login">
          <div className="form-box">
            <form onSubmit={connexion}>

              <h2>Login</h2>

              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input type="email" required onChange={(e) => setEmail(e.target.value)}></input>
                <label for="">Email</label>
              </div>

              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" required onChange={(e) => setMdp(e.target.value)}></input>
                <label for="">Password</label>
              </div>

              <div className="ligne">
                <label for=""><input type="checkbox"></input>Remember Me </label>
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

                <div className="inputbox">
                  <IonIcon icon={mailOutline} />
                  <input type="email" required onChange={(e) => setClient({...client, ['email']: e.target.value})}></input>
                  <label for="">Email</label>
                </div>

                <div className="inputbox">
                  <IonIcon icon={lockClosedOutline} />
                  <input type="password" required onChange={(e) => setClient({...client, ['mdp']: e.target.value})}></input>
                  <label for="">Password</label>
                </div>

                <div className="ligne">
                  <div className="inputbox">
                  <IonIcon icon={personOutline} />
                      <input type="text" required onChange={(e) => setClient({...client, ['nom']: e.target.value})}></input>
                      <label for="">Nom</label>
                  </div>
                  <div className="inputbox">
                      <IonIcon icon={personOutline} />
                      <input type="text" required onChange={(e) => setClient({...client, ['prenom']: e.target.value})}></input>
                      <label for="">Prenom</label>
                  </div>
                </div>
                <div className="ligne">
                  <div className="inputbox">
                      <IonIcon icon={locationOutline} />
                      <input type="text" required onChange={(e) => setAdresse({...adresse, ['numero']: e.target.value})}></input>
                      <label for="">Numéro</label>
                  </div>
                  <div className="inputbox">
                      <IonIcon icon={locationOutline} />
                      <input type="text" required onChange={(e) => setAdresse({...adresse, ['rue']: e.target.value})}></input>
                      <label for="">Rue</label>
                  </div>
              </div>
              <div className="ligne">
                  <div className="inputbox">
                      <IonIcon icon={locationOutline} />
                      <input type="text" required onChange={(e) => setAdresse({...adresse, ['cp']: e.target.value})}></input>
                      <label for="">Code Postal</label>
                  </div>
                  <div className="inputbox">
                      <IonIcon icon={locationOutline} />
                      <input type="text" required onChange={(e) => setAdresse({...adresse, ['ville']: e.target.value})}></input>
                      <label for="">Ville</label>
                  </div>
              </div>
                <div className="inputbox">
                <IonIcon icon={callOutline} />
                    <input type="text" required onChange={(e) => setClient({...client, ['tel']: e.target.value})}></input>
                    <label for="">Telephone</label>
                </div>    

                <button>Sign in</button>
              </form>
            </div>
        </div>

      </div>
    </>


  )
};

export default Login;
