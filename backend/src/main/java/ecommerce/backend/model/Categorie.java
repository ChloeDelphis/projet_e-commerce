package ecommerce.backend.model;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Categorie {

	// Auto incrément pour l'id categorie
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonView(JsonViews.Common.class)
	private int id;
	@JsonView(JsonViews.Common.class)
	private String name;
	@JsonView(JsonViews.Common.class)
	private String description = "";
	@JsonView(JsonViews.Common.class)
	private String image = "";
	@JsonView(JsonViews.Common.class)
	private int mea;
	@Version
	private int version;

	@OneToMany(mappedBy = "categorie")
	@JsonView(JsonViews.CategorieWithArticle.class)
	private Collection<Article> articles;

	public Categorie() {
		super();
	}
	
	public Categorie(int id, String name, String description, String image, int mea, Collection<Article> articles) {
		super();
		this.id=id;
		this.name = name;
		this.description = description;
		this.image = image;
		this.mea = mea;
		this.articles = articles;

	}
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Integer getMea() {
		return mea;
	}

	public void setMea(int mea) {
		this.mea = mea;
	}

	public Collection<Article> getListe() {
		return articles;
	}

	public void setListe( Collection<Article> articles) {
		this.articles = articles;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Categorie [id=" + id + ", name=" + name + ", description=" + description + ", image=" + image + ", mea="
				+ mea + ", version=" + version + "]";
	}



}
