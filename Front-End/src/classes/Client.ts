import {Adresse} from '../classes/Adresse';

export class Client {

    email:string;
    mdp:string;
    prenom:string;
    nom:string;
    tel:string;
    adresse:Adresse;
    //panier:Panier;
    version?:number;
}