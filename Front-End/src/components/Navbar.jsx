import React, { useEffect } from 'react';


// Le component de la Navbnar
const Navbar = () => {

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
          <li><a href="">Products</a></li>
          <li><a href="">About</a></li>
          <li><a href="">Contact</a></li>
        </ul>
        <div class="cart">
          <img src="../../../assets/components/navbar/shopping-cart.png" alt="cart-icon" class="cart-icon" />

          <h2>0</h2>
        </div>

      </div>

    </nav>
  </header>
</>  
  )
};

export default Navbar;
