package ecommerce.backend.model;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Version;

@Entity
public class Panier {

	@Id
	private int id;
	private Date date;
	private double total;
	private ArrayList<Ligne> lignes;
	@OneToOne
	@JoinColumn(name = "email_client")
	private Client client;
	
	@Version
	private int version;

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public int getId() {
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

	public ArrayList<Ligne> getLignes() {
		return lignes;
	}

	public void setLignes(ArrayList<Ligne> lignes) {
		this.lignes = lignes;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public Panier() {
		super();
	}

	public Panier(Client client, int id, Date date, double total, ArrayList<Ligne> lignes) {
		super();
		this.client = client;
		this.id = id;
		this.date = date;
		this.total = total;
		this.lignes = lignes;
	}

	@Override
	public String toString() {
		return "Panier [client=" + client + ", id=" + id + ", date=" + date + ", total="
				+ total + ", lignes=" + lignes + ", version=" + version + "]";
	}

}