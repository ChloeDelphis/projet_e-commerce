import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

const NewNavbar = () => {
    const { user, handleLogout, cartQuantity, emptyCart } = useUser();

    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [categories, setCategories] = useState(null);

    // open/close side menu when hamburger is clicked
    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const deleteUserFromSessionStorage = () => {
        sessionStorage.removeItem('client');
        handleLogout();
        emptyCart();
    };

    useEffect(() => {
        fetch(`http://localhost:8080/site/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-container__wrapper">
                    <div className="left">
                        <div className="logo">
                            <NavLink className={"logo-navlink"} to={"/"}>Fashion Store</NavLink>
                        </div>
                    </div>

                    <div className="right">
                        <div
                            className={`hamburger-container ${isActive ? "hamburger-active" : "hamburger-rest"
                                }`}
                            onClick={handleToggle}
                        ></div>

                        <ul className={`menu-list ${isActive ? "show-menu" : ""}`}>
                            <li onClick={() => setIsActive(false)}>
                                <NavLink
                                    className={(nav) =>
                                        nav.isActive
                                            ? "nav-active menu-list-item"
                                            : "menu-list-item"
                                    }
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li
                                onClick={() => setIsActive(false)}>
                                <div className={`product-dropdown`}>
                                    <NavLink
                                        className={(nav) =>
                                            nav.isActive
                                                ? "nav-active menu-list-item"
                                                : "menu-list-item"
                                        }
                                        to="/productcategories"
                                    >
                                        Products
                                        <div className={`sub-menu-products ${isActive ? "hide-dropdown" : ""}`}>
                                            <ul className="sub-menu-products__container">
                                                {categories && categories.map((item, index) => (
                                                    <li key={index}>
                                                        <Link to={`/category/${item.id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                                }

                                            </ul>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li onClick={() => setIsActive(false)}>
                                <NavLink
                                    className={(nav) =>
                                        nav.isActive
                                            ? "nav-active menu-list-item"
                                            : "menu-list-item"
                                    }
                                    to="/about"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li onClick={() => setIsActive(false)}>
                                <NavLink
                                    className={(nav) =>
                                        nav.isActive
                                            ? "nav-active menu-list-item"
                                            : "menu-list-item"
                                    }
                                    to="/contact"
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li className="cart-link-container"
                                onClick={() => setIsActive(false)}>
                                <NavLink
                                    className={(nav) =>
                                        nav.isActive
                                            ? "menu-list-item"
                                            : "menu-list-item"
                                    }
                                    to={`${user != null ? "/cart" : "/login"}`}
                                >

                                    <span>
                                        Cart
                                    </span>
                                    <img src="../../../assets/components/navbar/shopping-cart.png"
                                        alt="cart" />
                                    <div className="nb-items-cart">{cartQuantity}</div>
                                </NavLink>
                            </li>
                            <li onClick={() => setIsActive(false)}>
                                <NavLink
                                    className={(nav) =>
                                        nav.isActive
                                            ? "nav-active menu-list-item"
                                            : "menu-list-item"
                                    }
                                    to={`${user != null ? "/profil" : "/login"}`}
                                >
                                    <div className="user-icon-container">
                                        <img src="../../../assets/components/navbar/icon-user.png"
                                            alt="user" />
                                    </div>
                                </NavLink>
                            </li>

                            {
                                user != null &&
                                <li onClick={() => {
                                    deleteUserFromSessionStorage();
                                    navigate("/");
                                }}>
                                    <div className="logoff-icon-container">
                                        <img src="../../../assets/components/navbar/log-off.png"
                                            alt="user" />
                                    </div>
                                </li>
                            }

                        </ul>
                    </div>

                </div>
            </div>
            {isActive && <div className="layer-dim"></div>}
        </>
    );
};

export default NewNavbar;
