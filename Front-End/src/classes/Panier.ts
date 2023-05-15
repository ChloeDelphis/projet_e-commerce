import { Ligne } from './Ligne';

export class Panier {
    idPanier: number;
    mailClient: string;
    date: string;
    total: number;
    lignes: Ligne[];
    version?:number;
}