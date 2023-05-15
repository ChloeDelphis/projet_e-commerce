package ecommerce.backend.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

@Entity
public class Commande {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idCommande;
	private String emailClient;
	private Date date;
	private double total;
	private String detail;
	@Version
	private int version;
	
	public Commande() {
	}

	public Commande(int idCommande, String emailClient, Date date, double total, String detail) {
		this.idCommande = idCommande;
		this.emailClient = emailClient;
		this.date = date;
		this.total = total;
		this.detail = detail;
	}

	public int getIdCommande() {
		return idCommande;
	}

	public void setIdCommande(int idCommande) {
		this.idCommande = idCommande;
	}

	public String getEmailClient() {
		return emailClient;
	}

	public void setEmailClient(String emailClient) {
		this.emailClient = emailClient;
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

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Commande [idCommande=" + idCommande + ", emailClient=" + emailClient + ", date=" + date + ", total="
				+ total + ", detail=" + detail + "]";
	}
	
	
}
