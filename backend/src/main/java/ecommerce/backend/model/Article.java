package ecommerce.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Article {

	@Id
	@JsonView(JsonViews.Common.class)
	private int ref;
	@JsonView(JsonViews.Common.class)
	private String nom;
	private String marque = "";
	@JsonView(JsonViews.Common.class)
	private String description;

	@ManyToOne
	@JoinColumn(name = "categorie")
	@JsonView(JsonViews.ArticleWithCategorie.class)
	private Categorie categorie;
	
	@JsonView(JsonViews.Common.class)
	private double prix;
	@JsonView(JsonViews.Common.class)
	private String img;
	@JsonView(JsonViews.Common.class)
	private int mea;
	@JsonView(JsonViews.Common.class)
	private Date date = new Date();
	@Version
	private int version;

	public Article() {
		super();
	}

	public Article(int ref, String nom, String marque, String description, Categorie categorie, double prix, String img,
			int mea, Date date) {
		super();
		this.ref = ref;
		this.nom = nom;
		this.marque = marque;
		this.description = description;
		this.categorie = categorie;
		this.img = img;
		this.prix = prix;
		this.mea = mea;
		this.date = date;
	}

	public int getRef() {
		return ref;
	}

	public void setRef(int ref) {
		this.ref = ref;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getMarque() {
		return marque;
	}

	public void setMarque(String marque) {
		this.marque = marque;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Categorie getCategorie() {
		return categorie;
	}

	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public int getMea() {
		return mea;
	}

	public void setMea(int mea) {
		this.mea = mea;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Article [ref=" + ref + ", nom=" + nom + ", marque=" + marque + ", description=" + description
				+ ", categorie=" + categorie + ", prix=" + prix + ", img=" + img + ", mea=" + mea + ", date=" + date
				+ "]";
	}

}
