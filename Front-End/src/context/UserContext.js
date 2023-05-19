import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        const newUser = JSON.parse(sessionStorage.getItem("client")) ?
            JSON.parse(sessionStorage.getItem("client")) : null;

        setUser(newUser);
    }, []);

    useEffect(() => {
        if (user != null) {
            fetch(`http://localhost:8080/site/panier/${user.panier.id}`)
                .then((res) => res.json())
                .then(data => {
                    let quantity = 0;
                    for (let i = 0; i < data.lignes.length; i++) {
                        quantity += data.lignes[i].quantite;
                    }
                    setCartQuantity(quantity);
                });
        }
    }, [user])

    const handleLogin = (client) => {
        if (client)
            setUser(client);
    };

    const handleLogout = () => {
        setUser(null);
    };

    const addQuantity = (quantity) => {
        setCartQuantity(prevState => prevState + quantity)
    };

    const removeQuantity = (quantity) => {
        setCartQuantity(prevState => prevState - quantity)
    };

    const emptyCart = () => {
        setCartQuantity(0);
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, cartQuantity, addQuantity, removeQuantity, emptyCart }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
