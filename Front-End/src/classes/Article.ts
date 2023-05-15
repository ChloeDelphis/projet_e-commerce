import { Client } from './Client';
import { Categorie } from './Categorie';

export class Article {
    nom: string;
    marque: string;
    description: string;
    image: string;
    prix: number;
    categorie: Categorie;
    stock : number;
    mea: number;
    date: String;
    owner: Client;
    version?:number;
}