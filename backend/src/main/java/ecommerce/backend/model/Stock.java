package ecommerce.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

@Entity
public class Stock {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int refArticle;
	private String taille;
	private int qte;
	@Version
	private int version;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRefArticle() {
		return refArticle;
	}

	public void setRefArticle(int refArticle) {
		this.refArticle = refArticle;
	}

	public String getTaille() {
		return taille;
	}

	public void setTaille(String taille) {
		this.taille = taille;
	}

	public int getQte() {
		return qte;
	}

	public void setQte(int qte) {
		this.qte = qte;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public Stock(int id, int refArticle, String taille, int qte) {
		super();
		this.id = id;
		this.refArticle = refArticle;
		this.taille = taille;
		this.qte = qte;
	}

	public Stock() {
		super();
	}

	@Override
	public String toString() {
		return "Stock [id=" + id + ", refArticle=" + refArticle + ", taille=" + taille + ", qte=" + qte + ", version="
				+ version + "]";
	}

}
