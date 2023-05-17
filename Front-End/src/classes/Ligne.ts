import { Article } from './Article';
import { Panier } from './Panier';

export class Ligne {
    id:number;
    panier: Panier;
    article: Article;
    quantite: number;
    total:number;
    version?:number;
}