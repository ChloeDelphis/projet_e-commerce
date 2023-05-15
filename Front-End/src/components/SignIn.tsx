import { useState } from 'react';
import Login from '../pages/Login';

function SignIn(e){

    e.preventDefault();
    const[email, setEmail] = useState("")
    const[mdp, setMdp] = useState("")
    const[nom, setNom] = useState("")
    const[prenom, setPrenom] = useState("")
    const[adresse, setAdresse] = useState("")
    const[tel, setTel] = useState("")

    console.log(email, mdp, nom, prenom, adresse, tel)
}

export default SignIn;