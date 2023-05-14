import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline, personOutline, locationOutline, callOutline } from 'ionicons/icons';


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

              <div class="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input type="password" required></input>
                <label for="">Password</label>
              </div>

              <div class="ligne">
                <label for=""><input type="checkbox"></input>Remember Me </label>
                <a href="">Forget Password</a>
              </div>

              <button>Log in</button>
            </form>
          </div>
        </div>

        <div className="signup">
          <div className="form-box">
              <form>

                <h2>Sign in</h2>

                <div className="inputbox">
                  <IonIcon icon={mailOutline} />
                  <input type="email" required></input>
                  <label for="">Email</label>
                </div>

                <div class="inputbox">
                  <IonIcon icon={lockClosedOutline} />
                  <input type="password" required></input>
                  <label for="">Password</label>
                </div>

                <div class="ligne">
                  <div class="inputbox">
                  <IonIcon icon={personOutline} />
                      <input type="text" required></input>
                      <label for="">Nom</label>
                  </div>
                  <div class="inputbox">
                      <IonIcon icon={personOutline} />
                      <input type="text" required></input>
                      <label for="">Prenom</label>
                  </div>
                </div>

                <div class="inputbox">
                    <IonIcon icon={locationOutline} />
                    <input type="text" required></input>
                    <label for="">Adresse</label>
                </div>

                <div class="inputbox">
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
