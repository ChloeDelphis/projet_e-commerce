import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline, personOutline, locationOutline, callOutline } from 'ionicons/icons';
import SignIn from '../components/SignIn';
import { Value } from 'sass';

// La page de Login (connexion)
const Login = () => {

  return (
    <>
      <div className="loginpage">

        <div className="login">
          <div className="form-box">
            <form>

              <h2>Login</h2>

              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input type="email" required></input>
                <label for="">Email</label>
              </div>

              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" required></input>
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
              <form onSubmit={SignIn}>

                <h2>Sign in</h2>

                <div className="inputbox">
                  <IonIcon icon={mailOutline} />
                  <input type="email" required value={SignIn.arguments.email} onChange={(e) => SignIn.setEmail(e.target.value)}></input>
                  <label for="">Email</label>
                </div>

                <div className="inputbox">
                  <IonIcon icon={lockClosedOutline} />
                  <input type="password" required></input>
                  <label for="">Password</label>
                </div>

                <div className="ligne">
                  <div className="inputbox">
                  <IonIcon icon={personOutline} />
                      <input type="text" required></input>
                      <label for="">Nom</label>
                  </div>
                  <div className="inputbox">
                      <IonIcon icon={personOutline} />
                      <input type="text" required></input>
                      <label for="">Prenom</label>
                  </div>
                </div>

                <div className="inputbox">
                    <IonIcon icon={locationOutline} />
                    <input type="text" required></input>
                    <label for="">Adresse</label>
                </div>

                <div className="inputbox">
                <IonIcon icon={callOutline} />
                    <input type="text" required></input>
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
