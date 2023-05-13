import React, { useState, useEffect } from 'react';


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
  <header class="header">

    <div class="top">
      <img src="" alt="LOGO" class="logo"/>
      <div class="cart-mobile">
          <img src="../../../assets/components/navbar/shopping-cart.png" alt="cart-icon" class="cart-icon" />

          <h2>0</h2>
      </div>
      <img src="../../../assets/components/navbar/liste.png" alt="menu Hamburger_icon" class="menu-hamburger" />
    </div>

    <nav class="navbar">

      <div class="nav-links">
        <ul>
          <li><a href="">Home</a></li>
          <li>
            <a href="" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>Products</a>
          </li>
          <li><a href="">About</a></li>
          <li><a href="">Contact</a></li>
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
                <h3><a href="">Robes</a></h3>
              </div>

              <div className="item">
                <h3><a href="">Tops</a></h3>
                <ul>
                  <li><a href="">Tshirt</a></li>
                  <li><a href="">Blouses</a></li>
                  <li><a href="">Tops et Débardeurs</a></li>
                </ul>
              </div>

              <div className="item">
                <h3><a href="">Pantalons & Jupes</a></h3>
                <ul>
                  <li><a href="">Shorts</a></li>
                  <li><a href="">Pantalons</a></li>
                  <li><a href="">Jupes</a></li>
                  <li><a href="">Jeans</a></li>
                </ul>
              </div>

            </div>
</>  
  )
};

export default Navbar;
