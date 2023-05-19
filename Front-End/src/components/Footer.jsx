import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Le component du Footer
const Footer = () => {
  return (
    <footer className="footer">

      <div className="newsletter">
        <h2>Abonnez-vous à notre Newsletter</h2>
        <p>Abonnez-vous à notre newsletter pour suivre toute notre actualité en avant-première !</p>
        <p>
          <span>(Vous pouvez vous DÉSABONNER à tout moment).</span>
        </p>

        <form>
          <input className='input' type="email" placeholder="Entrez votre e-mail" />
          <button>Sign up</button>
        </form>
      </div>

      <div className="top">
        {/* <img src="../../../assets/components/footer/logo.png" alt="Logo" /> */}
        <div className="logo">
          <Link className={"logo-navlink"} to={"/"}>Fashion Store</Link>
        </div>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/productcategories"}>Products</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
      </div>

      <div className="bottom">
        <div className="medias">
          <Link to={"/"}><img src="../../../assets/components/footer/instagram.png" alt="Instagram" /></Link>
          <Link to={"/"}><img src="../../../assets/components/footer/twitter.png" alt="Twitter" /></Link>
          <Link to={"/"}><img src="../../../assets/components/footer/tiktok.png" alt="Facebook" /></Link>
          <Link to={"/"}><img src="../../../assets/components/footer/snapchat.png" alt="Facebook" /></Link>
          <Link to={"/"}><img src="../../../assets/components/footer/linkedin.png" alt="LinkedIn" /></Link>
          <Link to={"/"}><img src="../../../assets/components/footer/facebook.png" alt="Facebook" /></Link>
        </div>

        <div className="policies">
          <Link to={"/"}>Privacy Policy</Link>
          <Link to={"/"}>Terms of Service</Link>
          <Link to={"/"}>Cookies Settings</Link>
        </div>
      </div>

    </footer>
  )
};

export default Footer;
