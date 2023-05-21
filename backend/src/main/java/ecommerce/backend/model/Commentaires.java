package ecommerce.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

@Entity
public class Commentaires {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int idProduit;
	private int nbEtoiles;
	private String nom;
	private String date;
	private String commentaire;
	@Version
	private int version;
	
	public Commentaires() {
	}

	public Commentaires(int id, int idProduit, int nbEtoiles, String nom, String date, String commentaire) {
		this.id = id;
		this.idProduit = idProduit;
		this.nbEtoiles = nbEtoiles;
		this.nom = nom;
		this.date = date;
		this.commentaire = commentaire;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIdProduit() {
		return idProduit;
	}

	public void setIdProduit(int idProduit) {
		this.idProduit = idProduit;
	}

	public int getNbEtoiles() {
		return nbEtoiles;
	}

	public void setNbEtoiles(int nbEtoiles) {
		this.nbEtoiles = nbEtoiles;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Commentaires [id=" + id + ", idProduit=" + idProduit + ", nbEtoiles=" + nbEtoiles + ", nom=" + nom
				+ ", date=" + date + ", commentaire=" + commentaire + "]";
	}

}
