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

  const [adresse, setAdresse] = useState({});

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const inputEmailC = useRef(null);
  const inputEmailI = useRef(null);

  const [msgErrorMail, setMsgErrorMail] = useState("");

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

  const requestUpdateAdresseClient = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client)
  };

  useEffect(() => {
    if (isNewClient) {
      const fetchPostClient = () => {
        console.log(client);
        fetch('http://localhost:8080/site/client', requestUpdateAdresseClient); 
      }
      
      fetchPostClient();
    }
  }, [isNewClient]);

  
  const CreateClient = async (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/site/adresse', requestOptionsAdresse)
    .then(response => response.json())
    .then(responseData => {{
        console.log(responseData);
        const newAdresse = {
          id: responseData,
          numero: adresse.numero,
          rue: adresse.rue,
          complement: "",
          cp: adresse.cp,
          ville: adresse.ville  
        }
        
        fetch('http://localhost:8080/site/client', requestOptionsClient); 
        
        setClient({ ...client, ['adresse']: newAdresse });
        // setClient({ ...client, ['adresse']: responseData });
        setIsNewClient(true);
        
      }
    })
  }

  useEffect(() => {
    if (isClientLogged){
      sessionStorage.setItem("client", client);
      console.log("ok");
      navigate("/");
    }
  }, [isClientLogged])
  
  const connexion = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/site/client/findbyemailandmdp/${email}/${mdp}`).then((res) => res.json()).then(data => {
      
      setClient(JSON.stringify(data))
      setIsClientLogged(true);
    });
  }

  const checkEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value)
    var emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    if(emailReg.test(event.target.value)){
      setClient({ ...client, ['email']: event.target.value })
      setMsgErrorMail("")
    } else {
      setMsgErrorMail("Saisie incorrect.")
      inputEmailI.current.focus()
    }
    
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
                <input type="email" required onBlur={checkEmail} ref={inputEmailC}></input>
                <label htmlFor="">Email</label>
              </div>

              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" required onChange={(e) => setMdp(e.target.value)}></input>
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

              <div className="inputbox">
                <p className="msgError">{msgErrorMail}</p>
                <IonIcon icon={mailOutline} />
                <input type="email" onBlur={checkEmail} ref={inputEmailI}></input>
                <label htmlFor="">Email</label>
              </div>

              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" required onChange={(e) => setClient({ ...client, ['mdp']: e.target.value })}></input>
                <label htmlFor="">Password</label>
              </div>

              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={personOutline} />
                  <input type="text" required onChange={(e) => setClient({ ...client, ['nom']: e.target.value })}></input>
                  <label htmlFor="">Nom</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={personOutline} />
                  <input type="text" required onChange={(e) => setClient({ ...client, ['prenom']: e.target.value })}></input>
                  <label htmlFor="">Prenom</label>
                </div>
              </div>
              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['numero']: e.target.value })}></input>
                  <label htmlFor="">Numéro</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['rue']: e.target.value })}></input>
                  <label htmlFor="">Rue</label>
                </div>
              </div>
              <div className="ligne">
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['cp']: e.target.value })}></input>
                  <label htmlFor="">Code Postal</label>
                </div>
                <div className="inputbox">
                  <IonIcon icon={locationOutline} />
                  <input type="text" required onChange={(e) => setAdresse({ ...adresse, ['ville']: e.target.value })}></input>
                  <label htmlFor="">Ville</label>
                </div>
              </div>
              <div className="inputbox">
                <IonIcon icon={callOutline} />
                <input type="text" required onChange={(e) => setClient({ ...client, ['tel']: e.target.value })}></input>
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
