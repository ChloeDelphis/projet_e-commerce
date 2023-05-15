package ecommerce.backend.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Version;

@Entity
public class Panier {

//	@OneToOne
//	@JoinColumn(name = "client_id", referencedColumnName = "id")
//	private Client client;

	@Id
	private int id;
	private String mailClient;
	private String date;
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

	public String getMailClient() {
		return mailClient;
	}

	public void setMailClient(String mailClient) {
		this.mailClient = mailClient;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
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

	public Panier(int id, String mailClient, String date, double total, ArrayList<Ligne> lignes) {
		super();
		this.id = id;
		this.mailClient = mailClient;
		this.date = date;
		this.total = total;
		this.lignes = lignes;
	}

	public Panier() {
		super();
	}

	@Override
	public String toString() {
		return "Panier [id=" + id + ", mailClient=" + mailClient + ", date=" + date + ", total="
				+ total + ", lignes=" + lignes + "]";
	}

}