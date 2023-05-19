import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NewNavbar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    // open/close side menu when hamburger is clicked
    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const deleteUserFromSessionStorage = () => {
        sessionStorage.removeItem('client');
    };


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
                                                <li className="sub-container">
                                                    <ul>
                                                        <li>Les hauts</li>
                                                        <li>
                                                            <Link to={"/category/1"}>
                                                                T-Shirts
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={"category/2"}>
                                                                Pulls
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="sub-container">
                                                    <ul>
                                                        <li>Les bas</li>
                                                        <li>
                                                            <Link to={"/category/3"}>
                                                                Pantalons
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={"/category/4"}>
                                                                Jupes
                                                            </Link>
                                                        </li>

                                                    </ul>
                                                </li>
                                                <li className="sub-container">
                                                    <ul>
                                                        <li>Habillée de haut en bas !</li>
                                                        <li>
                                                            <Link to={"/category/5"}>
                                                                Robes
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
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
                                    to={`${JSON.parse(sessionStorage.getItem("client")) ? "/cart" : "/login"}`}
                                >

                                    <span>
                                        Cart
                                    </span>
                                    <img src="../../../assets/components/navbar/shopping-cart.png"
                                        alt="cart" />
                                    <div className="nb-items-cart">{0}</div>
                                </NavLink>
                            </li>
                            <li onClick={() => setIsActive(false)}>
                                <NavLink
                                    className={(nav) =>
                                        nav.isActive
                                            ? "nav-active menu-list-item"
                                            : "menu-list-item"
                                    }
                                    to={`${JSON.parse(sessionStorage.getItem("client")) ? "/profil" : "/login"}`}
                                >
                                    <div className="user-icon-container">
                                        <img src="../../../assets/components/navbar/icon-user.png"
                                            alt="user" />
                                    </div>
                                </NavLink>
                            </li>

                            {
                                JSON.parse(sessionStorage.getItem("client")) != null &&
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
