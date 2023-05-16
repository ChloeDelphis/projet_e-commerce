import { Client } from "./Client";
import { Categorie } from "./Categorie";

export class Article {
  ref: number;
  nom: string;
  marque: string;
  description: string;
  categorie: Categorie;
  prix: number;
  image: string;
  mea: number;
  date: String;
  version?: number;
}
