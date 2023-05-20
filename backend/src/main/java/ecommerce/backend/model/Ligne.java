package ecommerce.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Ligne {

	@Id
	@JsonView(JsonViews.Common.class)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "panier_id")
	@JsonView(JsonViews.LigneWithPanierAndArticle.class)
	private Panier panier;
	
	@ManyToOne
	@JoinColumn(name = "article_id")
//	@JsonView({JsonViews.ArticleWithCategorie.class})
	@JsonView({JsonViews.PanierWithLigneAndClient.class, JsonViews.ClientWithAdresseAndPanier.class})	
	private Article article;
	
	@JsonView(JsonViews.Common.class)
	private int quantite;
	
	@JsonView(JsonViews.Common.class)
    private double total;
	
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
		calculateTotal();
	}

	public double getTotal() {
	    return total;
	}
	
	public void setTotal(double total) {
	    this.total = total;
	}
	
	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
	 @JsonIgnore
    private void calculateTotal() {
        this.total = this.quantite * this.article.getPrix();
    }

	 public Ligne(int id, Panier panier, Article article, int quantite) {
	        this.id = id;
	        this.panier = panier;
	        this.article = article;
	        this.quantite = quantite;
	        calculateTotal();
	    }

	    public Ligne() {
	    }

}
