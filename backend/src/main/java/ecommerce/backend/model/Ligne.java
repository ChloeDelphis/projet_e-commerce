package ecommerce.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

@Entity
public class Ligne {

	@Id
	private int id;
	@ManyToOne
	@JoinColumn(name = "panier_id")
	private Panier panier;
	@ManyToOne
	@JoinColumn(name = "article_id")
	private Article article;
	private int quantite;
	@Version
	private int version;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Panier getPanier() {
		return panier;
	}

	public void setPanier(Panier panier) {
		this.panier = panier;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public Ligne(int id, Panier panier, Article article, int quantite) {
		super();
		this.id = id;
		this.panier = panier;
		this.article = article;
		this.quantite = quantite;
	}

	public Ligne() {
		super();
	}

	@Override
	public String toString() {
		return "Ligne [id=" + id + ", panier=" + panier + ", article=" + article + ", quantite=" + quantite
				+ ", version=" + version + "]";
	}

}
