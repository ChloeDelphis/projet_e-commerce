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

	// @OneToOne
	// @JoinColumn(name = "client_id", referencedColumnName = "id")
	// private Client client;

	@Id
	private int id;
	private String email;
	private Date date;
	private double total;
	private ArrayList<Ligne> lignes;

	@Version
	private int version;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public Panier(int id, String email, Date date, double total, ArrayList<Ligne> lignes) {
		super();
		this.id = id;
		this.email = email;
		this.date = date;
		this.total = total;
		this.lignes = lignes;
	}

	@Override
	public String toString() {
		return "Panier [id=" + id + ", email=" + email + ", date=" + date + ", total=" + total + ", lignes=" + lignes
				+ ", version=" + version + "]";
	}

}