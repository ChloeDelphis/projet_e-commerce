import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { personOutline, cartOutline } from 'ionicons/icons';

// Le component de la Navbnar
const Navbar = () => {


  const [submenuProducts, setsubmenuProducts] = useState("sub-menu-hide");
  const [submenuAccount, setsubmenuAccount] = useState("sub-menu-hide");
  const [submenuTimeout, setSubmenuTimeout] = useState(null);


  function handleMouseOver(currentDiv) {
    if (submenuTimeout !== null) {
      clearTimeout(submenuTimeout);
      setSubmenuTimeout(null);
    }
    if (currentDiv === "products") {
      setsubmenuProducts("sub-menu-products");
    } else if (currentDiv === "account") {
      setsubmenuAccount("sub-menu-account");
    }
  }
  

  // function handleMouseLeave() {
  //   const timeoutId = setTimeout(() => {
  //     setsubmenuProducts("sub-menu-hide");
  //     setsubmenuAccount("sub-menu-hide");
  //   }, 250); // ajustez la durée du délai selon vos besoins
  //   setSubmenuTimeout(timeoutId);
  // }

  function handleMouseLeave(currentDiv) {
    if (currentDiv === "products") {
      const timeoutId = setTimeout(() => {
            setsubmenuProducts("sub-menu-hide");
          }, 250); 
          setSubmenuTimeout(timeoutId);
    } else if (currentDiv === "account") {
      const timeoutId = setTimeout(() => {
        setsubmenuAccount("sub-menu-hide");
      }, 0);
      setSubmenuTimeout(timeoutId);
    }
  }

  const navLinks = document.querySelector(".nav-links");
  

  useEffect(() => {
    const menuHamburger = document.querySelector(".menu-hamburger");
    const navLinks = document.querySelector(".nav-links");
    const header = document.querySelector(".header");
    menuHamburger.addEventListener("click", () => {
      navLinks.classList .toggle("mobile-menu");
      header.classList .toggle("mobile-header");
    });
  }, []);

  return (
<>
<div className="container-header">
    <header className="header">

      <div className="top">
        <img src="../../../assets/components/footer/logo.png" alt="LOGO" className="logo"/>
        <div className="icons-mobile">
          
          <div className="mobile-icon account">
          <Link to={"/"}><IonIcon icon={personOutline} /></Link>
          </div>
          <div className="mobile-icon cart">
            <Link to={"/"}><IonIcon icon={cartOutline} /></Link><h2>0</h2>
          </div>
        </div>
        <img src="../../../assets/components/navbar/liste.png" alt="menu Hamburger_icon" className="menu-hamburger" />
      </div>

      <nav className="navbar">

        <div className="nav-links">
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li>
            <Link to={"/"} onMouseOver={() => handleMouseOver("products")} onMouseLeave={() => handleMouseLeave("products")} >Products</Link>
            </li>
            <li><Link to={"/"}>About</Link></li>
            <li><Link to={"/"}>Contact</Link></li>
            <div className="icons">
              <li className="icon account" onMouseOver={() => handleMouseOver("account")} onMouseLeave={() => handleMouseLeave("account")} ><Link to={"/"}><IonIcon icon={personOutline} /></Link>
                <div className={submenuAccount}>
                    <ul>
                      <li><Link to={"/"}>Connexion</Link></li>
                      <li><Link to={"/"}>Mon compte</Link></li>
                      <li><Link to={"/"}>Mes commandes</Link></li>
                    </ul>
                </div>
              </li>
              <li className="icon cart"><Link to={"/"}><IonIcon icon={cartOutline} /></Link><h2>0</h2></li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
    <div className={submenuProducts}  onMouseOver={() => handleMouseOver("products")} onMouseLeave={() => handleMouseLeave("products")}>

                <div className="item">
                  <h3><Link to={"/"}>Robes</Link></h3>
                </div>

                <div className="item">
                  <h3><Link to={"/"}>Tops</Link></h3>
                  <ul>
                    <li><Link to={"/"}>Tshirt</Link></li>
                    <li><Link to={"/"}>Blouses</Link></li>
                    <li><Link to={"/"}>Tops et Débardeurs</Link></li>
                  </ul>
                </div>

                <div className="item">
                  <h3><Link to={"/"}>Pantalons & Jupes</Link></h3>
                  <ul>
                    <li><Link to={"/"}>Shorts</Link></li>
                    <li><Link to={"/"}>Pantalons</Link></li>
                    <li><Link to={"/"}>Jupes</Link></li>
                    <li><Link to={"/"}>Jeans</Link></li>
                  </ul>
                </div>

    </div>

    
  </div>
</>  
  )
};

export default Navbar;
