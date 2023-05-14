import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Le component de la Navbnar
const Navbar = () => {


  const [submenuClass, setSubmenuClass] = useState("sub-menu-hide");
  const [submenuTimeout, setSubmenuTimeout] = useState(null);


  function handleMouseOver() {
    if (submenuTimeout !== null) {
      clearTimeout(submenuTimeout);
      setSubmenuTimeout(null);
    }
    setSubmenuClass("sub-menu-display");
  }
  

  function handleMouseLeave() {
    const timeoutId = setTimeout(() => {
      setSubmenuClass("sub-menu-hide");
    }, 250); // ajustez la durée du délai selon vos besoins
    setSubmenuTimeout(timeoutId);
  }
  
  

  const navLinks = document.querySelector(".nav-links");
  

  useEffect(() => {
    const menuHamburger = document.querySelector(".menu-hamburger");
    const navLinks = document.querySelector(".nav-links");
    menuHamburger.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-menu");
    });
  }, []);

  return (
<>
<head>
<link rel="stylesheet" href="../styles/components/navbar.css"></link>
</head>
  <div className="container-header">
    <header class="header">

      <div class="top">
        <img src="../../../assets/components/footer/logo.png" alt="LOGO" class="logo"/>
        <div class="cart-mobile">
            <img src="../../../assets/components/navbar/shopping-cart.png" alt="cart-icon" class="cart-icon" />

            <h2>0</h2>
        </div>
        <img src="../../../assets/components/navbar/liste.png" alt="menu Hamburger_icon" class="menu-hamburger" />
      </div>

      <nav class="navbar">

        <div class="nav-links">
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li>
            <Link to={"/"} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>Products</Link>
            </li>
            <li><Link to={"/"}>About</Link></li>
            <li><Link to={"/"}>Contact</Link></li>
          </ul>
        </div>
        <div class="cart">
            <img src="../../../assets/components/navbar/shopping-cart.png" alt="cart-icon" class="cart-icon" />

            <h2>0</h2>
          </div>
      </nav>
    </header>
    <div class={submenuClass}  onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>

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
