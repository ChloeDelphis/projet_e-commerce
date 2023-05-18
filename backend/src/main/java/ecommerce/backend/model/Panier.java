package ecommerce.backend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Panier {

	@Id
	@JsonView(JsonViews.Common.class)
	private int id;
	
	@JsonView(JsonViews.Common.class)
	private Date date;
	
	@JsonView(JsonViews.Common.class)
	private double total;
	
	@OneToMany(mappedBy = "panier", cascade = CascadeType.REMOVE)
	@JsonView({JsonViews.PanierWithLigneAndClient.class, JsonViews.ArticleWithCategorie.class})
	private List<Ligne> lignes;
	
	@OneToOne
	@JoinColumn(name = "email_client")
	@JsonView(JsonViews.PanierWithLigneAndClient.class)
	private Client client;
	
	@Version
	@JsonView(JsonViews.Common.class)
	private int version;

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public int getId() {
		calculateTotal();
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public List<Ligne> getLignes() {
		return lignes;
	}

	public void setLignes(List<Ligne> lignes) {
		this.lignes = lignes;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
	@JsonIgnore
    public void calculateTotal() {
        int prixTotal = 0;
        if(lignes.size()>0){
	        for (Ligne ligne : lignes) {
				prixTotal += ligne.getTotal();
			}
        }
        
        this.total = prixTotal;
    }

	public Panier() {
		super();
	}

	public Panier(Client client, int id, Date date, double total, List<Ligne> lignes) {
		super();
		this.client = client;
		this.id = id;
		this.date = date;
		this.total = total;
		this.lignes = lignes;
		calculateTotal();
	}

	@Override
	public String toString() {
		calculateTotal();
		return "Panier [client=" + client + ", id=" + id + ", date=" + date + ", total="
				+ total + ", lignes=" + lignes + ", version=" + version + "]";
	}

}